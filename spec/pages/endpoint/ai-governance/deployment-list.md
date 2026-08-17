---
id: page.endpoint.ai-governance.deployment-list
type: page
title: Policy Deployment
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.policy-deploy
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.overview
---

# Policy Deployment

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-deployment/feature|Policy Deployment]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-deploy|Policy Deployment]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/deployment-editor|Deployment Editor]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]] · [[pages/endpoint/ai-governance/overview|Overview]]

## Purpose
List and manage tasks that associate one AI-agent policy with a target endpoint group.

## Access / roles
- AI Agent Policy Deployment Read or higher for list and task-detail access.
- AI Agent Policy Deployment Write or Full for create, modify, execute, and retry.
- AI Agent Policy Deployment Full for delete. Cancel is not part of the current task lifecycle.
- Target choices and task results are constrained to endpoints in the technician's existing Endpoint Central scope.

## Entry points
- Main AI Governance navigation -> Deployment.

## Page structure
### Toolbar
- Displays: total deployment-task count.
- Controls: Create deployment.

### Deployment table
- Displays: Deployment Task Name, Policy Name, Target Endpoints, Last Modified Time, Last Modified By, Action, Created Time.
- Controls: clickable task row; Modify and Delete actions.

### Dedicated create/modify page
- Create and Modify navigate to `page.endpoint.ai-governance.deployment-editor`.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | Policy Deployment |
| Page description | Deploy one AI-agent policy to a target endpoint group and track endpoint-level results. |
| Primary action | Create Deployment |
| Count label | `{Count}` deployment tasks |

### Deployment table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | Deployment Task Name | Task name; clickable to open Deployment Task Details. |
| 2 | Policy Name | Name of the single associated AI-agent policy. |
| 3 | Target Endpoints | Current number of endpoints in the selected target group. |
| 4 | Last Modified Time | Most recent task modification date and time. |
| 5 | Last Modified By | User who last modified the task. |
| 6 | Action | Row menu containing Modify and Delete according to permission. |
| 7 | Created Time | Task creation date and time. |

### Dialog and state text
| Context | Final text |
|---|---|
| Modify action | Modify |
| Delete action | Delete |
| Delete confirmation | Delete this deployment task? This does not roll back policy settings already applied to endpoints. |
| Empty list | No deployment tasks have been created. |
| List error | Unable to load deployment tasks. Try again. |
| Permission | You do not have permission to view policy deployments. |

## User actions
### Create or modify deployment
- Available when: user has AI Agent Policy Deployment Write or Full.
- Triggers: no backend workflow from the list; Save/Deploy from the editor triggers `workflow.endpoint.ai-governance.policy-deploy`.
- UX feedback: navigate to the dedicated editor.
- On success: open `page.endpoint.ai-governance.deployment-editor` in create or modify mode.
- On failure: remain on the list and show a navigation/load error.

### Open deployment task
- Available when: row is visible.
- Triggers: no backend workflow; navigation reads the existing deployment task.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.deployment-details`.
- On failure: show task unavailable.

### Delete deployment task
- Available when: user has AI Agent Policy Deployment Full.
- Triggers: deployment deletion behavior `[TBD]`.
- UX feedback: confirm and describe effect on active endpoint policy.
- On success: remove/archive the task as defined.
- On failure: retain row and explain why.

### Administrative logging
- Create, modify, and delete actions are recorded in the Endpoint Central Action Log.
- Aggregate deployment adoption and failure data is recorded through ME tracking.

## States
### Loading
- Show table skeleton; disable mutations.

### Empty
- Explain that no tasks exist and offer Create when allowed.

### Error
- Preserve current rows and show retry where possible.

### Permission / disabled
- Deny the page without AI Agent Policy Deployment Read.
- Read-only users cannot create, modify, execute, retry, or delete; Write users cannot delete.

## Validation and feedback
- Task name requirements are `[TBD]`.
- Exactly one policy and one target group are required.
- Platform compatibility is validated before execution.
- Shared CG/DCG administrative-group deployment for scoped technicians is not supported in the current release.

## Navigation
- Create/Modify -> `page.endpoint.ai-governance.deployment-editor`.
- Task row -> `page.endpoint.ai-governance.deployment-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.
