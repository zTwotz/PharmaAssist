import json
import sys

with open('tasks.json', 'r', encoding='utf-8') as f:
    tasks = json.load(f)

for i in range(10):
    t = tasks[i]
    print(f"Task {i}: {t['task_key']} -> {t['real_task_key']}")
    print(f"Summary: {t['summary']}")
    print(f"Desc length: {len(t['description'])}")
    print("---")
