import re

with open('work-context/sprint-6/sprint-6-progress.md', 'r') as f:
    content = f.read()

pattern = r'(\| PAC-TASK-260 [^\|]+\|\s*`PAC-470`\s*\|\s*)Not started(\s*\|\s*)`feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout`\s*\|\s*—\s*\|\s*—(\s*\|\s*)Not opened(\s*\|\s*)—(\s*\|\s*)Pending(\s*\|\s*)Pending/N/A(\s*\|\s*)—(\s*\|\s*)TO DO(\s*\|)'
replacement = r'\g<1>DONE\g<2>`feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` | `754dafe` | `#777`\g<3>`develop`\g<4>Merged\g<5>PASS\g<6>N/A\g<7>—\g<8>TO DO\g<9>'

content = re.sub(pattern, replacement, content)

with open('work-context/sprint-6/sprint-6-progress.md', 'w') as f:
    f.write(content)

