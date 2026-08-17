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
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.endpoint-details
---

# Deployment Task Details

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-deployment/feature|Policy Deployment]] · [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-deploy|Policy Deployment]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-editor|Deployment Editor]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

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
- Displays: associated policy, current target endpoint count, task lifecycle (Yet to start, In progress, or Completed), last modified time, last modified by, task ID, and created time.

### Endpoints tab
- Displays: endpoints in the target group's current membership, with endpoint name, domain name, last contact time, deployment status, and deployment remarks.
- Controls: clickable endpoint rows.

### Policy Details tab
- Displays: Agent Control, Auto Uninstallation, Advanced Execution Rules, and Prompt Monitoring & Classification for the single associated policy.
- Controls: read-only.
- Requires AI Agent Policy Read; otherwise the tab is hidden/disabled and no policy definition is returned.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | `{Deployment Task Name}` |
| Page description | View current target endpoints, deployment results, and the associated policy. |
| Back link | Back to Policy Deployment |
| Primary action | Modify |
| Endpoints tab | Endpoints |
| Policy tab | Policy Details |

### Summary labels
Display these labels in order: Policy Name; Target Endpoints; Task Status; Last Modified Time; Last Modified By; Task ID; Created Time.

Task Status values are **Yet to start**, **In progress**, and **Completed**.

### Endpoints table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | Endpoint Name | Endpoint display name; clickable to open Endpoint Details. |
| 2 | Domain Name | Endpoint domain or workgroup name. |
| 3 | Last Contact Time | Most recent successful endpoint contact date and time. |
| 4 | Deployment Status | Success, Pending, or Failed. |
| 5 | Deployment Remarks | Concise endpoint-level outcome or failure reason. |

### Policy Details tab sections
Show these read-only sections in order: Policy Details; Agent Control; Auto Uninstallation; Advanced Execution Rules; Prompt Monitoring & Classification.

### State text
| State | Final text |
|---|---|
| No target endpoints | This deployment task currently has no target endpoints. |
| Endpoint results error | Some deployment results could not be loaded. Try again. |
| Policy permission | You do not have permission to view the associated policy details. |
| Not found | The requested deployment task could not be found or is outside your scope. |

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

### Modify deployment task
- Available when: user has AI Agent Policy Deployment Write or Full.
- Triggers: no backend workflow until the editor is saved.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.deployment-editor` for the current task.
- On failure: preserve task details and show an error.

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
- Task lifecycle uses only Yet to start, In progress, and Completed.
- Remarks must explain pending/failed results without exposing secrets.
- The policy tab must identify the deployed version/snapshot `[TBD]`.
- Cancel and rollback actions are not provided in the current release.

## Navigation
- Modify -> `page.endpoint.ai-governance.deployment-editor`.
- Endpoint row -> `page.endpoint.ai-governance.endpoint-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.deployment-list`.

## Open questions
- What endpoint-level retry actions, eligibility rules, and limits belong on this page?
