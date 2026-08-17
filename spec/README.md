# AI Governance product specification

This specification describes the behavior represented by the static AI Governance prototype. It separates product intent (features), system behavior (workflows), and user experience (pages). Prototype sample values are illustrative and are not contractual limits.

## Product boundary

AI Governance is part of Software Asset Management in Endpoint Central Security Edition. It discovers AI agents on managed endpoints, controls their execution and data access through policies, deploys one policy per deployment task, and provides prompt-level observability and data-loss prevention context.

## Supported products and topologies

- Edition: Endpoint Central Security Edition only.
- Cloud: supported.
- On premises: supported.
- MSP: supported within an individual customer's context. The MSP home page needs only AI Agents Discovered and Endpoints with AI Agents counts; all counts and records are customer-specific.
- Summary Server: probe-level handling is supported. Complete or consolidated Summary Server visibility is not required in the current scope.

## Technician scope handling

All insights, inventory counts, endpoint lists, and observability records must be calculated only from endpoints in the signed-in technician's Endpoint Central scope. Administrative-group support for shared Custom Groups (CG) or Dynamic Custom Groups (DCG), including deployment by scoped technicians, is not part of the current release.

## Existing customer rollout

- On upgrade, show the AI Governance tab with a **New** indicator.
- Show an informational box introducing the AI Governance feature.
- Start discovery automatically so the Overview can populate.
- Do not automatically deploy policies or enable prompt collection, DLP blocking, or auto-uninstallation. These behaviors begin only after an administrator configures and deploys a policy.

## Features

- `feature.endpoint.ai-governance.discovery` — AI agent discovery and inventory
- `feature.endpoint.ai-governance.endpoint-coverage` — endpoint coverage and effective controls
- `feature.endpoint.ai-governance.policy-control` — AI agent policy control
- `feature.endpoint.ai-governance.policy-deployment` — policy deployment
- `feature.endpoint.ai-governance.prompt-observability` — prompt monitoring and classification

## Workflows

- `workflow.endpoint.ai-governance.inventory-refresh`
- `workflow.endpoint.ai-governance.policy-save`
- `workflow.endpoint.ai-governance.policy-deploy`
- `workflow.endpoint.ai-governance.effective-policy-resolve`
- `workflow.endpoint.ai-governance.prompt-collect-classify`
- `workflow.endpoint.ai-governance.prompt-review`

## Pages

- `page.endpoint.ai-governance.overview`
- `page.endpoint.ai-governance.agent-details`
- `page.endpoint.ai-governance.endpoints`
- `page.endpoint.ai-governance.endpoint-details`
- `page.endpoint.ai-governance.policy-list`
- `page.endpoint.ai-governance.policy-details`
- `page.endpoint.ai-governance.deployment-list`
- `page.endpoint.ai-governance.deployment-details`
- `page.endpoint.ai-governance.observability`
- `page.endpoint.ai-governance.prompt-details`

## Feature-based access model

The product should use composable feature permissions instead of fixed job personas. The minimum permission families implied by the prototype are Overview/Discovery View, Endpoints View, Policies View/Manage, Deployments View/Manage, Observability Metadata View, Observability Sensitive Content View, Prompt Export, Groups View/Manage, Auto-uninstall Execute, and RBAC Administration. Feature permissions operate within the technician's existing Endpoint Central scope. Exact permission names remain `[TBD]`.

## Notifications, audit, and telemetry

- Notifications and alerts are not required in the current release.
- Collect feature adoption, operation counts, and failures through ME tracking. Prompt, response, attachment, and other sensitive content must not be included in telemetry.
- Record critical administrative and sensitive-data events in the Endpoint Central Action Log. This includes policy and deployment creation/modification/deletion, auto-uninstallation, and viewing or exporting sensitive prompt content. Group-change logging applies when administrative group management is released.

## Unresolved product decisions

1. The endpoint-to-server discovery transport, refresh cadence, and stale-data threshold.
2. Policy versioning, approval, conflict validation, and rollback behavior.
3. Whether saving a deployment task immediately deploys it or creates a separately executable draft.
4. Agent acknowledgement semantics, retry limits, offline handling, and deployment cancellation.
5. Prompt retention, redaction, model reasoning availability, export controls, and jurisdictional requirements.
6. Management workflows and pages for Data Groups, Application Groups, Website Groups, and endpoint groups.
7. Whether customer-facing APIs are required or the first release uses only internal Endpoint Central APIs.
8. Whether the existing classification-event view remains within Observability; this decision is deferred.
