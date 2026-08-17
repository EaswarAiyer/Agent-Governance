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
- Support Endpoint Central Security Edition in Cloud, on-premises, customer-specific MSP context, and Summary Server probes.

### Out of scope
- Software licensing, purchasing, reclamation, and chargeback behavior.
- Discovery of unmanaged endpoints.
- Manual refresh controls in the UI.

## Users / Roles
- AI Discovery Read or higher grants discovery KPIs, agent inventory, installations, and the AI Governance endpoint list.
- AI Discovery Write and Full include Read; no user-initiated discovery mutation or Full-only action exists in the current release.
- AI DLP Observability Read or higher is additionally required to view prompt activity and prompt details.
- Discovery records and counts include only endpoints in the technician's Endpoint Central scope.

## Product behavior
Overview and Discovery are a single experience named Overview. Selecting an agent opens its dedicated details page rather than a side panel. Search and governance-status filters only change the visible inventory. On upgrade, discovery begins automatically, and the AI Governance tab carries a New indicator with an informational introduction box.

## Workflows
- `workflow.endpoint.ai-governance.inventory-refresh` - Supplies agent and installation inventory.

## Pages
- `page.endpoint.ai-governance.overview` - Presents KPIs and discovered agents.
- `page.endpoint.ai-governance.agent-details` - Presents installations and agent-specific prompt logs.

## Dependencies and constraints
- Requires managed endpoint inventory and endpoint telemetry.
- Access and endpoint field projection follow `feature.endpoint.ai-governance.rbac`.
- Agent identity normalization rules are `[TBD]`.
- MSP aggregation is customer-specific. Summary Server support is probe-level without complete consolidated visibility.

## Release / completion criteria
- Each distinct detected agent links to a dedicated details page.
- Installation counts reconcile with endpoint-level records.
- Empty, loading, error, and permission states are defined before production release.
- Upgrade discovery does not activate policy enforcement, prompt collection, DLP blocking, or auto-uninstallation.

## Open questions
- What signals qualify software as an AI agent?
- How are renamed, bundled, portable, or multiple-version installations deduplicated?
