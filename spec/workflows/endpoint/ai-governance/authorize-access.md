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
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Authorize AI Governance Access and Project Fields

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Feature:** [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Pages:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/endpoints|Endpoints]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]] · [[pages/endpoint/ai-governance/policy-list|Policy List]] · [[pages/endpoint/ai-governance/policy-details|Policy Details]] · [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]] · [[pages/endpoint/ai-governance/observability|Observability]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Purpose
Authorize every AI Governance page, action, and data request using the four feature permission families, then return only technician-scoped and permission-projected data.

## Trigger
The workflow runs whenever a technician opens an AI Governance page, requests AI Governance data, follows a drill-down, performs a mutation, applies a filter/sort, or exports observability data.

## Preconditions
- The user is authenticated in Endpoint Central Security Edition.
- The user's current role permissions and Endpoint Central technician scope are available.
- MSP requests are bound to one customer context; Summary Server requests are bound to a supported probe context.

## Inputs
- User and role identity.
- Endpoint Central technician scope and product topology context.
- Requested page, record, action, fields, filter, sort, aggregation, or export.
- Assigned level for AI Discovery, AI Agent Policy, AI Agent Policy Deployment, and AI DLP Observability.

## Flow
### Server behavior
1. Resolve each permission family to `None`, `Read`, `Write`, or `Full`; treat Write as including Read and Full as including Write and Read.
2. Verify the minimum permission family and level required by the requested page or action.
3. Intersect requested records with the technician's existing Endpoint Central scope and, where applicable, MSP customer or Summary Server probe context.
4. Project endpoint-derived fields before aggregation: return AI-agent count `0` without AI Discovery Read and applied-policy count `0` without AI Agent Policy Read.
5. Return empty installed-agent/applied-policy collections and omit their drill-down actions when the corresponding Read permission is absent.
6. Calculate KPI values, filters, sorting, pagination totals, and exports from the projected dataset so unauthorized values cannot be inferred.
7. Permit create/modify actions at Write and destructive actions at Full according to the canonical matrix.
8. Record policy/deployment mutations and sensitive prompt views/exports in the Endpoint Central Action Log; send only non-sensitive aggregate adoption/failure signals to ME tracking.

### Client behavior
1. Render only authorized navigation items, pages, actions, and sections.
2. Display permission-projected endpoint counts exactly as returned; do not derive hidden values client-side.
3. Treat projected zero, loading, retrieval failure, and a genuinely empty authorized result as distinct states.
4. Hide unavailable mutation controls rather than allowing a request that is known to be unauthorized.

## Success state
The user sees and can act on only the records and operations allowed by the assigned feature levels and technician scope. Endpoint AI-agent and policy columns display authorization-safe zero values when the respective Read permission is absent.

## Failure, retry, and recovery
### Page or action denied
- Condition: The user lacks the minimum permission level.
- Behavior: Return a permission-denied response without record existence or hidden count details.
- Recovery: An Endpoint Central role administrator grants the required feature level.

### Scope denied
- Condition: The record exists but is outside the technician's Endpoint Central scope, MSP customer, or Summary Server probe context.
- Behavior: Return the same not-found/denied behavior used by Endpoint Central to prevent existence disclosure.
- Recovery: Access changes through the existing Endpoint Central scope-management process.

### Permission state unavailable
- Condition: Role or scope evaluation cannot be completed.
- Behavior: Fail closed; do not return protected fields, counts, or mutations.
- Recovery: Retry after the authorization service is available.

## Edge cases
- A user has Deployment Read but not Policy Read: task metadata and endpoint rollout results remain visible, policy counts are zero, and granular policy content is hidden.
- A user opens endpoint details from a deployment task without Discovery Read: deployment-relevant endpoint identity/status remains visible, while installed-agent counts are zero and agent rows are empty.
- A user's role changes while a page is open: the next request is re-authorized and the page refreshes or removes data/actions no longer permitted.
- A filter or sort references a field the user cannot read: use its projected value and never the underlying value.

## Related pages
- All AI Governance pages consume this authorization and projection result before rendering or invoking their owning workflows.

## Open questions
- None for the current authorization and field-projection behavior.
