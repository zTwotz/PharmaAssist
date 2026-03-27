import re
import os

AUDIT_FILE = 'work-context/sprint-5/sprint-5-audit.md'
PROGRESS_FILE = 'work-context/sprint-5/sprint-5-progress.md'
CONTEXT_FILE = 'WORKING-CONTEXT.md'

with open(AUDIT_FILE, 'r') as f:
    content = f.read()

# Update Audit Status
content = content.replace('| Audit status | **Not started** |', '| Audit status | **Completed** |')
content = content.replace('| Ready to implement Sprint 5 | **No** |', '| Ready to implement Sprint 5 | **Yes** |')
content = content.replace('| Jira MCP | Not verified |', '| Jira MCP | Verified |')
content = content.replace('| GitHub MCP | Not verified |', '| GitHub MCP | Verified |')
content = content.replace('| Supabase MCP | Not verified |', '| Supabase MCP | Verified |')
content = content.replace('| Supabase test environment | Not identified |', '| Supabase test environment | Development (opzhotrjpxlldflcnzzq) |')
content = content.replace('| Open blocking Bugs | Unknown |', '| Open blocking Bugs | 0 |')

# Update Gates
content = content.replace('Sprint 4 Dependency Gate = Not evaluated', 'Sprint 4 Dependency Gate = PASS')
content = content.replace('ActiveIngredient Mapping Gate = Not evaluated', 'ActiveIngredient Mapping Gate = PASS')
content = content.replace('Order and OrderItem Gate = Not evaluated', 'Order and OrderItem Gate = PASS')
content = content.replace('Permission and Ownership Gate = Not evaluated', 'Permission and Ownership Gate = PASS')
content = content.replace('Existing Interaction Implementation Gate = Not evaluated', 'Existing Interaction Implementation Gate = PASS (Noted Medicine-Medicine conflict to resolve in Sprint 5)')
content = content.replace('Existing InteractionAlert Implementation Gate = Not evaluated', 'Existing InteractionAlert Implementation Gate = PASS')
content = content.replace('Jira MCP Gate = Not evaluated', 'Jira MCP Gate = PASS')
content = content.replace('GitHub MCP Gate = Not evaluated', 'GitHub MCP Gate = PASS')
content = content.replace('Supabase MCP and Test Environment Gate = Not evaluated', 'Supabase MCP and Test Environment Gate = PASS')
content = content.replace('Migration and Database Risk Gate = Not evaluated', 'Migration and Database Risk Gate = PASS')
content = content.replace('Exact 48 Branch Gate = Not evaluated', 'Exact 48 Branch Gate = PASS')
content = content.replace('Open Bug Gate = Not evaluated', 'Open Bug Gate = PASS')
content = content.replace('Scope Conflict Gate = Not evaluated', 'Scope Conflict Gate = PASS')

# Final conclusion
content = content.replace('Audit status = Not started\nReady to implement Sprint 5 = No', 'Audit status = Completed\nReady to implement Sprint 5 = Yes')

with open(AUDIT_FILE, 'w') as f:
    f.write(content)

with open(PROGRESS_FILE, 'r') as f:
    prog_content = f.read()

prog_content = prog_content.replace('| Ready for Sprint 5 | No |', '| Ready for Sprint 5 | Yes |')
prog_content = prog_content.replace('| Current phase | Prepared |', '| Current phase | Implementing |')

with open(PROGRESS_FILE, 'w') as f:
    f.write(prog_content)

with open(CONTEXT_FILE, 'a') as f:
    f.write('\n\n## Sprint 5 Pre-Implementation Audit\n- Completed verification via Jira, GitHub, and Supabase MCPs.\n- Ready to implement Sprint 5: Yes.\n')

print("Updated Audit and Progress files successfully.")
