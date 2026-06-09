const { spawn } = require('child_process');
const fs = require('fs');

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
    
    // Load tasks
    const tasks = JSON.parse(fs.readFileSync('tasks_4d.json', 'utf8'));
    console.log(`Loaded ${tasks.length} tasks from JSON.`);
    
    // Build story/epic cache
    const storyKeys = new Set();
    const epicKeys = new Set();
    for (const task of tasks) {
        if (task.story) storyKeys.add(task.story);
        if (task.epic) epicKeys.add(task.epic);
    }
    
    console.log(`Found ${storyKeys.size} stories and ${epicKeys.size} epics to resolve.`);
    const resolvedCache = {};
    
    async function resolveKey(searchStr) {
        if (resolvedCache[searchStr]) return resolvedCache[searchStr];
        
        const res = await sendRequest('tools/call', {
            name: 'searchJiraIssuesUsingJql',
            arguments: {
                cloudId: CLOUD_ID,
                jql: `summary ~ "${searchStr}"`
            }
        });
        
        try {
            const contentText = res.result.content.find(c => c.type === 'text' && c.text.includes('"issues"')).text;
            const data = JSON.parse(contentText);
            if (data.issues && data.issues.length > 0) {
                // Find the oldest one to avoid duplicates
                data.issues.sort((a,b) => new Date(a.fields.created) - new Date(b.fields.created));
                resolvedCache[searchStr] = data.issues[0].key;
                return data.issues[0].key;
            }
        } catch(e) {}
        
        console.error(`Could not resolve ${searchStr}`);
        resolvedCache[searchStr] = null;
        return null;
    }
    
    for (const s of storyKeys) {
        console.log(`Resolving Story ${s}...`);
        await resolveKey(s);
        await delay(300);
    }
    for (const e of epicKeys) {
        console.log(`Resolving Epic ${e}...`);
        await resolveKey(e);
        await delay(300);
    }
    
    console.log("Resolved Cache:", resolvedCache);
    
    function determineLabels(task) {
        let labels = [];
        let c = task.component.toLowerCase();
        if (c.includes("testing") || c.includes("setup")) labels.push("testing", "setup");
        if (c.includes("devops") || c.includes("ci")) labels.push("ci", "setup");
        if (c.includes("documentation")) labels.push("documentation");
        if (c.includes("admin graph") || c.includes("graph explorer") || c.includes("ai provider") || c.includes("prompt") || c.includes("audit log") || c.includes("supabase") || c.includes("notification") || c.includes("ai business") || c.includes("scheduled")) labels.push("advanced");
        if (c.includes("customer") || c.includes("commerce") || c.includes("catalog") || c.includes("multi-store") || c.includes("warehouse") || c.includes("transfer") || c.includes("forecasting") || c.includes("promotion") || c.includes("shipping") || c.includes("review")) labels.push("future");
        
        if (task.summary.toLowerCase().includes("release") || task.summary.toLowerCase().includes("demo")) labels.push("release");
        
        if (labels.length === 0) labels.push("task");
        return labels;
    }

    let successCount = 0;
    
    console.log("=== Creating all 145 tasks ===");
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        console.log(`Creating ${task.task_key}...`);
        
        let labels = determineLabels(task);

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
                console.log(`Created as ${newKey}. Linking...`);
                
                const actualStoryKey = resolvedCache[task.story];
                const actualEpicKey = resolvedCache[task.epic];
                
                if (actualStoryKey) {
                    await sendRequest('tools/call', {
                        name: 'createIssueLink',
                        arguments: { cloudId: CLOUD_ID, type: 'Relates', inwardIssue: actualStoryKey, outwardIssue: newKey }
                    });
                }
                
                if (actualEpicKey) {
                    const epicRes = await sendRequest('tools/call', {
                        name: 'editJiraIssue',
                        arguments: { cloudId: CLOUD_ID, issueIdOrKey: newKey, fields: { parent: { key: actualEpicKey } } }
                    });
                    if (epicRes.result && epicRes.result.isError) {
                        await sendRequest('tools/call', {
                            name: 'createIssueLink',
                            arguments: { cloudId: CLOUD_ID, type: 'Relates', inwardIssue: actualEpicKey, outwardIssue: newKey }
                        });
                    }
                }
                
                successCount++;
            } else {
                console.log(`Failed to extract key from: ${JSON.stringify(createRes.result.content)}`);
            }
        } else {
            console.error(`Failed to create ${task.task_key}:`, JSON.stringify(createRes));
        }
        await delay(300); // Throttling
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
