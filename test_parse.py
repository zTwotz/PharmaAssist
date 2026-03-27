items = []
with open('/tmp/sprint-5-progress.md', 'r') as f:
    lines = f.readlines()
for line in lines:
    if line.startswith('| US-') or line.startswith('| PAC-EPIC-'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 6:
            key = parts[1].replace('`', '')
            branch = ''
            target = ''
            if key.startswith('US-'):
                branch = parts[4].replace('`', '')
                target = parts[7].replace('`', '')
                if not target.startswith('epic/'):
                    continue
            elif key.startswith('PAC-EPIC-'):
                if len(parts) >= 8:
                    branch = parts[2].replace('`', '')
                    target = parts[3].replace('`', '')
                    if target != 'develop':
                        continue
                else:
                    continue
            if branch and target and branch != '—' and target != '—':
                items.append({'key': key, 'branch': branch, 'target': target})
for item in items:
    print(item['key'], item['branch'], item['target'])
