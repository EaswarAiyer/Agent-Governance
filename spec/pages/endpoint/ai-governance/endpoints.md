---
id: page.endpoint.ai-governance.endpoints
type: page
title: AI Governance Endpoints
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.endpoint-details
  - page.endpoint.ai-governance.overview
---

# AI Governance Endpoints

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/endpoint-coverage/feature|Endpoint Coverage]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/scan-flow|AI Agent Scan Flow]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]] · [[pages/endpoint/ai-governance/overview|Overview]]

## Purpose
List managed Windows, macOS, and Linux endpoints and expose AI-agent and policy coverage.

## Access / roles
- AI Discovery Read or higher is required to open the AI Governance Endpoints list from main navigation.
- AI Agent Policy Read or higher is required to see actual applied-policy counts and the Protected filter result.
- The table and all counts include only endpoints in the technician's existing Endpoint Central scope.

## Entry points
- Main navigation -> Endpoints.
- `page.endpoint.ai-governance.overview` -> endpoint KPI with All, With AI agents, or Protected filter.

## Page structure
### Filters and search
- Displays: active filter description and visible endpoint count.
- Controls: All endpoints, With AI agents, Protected, and search by endpoint/user/IP/OS.

### Endpoint table
- Displays: endpoint name, OS, logged-in user, IP, number of AI agents, number of applied policies, last contact time
- Controls: clickable endpoint rows.
- Number of AI agents displays the actual value with AI Discovery Read; otherwise it is `0` in any limited endpoint projection reached from another authorized module.
- Number of applied policies displays the actual value with AI Agent Policy Read; otherwise it is `0`.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | Endpoints |
| Page description | View managed Windows, Mac, and Linux endpoints with AI-agent and policy coverage. |
| Search placeholder | Search endpoint, user, IP address, or operating system |
| All filter | All Endpoints |
| AI-agent filter | With AI Agents |
| Policy filter | Protected |

### Endpoints table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | Endpoint Name | Endpoint display name; clickable to open Endpoint Details. |
| 2 | Operating System | Endpoint operating system and version when available. |
| 3 | Logged-in User | Most recently reported logged-in user. |
| 4 | IP Address | Most recently reported endpoint IP address. |
| 5 | AI Agents Installed | Permission-projected count of installed AI agents. |
| 6 | Policies Applied | Permission-projected count of applied AI-agent policies. |
| 7 | Last Contact Time | Most recent successful endpoint contact date and time. |

### Filter summary text
| Filter | Final text |
|---|---|
| All Endpoints | Showing all managed endpoints. |
| With AI Agents | Showing endpoints with one or more installed AI agents. |
| Protected | Showing endpoints with one or more applied AI-agent policies. |

### State text
| State | Final text |
|---|---|
| Empty scope | No managed endpoints are available in your scope. |
| No filter results | No endpoints match the current search or filter. |
| Error | Unable to load endpoints. Try again. |
| Permission | You do not have permission to view AI Governance endpoints. |

## User actions
### Filter endpoints
- Available when: page is loaded.
- Triggers: no backend workflow; filters `workflow.endpoint.ai-governance.inventory-refresh` output in a read-only view.
- UX feedback: active filter and result count update.
- On success: matching rows remain.
- On failure: invalid filter defaults to All.

### Open endpoint
- Available when: a row is visible.
- Triggers: no backend workflow; navigation reads existing endpoint data.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.endpoint-details`.
- On failure: show endpoint unavailable.

## States
### Loading
- Show table skeleton and retain requested filter.

### Empty
- Explain that no endpoints match the current search/filter.

### Error
- Show retry and preserve filter/search state.

### Permission / disabled
- Return only endpoints in the technician's authorized Endpoint Central scope.
- Project unauthorized AI-agent and policy counts on the server before returning table rows, totals, sorting keys, or filter results.
- Do not reveal hidden counts through exports, pagination totals, sorting, search metadata, or direct API calls.

## Validation and feedback
- With AI agents means installed-agent count greater than zero.
- Protected means applied-policy count greater than zero.
- Both predicates use the permission-projected count. Therefore a missing corresponding Read permission produces zero matching rows rather than evaluating the hidden count.

## Navigation
- Endpoint row -> `page.endpoint.ai-governance.endpoint-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Are additional platform, status, group, or freshness filters required?
