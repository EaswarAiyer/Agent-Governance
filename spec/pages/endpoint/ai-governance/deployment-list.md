---
id: page.endpoint.ai-governance.deployment-list
type: page
title: Policy Deployment
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
workflows:
  - workflow.endpoint.ai-governance.policy-deploy
navigates_to:
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.overview
---

# Policy Deployment

## Purpose
List and manage tasks that associate one AI-agent policy with a target endpoint group.

## Access / roles
- Deployments View for list access.
- Deployments Manage for create and modify; delete/execute separation is `[TBD]`.

## Entry points
- Main AI Governance navigation -> Deployment.

## Page structure
### Toolbar
- Displays: total deployment-task count.
- Controls: Create deployment.

### Deployment table
- Displays: Deployment Task Name, Policy Name, Target Endpoints, Last Modified Time, Last Modified By, Action, Created Time.
- Controls: clickable task row; Modify and Delete actions.

### Create/modify dialog
- Controls: deployment task name, one AI-agent policy, and target endpoint group.

## User actions
### Create or modify deployment
- Available when: user has Deployments Manage.
- Triggers: `workflow.endpoint.ai-governance.policy-deploy` on the execution action; whether Save executes is `[TBD]`.
- UX feedback: validate required fields and single-policy constraint.
- On success: update the task row and timestamps.
- On failure: preserve dialog values and show errors.

### Open deployment task
- Available when: row is visible.
- Triggers: no mutation.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.deployment-details`.
- On failure: show task unavailable.

### Delete deployment task
- Available when: user has deletion permission.
- Triggers: deployment deletion/cancellation behavior `[TBD]`.
- UX feedback: confirm and describe effect on active endpoint policy.
- On success: remove/archive the task as defined.
- On failure: retain row and explain why.

## States
### Loading
- Show table skeleton; disable mutations.

### Empty
- Explain that no tasks exist and offer Create when allowed.

### Error
- Preserve current rows and show retry where possible.

### Permission / disabled
- View-only users cannot create, modify, or delete.

## Validation and feedback
- Task name requirements are `[TBD]`.
- Exactly one policy and one target group are required.
- Platform compatibility is validated before execution.

## Navigation
- Task row -> `page.endpoint.ai-governance.deployment-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Should create/modify be a dedicated page rather than a dialog?
- What is the task lifecycle: Draft, Scheduled, Running, Completed, Failed, Canceled?
