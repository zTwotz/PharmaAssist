with open('work-context/sprint-6/sprint-6-progress.md', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'PAC-TASK-288' in line:
        parts = line.split('|')
        if len(parts) > 10:
            parts[3] = ' DONE '
            parts[5] = ' `6c5ad14` '
            parts[6] = ' `#803` '
            parts[7] = ' `develop` '
            parts[8] = ' Merged '
            parts[9] = ' PASS '
            parts[10] = ' N/A '
            parts[12] = ' TO DO '
            lines[i] = '|'.join(parts)

with open('work-context/sprint-6/sprint-6-progress.md', 'w') as f:
    f.writelines(lines)

