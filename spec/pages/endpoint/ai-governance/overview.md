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
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
navigates_to:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.endpoints
---

# AI Governance Overview

## Purpose
Provide the primary AI Governance landing page, combining coverage KPIs with the discovered AI-agent inventory.

## Access / roles
- Overview/Discovery View permission.
- KPI and row visibility must honor the user's accessible endpoint scope.

## Entry points
- Software Asset Management navigation -> AI Governance Overview.
- Product root (`index.html`) -> Overview.
- Legacy Discovery link -> the Discovered AI Agents section.

## Page structure
### KPI strip
- Displays: AI Agents Discovered, Endpoints with AI Agents, Managed Endpoints, Protected Endpoints.
- Controls: each count is a navigation link; endpoint KPIs apply the corresponding endpoint filter.

### Discovered AI Agents
- Displays: agent, publisher, detection source, endpoint count, governance status, first detected, last seen.
- Controls: agent/publisher search and governance-status filter.

## User actions
### Open an agent
- Available when: a row is visible.
- Triggers: no mutation; represents `workflow.endpoint.ai-governance.inventory-refresh` output.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.agent-details`.
- On failure: show a non-destructive navigation or load error.

### Open endpoint coverage
- Available when: a KPI count is visible.
- Triggers: no mutation.
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
- Hide or redact counts outside the user's endpoint scope.

## Validation and feedback
- Search is case-insensitive and updates visible count.
- KPI predicates must match endpoint-page filters exactly.

## Navigation
- Agent row -> `page.endpoint.ai-governance.agent-details`.
- Endpoint KPI -> `page.endpoint.ai-governance.endpoints`.

## Open questions
- Should governance status be editable from this page or remain informational?
