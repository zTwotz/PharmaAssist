with open('work-context/sprint-6/sprint-6-progress.md', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'PAC-TASK-289' in line:
        parts = line.split('|')
        if len(parts) > 10:
            parts[3] = ' DONE '
            parts[5] = ' `b499c4a` '
            parts[6] = ' `#804` '
            parts[7] = ' `develop` '
            parts[8] = ' Merged '
            parts[9] = ' PASS '
            parts[10] = ' N/A '
            parts[12] = ' TO DO '
            lines[i] = '|'.join(parts)

with open('work-context/sprint-6/sprint-6-progress.md', 'w') as f:
    f.writelines(lines)

