const { spawn } = require('child_process');
const fs = require('fs');

const CLOUD_ID = 'b06ed89e-ac74-4625-be69-a7184963d793';

const child = spawn('npx.cmd', ['-y', 'mcp-remote', 'https://mcp.atlassian.com/v1/sse'], { shell: true });

let messageId = 0;
let proxyEstablished = false;

child.stderr.on('data', (data) => {
    const str = data.toString();
    if (str.includes('Proxy established successfully')) {
        proxyEstablished = true;
    }
});

const mapping = {
  epics: [],
  stories: [],
  tasks: []
};

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
      buffer += data.toString('utf8');
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
    child.stdin.write(JSON.stringify(req) + '\n', 'utf8');
  });
}

function sendNotification(method, params) {
  const req = { jsonrpc: "2.0", method, params };
  child.stdin.write(JSON.stringify(req) + '\n', 'utf8');
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchAllIssues() {
  let allIssues = [];
  let pageToken = null;
  let isLast = false;
  
  while (!isLast) {
    const args = {
      cloudId: CLOUD_ID,
      jql: "project = PAC ORDER BY created ASC",
      maxResults: 100
    };
    if (pageToken) {
      args.nextPageToken = pageToken;
    }
    
    console.log(`Fetching page with token: ${pageToken}...`);
    const res = await sendRequest("tools/call", {
      name: "searchJiraIssuesUsingJql",
      arguments: args
    });
    
    try {
      const contentText = res.content.find(c => c.type === 'text' && c.text.includes('"issues"')).text;
      
      let cleanText = contentText;
      if (cleanText.startsWith("[IMPORTANT:")) {
        cleanText = cleanText.substring(cleanText.indexOf("]")+1).trim();
      }
      
      const parsed = JSON.parse(cleanText);
      if (parsed.issues) {
        allIssues = allIssues.concat(parsed.issues);
      } else {
        break;
      }
      
      isLast = parsed.isLast !== false;
      pageToken = parsed.nextPageToken;
    } catch (e) {
      console.error("Failed to parse Jira response:", e);
      break;
    }
    await delay(300);
  }
  
  return allIssues;
}

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
    
    try {
      const issues = await fetchAllIssues();
      console.log(`Fetched ${issues.length} total issues.`);
      
      for (const issue of issues) {
        const key = issue.key;
        const summary = issue.fields.summary || "";
        
        // Match Epic
        const epicMatch = summary.match(/^(PAC-EPIC-\d+)/);
        if (epicMatch) {
          mapping.epics.push({ logical: epicMatch[1], jira: key, summary });
          continue;
        }
        
        // Match Story
        const storyMatch = summary.match(/^(US-\d+)/);
        if (storyMatch) {
          mapping.stories.push({ logical: storyMatch[1], jira: key, summary });
          continue;
        }
        
        // Match Task
        const taskMatch = summary.match(/^(PAC-TASK-\d+)/);
        if (taskMatch) {
          mapping.tasks.push({ logical: taskMatch[1], jira: key, summary });
          continue;
        }
      }
      
      // Sort logic
      const sortByNum = (prefix) => (a, b) => {
        const numA = parseInt(a.logical.replace(prefix, ''), 10);
        const numB = parseInt(b.logical.replace(prefix, ''), 10);
        return numA - numB;
      };
      
      const deduplicate = (arr) => {
        const map = new Map();
        for (const item of arr) {
          const jiraId = parseInt(item.jira.replace('PAC-', ''), 10);
          if (!map.has(item.logical) || parseInt(map.get(item.logical).jira.replace('PAC-', ''), 10) > jiraId) {
            map.set(item.logical, item);
          }
        }
        return Array.from(map.values());
      };

      mapping.epics = deduplicate(mapping.epics).sort(sortByNum('PAC-EPIC-'));
      mapping.stories = deduplicate(mapping.stories).sort(sortByNum('US-'));
      mapping.tasks = deduplicate(mapping.tasks).sort(sortByNum('PAC-TASK-'));
      
      // Generate Markdown
      let md = `# Jira Branch Mapping Table\n\n`;
      md += `> [!IMPORTANT]\n> Tài liệu này là Single Source of Truth cho toàn bộ Jira Key trên dự án. Khi tạo branch, tạo commit hay ghi log, bắt buộc phải sử dụng mã thực tế ở cột **Jira Key** trong bảng này thay vì tự tính nhẩm.\n\n`;
      
      md += `## 1. Epics (${mapping.epics.length})\n\n`;
      md += `| Logical Key | Jira Key | Summary |\n|---|---|---|\n`;
      mapping.epics.forEach(e => md += `| \`${e.logical}\` | **\`${e.jira}\`** | ${e.summary} |\n`);
      
      md += `\n## 2. User Stories (${mapping.stories.length})\n\n`;
      md += `| Logical Key | Jira Key | Summary |\n|---|---|---|\n`;
      mapping.stories.forEach(e => md += `| \`${e.logical}\` | **\`${e.jira}\`** | ${e.summary} |\n`);
      
      md += `\n## 3. Tasks (${mapping.tasks.length})\n\n`;
      md += `| Logical Key | Jira Key | Summary |\n|---|---|---|\n`;
      mapping.tasks.forEach(e => md += `| \`${e.logical}\` | **\`${e.jira}\`** | ${e.summary} |\n`);
      
      fs.writeFileSync('jira-mapping.md', md, 'utf8');
      console.log("Written to jira-mapping.md successfully.");
      
      child.kill();
      process.exit(0);
    } catch (e) {
      console.error(e);
      child.kill();
      process.exit(1);
    }
}

run();
