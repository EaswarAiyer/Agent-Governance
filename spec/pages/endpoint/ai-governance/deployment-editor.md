---
id: page.endpoint.ai-governance.deployment-editor
type: page
title: Deployment Task Editor
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
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-details
---

# Deployment Task Editor

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-deployment/feature|Policy Deployment]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-deploy|Policy Deployment]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]]

## Purpose
Provide a dedicated page for creating or modifying a deployment task that maps one AI-agent policy to one target endpoint group.

## Access / roles
- AI Agent Policy Deployment Write or Full is required to create or modify a task.
- Policy and target choices are limited to objects available within the technician's existing Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.deployment-list` -> Create deployment or Modify action.
- `page.endpoint.ai-governance.deployment-details` -> Modify action.

## Page structure
### Deployment task
- Controls: deployment task name.
- Displays: current task lifecycle for an existing task: Yet to start, In progress, or Completed.

### Associated policy
- Controls: searchable single-select AI-agent policy.
- Displays: selected policy platform and summary.

### Target endpoints
- Controls: searchable single-select target endpoint group.
- Displays: current resolved endpoint count for the selected group.

### Page actions
- Controls: Cancel and Save/Deploy according to the final execution decision `[TBD]`.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Create title | Create Deployment Task |
| Modify title | Modify Deployment Task |
| Page description | Associate one AI-agent policy with one target endpoint group. |
| Back link | Back to Policy Deployment |
| Primary action | Save Deployment |
| Secondary action | Cancel |

### Fields and helper text
| Field | Placeholder or helper text |
|---|---|
| Deployment Task Name | Enter a deployment task name |
| AI Agent Policy | Select one AI-agent policy. Only one policy can be associated with a deployment task. |
| Target Endpoint Group | Select one endpoint group. Current group membership determines the target endpoints. |
| Target Endpoints | `{Count}` endpoints currently targeted. |
| Task Status | Yet to start; In progress; Completed |

### State and validation text
| Context | Final text |
|---|---|
| No policies | No AI-agent policies are available in your scope. |
| No endpoint groups | No endpoint groups are available in your scope. |
| Policy required | Select an AI-agent policy. |
| Group required | Select a target endpoint group. |
| Platform mismatch | The selected policy is not compatible with one or more target endpoints. |
| Save success | Deployment task saved successfully. |
| Save error | Unable to save the deployment task. Review the highlighted fields and try again. |
| Permission | You do not have permission to create or modify deployment tasks. |

The label **Save Deployment** is final UI copy. Whether saving immediately starts endpoint execution or creates a Yet-to-start task remains a behavioral decision under Open questions.

## User actions
### Save deployment task
- Available when: user has AI Agent Policy Deployment Write or Full and the task is valid.
- Triggers: `workflow.endpoint.ai-governance.policy-deploy` according to the final Save-versus-Deploy behavior `[TBD]`.
- UX feedback: validate required values, single-policy mapping, target availability, and platform compatibility.
- On success: open `page.endpoint.ai-governance.deployment-details` for the saved task.
- On failure: preserve entered values and show field-level errors.

### Cancel
- Available when: page is open.
- Triggers: no backend workflow.
- UX feedback: warn about unsaved changes when applicable.
- On success: return to the originating list or task-details page.
- On failure: remain on the editor.

## States
### Loading
- Disable editing until policies, groups, and any existing task load.

### Empty
- Show explicit empty states when no policy or target group is available within scope.

### Error
- Preserve recoverable edits and localize failures to policy, group, or task data.

### Permission / disabled
- Deny the page below AI Agent Policy Deployment Write.
- Do not expose out-of-scope policies, groups, or endpoint membership.

## Validation and feedback
- Exactly one policy and one target endpoint group are required.
- Policy and endpoint platforms must be compatible before deployment begins.
- Task-name requirements remain `[TBD]`.
- Target endpoint count uses current group membership rather than an immutable creation-time snapshot.

## Navigation
- Save success -> `page.endpoint.ai-governance.deployment-details`.
- Cancel/back -> `page.endpoint.ai-governance.deployment-list` or the originating details page.

## Open questions
- Does Save immediately make the policy available to endpoints, or save a Yet-to-start task that requires a separate Deploy action?
- What are the deployment task-name requirements?
