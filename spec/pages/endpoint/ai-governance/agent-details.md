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
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.prompt-review
navigates_to:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.prompt-details
---

# AI Agent Details

## Purpose
Show where one AI agent is installed and the prompt activity attributed to that agent.

## Access / roles
- Overview/Discovery View for agent and installation data.
- Observability Metadata View for the Prompt Log tab.
- Sensitive prompt content requires separate permission on details.
- Installation and prompt records include only endpoints in the technician's Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.overview` -> select a discovered-agent row.
- `page.endpoint.ai-governance.endpoint-details` -> select an installed agent.

## Page structure
### Header
- Displays: agent name and publisher.
- Controls: breadcrumb and Back to Overview.

### Installed computers tab
- Displays: computer name, OS, logged-in user, install location, and agent version.

### Prompt log tab
- Displays: prompt preview, attached files, general Data Group classification, computer, and time.
- Controls: clickable prompt rows.

## User actions
### Switch tabs
- Available when: the user has access to the selected tab.
- Triggers: no backend workflow; the tab switch changes only the current read-only view.
- UX feedback: selected tab is highlighted.
- On success: selected content is shown.
- On failure: keep the prior tab and show an access/load error.

### Open prompt details
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
- Hide or disable Prompt Log when metadata permission is absent.

## Validation and feedback
- Agent identity must resolve from a stable ID; unknown IDs show not-found instead of silently choosing another agent.

## Navigation
- Prompt row -> `page.endpoint.ai-governance.prompt-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Should computer rows navigate to endpoint details?
