const { spawn } = require('child_process');

async function fetchFromJira(method, path, body = null) {
    return new Promise((resolve, reject) => {
        let args = [
            '--server', 'atlassian-mcp-server',
            '--tool', 'fetch',
            '--',
            `{"cloudId":"b06ed89e-ac74-4625-be69-a7184963d793","path":"${path}","method":"${method}"${body ? `,"body":${JSON.stringify(body)}` : ''}}`
        ];

        const proxy = spawn('npx.cmd', ['mcp-remote', ...args], { shell: true });

        let stdoutData = '';
        let stderrData = '';

        proxy.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        proxy.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        proxy.on('close', (code) => {
            if (code === 0) {
                try {
                    let resultStr = stdoutData.trim();
                    const lines = resultStr.split('\n');
                    let jsonLine = lines.find(line => line.startsWith('{') || line.startsWith('['));
                    if (!jsonLine) {
                        jsonLine = lines[lines.length - 1];
                    }
                    resolve(JSON.parse(jsonLine));
                } catch (e) {
                    console.log("Error parsing:", stdoutData);
                    resolve(null);
                }
            } else {
                console.error("Proxy failed:", stderrData);
                resolve(null);
            }
        });
    });
}

async function run() {
    console.log("Moving Epics to Backlog (removing from Sprints)...");
    const issues = [];
    for(let i = 1; i <= 39; i++) {
        issues.push(`PAC-${i}`);
    }
    
    const res = await fetchFromJira('POST', '/rest/agile/1.0/backlog/issue', JSON.stringify({ issues }));
    console.log("Result:", res);
    console.log("Done!");
}

run().catch(console.error);
