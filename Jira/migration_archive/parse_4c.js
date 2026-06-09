const fs = require('fs');

const listContent = fs.readFileSync('4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md', 'utf8');
const descContent = fs.readFileSync('4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md', 'utf8');

const tasks = [];

// Parse List
const listLines = listContent.split('\n');
let inTable = false;
for (const line of listLines) {
    if (line.includes('| PAC-TASK-')) {
        const parts = line.split('|').map(s => s.trim());
        if (parts.length >= 9) {
            const taskKey = parts[1];
            const summary = parts[2];
            const linkedStory = parts[3];
            const parentEpic = parts[4];
            const component = parts[5];
            const priority = parts[6];
            const sprint = parts[7];
            const assignee = parts[8];
            
            tasks.push({
                task_key: taskKey,
                summary: summary,
                story: linkedStory,
                epic: parentEpic,
                component: component,
                priority: priority,
                sprint: sprint,
                assignee: assignee,
                description: ""
            });
        }
    }
}

console.log(`Found ${tasks.length} tasks in list.`);

// Parse Description
const descParts = descContent.split('## PAC-TASK-');
for (let i = 1; i < descParts.length; i++) {
    const part = descParts[i];
    const firstLineEnd = part.indexOf('\n');
    const headerTitle = part.substring(0, firstLineEnd).trim();
    const taskKey = 'PAC-TASK-' + headerTitle.split(' ')[0];
    
    // Find the task
    const task = tasks.find(t => t.task_key === taskKey);
    if (task) {
        let desc = part.substring(firstLineEnd).trim();
        // Remove trailing '---' if exists
        desc = desc.replace(/\n\s*---\s*\n?/g, '\n').trim();
        task.description = desc;
    }
}

let descCount = tasks.filter(t => t.description.length > 0).length;
console.log(`Matched descriptions for ${descCount} tasks.`);

fs.writeFileSync('tasks_4c.json', JSON.stringify(tasks, null, 2), 'utf8');
console.log('Wrote tasks_4c.json');
