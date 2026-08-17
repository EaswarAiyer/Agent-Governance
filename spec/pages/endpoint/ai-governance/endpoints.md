---
id: page.endpoint.ai-governance.endpoints
type: page
title: AI Governance Endpoints
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.endpoint-coverage
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
navigates_to:
  - page.endpoint.ai-governance.endpoint-details
  - page.endpoint.ai-governance.overview
---

# AI Governance Endpoints

## Purpose
List managed Windows, macOS, and Linux endpoints and expose AI-agent and policy coverage.

## Access / roles
- Endpoints View permission.
- The table and all counts include only endpoints in the technician's existing Endpoint Central scope.

## Entry points
- Main navigation -> Endpoints.
- `page.endpoint.ai-governance.overview` -> endpoint KPI with All, With AI agents, or Protected filter.

## Page structure
### Filters and search
- Displays: active filter description and visible endpoint count.
- Controls: All endpoints, With AI agents, Protected, and search by endpoint/user/IP/OS.

### Endpoint table
- Displays: endpoint, OS, logged-in user, IP, number of AI agents, number of applied policies, last seen, and status.
- Controls: clickable endpoint rows.

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

## Validation and feedback
- With AI agents means installed-agent count greater than zero.
- Protected means applied-policy count greater than zero.

## Navigation
- Endpoint row -> `page.endpoint.ai-governance.endpoint-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Are additional platform, status, group, or freshness filters required?
