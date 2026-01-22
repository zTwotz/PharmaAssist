const { execSync } = require('child_process');

function runCmd(cmd, ignoreError = false) {
    console.log(`Running: ${cmd}`);
    try {
        return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
    } catch (e) {
        if (!ignoreError) {
            console.error(`Error executing: ${cmd}`);
            console.error(e.stderr);
        }
        return false;
    }
}

function getLocalBranches() {
    return runCmd('git branch').split('\n').map(b => b.replace(/^\*?\s*/, '').trim()).filter(Boolean);
}

async function main() {
    console.log("Starting Jira sync trigger process...");

    const localBranches = getLocalBranches();
    const regex = /^(epic|story|feature|test|docs|bugfix)\/(PAC-\d+)-([A-Z]+-\d+)-/;

    for (const branch of localBranches) {
        const match = branch.match(regex);
        if (match) {
            const jiraKey = match[2];
            const logicalKey = match[3];

            console.log(`\nProcessing branch: ${branch}`);
            runCmd(`git checkout ${branch}`);
            
            // Create empty commit with proper Jira format
            const commitMsg = `${jiraKey} ${logicalKey}: trigger Jira branch sync`;
            runCmd(`git commit --allow-empty -m "${commitMsg}"`, true);
            
            // Push to remote to trigger webhook
            runCmd(`git push origin ${branch}`, true);
        }
    }

    runCmd('git checkout develop');
    console.log("\nJira sync trigger process completed!");
}

main().catch(console.error);
