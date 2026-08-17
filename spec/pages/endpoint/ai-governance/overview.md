---
id: page.endpoint.ai-governance.overview
type: page
title: AI Governance Overview
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.discovery
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.endpoints
---

# AI Governance Overview

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/discovery/feature|Discovery]] · [[features/endpoint/ai-governance/endpoint-coverage/feature|Endpoint Coverage]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/inventory-refresh|Inventory Refresh]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/endpoints|Endpoints]]

## Purpose
Provide the primary AI Governance landing page, combining coverage KPIs with the discovered AI-agent inventory.

## Access / roles
- AI Discovery Read or higher is required to open the Overview and discovered-agent inventory.
- AI Agent Policy Read or higher is required to show the actual Protected Endpoints count and governance values derived from policy state.
- KPI and row visibility include only endpoints in the technician's existing Endpoint Central scope.

## Entry points
- AI Governance primary tab
- Existing-customer upgrade -> AI Governance tab with a New indicator and an informational introduction box.

## Page structure
### KPI strip
- Displays: AI Agents Discovered, Endpoints with AI Agents, Managed Endpoints, Protected Endpoints.
- Controls: each count is a navigation link; endpoint KPIs apply the corresponding endpoint filter.
- Without AI Agent Policy Read, Protected Endpoints displays `0` and its filter returns no rows; the underlying applied-policy count is not returned to the client.

### Discovered AI Agents
- Displays: agent, publisher, detection source, endpoint count, governance status, first detected, last seen.
- Controls: agent/publisher search and governance-status filter.
- Governance status is informational and cannot be edited from the Overview.

### Product topology behavior
- Endpoint Central Cloud and on-premises Security Edition show the complete Overview.
- MSP shows customer-specific AI Agents Discovered and Endpoints with AI Agents counts on the home page; the other KPI cards are not required there.
- Summary Server provides probe-level handling only; complete consolidated visibility is not required.

## UI content contract
### Page-level copy
| Element                       | Final text                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Page title                    | AI Governance Overview                                                                                            |
| Page description              | Discover AI agents and understand their coverage across managed endpoints.                                        |
| Inventory section title       | Discovered AI Agents                                                                                              |
| Inventory section description | AI agents detected across managed endpoints. Select an agent to view its installed computers and prompt activity. |
| Search placeholder            | Search AI agents or publishers                                                                                    |

### KPI labels
| KPI                      | Supporting text                                              |
| ------------------------ | ------------------------------------------------------------ |
| AI Agents Discovered     | View the discovered-agent inventory below.                   |
| Endpoints with AI Agents | Endpoints where at least one AI agent is installed.          |
| Managed Endpoints        | Windows, Mac, and Linux endpoints in the technician's scope. |
| Protected Endpoints      | Endpoints where at least one AI-agent policy is applied.     |

### Discovered AI Agents table
The table columns must appear in this order.

|   # | Column header | Content                                                  |
| --: | ------------- | -------------------------------------------------------- |
|   1 | AI Agent      | Agent name; clickable to open Agent Details.             |
|   2 | Publisher     | Normalized publisher or provider name.                   |
|   4 | Endpoints     | Number of scoped endpoints where the agent is installed. |

### State text
| State                    | Final text                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Empty inventory          | No AI agents have been discovered in your managed endpoints.                                              |
| No search/filter results | No AI agents match the current search or filter.                                                          |
| Inventory error          | Unable to load discovered AI agents. Try again.                                                           |
| Introduction title       | Govern AI agents across your organization                                                                 |
| Introduction message     | Discover AI agents, apply control policies, deploy protection, and review prompt activity from one place. |

## User actions
### Open an agent
- Available when: a row is visible.
- Triggers: no backend workflow; navigation reads `workflow.endpoint.ai-governance.inventory-refresh` output.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.agent-details`.
- On failure: show a non-destructive navigation or load error.

### Open endpoint coverage
- Available when: a KPI count is visible.
- Triggers: no backend workflow; navigation applies a read-only endpoint filter.
- UX feedback: apply All, With AI agents, or Protected filter.
- On success: open `page.endpoint.ai-governance.endpoints`.
- On failure: default to All only if the requested filter is invalid.

## States
### Loading
- Show KPI and table skeletons without presenting zero as final data.

### Empty
- Show zero counts and explain that no AI agents have been discovered in the accessible scope.

### Error
- Preserve navigation and show which aggregate or inventory failed to load.

### Permission / disabled
- Exclude endpoints outside the technician's scope from counts and rows rather than calculating and then redacting them.
- Deny the page without AI Discovery Read.
- Calculate policy-derived KPI values and filters from permission-projected counts returned by `workflow.endpoint.ai-governance.authorize-access`.

### Existing-customer introduction
- On upgrade, show a New indicator on the AI Governance tab and an information box introducing the feature.
- Discovery starts automatically. Policy deployment, prompt collection, DLP blocking, and auto-uninstallation remain inactive until configured and deployed.

## Validation and feedback
- Search is case-insensitive and updates visible count.
- KPI predicates must match endpoint-page filters exactly.
- Project unauthorized policy counts to zero before KPI aggregation; zero must not be used while authorized data is merely loading or unavailable.
- Governance-status controls filter the inventory only; they do not mutate agent or policy state.

## Navigation
- Agent row -> `page.endpoint.ai-governance.agent-details`.
- Endpoint KPI -> `page.endpoint.ai-governance.endpoints`.
