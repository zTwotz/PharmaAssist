import re
import json
import sys

def parse_epics(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by lines and iterate
    epics = []
    current_epic = {}
    lines = content.split('\n')
    
    in_epic_table = False
    
    for line in lines:
        if line.startswith('# PAC-EPIC-'):
            if current_epic:
                epics.append(current_epic)
            current_epic = {'key': line.strip('# ').strip()}
            in_epic_table = False
            continue
            
        if current_epic and '|' in line and not line.startswith('| Field trên Jira'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 3:
                key = parts[1]
                val = parts[2]
                if key == 'Summary':
                    current_epic['summary'] = val
                elif key == 'Components':
                    current_epic['components'] = [c.strip() for c in val.split(',') if c.strip()]
                elif key == 'Description':
                    current_epic['description'] = val
                elif key == 'Priority':
                    current_epic['priority'] = val
                elif key == 'Labels':
                    current_epic['labels'] = [l.strip() for l in val.split(',')]
                    
    if current_epic:
        epics.append(current_epic)
        
    return epics

if __name__ == '__main__':
    epics = parse_epics('d:/Documents/CODE/PharmaAssist/Jira/2_Epic.md')
    with open('epics.json', 'w', encoding='utf-8') as f:
        json.dump(epics, f, ensure_ascii=False, indent=2)
    print(f"Parsed {len(epics)} epics.")
