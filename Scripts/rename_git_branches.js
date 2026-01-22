const fs = require('fs');
const { execSync } = require('child_process');

function runCmd(cmd, ignoreError = false) {
    console.log(`Running: ${cmd}`);
    try {
        return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
    } catch (e) {
        if (!ignoreError) {
            console.error(`Error executing: ${cmd}`);
            console.error(e.stderr);
            // throw e; // don't throw, just return false or something so we don't crash on simple failures
        }
        return false;
    }
}

function getLocalBranches() {
    return runCmd('git branch').split('\n').map(b => b.replace(/^\*?\s*/, '').trim()).filter(Boolean);
}

function getRemoteBranches() {
    return runCmd('git branch -r').split('\n').map(b => b.replace(/^\*?\s*origin\//, '').trim()).filter(Boolean);
}

async function main() {
    console.log("Starting branch renaming process...");
    runCmd('git fetch origin');

    const jiraData = fs.readFileSync('Jira/branch-on-jira.md', 'utf-8');
    const lines = jiraData.split('\n');

    const renameMap = {}; // { oldBranchName: newBranchName }

    // Parse Epics
    // | **PAC-1**  | EPIC-01     | Authentication & RBAC                    | `epic/PAC-1-EPIC-01-auth-rbac`                         |
    // Parse Stories
    // | **PAC-40**  | US-01       | Đăng nhập bằng Supabase Auth                        | `story/PAC-40-US-01-supabase-auth-login`                          |
    // Parse Tasks
    // | **PAC-210** | T-001       | `feature/PAC-210-T-001-supabase-login-ui`                    |

    for (const line of lines) {
        // Epics
        const epicMatch = line.match(/\|\s*\*\*PAC-\d+\*\*\s*\|\s*(EPIC-\d+)\s*\|[^|]+\|\s*`([^`]+)`\s*\|/);
        if (epicMatch) {
            const oldBranch = `feature/PAC-${epicMatch[1]}-implementation`;
            const newBranch = epicMatch[2];
            renameMap[oldBranch] = newBranch;
        }

        // Stories
        const storyMatch = line.match(/\|\s*\*\*PAC-\d+\*\*\s*\|\s*(US-\d+)\s*\|[^|]+\|\s*`([^`]+)`\s*\|/);
        if (storyMatch) {
            const oldBranch = `feature/${storyMatch[1]}-implementation`;
            const newBranch = storyMatch[2];
            renameMap[oldBranch] = newBranch;
        }

        // Tasks
        const taskMatch = line.match(/\|\s*\*\*PAC-\d+\*\*\s*\|\s*(T-\d+)\s*\|\s*`([^`]+)`\s*\|/);
        if (taskMatch) {
            // T-001 corresponds to PAC-TASK-001
            const taskNum = taskMatch[1].replace('T-', '');
            const oldBranch = `feature/PAC-TASK-${taskNum}-implementation`;
            const newBranch = taskMatch[2];
            renameMap[oldBranch] = newBranch;
        }
    }

    const localBranches = getLocalBranches();
    const remoteBranches = getRemoteBranches();

    for (const [oldBranch, newBranch] of Object.entries(renameMap)) {
        let needsPush = false;
        
        // 1. Rename locally if old branch exists
        if (localBranches.includes(oldBranch)) {
            console.log(`\nRenaming local branch: ${oldBranch} -> ${newBranch}`);
            if (localBranches.includes(newBranch)) {
               // new branch already exists locally, just checkout new and maybe delete old
               runCmd(`git branch -D ${oldBranch}`, true);
            } else {
               runCmd(`git branch -m ${oldBranch} ${newBranch}`, true);
            }
            needsPush = true;
        } else if (remoteBranches.includes(oldBranch)) {
            // It exists on remote but not locally. Let's fetch it, rename it.
            console.log(`\nFetching and renaming remote branch: ${oldBranch} -> ${newBranch}`);
            runCmd(`git checkout -b ${newBranch} origin/${oldBranch}`, true);
            needsPush = true;
        }

        // 2. If it was renamed or we checked it out from remote
        if (needsPush) {
            // Push new branch to remote
            runCmd(`git push -u origin ${newBranch}`, true);
            
            // Delete old branch from remote if it exists
            if (remoteBranches.includes(oldBranch)) {
                console.log(`Deleting old remote branch: origin/${oldBranch}`);
                runCmd(`git push origin --delete ${oldBranch}`, true);
            }
        }
    }

    runCmd('git checkout develop');
    console.log("\nRenaming process completed!");
}

main().catch(console.error);
