#!/bin/bash
awk -F'`' '
  /`EPIC-11`/ {print $4}
  /`US-8[3-9]`/ {print $4}
  /`US-9[0-8]`/ {print $4}
  /`TASK-2[5-8][0-9]`/ {if($2 >= "TASK-259") print $4}
  /`TASK-259`/ {print $4}
  /`TASK-26[0-9]`/ {print $4}
  /`TASK-27[0-9]`/ {print $4}
  /`TASK-28[0-9]`/ {print $4}
  /`TASK-290`/ {print $4}
' Jira/branch-on-jira.md | sort | uniq > expected_sprint6_branches.txt
wc -l expected_sprint6_branches.txt
