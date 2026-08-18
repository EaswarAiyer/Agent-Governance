---
id: feature.endpoint.ai-governance.endpoint-details
type: feature
title: Endpoint Details and Effective Controls
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.effective-policy-resolve
pages:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.endpoint-details
---

# Endpoint Details and Effective Controls

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflows:** [[workflows/endpoint/ai-governance/scan-flow|AI Agent Scan Flow]] · [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]]
> **Pages:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/endpoints|Endpoints]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

## Problem
Administrators need to understand AI-agent coverage and the final controls that apply to every managed Windows, macOS, and Linux endpoint.

## Outcome
The product identifies endpoints with AI agents, protected endpoints, installed agents, applied policies, and the merged effective policy.

## Users / Roles
- AI Discovery Read or higher grants the AI Governance endpoint list, installed-agent counts, and installed-agent details.
- AI Agent Policy Read or higher grants applied-policy counts, policy rows, Protected Endpoint results, and merged effective controls.
- AI Agent Policy Deployment Read or higher may expose a limited targeted-endpoint detail view from a deployment task; fields still follow the independent Discovery and Policy permissions.
- Endpoint counts and records are limited to the technician's Endpoint Central scope.

## Product behavior
- The endpoint list covers managed Windows, macOS, and Linux devices and can filter for AI agents or applied policies.
- An endpoint is “with AI agents” when its permission-projected installed-agent count is greater than zero.
- An endpoint is “protected” when its permission-projected applied-policy count is greater than zero.
- Without the relevant Read permission, the server returns `0`, empty collections, and no matching filter rows.
- Endpoint details show installed agents, applied policies, and a read-only merged effective policy.
- MSP calculations run within one customer's context; Summary Server supports probe-level handling only.

## Workflows
- `workflow.endpoint.ai-governance.inventory-refresh` - Supplies endpoint and agent state from endpoint scans.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Calculates final endpoint controls.

## Pages
- `page.endpoint.ai-governance.overview` - Links coverage KPIs to filtered endpoint inventory.
- `page.endpoint.ai-governance.endpoints` - Lists and filters endpoints.
- `page.endpoint.ai-governance.endpoint-details` - Shows installations, policies, and merged controls.
