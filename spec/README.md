# AI Governance product specification

This specification describes the behavior represented by the static AI Governance prototype. It separates product intent (features), system behavior (workflows), and user experience (pages). Prototype sample values are illustrative and are not contractual limits.

## Product boundary

AI Governance is intended to become part of Software Asset Management. It discovers AI agents on managed endpoints, controls their execution and data access through policies, deploys one policy per deployment task, and provides prompt-level observability and data-loss prevention context.

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

The product should use composable feature permissions instead of fixed job personas. The minimum permission families implied by the prototype are Overview/Discovery View, Endpoints View, Policies View/Manage, Deployments View/Manage, Observability Metadata View, Observability Sensitive Content View, Prompt Export, Groups View/Manage, Auto-uninstall Execute, and RBAC Administration. Exact permission names and scope inheritance remain `[TBD]`.

## Unresolved product decisions

1. The endpoint-to-server discovery transport, refresh cadence, and stale-data threshold.
2. Policy versioning, approval, conflict validation, and rollback behavior.
3. Whether saving a deployment task immediately deploys it or creates a separately executable draft.
4. Agent acknowledgement semantics, retry limits, offline handling, and deployment cancellation.
5. Prompt retention, redaction, model reasoning availability, export controls, and jurisdictional requirements.
6. Management workflows and pages for Data Groups, Application Groups, Website Groups, and endpoint groups.
