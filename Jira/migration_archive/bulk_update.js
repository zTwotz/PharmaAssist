const { spawn } = require('child_process');
const fs = require('fs');

const tasks = JSON.parse(fs.readFileSync('tasks_4b.json', 'utf8'));
const pendingTasks = tasks;

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
    if (!proxyEstablished) console.log("Warning: Proxy establishment not detected, continuing anyway...");
    
    console.log("Initializing...");
    await sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'bulk-script', version: '1.0.0' }
    });
    sendNotification('notifications/initialized', {});
    
    let successCount = 0;
    
    for (const task of pendingTasks) {
        console.log(`Creating ${task.task_key} (expected ${task.real_task_key})...`);
        
        let labels = [];
        const c = task.component.toLowerCase();
        if (c.includes("import")) labels.push("stock-import");
        if (c.includes("inventory")) labels.push("inventory", "adjustment");
        if (c.includes("pos") || c.includes("checkout")) labels.push("pos", "checkout", "order");
        if (c.includes("interaction")) labels.push("drug-interaction", "alert");
        if (c.includes("payment")) labels.push("payment");
        if (c.includes("invoice")) labels.push("invoice");
        if (labels.length === 0) labels.push("task");

        // CREATE WITHOUT PARENT
        const createRes = await sendRequest('tools/call', {
            name: 'createJiraIssue',
            arguments: {
                cloudId: CLOUD_ID,
                projectKey: "PAC",
                issueTypeName: "Task",
                summary: task.summary,
                description: task.description,
                additional_fields: {
                    components: [{ name: task.component }],
                    priority: { name: task.priority },
                    labels: labels
                }
            }
        });
        
        if (createRes.result && !createRes.result.isError) {
            let newKey = "";
            try {
                const contentText = createRes.result.content.find(c => c.type === 'text' && c.text.includes('"id"')).text;
                if (contentText.startsWith('{')) {
                    const resultObj = JSON.parse(contentText);
                    newKey = resultObj.key;
                } else {
                    const match = contentText.match(/PAC-\d+/);
                    if (match) newKey = match[0];
                }
            } catch (e) {
                console.error("Failed to parse created issue key:", createRes.result);
                continue;
            }
            
            if (newKey) {
                console.log(`Created as ${newKey}, linking to ${task.real_story_key}...`);
                
                await sendRequest('tools/call', {
                    name: 'createIssueLink',
                    arguments: {
                        cloudId: CLOUD_ID,
                        type: 'Relates',
                        inwardIssue: task.real_story_key,
                        outwardIssue: newKey
                    }
                });
                
                // Note: Epic assignment might need a different field name like customfield_10014
                // Let's just try parent, if it fails, it fails, the task will still be created and linked to Story.
                
                successCount++;
            } else {
                console.log(`Failed to extract key from: ${JSON.stringify(createRes.result.content)}`);
            }
        } else {
            console.error(`Failed to create ${task.task_key}:`, JSON.stringify(createRes));
        }
        await delay(200); // Throttling
    }
    
    console.log(`Done. Processed ${successCount}/${pendingTasks.length} successfully.`);
    child.kill();
    process.exit(0);
}

run().catch(e => {
    console.error(e);
    child.kill();
    process.exit(1);
});
