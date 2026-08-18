---
id: workflow.endpoint.ai-governance.authorize-access
type: workflow
title: Authorize AI Governance Access and Project Fields
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.endpoint-details
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.policy-editor
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Authorize AI Governance Access and Project Fields

## Purpose
Apply AI Governance roles and technician scope before returning inventory, policies, deployment results, or prompt data.

## Flow
1. The server verifies the AI Governance feature flag, technician scope, and the assigned AI Discovery, AI Agent Policy, AI Agent Policy Deployment, and AI DLP Observability roles.
2. AI governance feature flag is true by default in EC Security edition.
3. The server allows only permitted pages and actions. Write includes Read; Full includes Write and Read.
4. The server projects endpoint-derived values before returning them: AI-agent and policy counts are `0` when the corresponding Read role is unavailable, and related rows and drill-downs are not returned.
5. The server applies the same authorization to KPIs, filters, sorting, pagination, exports, direct URLs, and APIs.
6. The server records critical administrative changes and sensitive prompt access in the Endpoint Central Action Log.

## Related pages
- All AI Governance pages use this authorization result before rendering data or actions.
