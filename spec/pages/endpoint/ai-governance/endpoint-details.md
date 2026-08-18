---
id: page.endpoint.ai-governance.endpoint-details
type: page
title: AI Governance Endpoint Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.endpoint-details
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.effective-policy-resolve
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.policy-details
---

# AI Governance Endpoint Details

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/endpoint-details/feature|Endpoint Details]] · [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/policy-deployment/feature|Policy Deployment]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/scan-flow|AI Agent Scan Flow]] · [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/endpoints|Endpoints]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/policy-details|Policy Details]]

## Purpose
Explain an endpoint's installed AI agents, applied policies, and final merged controls.

## Access / roles
- AI Discovery Read or higher grants the normal endpoint-details view and installed-agent data.
- AI Agent Policy Read or higher grants applied-policy rows, actual policy count, policy drill-downs, and merged effective controls.
- AI Agent Policy Deployment Read or higher may open a targeted endpoint from deployment details even without AI Discovery Read; in that limited view, deployment-relevant endpoint identity/status remains visible and agent-derived fields are permission-projected.
- The endpoint must be within the technician's existing Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.endpoints` -> select an endpoint.
- `page.endpoint.ai-governance.deployment-details` -> select a targeted endpoint.

## Page structure
### Summary
- Displays: AI-agent count, policy count, operating system, and endpoint status.
- AI-agent count is `0` without AI Discovery Read. Policy count is `0` without AI Agent Policy Read.

### Installed AI Agents
- Displays: agent and effective control (Allowed, Blocked, or Unmanaged).
- Requires AI Discovery Read; without it the section is empty/hidden and no underlying rows are returned.

### Applied AI Agent Policies
- Displays: policy
- Requires AI Agent Policy Read; without it the section is empty/hidden and no underlying rows are returned.

### Merged Effective Policy
- Displays: the final effective result for every supported control field and explains additive allow precedence.
- Controls: read-only.
- Requires AI Agent Policy Read; without it the merged result is not returned.
- The merged section does not add field-level contributing-policy provenance or deployment history; applied policies remain listed in their separate section.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | `{Endpoint Name}` |
| Page description | AI-agent inventory and effective policy controls for this endpoint. |
| Back link | Back to Endpoints |
| Installed-agents section | Installed AI Agents |
| Applied-policies section | Applied AI Agent Policies |
| Merged-policy section | Merged Effective Policy |
| Merged-policy description | Final controls reported by the endpoint after combining all successfully applied AI-agent policies. Allow-listed settings take precedence; Strict takes precedence when resolving a mode. |

### Summary labels
| Label | Content |
|---|---|
| AI Agents Installed | Permission-projected installed-agent count. |
| Policies Applied | Permission-projected applied-policy count. |
| Operating System | Endpoint operating system and version. |
| Endpoint Status | Current endpoint management status. |

### Installed AI Agents table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | AI Agent | Agent name; clickable to open Agent Details. |
| 2 | Effective Control | Allowed, Blocked, or Unmanaged. |

### Applied AI Agent Policies table
| # | Column header | Content |
|---:|---|---|
| 1 | Policy Name | Applied policy name; clickable according to AI Agent Policy permission. |

### Merged Effective Policy fields
Use a read-only label-and-value layout rather than a data table. Show each supported final field, including Agent Enforcement Mode, Allow List, Block List, Auto Uninstallation, Advanced Execution Rules, Prompt Data Collection, Data Groups, and DLP Mode.

### State text
| State | Final text |
|---|---|
| No installed agents | No AI agents are installed on this endpoint. |
| No applied policies | No AI-agent policies are applied to this endpoint. |
| No merged policy | This endpoint is not currently protected by an AI-agent policy. |
| Partial error | Some endpoint details could not be loaded. Try again. |
| Not found | The requested endpoint could not be found or is outside your scope. |

## User actions
### Open installed agent
- Available when: agent row is visible.
- Triggers: no backend workflow; navigation reads existing agent data.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.agent-details`.
- On failure: show agent unavailable.

### Open applied policy
- Available when: user has AI Agent Policy Read or higher.
- Triggers: no backend workflow; navigation reads the existing policy.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.policy-details` as a read-only summary.
- On failure: show permission or not-found feedback.

## States
### Loading
- Load summary and sections without temporarily labeling the endpoint Unmanaged.

### Empty
- Show explicit empty states for no agents and no policies; merged policy is Unmanaged.

### Error
- Show source section and freshness when partial data is available.

### Permission / disabled
- Agent counts/rows require AI Discovery Read; policy counts/rows/merged controls require AI Agent Policy Read.
- Missing permissions produce server-projected zero counts and empty collections, not masked real values.
- Direct URLs enforce the same permissions as navigation.

## Validation and feedback
- Effective statuses must derive from the same result as the merged-policy section.
- Every supported control field must show its final resolved value, including explicit empty, disabled, or unmanaged results.
- Unknown endpoint IDs display not-found.

## Navigation
- Agent -> `page.endpoint.ai-governance.agent-details`.
- Policy -> `page.endpoint.ai-governance.policy-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.endpoints`.
