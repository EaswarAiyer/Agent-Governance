---
id: page.endpoint.ai-governance.policy-editor
type: page
title: AI Agent Policy Editor
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.prompt-collect-classify
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-details
---

# AI Agent Policy Editor

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-save|Policy Save]] · [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/policy-list|Policy List]] · [[pages/endpoint/ai-governance/policy-details|Policy Details]]

## Purpose
Create a new OS-specific AI-agent policy or modify the saved configuration of an existing policy.

## Access / roles
- AI Agent Policy Write or Full is required to create or modify a policy.
- AI Agent Policy Read alone may open Policy Details but cannot open this editor.
- Referenced endpoints and reusable objects must remain within the technician's existing Endpoint Central scope; shared CG/DCG administrative-group support is not part of the current release.

## Entry points
- `page.endpoint.ai-governance.policy-list` -> Create Policy or Modify action.
- `page.endpoint.ai-governance.policy-details` -> Modify.

## Page structure
### Policy Details
- Controls: policy name and fixed operating-system platform.

### Agent Control
- Controls: searchable multi-select Allow List and Block List; Strict/Audit agent mode.
- Strict: only Allow List agents run. Audit: Block List agents are blocked and all others run.

### Auto Uninstallation
- Controls: automatically remove detected Block List agents.

### Advanced Execution Rules
- Controls: add multiple rules; select one allowlisted agent; add folder paths; select Website Groups for domains and Application Groups for allowed child processes.

### Prompt Monitoring & Classification
- Controls: enable collection; searchable Data Groups; independent Strict/Audit DLP mode.
- Collection includes available prompts, responses, attachments, reasoning summaries, and tool calls after deployment.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Create title | Create AI Agent Policy |
| Modify title | Modify AI Agent Policy |
| Page description | Configure AI-agent execution controls, resource access, remediation, and prompt monitoring. |
| Back link | Back to Policies |
| Primary action | Save Policy |
| Secondary action | Cancel |

### Section and field labels
| Section | Field labels, in display order |
|---|---|
| Policy Details | Policy Name; Operating System |
| Agent Control | Allow List; Block List; Agent Enforcement Mode |
| Auto Uninstallation | Auto-uninstall Block List Agents |
| Advanced Execution Rules | AI Agent; Accessible Folders; Website Groups; Application Groups |
| Prompt Monitoring & Classification | Enable Prompt Data Collection; Data Groups to Monitor; DLP Mode |

### Control options and actions
| Control | Final text |
|---|---|
| Agent Enforcement Mode options | Strict; Audit |
| DLP Mode options | Strict; Audit |
| Advanced-rule action | Add Rule |
| Advanced-rule removal | Remove Rule |
| Allow List placeholder | Search AI agents |
| Block List placeholder | Search AI agents |
| Data Groups placeholder | Search data groups |
| Website Groups placeholder | Search website groups |
| Application Groups placeholder | Search application groups |

### Helper text
| Field | Final text |
|---|---|
| Allow List | AI agents approved to run on targeted endpoints. |
| Block List | AI agents that must not run on targeted endpoints. |
| Agent Strict | Only agents in the Allow List can run. If the Allow List is empty, all AI agents are blocked. |
| Agent Audit | Agents in the Block List are blocked. All other AI agents can run. |
| Auto-uninstall Block List Agents | Automatically remove detected AI agents included in the Block List. |
| Advanced Execution Rules | Define folder, website-group, and child-process access for an allowlisted AI agent. |
| Enable Prompt Data Collection | Collect supported prompts, responses, attachments, reasoning summaries, and tool calls after this policy is deployed. |
| DLP Strict | Collect and classify prompt activity, and block transfers matching the selected Data Groups. |
| DLP Audit | Collect and classify prompt activity without blocking transfers. |

### Validation and state text
| Context | Final text |
|---|---|
| Strict empty-Allow-List warning | Strict mode with an empty Allow List will block all AI agents on targeted endpoints. |
| Unsupported folder pattern | This folder pattern is not supported for `{Operating System}`. |
| Agent in both lists | An AI agent cannot be included in both the Allow List and Block List. |
| Rule agent unavailable | Select an agent from the Allow List. |
| Save success | Policy saved successfully. |
| Save error | Unable to save the policy. Review the highlighted fields and try again. |
| Permission | You do not have permission to modify this policy. |

## User actions
### Save policy
- Available when: user has AI Agent Policy Write or Full and inputs are valid.
- Triggers: `workflow.endpoint.ai-governance.policy-save`.
- UX feedback: show submitting and field-level validation.
- On success: open `page.endpoint.ai-governance.policy-details` with saved confirmation.
- On failure: preserve all edits and identify invalid sections.
- Logging: record successful create or modify actions in the Endpoint Central Action Log and ME tracking; do not include sensitive policy values in telemetry.

### Add or remove an advanced rule
- Available when: an agent exists in the Allow List.
- Triggers: no server workflow until Save.
- UX feedback: update the draft immediately.
- On success: rule remains in the draft.
- On failure: explain invalid agent/group/folder input.

## States
### Loading
- Prevent editing until policy and group references load.

### Empty
- No configurable field is mandatory. A new policy may retain empty lists and unset optional settings; the default agent-enforcement and DLP modes remain `[TBD]`.

### Error
- Preserve recoverable draft state and show retry.

### Permission / disabled
- Users below AI Agent Policy Write are denied the editor.
- Classifier and DLP controls are disabled when prompt collection is off.

## Validation and feedback
- An agent cannot be in both Allow List and Block List.
- Advanced rules can reference only current Allow List agents.
- Selecting Strict agent mode with an empty Allow List is permitted, but the UI must warn that all AI agents will be blocked.
- Folder wildcard syntax is platform-specific. Accept only the supported wildcard set for the policy OS and reject unsupported patterns with field-level feedback.
- Accessible domains accept Website Groups only.
- Allowed child processes accept Application Groups only.
- Data classification accepts Data Groups only.

## Navigation
- Save success -> `page.endpoint.ai-governance.policy-details`.
- Cancel/back -> `page.endpoint.ai-governance.policy-list` or the originating policy summary.

## Open questions
- What are the default agent-enforcement and DLP modes for a new policy?
- Which folder wildcard patterns are supported on Windows, macOS, and Linux?
