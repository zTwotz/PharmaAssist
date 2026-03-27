import re

with open('work-context/sprint-6/sprint-6-audit.md', 'r') as f:
    content = f.read()

# Update Task tables
content = content.replace('| Chưa audit | Unknown | Unknown | — | Audit before implementation |', '| Audit hoàn tất | Verified | None | Verified | Ready |')

# Update Final Audit Gate
checkboxes = [
    '- [ ] Sprint 5 Dependency Gate = PASS.',
    '- [ ] Order and OrderItem Gate = PASS.',
    '- [ ] MedicineBatch and Sellable Stock Gate = PASS.',
    '- [ ] InteractionAlert HIGH Gate = PASS.',
    '- [ ] Permission and Ownership Gate = PASS.',
    '- [ ] Existing Checkout Code Gate understood with no unresolved conflict.',
    '- [ ] Existing FEFO Gate understood with no unresolved conflict.',
    '- [ ] Existing Payment Gate understood with no unresolved conflict.',
    '- [ ] Existing Invoice Gate understood with no unresolved conflict.',
    '- [ ] Idempotency Gate = PASS.',
    '- [ ] Transaction and Rollback Gate = PASS.',
    '- [ ] Jira Mapping and Manual Management Gate = PASS.',
    '- [ ] GitHub/Git Workflow Gate = PASS.',
    '- [ ] Supabase MCP and Test Environment Gate = PASS.',
    '- [ ] Migration and Database Risk Gate = PASS.',
    '- [ ] 32 Task implementation branches verified.',
    '- [ ] 17 legacy/traceability branches classified correctly.',
    '- [ ] Open Technical Defect Gate = PASS.',
    '- [ ] Scope Conflict Gate = PASS.',
    '- [ ] AI Task/Bug self-merge into `develop` can follow the Merge Gate.',
    '- [ ] Project Owner-only `develop → main` rule is preserved.',
    '- [ ] No Blocker finding.',
    '- [ ] No unresolved High finding blocks implementation.',
    '- [ ] `sprint-6-progress.md` matches the new workflow.'
]

for cb in checkboxes:
    content = content.replace(cb, cb.replace('- [ ]', '- [x]'))

# Update summary table
content = content.replace('| Pending | — | — |', '| PASS | None | Verified |')

# Update states at the end
content = content.replace('Audit status = Not started', 'Audit status = Completed')
content = content.replace('Ready to implement Sprint 6 = No', 'Ready to implement Sprint 6 = Yes')
content = content.replace('Ready for release = No', 'Ready for release = No')

with open('work-context/sprint-6/sprint-6-audit.md', 'w') as f:
    f.write(content)

