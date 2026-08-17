---
id: feature.endpoint.ai-governance.discovery
type: feature
title: AI Agent Discovery and Inventory
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
pages:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.agent-details
---

# AI Agent Discovery and Inventory

## Problem
Administrators need to know which AI agents exist across managed computers and where each agent is installed.

## Outcome
The product presents a current, searchable inventory of discovered AI agents and the endpoints, versions, and install locations associated with each agent.

## Scope
### In scope
- Aggregate endpoint detections into distinct AI-agent records.
- Show publisher, detection source, endpoint count, governance status, and discovery timestamps.
- Drill into an agent's installed computers and prompt activity.

### Out of scope
- Software licensing, purchasing, reclamation, and chargeback behavior.
- Discovery of unmanaged endpoints.
- Manual refresh controls in the UI.

## Users / Roles
- Users with Overview/Discovery View permission.
- Users need Observability permissions to view prompt activity or sensitive prompt content.

## Product behavior
Overview and Discovery are a single experience named Overview. Selecting an agent opens its dedicated details page rather than a side panel. Search and governance-status filters only change the visible inventory.

## Workflows
- `workflow.endpoint.ai-governance.inventory-refresh` - Supplies agent and installation inventory.

## Pages
- `page.endpoint.ai-governance.overview` - Presents KPIs and discovered agents.
- `page.endpoint.ai-governance.agent-details` - Presents installations and agent-specific prompt logs.

## Dependencies and constraints
- Requires managed endpoint inventory and endpoint telemetry.
- Agent identity normalization rules are `[TBD]`.

## Release / completion criteria
- Each distinct detected agent links to a dedicated details page.
- Installation counts reconcile with endpoint-level records.
- Empty, loading, error, and permission states are defined before production release.

## Open questions
- What signals qualify software as an AI agent?
- How are renamed, bundled, portable, or multiple-version installations deduplicated?
