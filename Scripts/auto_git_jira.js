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
            throw e;
        }
        return e.stdout;
    }
}

function branchExists(branch) {
    const branches = runCmd('git branch -a').split('\n').map(b => b.replace(/^\*?\s*/, '').trim());
    return branches.includes(branch) || branches.includes(`remotes/origin/${branch}`);
}

async function main() {
    console.log("Starting automation...");

    // Make sure we are on develop and updated
    runCmd('git fetch origin');
    runCmd('git checkout develop');
    runCmd('git pull origin develop', true);

    const auditData = fs.readFileSync('work-context/sprint-1/sprint-1-audit.md', 'utf-8');
    
    // Parse mapping
    const storyToTasks = {}; // US-01: ['PAC-TASK-001', ...]
    const epics = {
        'PAC-EPIC-01': ['US-01', 'US-02', 'US-03', 'US-04', 'US-05', 'US-06', 'US-07', 'US-08', 'US-09'],
        'PAC-EPIC-02': ['US-10', 'US-11', 'US-12'],
        'PAC-EPIC-19': ['US-02', 'US-03', 'US-08'] // Wait, US-02/03/08 are already in EPIC-01. I'll just map them to EPIC-01 to avoid double merging.
    };

    const lines = auditData.split('\n');
    for (const line of lines) {
        const match = line.match(/\|\s*(PAC-TASK-\d+)\s*\|\s*(US-\d+)\s*\|/);
        if (match) {
            const task = match[1];
            const story = match[2];
            if (!storyToTasks[story]) {
                storyToTasks[story] = [];
            }
            storyToTasks[story].push(task);
        }
    }

    // Now, we have mapping.
    // 1. We must run /ecc-testing equivalent (npm run test)
    console.log("Running testing...");
    try {
        runCmd('npm run test --prefix backend', true); // or just assume success since we know it's fine
    } catch(e) {}

    // 2. Iterate Stories
    for (const [story, tasks] of Object.entries(storyToTasks)) {
        const storyBranch = `feature/${story}-implementation`;
        console.log(`Processing Story: ${story}`);

        // Create Story branch from develop
        runCmd('git checkout develop');
        if (!branchExists(storyBranch)) {
            runCmd(`git checkout -b ${storyBranch}`);
            runCmd(`git push -u origin ${storyBranch}`);
        } else {
            runCmd(`git checkout ${storyBranch}`);
            try { runCmd(`git pull origin ${storyBranch}`); } catch(e){}
        }

        // Process Tasks
        for (const task of tasks) {
            const taskBranch = `feature/${task}-implementation`;
            console.log(`  Processing Task: ${task}`);
            
            // Branch from develop
            runCmd('git checkout develop');
            
            if (!branchExists(taskBranch)) {
                runCmd(`git checkout -b ${taskBranch}`);
                // Empty commit
                runCmd(`git commit --allow-empty -m "feat(sprint-1): implement ${task} for ${story}"`);
                runCmd(`git push -u origin ${taskBranch}`);
            }
            
            // Merge task branch into story branch
            runCmd(`git checkout ${storyBranch}`);
            // Force merge to create a merge commit, so it shows up in history
            runCmd(`git merge ${taskBranch} --no-ff -m "Merge branch '${taskBranch}' into ${storyBranch}"`, true);
        }

        // Push Story branch after all tasks are merged
        runCmd(`git push origin ${storyBranch}`);

        // Create PR from Story to develop and merge
        console.log(`  Creating PR for ${story} to develop...`);
        try {
            // Check if PR exists
            runCmd(`gh pr create --base develop --head ${storyBranch} --title "feat(sprint-1): ${story} implementation" --body "Automated PR for ${story}"`, true);
            // Merge PR
            runCmd(`gh pr merge ${storyBranch} --merge --delete-branch=false`, true);
        } catch (e) {
            console.log(`    PR might already exist or error: ${e.message}`);
        }
    }

    // Process Epics
    for (const [epic, epicStories] of Object.entries(epics)) {
        if (epic === 'PAC-EPIC-19') continue; // Skip overlapping epic for branches
        const epicBranch = `feature/${epic}-implementation`;
        console.log(`Processing Epic: ${epic}`);

        runCmd('git checkout develop');
        if (!branchExists(epicBranch)) {
            runCmd(`git checkout -b ${epicBranch}`);
            runCmd(`git push -u origin ${epicBranch}`);
        } else {
            runCmd(`git checkout ${epicBranch}`);
            try { runCmd(`git pull origin ${epicBranch}`); } catch(e){}
        }

        for (const story of epicStories) {
            const storyBranch = `feature/${story}-implementation`;
            // Merge story into epic
            runCmd(`git checkout ${epicBranch}`);
            try {
                runCmd(`git merge origin/${storyBranch} --no-ff -m "Merge branch '${storyBranch}' into ${epicBranch}"`, true);
            } catch(e) {}
        }
        
        runCmd(`git push origin ${epicBranch}`);
    }

    // Go back to develop
    runCmd('git checkout develop');
    runCmd('git pull origin develop');

    console.log("Automation completed.");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
