---
id: page.endpoint.ai-governance.policy-details
type: page
title: AI Agent Policy Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-editor
---

# AI Agent Policy Details

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/policy-list|Policy List]] · [[pages/endpoint/ai-governance/policy-editor|Policy Editor]]

## Purpose
Show the complete saved configuration of one OS-specific AI-agent policy without allowing inline edits.

## Access / roles
- AI Agent Policy Read or higher for policy-summary access.
- AI Agent Policy Write or Full for the Modify action, which opens `page.endpoint.ai-governance.policy-editor`.
- AI Agent Policy Full is required for Delete, which is initiated from the policy list.
- Referenced endpoints and reusable objects must remain within the technician's existing Endpoint Central scope; shared CG/DCG administrative-group support is not part of the current release.

## Entry points
- `page.endpoint.ai-governance.policy-list` -> select a policy name.
- `page.endpoint.ai-governance.endpoint-details` -> select an applied policy name.
- `page.endpoint.ai-governance.deployment-details` -> select the associated policy name.

## Page structure
### Policy identity
- Displays: policy name, operating-system platform, Modified By, Last Modified, and Created Time.
- Controls: Modify for users with AI Agent Policy Write or Full.

### Agent Control
- Displays: saved Allow List, Block List, and Agent Enforcement Mode.

### Auto Uninstallation
- Displays: whether automatic removal of detected Block List agents is enabled.

### Advanced Execution Rules
- Displays: every saved rule with its allowlisted AI agent, accessible folders, Website Groups, and Application Groups.

### Prompt Monitoring & Classification
- Displays: Prompt Data Collection status, selected Data Groups, and DLP Mode.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | `{Policy Name}` |
| Page description | Review the configured controls, access rules, remediation, and prompt monitoring for this policy. |
| Back link | Back to Policies |
| Primary action | Modify |

### Summary sections and field labels
| Section | Displayed fields, in order |
|---|---|
| Policy Details | Policy Name; Operating System; Modified By; Last Modified; Created Time |
| Agent Control | Allow List; Block List; Agent Enforcement Mode |
| Auto Uninstallation | Auto-uninstall Block List Agents |
| Advanced Execution Rules | AI Agent; Accessible Folders; Website Groups; Application Groups |
| Prompt Monitoring & Classification | Enable Prompt Data Collection; Data Groups to Monitor; DLP Mode |

### State text
| Context | Final text |
|---|---|
| Empty Allow List | No AI agents are allowlisted. |
| Empty Block List | No AI agents are blocklisted. |
| No advanced rules | No advanced execution rules are configured. |
| Prompt collection off | Prompt Data Collection is not enabled for this policy. |
| Not found | The requested policy could not be found or is outside your scope. |
| Permission | You do not have permission to view this policy. |

## User actions
### Modify policy
- Available when: user has AI Agent Policy Write or Full.
- Triggers: no backend workflow; navigation opens the existing saved definition in the editor.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.policy-editor` for the selected policy.
- On failure: show unavailable or permission feedback.

## States
### Loading
- Show summary skeletons until the saved policy loads.

### Empty
- Show explicit empty configuration states for optional lists, rules, and prompt monitoring.

### Error
- Show retry without displaying stale or partial policy values as current.

### Permission / disabled
- Users without AI Agent Policy Read are denied the page.
- Hide Modify for Read-only users.

## Navigation
- Modify -> `page.endpoint.ai-governance.policy-editor`.
- Back/breadcrumb -> `page.endpoint.ai-governance.policy-list`.
