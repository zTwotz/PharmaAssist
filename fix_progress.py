import re

with open('work-context/sprint-5/sprint-5-progress.md', 'r') as f:
    content = f.read()

for i in range(243, 259):
    pattern = rf'(\| PAC-TASK-{i} [^\|]+\|\s*`[^`]+`\s*\|\s*)DONE(\s*\|\s*)—(\s*\|\s*)`([^`]+)`(\s*\|\s*)—(\s*\|\s*)—'
    replacement = rf'\g<1>DONE\g<2>TO DO\g<3>`\g<4>`\g<5>`Verified`\g<6>#N/A'
    content = re.sub(pattern, replacement, content)

with open('work-context/sprint-5/sprint-5-progress.md', 'w') as f:
    f.write(content)

