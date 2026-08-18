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

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflow:** [[workflows/endpoint/ai-governance/scan-flow|AI Agent Scan Flow]]
> **Pages:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]]

## Problem
Administrators need to know which AI agents exist across managed computers and where each agent is installed.

## Outcome
The product presents a current, searchable inventory of discovered AI agents and the endpoints associated with each agent.

## Users / Roles
- AI Discovery Read or higher grants discovery KPIs, agent inventory, installations, and the AI Governance endpoint list.
- AI Discovery Write and Full include Read; no user-initiated discovery mutation or Full-only action exists in the current release.
- AI DLP Observability Read or higher is additionally required to view prompt activity and prompt details.
- Discovery records and counts include only endpoints in the technician's Endpoint Central scope.

## Product behavior
- Overview and Discovery are a single experience named Overview.
- Selecting an agent opens its dedicated details page rather than a side panel.
- Governance status is informational; search and governance-status filters only change the visible inventory.
- On upgrade, discovery begins automatically and the AI Governance tab shows a New indicator with an informational introduction box.

## Workflows
- `workflow.endpoint.ai-governance.inventory-refresh` - Synchronizes Crawler rules, scans agents, and supplies agent and installation inventory.

## Pages
- `page.endpoint.ai-governance.overview` - Presents KPIs and discovered agents.
- `page.endpoint.ai-governance.agent-details` - Presents installations and agent-specific prompt logs.
