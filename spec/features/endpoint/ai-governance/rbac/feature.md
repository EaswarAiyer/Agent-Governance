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
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# AI Agent Governance Role-Based Access

## Problem
AI Governance combines discovery, policy administration, deployment, and sensitive prompt investigation. Technicians must receive only the feature access and endpoint-derived values authorized for their job, without learning hidden inventory or policy state through counts, filters, or detail pages.

## Outcome
Endpoint Central administrators can assign four composable AI Governance permission families at Read, Write, or Full level. Every page, action, API response, KPI, endpoint column, filter, and drill-down honors the assigned level and the technician's existing Endpoint Central scope.

## Scope
### In scope
- AI Discovery permissions at Read, Write, and Full levels.
- AI Agent Policy permissions at Read, Write, and Full levels.
- AI Agent Policy Deployment permissions at Read, Write, and Full levels.
- AI DLP Observability permissions at Read, Write, and Full levels.
- Hierarchical permission evaluation where Full includes Write and Read, and Write includes Read.
- Server-side field projection for endpoint AI-agent and policy counts.
- Permission-aware page navigation, actions, filters, empty states, and Action Log entries.

### Out of scope
- Fixed job personas that bundle the four permission families.
- Shared CG/DCG administrative-group handling for scoped technicians.
- RBAC administration UI changes outside the existing Endpoint Central role-management experience.
- Notifications for role or permission changes.

## Users / Roles
- Endpoint Central role administrators assign the four permission families and levels.
- Technicians receive composable feature permissions in addition to their existing Endpoint Central scope.
- System ingestion and endpoint enforcement continue independently of an interactive technician's UI permission.

## Product behavior
### Permission hierarchy
| Permission family | Read | Write | Full |
|---|---|---|---|
| AI Discovery | View discovery KPIs, discovered agents, installations, and the AI Governance endpoint inventory. | Includes Read. Discovery has no user-initiated mutation in the current release. | Includes Write. Discovery has no Full-only action in the current release. |
| AI Agent Policy | View policy lists, policy details, applied-policy data, and merged effective controls. | Includes Read; create, duplicate, and modify policies. | Includes Write; delete policies. |
| AI Agent Policy Deployment | View deployment tasks and endpoint-level deployment results. | Includes Read; create, modify, execute, and retry deployment tasks. | Includes Write; delete or cancel deployment tasks when those lifecycle actions are supported. |
| AI DLP Observability | View global and agent-specific prompt logs and prompt details, including authorized captured content. | Includes Read. No additional prompt mutation is in the current release. | Includes Write; export prompt-observability data. |

### Endpoint-derived field projection
| Endpoint field or derived view | Required permission | Behavior without permission |
|---|---|---|
| Number of AI agents installed | AI Discovery Read or higher | Return and display `0`; do not reveal the underlying count through sorting, filtering, export, or API metadata. |
| Installed AI-agent rows, versions, locations, and effective control | AI Discovery Read or higher | Return an empty collection and hide agent drill-down actions. |
| Number of AI-agent policies applied | AI Agent Policy Read or higher | Return and display `0`; do not reveal the underlying count through sorting, filtering, export, or API metadata. |
| Applied-policy rows and merged effective policy | AI Agent Policy Read or higher | Return an empty collection and hide policy/effective-control details. |
| Protected Endpoints KPI and filter | AI Agent Policy Read or higher | Display `0`; the Protected filter returns no rows because its projected policy count is zero. |
| Prompt activity on an agent or endpoint | AI DLP Observability Read or higher | Hide the prompt-log tab/section and return no prompt records. |

Projection occurs on the server before values are aggregated or returned. The UI must not calculate a real count and then visually mask it. Zero is an authorization-safe projected value, distinct from loading and retrieval failure.

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
- `page.endpoint.ai-governance.policy-list` and `page.endpoint.ai-governance.policy-details` - Apply Policy Read/Write/Full actions.
- `page.endpoint.ai-governance.deployment-list` and `page.endpoint.ai-governance.deployment-details` - Apply Deployment Read/Write/Full actions and policy-detail gating.
- `page.endpoint.ai-governance.observability` and `page.endpoint.ai-governance.prompt-details` - Apply DLP Observability Read/Write/Full access.

## Dependencies and constraints
- Permissions are additive and operate only within the technician's existing Endpoint Central scope.
- Direct URLs and APIs must enforce the same authorization as navigation visibility.
- Counts, filters, sorting, exports, and pagination totals must use projected values to prevent side-channel disclosure.
- Sensitive prompt views and exports remain Action Log events; ME tracking must not include prompt, response, attachment, or sensitive finding content.

## Release / completion criteria
- All four permission families are assignable with Read, Write, and Full levels.
- Write includes Read and Full includes Write without requiring duplicate grants.
- Every page and action follows the permission matrix.
- Endpoint agent and policy counts return zero when their corresponding Read permission is absent.
- Protected Endpoint counts and filters do not reveal policy presence without AI Agent Policy Read.
- Direct navigation and API calls cannot bypass page-level restrictions.
- Permission denials and sensitive-data access are logged according to Endpoint Central conventions.

## Open questions
- None for the current role model.
