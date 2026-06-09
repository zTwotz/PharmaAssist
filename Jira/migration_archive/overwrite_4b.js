const { spawn } = require('child_process');
const fs = require('fs');

const tasks = JSON.parse(fs.readFileSync('tasks_4b.json', 'utf8'));

const child = spawn('npx.cmd', ['-y', 'mcp-remote', 'https://mcp.atlassian.com/v1/sse'], { shell: true });

let messageId = 0;
const pendingRequests = {};

function sendRequest(method, params) {
    return new Promise((resolve) => {
        const id = messageId++;
        const payload = { jsonrpc: '2.0', id, method, params };
        pendingRequests[id] = resolve;
        child.stdin.write(JSON.stringify(payload) + '\n');
    });
}

function sendNotification(method, params) {
    const payload = { jsonrpc: '2.0', method, params };
    child.stdin.write(JSON.stringify(payload) + '\n');
}

let buffer = '';
child.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // keep incomplete line
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const msg = JSON.parse(line);
            if (msg.id !== undefined && pendingRequests[msg.id]) {
                pendingRequests[msg.id](msg);
                delete pendingRequests[msg.id];
            }
        } catch (e) {
            // Not a JSON line, ignore
        }
    }
});

let proxyEstablished = false;
child.stderr.on('data', (data) => {
    const str = data.toString();
    if (str.includes('Proxy established successfully')) {
        proxyEstablished = true;
    }
});

const CLOUD_ID = "b06ed89e-ac74-4625-be69-a7184963d793";
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    console.log("Waiting for proxy to establish...");
    for (let i = 0; i < 20; i++) {
        if (proxyEstablished) break;
        await delay(500);
    }
    
    console.log("Initializing...");
    await sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'bulk-script', version: '1.0.0' }
    });
    sendNotification('notifications/initialized', {});
    
    let successCount = 0;
    
    // We want PAC-356 to PAC-500
    const START_KEY = 356;
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const targetKey = `PAC-${START_KEY + i}`;
        
        console.log(`Overwriting ${targetKey} with data for ${task.task_key} ...`);
        
        let labels = [];
        const c = task.component.toLowerCase();
        if (c.includes("import")) labels.push("stock-import");
        if (c.includes("inventory")) labels.push("inventory", "adjustment");
        if (c.includes("pos") || c.includes("checkout")) labels.push("pos", "checkout", "order");
        if (c.includes("interaction")) labels.push("drug-interaction", "alert");
        if (c.includes("payment")) labels.push("payment");
        if (c.includes("invoice")) labels.push("invoice");
        if (labels.length === 0) labels.push("task");

        // EDIT ISSUE
        const editRes = await sendRequest('tools/call', {
            name: 'editJiraIssue',
            arguments: {
                cloudId: CLOUD_ID,
                issueIdOrKey: targetKey,
                fields: {
                    summary: task.summary,
                    description: task.description,
                    components: [{ name: task.component }],
                    priority: { name: task.priority },
                    labels: labels
                }
            }
        });
        
        if (editRes.result && !editRes.result.isError) {
            console.log(`Edited ${targetKey}, linking to ${task.real_story_key}...`);
            
            await sendRequest('tools/call', {
                name: 'createIssueLink',
                arguments: {
                    cloudId: CLOUD_ID,
                    type: 'Relates',
                    inwardIssue: task.real_story_key,
                    outwardIssue: targetKey
                }
            });
            
            // Link to Epic as well if needed
            if (task.real_epic_key) {
                await sendRequest('tools/call', {
                    name: 'createIssueLink',
                    arguments: {
                        cloudId: CLOUD_ID,
                        type: 'Relates',
                        inwardIssue: task.real_epic_key,
                        outwardIssue: targetKey
                    }
                });
            }
            
            successCount++;
        } else {
            console.error(`Failed to edit ${targetKey}:`, JSON.stringify(editRes));
        }
        await delay(200); // Throttling
    }
    
    console.log(`Done. Processed ${successCount}/${tasks.length} successfully.`);
    child.kill();
    process.exit(0);
}

run().catch(e => {
    console.error(e);
    child.kill();
    process.exit(1);
});
