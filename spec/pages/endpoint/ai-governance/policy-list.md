---
id: page.endpoint.ai-governance.policy-list
type: page
title: AI Agent Policies
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.overview
---

# AI Agent Policies

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-save|Policy Save]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/policy-details|Policy Details]] · [[pages/endpoint/ai-governance/overview|Overview]]

## Purpose
List AI-agent policies and provide OS-specific creation and modification entry points.

## Access / roles
- AI Agent Policy Read or higher to list and inspect policies.
- AI Agent Policy Write or higher to create, duplicate, and modify policies.
- AI Agent Policy Full to delete policies.

## Entry points
- Main AI Governance navigation -> Policies.
- `page.endpoint.ai-governance.endpoint-details` -> select an applied policy.

## Page structure
### Policy toolbar
- Displays: All Policies.
- Controls: Create policy menu with Windows, Mac, and Linux.

### Policy table
- Displays: policy name, OS platform, mode, modified by, last modified, and action.
- Controls: policy link and per-row action menu.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | AI Agent Policies |
| Page description | Create and manage policies that control AI-agent execution, access, remediation, and prompt monitoring. |
| List label | All Policies |
| Primary action | Create Policy |
| Platform options | Windows; Mac; Linux |

### Policies table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | Policy Name | Policy name; clickable to open Policy Details. |
| 2 | OS Platform | Windows, Mac, or Linux. |
| 3 | Mode | Saved Agent Enforcement Mode. |
| 4 | Modified By | User who last modified the policy. |
| 5 | Last Modified | Most recent modification date and time. |
| 6 | Action | Row menu containing Modify and Delete according to permission. |

### Dialog and state text
| Context | Final text |
|---|---|
| Delete action | Delete Policy |
| Delete confirmation | Delete this policy? This action cannot be undone. |
| Mapped-policy deletion | This policy cannot be deleted because it is mapped to one or more deployment tasks. |
| Empty list | No AI-agent policies have been created. |
| List error | Unable to load AI-agent policies. Try again. |
| Permission | You do not have permission to view AI-agent policies. |

## User actions
### Create policy
- Available when: user has AI Agent Policy Write or Full.
- Triggers: begins `workflow.endpoint.ai-governance.policy-save` after editing.
- UX feedback: require platform selection.
- On success: open `page.endpoint.ai-governance.policy-details` as a new policy.
- On failure: remain on the list and explain the error.

### Modify policy
- Available when: user has AI Agent Policy Write or Full.
- Triggers: `workflow.endpoint.ai-governance.policy-save` when saved.
- UX feedback: open the selected policy.
- On success: return to the updated list after save.
- On failure: preserve unsaved edits on details.

### Delete policy
- Available when: user has AI Agent Policy Full and the policy is not mapped to a deployment task.
- Triggers: policy deletion workflow `[TBD]`.
- UX feedback: require confirmation. If the policy is mapped to a deployment task, block deletion and identify the dependency.
- On success: remove or archive the row.
- On failure: retain the row and explain the deployment-task dependency or other failure.

### Administrative logging
- Create, modify, and delete actions are recorded in the Endpoint Central Action Log.
- Aggregate adoption and failure data is recorded through ME tracking without policy-sensitive values.

## States
### Loading
- Show table skeleton and disable mutations.

### Empty
- Explain that no policies exist and offer platform-specific creation when allowed.

### Error
- Show retry without losing current list context.

### Permission / disabled
- Deny the page without AI Agent Policy Read.
- Hide create/duplicate/modify actions for Read-only users and delete for users below Full.

## Validation and feedback
- Counts and mode summaries must reflect the saved policy version.
- A policy referenced by one or more deployment tasks cannot be deleted; the user must first remove or change those mappings.

## Navigation
- Policy/create/modify -> `page.endpoint.ai-governance.policy-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.
