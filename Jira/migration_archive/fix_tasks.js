const fs = require('fs');
const { spawn } = require('child_process');

let messageId = 0;
const cloudId = "b06ed89e-ac74-4625-be69-a7184963d793";

const child = spawn('npx.cmd', ['-y', 'mcp-remote', 'https://mcp.atlassian.com/v1/sse'], { shell: true });

function sendRequest(method, params) {
  return new Promise((resolve) => {
    const id = ++messageId;
    const req = {
      jsonrpc: "2.0",
      id,
      method,
      params
    };
    
    let buffer = "";
    const handler = (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep the incomplete line in the buffer
      
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const resp = JSON.parse(line);
          if (resp.id === id) {
            child.stdout.removeListener('data', handler);
            resolve(resp.result);
          }
        } catch (e) {}
      }
    };
    child.stdout.on('data', handler);
    child.stdin.write(JSON.stringify(req) + '\n');
  });
}

async function run() {
  console.log('Waiting for proxy to establish...');
  await new Promise(r => setTimeout(r, 2000));
  console.log('Initializing...');
  await sendRequest("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" }
  });
  
  const content = fs.readFileSync('4A_Task_Description_MVP_Foundation_001_145.md', 'utf8');
  
  // Extract all tasks
  const tasks = [];
  const lines = content.split('\n');
  let currentTask = null;
  
  for (let line of lines) {
    const match = line.match(/^## (PAC-TASK-\d{3}) - (.*)/);
    if (match) {
      if (currentTask) tasks.push(currentTask);
      currentTask = {
        logicalKey: match[1],
        summary: match[1] + " - " + match[2],
        description: "",
      };
    } else if (currentTask) {
      if (line.trim() === '---') {
        tasks.push(currentTask);
        currentTask = null;
      } else {
        currentTask.description += line + '\n';
      }
    }
  }
  if (currentTask) tasks.push(currentTask);
  
  // We need Task 054 to 092
  const targetTasks = tasks.filter(t => {
    const num = parseInt(t.logicalKey.replace('PAC-TASK-', ''), 10);
    return num >= 54 && num <= 92;
  });
  
  console.log(`Found ${targetTasks.length} tasks to recover.`);
  if (targetTasks.length !== 39) {
    console.error("Not exactly 39 tasks! Aborting.");
    process.exit(1);
  }
  
  // Also we need to link them to their epic.
  // We can just query `searchJiraIssuesUsingJql` to find their Epic.
  // Actually, wait, when we update issuetype to Task, we also need to set the parent.
  // The epic keys are in 4A_Task_List... wait, we can just update Summary and Description for now.
  // And issuetype = "10006". The parent might already be correct if it's set, or we can just skip parent for a moment.
  // Wait, in 4A_Task_Description, does it mention the epic?
  // Let's just update summary, description, issuetype. We can set parent later if needed or manually.
  
  for (let i = 0; i < 39; i++) {
    const task = targetTasks[i];
    const jiraKey = `PAC-${264 + i}`;
    
    console.log(`Recovering ${jiraKey} -> ${task.logicalKey}`);
    
    const fields = {
      summary: task.summary,
      description: task.description.trim() + "\n\n---",
      issuetype: { id: "10006" } // Task
    };
    
    const resp = await sendRequest("tools/call", {
      name: "editJiraIssue",
      arguments: {
        cloudId: cloudId,
        issueIdOrKey: jiraKey,
        fields: fields
      }
    });
    
    if (resp.isError) {
      console.error(`Failed to update ${jiraKey}:`, resp.content[0].text);
    } else {
      console.log(`Successfully recovered ${jiraKey}.`);
    }
    
    // small delay
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('Recovery completed. Now you should run generate_mapping.js again.');
  process.exit(0);
}

run().catch(console.error);
