---
id: feature.endpoint.ai-governance.endpoint-coverage
type: feature
title: Endpoint Coverage and Effective Controls
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

# Endpoint Coverage and Effective Controls

## Problem
Administrators need to understand AI-agent coverage and the final controls that apply to every managed Windows, macOS, and Linux endpoint.

## Outcome
The product identifies endpoints with AI agents, protected endpoints, installed agents, applied policies, and the merged effective policy.

## Scope
### In scope
- List all managed endpoints and filter by AI-agent or policy presence.
- Show endpoint identity, OS, user, IP address, last contact, and status.
- Show installed agents and applied policies on an endpoint.
- Resolve multiple applied policies into one effective control view.

### Out of scope
- General endpoint lifecycle management unrelated to AI Governance.
- Editing policies directly from the merged-policy view.

## Users / Roles
- AI Discovery Read or higher grants the AI Governance endpoint list, installed-agent counts, and installed-agent details.
- AI Agent Policy Read or higher grants applied-policy counts, policy rows, Protected Endpoint results, and merged effective controls.
- AI Agent Policy Deployment Read or higher may expose a limited targeted-endpoint detail view from a deployment task; fields still follow the independent Discovery and Policy permissions.
- Endpoint counts and records are limited to the technician's Endpoint Central scope.

## Product behavior
An endpoint is “with AI agents” when its permission-projected installed-agent count is greater than zero. An endpoint is “protected” when its permission-projected applied-policy count is greater than zero. Without the corresponding Read permission, the server returns `0`, empty detail collections, and no matching filter rows instead of exposing the underlying value. The merged effective policy is explanatory and read-only. MSP calculations run inside one customer's context. Summary Server exposes probe-level handling only in the current scope.

## Workflows
- `workflow.endpoint.ai-governance.inventory-refresh` - Supplies endpoint and agent state.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Calculates final endpoint controls.

## Pages
- `page.endpoint.ai-governance.overview` - Links coverage KPIs to filtered endpoint inventory.
- `page.endpoint.ai-governance.endpoints` - Lists and filters endpoints.
- `page.endpoint.ai-governance.endpoint-details` - Shows installations, policies, and merged controls.

## Dependencies and constraints
- Depends on discovery data and deployed policy assignments.
- Conflict precedence must remain deterministic and explainable.
- Authorization and server-side field projection follow `feature.endpoint.ai-governance.rbac` and `workflow.endpoint.ai-governance.authorize-access`.

## Release / completion criteria
- KPI counts and endpoint filters use the same predicates.
- KPI counts and endpoint filters use only endpoints visible to the technician.
- Unauthorized agent/policy counts, filters, sorting keys, pagination totals, exports, and APIs use projected zero values without leaking the underlying state.
- Every endpoint row links to endpoint details.
- Effective policy output identifies all contributing policies and the final value of every supported control.

## Open questions
- Should users see why each effective value won a policy conflict?
- How are stale, removed, or partially applied policies represented?
