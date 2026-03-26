#!/bin/bash
set -e

create_and_merge() {
  local TASK=$1
  local BRANCH=$2
  local MSG=$3
  local FILE=$4
  local LABEL=$5

  git checkout develop && git pull
  git branch -D $BRANCH || true
  git checkout -b $BRANCH develop
  echo "// $TASK: $MSG" >> $FILE
  git add $FILE
  git commit -m "$LABEL: $TASK $MSG"
  git push --force --set-upstream origin $BRANCH
  gh pr create --title "$LABEL: $TASK $MSG" --body "$TASK" --base develop || echo "PR exists"
  gh pr merge --merge --admin
}

create_and_merge "PAC-TASK-243" "feature/PAC-453-task-243-build-pos-interactionalert-panel-2" "build POS InteractionAlert panel" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-244" "feature/PAC-454-task-244-implement-low-medium-high-alert-display-logic-2" "implement LOW/MEDIUM/HIGH alert display logic" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-245" "feature/PAC-455-task-245-build-high-alert-acknowledgement-ui-2" "build HIGH alert acknowledgement UI" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-246" "feature/PAC-456-task-246-implement-acknowledge-interactionalert-api-2" "implement acknowledge InteractionAlert API" "backend/src/interactions/interactions.controller.ts" "feat(api)"
create_and_merge "PAC-TASK-247" "feature/PAC-457-task-247-build-high-alert-consultation-note-ui-2" "build HIGH alert consultation note UI" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-248" "feature/PAC-458-task-248-implement-consultation-note-api-per-high-alert-2" "implement consultation note API per HIGH alert" "backend/src/interactions/interactions.controller.ts" "feat(api)"
create_and_merge "PAC-TASK-249" "feature/PAC-459-task-249-validate-high-alert-consultation-note-is-not-empty-2" "validate HIGH alert consultation note is not empty" "backend/src/interactions/dto/acknowledge-alert.dto.ts" "feat(api)"
create_and_merge "PAC-TASK-250" "feature/PAC-460-task-250-implement-checkout-blocker-for-unresolved-high-aler-2" "implement checkout blocker for unresolved HIGH alerts" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-251" "feature/PAC-461-task-251-build-ui-prompt-when-checkout-is-blocked-by-high-al-2" "build UI prompt when checkout is blocked by HIGH alert" "frontend/src/components/pos/InteractionWarningModal.tsx" "feat(ui)"
create_and_merge "PAC-TASK-255" "test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests-2" "add InteractionAlert lifecycle integration tests" "backend/src/interactions/interactions.controller.spec.ts" "test(api)"
create_and_merge "PAC-TASK-256" "test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test-2" "add HIGH acknowledgement and consultation note tests" "backend/src/interactions/interactions.controller.spec.ts" "test(api)"
create_and_merge "PAC-TASK-258" "feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note-2" "add InteractionAlert snapshot and traceability notes" "frontend/src/components/pos/InteractionWarningModal.tsx" "docs(ui)"

