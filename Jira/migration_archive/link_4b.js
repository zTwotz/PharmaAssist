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
    
    console.log("Initializing...");
    await sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'bulk-script', version: '1.0.0' }
    });
    sendNotification('notifications/initialized', {});
    
    // Parse Markdown
    const markdown = fs.readFileSync('4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md', 'utf8');
    const lines = markdown.split('\n');
    const tableLines = lines.filter(l => l.startsWith('| PAC-TASK-'));
    
    const taskMap = {};
    for (const line of tableLines) {
        const cols = line.split('|').map(s => s.trim());
        const taskKey = cols[1]; // PAC-TASK-XXX
        const storyKey = cols[3]; // US-XX
        const epicKey = cols[4]; // PAC-EPIC-XX
        taskMap[taskKey] = { storyKey, epicKey };
    }
    
    // Build story/epic cache
    const storyKeys = new Set();
    const epicKeys = new Set();
    for (const key in taskMap) {
        if (taskMap[key].storyKey) storyKeys.add(taskMap[key].storyKey);
        if (taskMap[key].epicKey) epicKeys.add(taskMap[key].epicKey);
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
    
    // Resolve all
    for (const s of storyKeys) {
        console.log(`Resolving ${s}...`);
        await resolveKey(s);
        await delay(500);
    }
    for (const e of epicKeys) {
        console.log(`Resolving ${e}...`);
        await resolveKey(e);
        await delay(500);
    }
    
    console.log("Resolved Cache:", resolvedCache);
    
    let successCount = 0;
    const START_KEY = 356;
    let idx = 0;
    
    // We only process tableLines
    for (const line of tableLines) {
        const cols = line.split('|').map(s => s.trim());
        const taskKey = cols[1]; // PAC-TASK-XXX
        const targetKey = `PAC-${START_KEY + idx}`;
        idx++;
        
        const storySearch = cols[3];
        const epicSearch = cols[4];
        
        const actualStoryKey = resolvedCache[storySearch];
        const actualEpicKey = resolvedCache[epicSearch];
        
        console.log(`Linking ${targetKey} (from ${taskKey}) -> Story: ${actualStoryKey}, Epic: ${actualEpicKey}`);
        
        if (actualStoryKey) {
            await sendRequest('tools/call', {
                name: 'createIssueLink',
                arguments: {
                    cloudId: CLOUD_ID,
                    type: 'Relates',
                    inwardIssue: actualStoryKey,
                    outwardIssue: targetKey
                }
            });
            await delay(200);
        }
        
        if (actualEpicKey) {
            // Also assign the parent directly if possible, but editJiraIssue might fail.
            // Let's use editJiraIssue to set the parent field. 
            // Wait, standard Epic linking is `parent: { key: actualEpicKey }`.
            const editRes = await sendRequest('tools/call', {
                name: 'editJiraIssue',
                arguments: {
                    cloudId: CLOUD_ID,
                    issueIdOrKey: targetKey,
                    fields: {
                        parent: { key: actualEpicKey }
                    }
                }
            });
            
            // Wait! The user also requested: "và tạo thêm một Issue Link (Relates to) tới Story"
            // And "Gắn Parent = Epic". Let's also add Relates to Epic just in case `parent` fails.
            if (editRes.result && editRes.result.isError) {
                console.error(`Failed to set parent for ${targetKey}: ${JSON.stringify(editRes.result)}`);
                // Fallback to link
                await sendRequest('tools/call', {
                    name: 'createIssueLink',
                    arguments: {
                        cloudId: CLOUD_ID,
                        type: 'Relates',
                        inwardIssue: actualEpicKey,
                        outwardIssue: targetKey
                    }
                });
            } else {
                console.log(`Successfully set parent for ${targetKey} to ${actualEpicKey}`);
            }
            await delay(200);
        }
        successCount++;
    }
    
    console.log(`Done. Processed ${successCount}/${tableLines.length} successfully.`);
    child.kill();
    process.exit(0);
}

run().catch(e => {
    console.error(e);
    child.kill();
    process.exit(1);
});
