---
id: feature.endpoint.ai-governance.rbac
type: feature
title: AI Agent Governance Role-Based Access
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.authorize-access
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.policy-deploy
  - workflow.endpoint.ai-governance.effective-policy-resolve
  - workflow.endpoint.ai-governance.prompt-review
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

# AI Agent Governance Role-Based Access

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Core workflow:** [[workflows/endpoint/ai-governance/authorize-access|Access Authorization and Field Projection]]
> **Connected workflows:** [[workflows/endpoint/ai-governance/scan-flow|AI Agent Scan Flow]] · [[workflows/endpoint/ai-governance/policy-save|Policy Save]] · [[workflows/endpoint/ai-governance/policy-deploy|Policy Deployment]] · [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]] · [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]]
> **Pages:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/endpoints|Endpoints]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]] · [[pages/endpoint/ai-governance/policy-list|Policy List]] · [[pages/endpoint/ai-governance/policy-details|Policy Details]] · [[pages/endpoint/ai-governance/policy-editor|Policy Editor]] · [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-editor|Deployment Editor]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]] · [[pages/endpoint/ai-governance/observability|Observability]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Problem
AI Governance combines discovery, policy administration, deployment, and sensitive prompt investigation. Technicians must receive only the feature access and endpoint-derived values authorized for their job, without learning hidden inventory or policy state through counts, filters, or detail pages.

## Outcome
Endpoint Central administrators can assign four composable AI Governance permission families at Read, Write, or Full level. Every page, action, API response, KPI, endpoint column, filter, and drill-down honors the assigned level and the technician's existing Endpoint Central scope.

## Users / Roles
- Endpoint Central role administrators assign the four permission families and levels.
- Technicians receive composable feature permissions in addition to their existing Endpoint Central scope.
- System ingestion and endpoint enforcement continue independently of an interactive technician's UI permission.

## Product behavior
- Four composable permission families use Read, Write, and Full levels; Full includes Write and Read, and Write includes Read.

| Permission family | Read | Write | Full |
|---|---|---|---|
| AI Discovery | View discovery KPIs, discovered agents, installations, and the AI Governance endpoint inventory. | Includes Read. Discovery has no user-initiated mutation in the current release. | Includes Write. Discovery has no Full-only action in the current release. |
| AI Agent Policy | View policy lists, policy details, applied-policy data, and merged effective controls. | Includes Read; create, duplicate, and modify policies. | Includes Write; delete policies. |
| AI Agent Policy Deployment | View deployment tasks and endpoint-level deployment results. | Includes Read; create, modify, execute, and retry deployment tasks. | Includes Write; delete deployment tasks. Cancel is not supported in the current lifecycle. |
| AI DLP Observability | View global and agent-specific prompt logs and prompt details, including authorized captured content. | Includes Read. No additional prompt mutation is in the current release. | Includes Write; export prompt-observability data. |

- AI Discovery Read controls endpoint-derived agent counts and rows; AI Agent Policy Read controls policy counts, Protected Endpoint results, applied policies, and merged controls; AI DLP Observability Read controls prompt activity.
- Without the relevant permission, the server projects counts to `0`, returns empty collections, and hides related actions and filters.
- Projection occurs before aggregation or return, including sorting, filtering, exports, pagination, direct URLs, and APIs.
- Permissions are additive inside the technician's Endpoint Central scope.
- The current release excludes fixed personas, shared CG/DCG handling, role-change notifications, and RBAC UI changes.

## Workflows
- `workflow.endpoint.ai-governance.authorize-access` - Evaluates module permissions, technician scope, actions, and field projection for every AI Governance request.
- `workflow.endpoint.ai-governance.inventory-refresh` - Preserves complete system inventory while applying projection only when interactive data is requested.
- `workflow.endpoint.ai-governance.policy-save` - Requires AI Agent Policy Write or Full.
- `workflow.endpoint.ai-governance.policy-deploy` - Requires AI Agent Policy Deployment Write or Full.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Returns policy-derived endpoint detail only with AI Agent Policy Read or higher.
- `workflow.endpoint.ai-governance.prompt-review` - Requires AI DLP Observability Read and Full for export.

## Pages
- `page.endpoint.ai-governance.overview` - Gates discovery and permission-sensitive coverage KPIs.
- `page.endpoint.ai-governance.agent-details` - Separately gates installations and prompt activity.
- `page.endpoint.ai-governance.endpoints` - Projects agent and policy count columns by permission.
- `page.endpoint.ai-governance.endpoint-details` - Independently gates agent, policy, merged-control, and prompt sections.
- `page.endpoint.ai-governance.policy-list` and `page.endpoint.ai-governance.policy-details` - Require Policy Read to list and inspect policy summaries.
- `page.endpoint.ai-governance.policy-editor` - Requires Policy Write or Full to create or modify a policy.
- `page.endpoint.ai-governance.deployment-list` and `page.endpoint.ai-governance.deployment-details` - Apply Deployment Read/Write/Full actions and policy-detail gating.
- `page.endpoint.ai-governance.deployment-editor` - Requires Deployment Write or Full for task creation and modification.
- `page.endpoint.ai-governance.observability` and `page.endpoint.ai-governance.prompt-details` - Apply DLP Observability Read/Write/Full access.
