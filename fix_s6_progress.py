import re

with open('work-context/sprint-6/sprint-6-progress.md', 'r') as f:
    content = f.read()

pattern = r'(\| PAC-TASK-262 [^\|]+\|\s*`PAC-472`\s*\|\s*)Not started(\s*\|\s*)`feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners`\s*\|\s*—\s*\|\s*—(\s*\|\s*)Not opened(\s*\|\s*)—(\s*\|\s*)Pending(\s*\|\s*)Pending/N/A(\s*\|\s*)—(\s*\|\s*)TO DO(\s*\|)'
replacement = r'\g<1>DONE\g<2>`feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` | `67fe5ef` | `#779`\g<3>`develop`\g<4>Merged\g<5>PASS\g<6>N/A\g<7>—\g<8>TO DO\g<9>'

content = re.sub(pattern, replacement, content)

with open('work-context/sprint-6/sprint-6-progress.md', 'w') as f:
    f.write(content)

