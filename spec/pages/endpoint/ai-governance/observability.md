---
id: page.endpoint.ai-governance.observability
type: page
title: Prompt Observability
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.prompt-collect-classify
  - workflow.endpoint.ai-governance.prompt-review
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.prompt-details
  - page.endpoint.ai-governance.overview
---

# Prompt Observability

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]] · [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/prompt-details|Prompt Details]] · [[pages/endpoint/ai-governance/overview|Overview]]

## Purpose
Provide a global prompt log across all monitored AI agents and support sensitive-data investigation.

## Access / roles
- AI DLP Observability Read or higher for global and agent-specific prompt logs and prompt details, including authorized captured content.
- AI DLP Observability Write includes Read; no additional observability mutation is part of the current release.
- AI DLP Observability Full for export.
- Every insight and record is derived only from endpoints in the technician's existing Endpoint Central scope.

## Entry points
- Main AI Governance navigation -> Observability.

## Page structure
### Global prompt log
- Displays: AI Agent, Prompt, Attached Files, Data Classification, Computer, and Time.
- Controls: clickable prompt rows.

### Classification event view
- The prototype also contains file/classification event filters, comments, status actions, export, and a detail panel.
- Whether this remains, moves, or is removed is deliberately deferred for a later decision.

## UI content contract
### Page-level copy
| Element | Final text |
|---|---|
| Page title | Prompt Observability |
| Page description | Review prompt activity and sensitive-data classifications across monitored AI agents. |
| Search placeholder | Search prompts, AI agents, computers, or files |
| Classification filter default | All Classifications |
| Export action | Export |

### Global prompt log table
The table columns must appear in this order.

| # | Column header | Content |
|---:|---|---|
| 1 | AI Agent | Agent used for the interaction. |
| 2 | Prompt | Truncated prompt preview; clickable to open Prompt Details. |
| 3 | Attached Files | File count and names when available. |
| 4 | Data Classification | General Data Group classification. |
| 5 | Computer | Endpoint where the interaction occurred. |
| 6 | Time | Interaction date and time. |

### State text
| State | Final text |
|---|---|
| No collected activity | No prompt activity has been collected. Deploy a policy with Prompt Data Collection enabled to begin monitoring. |
| No filter results | No prompt activity matches the current search or filter. |
| Retrieval error | Unable to load prompt activity. Try again. |
| Permission | You do not have permission to view prompt activity. |
| Export failure | Unable to export prompt activity. Try again. |

The deferred Classification event view is outside this finalized content contract until its product behavior is decided.

## User actions
### Open prompt details
- Available when: user has AI DLP Observability Read or higher.
- Triggers: `workflow.endpoint.ai-governance.prompt-review`.
- UX feedback: navigate to the selected record.
- On success: open `page.endpoint.ai-governance.prompt-details`.
- On failure: show unavailable or permission feedback.

### Filter prompt/classification activity
- Available when: log data is loaded.
- Triggers: no backend workflow; filtering changes only the read-only result view.
- UX feedback: active filter and record count update.
- On success: show matching records.
- On failure: preserve the prior result set.

### Export
- Available when: user has AI DLP Observability Full.
- Triggers: export workflow `[TBD]`.
- UX feedback: disclose scope and sensitive-content handling before export.
- On success: provide the generated artifact and audit the action.
- On failure: show export failure without broadening access.

## States
### Loading
- Show metadata skeletons; do not flash sensitive content.

### Empty
- Explain whether no activity was collected, no policy enables collection, or filters match nothing.

### Error
- Distinguish retrieval failure from permission-based redaction.

### Permission / disabled
- Deny the page and APIs without AI DLP Observability Read.
- Hide export for Read and Write users; Full is required.
- Exclude records from endpoints outside the technician's scope before calculating insights or returning rows.

## Validation and feedback
- Agent name is mandatory in the global log.
- Interaction links use globally unambiguous IDs.

## Navigation
- Prompt row -> `page.endpoint.ai-governance.prompt-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Logging, telemetry, and notifications
- Record views and exports of sensitive prompt content in the Endpoint Central Action Log.
- Record aggregate feature usage and failures through ME tracking without prompt, response, attachment, or sensitive finding content.
- Do not generate notifications or alerts in the current release.

## Open questions
- The classification-event experience is deferred for later review.
- Which fields are included in export and how are they redacted?
