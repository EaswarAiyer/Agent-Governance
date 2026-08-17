---
id: page.endpoint.ai-governance.deployment-details
type: page
title: Deployment Task Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.policy-deploy
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.endpoint-details
---

# Deployment Task Details

## Purpose
Show the task summary, endpoint-level rollout results, and complete associated-policy configuration.

## Access / roles
- AI Agent Policy Deployment Read or higher is required for the task summary and endpoint rollout results.
- AI Agent Policy Read or higher is required for the granular Policy Details tab. The deployment task may still show its associated policy name as task metadata without granting policy-content access.
- Target endpoint rows include only endpoints in the technician's existing Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.deployment-list` -> select a task row.

## Page structure
### Summary
- Displays: associated policy, target endpoint count, last modified time, last modified by, task ID, and created time.

### Endpoints tab
- Displays: endpoint name, domain name, last contact time, deployment status, and deployment remarks.
- Controls: clickable endpoint rows.

### Policy Details tab
- Displays: Agent Control, Auto Uninstallation, Advanced Execution Rules, and Prompt Monitoring & Classification for the single associated policy.
- Controls: read-only.
- Requires AI Agent Policy Read; otherwise the tab is hidden/disabled and no policy definition is returned.

## User actions
### Switch tabs
- Available when: task is loaded.
- Triggers: no backend workflow; the page switches between already authorized task data.
- UX feedback: selected tab and content update.
- On success: preserve task context.
- On failure: keep the prior tab.

### Open targeted endpoint
- Available when: endpoint row is visible.
- Triggers: no backend workflow; navigation reads existing endpoint data.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.endpoint-details`.
- On failure: show endpoint unavailable.

## States
### Loading
- Load summary, endpoint results, and policy snapshot independently.

### Empty
- An empty target set is invalid for execution; historical empty tasks show an explanatory state.

### Error
- Partial endpoint results remain visible with failed-section feedback.

### Permission / disabled
- Deny the page without AI Agent Policy Deployment Read.
- Keep deployment-relevant endpoint identity and rollout results available with Deployment Read.
- Without AI Agent Policy Read, hide granular policy content and project policy-derived counts to `0` on any linked endpoint view.
- Without AI Discovery Read, linked endpoint details display deployment-relevant identity/status only; installed-agent count is `0` and agent rows are empty.

## Validation and feedback
- Status uses a defined taxonomy including Success, Pending, and Failed.
- Remarks must explain pending/failed results without exposing secrets.
- The policy tab must identify the deployed version/snapshot `[TBD]`.

## Navigation
- Endpoint row -> `page.endpoint.ai-governance.endpoint-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.deployment-list`.

## Open questions
- Which retry, cancel, or rollback actions belong on this page?
- Should target membership reflect the original execution snapshot or current group membership?
