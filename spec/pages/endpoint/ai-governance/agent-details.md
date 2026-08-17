---
id: page.endpoint.ai-governance.agent-details
type: page
title: AI Agent Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.discovery
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.prompt-review
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.prompt-details
---

# AI Agent Details

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/discovery/feature|Discovery]] · [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Observability]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/inventory-refresh|Inventory Refresh]] · [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Purpose
Show where one AI agent is installed and the prompt activity attributed to that agent.

## Access / roles
- AI Discovery Read or higher for agent identity and installation data.
- AI DLP Observability Read or higher for the Prompt Log tab and prompt details.
- Installation and prompt records include only endpoints in the technician's Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.overview` -> select a discovered-agent row.
- `page.endpoint.ai-governance.endpoint-details` -> select an installed agent.

## Page structure
### Header
- Displays: agent name and publisher.
- Controls: breadcrumb and Back to Overview.

### Installed computers tab
- Displays: computer name, OS, Last logged-in user,  Last Contact Time

### Prompt log tab [TBD]
- Displays: prompt preview, attached files, general Data Group classification, computer, and time.
- Controls: clickable prompt rows.

## User actions
### Switch tabs
- Available when: the user has access to the selected tab.
- Triggers: no backend workflow; the tab switch changes only the current read-only view.
- UX feedback: selected tab is highlighted.
- On success: selected content is shown.
- On failure: keep the prior tab and show an access/load error.

### Open prompt details [TBD]
- Available when: the user can view prompt metadata.
- Triggers: `workflow.endpoint.ai-governance.prompt-review`.
- UX feedback: navigate to the selected interaction.
- On success: open `page.endpoint.ai-governance.prompt-details`.
- On failure: show unavailable or permission feedback.

## States
### Loading
- Show independent tab loading states.

### Empty
- Installed computers: “No installations detected.”
- Prompt log: “No prompt activity collected for this agent.”

### Error
- Keep agent identity visible and localize the failed tab.

### Permission / disabled
- Deny the agent-details page without AI Discovery Read.
- Hide the Prompt Log tab and return no prompt records without AI DLP Observability Read.

## Validation and feedback
- Agent identity must resolve from a stable ID; unknown IDs show not-found instead of silently choosing another agent.

## Navigation
- Prompt row -> `page.endpoint.ai-governance.prompt-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Should computer rows navigate to endpoint details?
	- Yes computer rows should navigate to endpoint details
