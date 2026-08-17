---
id: workflow.endpoint.ai-governance.inventory-refresh
type: workflow
title: Refresh AI Agent and Endpoint Inventory
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.discovery
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.endpoint-details
---

# Refresh AI Agent and Endpoint Inventory

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/discovery/feature|Discovery]] · [[features/endpoint/ai-governance/endpoint-coverage/feature|Endpoint Coverage]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Pages:** [[pages/endpoint/ai-governance/overview|Overview]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/endpoints|Endpoints]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

## Purpose
Maintain the server-side inventory used to show managed endpoints, installed AI agents, installation metadata, and discovery timestamps.

## Trigger
The workflow starts when a managed endpoint reports inventory during its normal agent contact or when a server-side inventory scan completes. The exact cadence and transport are `[TBD]`; the UI has no manual refresh action.

## Preconditions
- The endpoint is enrolled and identifiable by the management server.
- The reporting component is authorized to submit inventory.
- The product is Endpoint Central Security Edition running in Cloud, on premises, an MSP customer context, or a Summary Server probe.

## Inputs
- Endpoint identity, domain, OS, logged-in user, IP address, contact time, and health status.
- Detected agent identity, publisher/detection evidence, version, and install location.

## Flow
### Server behavior
1. Authenticate and validate the inventory report.
2. Resolve the endpoint and normalize detected applications into AI-agent identities.
3. Reconcile added, changed, and removed installations.
4. Recalculate agent endpoint counts and coverage KPIs.
5. Store first-detected and last-seen timestamps.
6. Apply technician scope when producing insights and inventory views; never use out-of-scope endpoints in displayed counts. Apply interactive role-based field projection through `workflow.endpoint.ai-governance.authorize-access` at request time without altering the stored inventory.
7. In MSP, partition inventory and home-page counts by customer. In Summary Server, retain probe-level handling without requiring complete consolidated visibility.
8. Send aggregate adoption and ingestion-failure signals to ME tracking without endpoint-sensitive inventory values.

### Server -> Agent data
No server-to-agent payload is required by the represented inventory update. Scan instructions and signatures are `[TBD]`.

### Agent behavior
1. Detect supported AI-agent installations and relevant metadata.
2. Report the current endpoint and installation inventory at the configured contact.

### Agent -> Server response
| Field / data | Purpose | Required | Notes |
|---|---|---|---|
| Endpoint identity | Correlate the report | Yes | Stable identifier required |
| Endpoint metadata | Populate endpoint inventory | Yes | Domain, OS, user, IP, contact/status |
| Agent detections | Populate AI-agent inventory | Yes | May be empty |
| Version and install location | Describe each installation | Yes | Availability by OS is `[TBD]` |
| Detection evidence/source | Explain classification | Yes | Taxonomy is `[TBD]` |

## Success state
The server accepts the report and updates the endpoint and agent inventories. Interactive requests receive internally consistent, technician-scoped, permission-projected KPI and detail counts through `workflow.endpoint.ai-governance.authorize-access`.

## Failure, retry, and recovery
### Invalid report
- Condition: Required identity or inventory data cannot be validated.
- Behavior: Reject the invalid portion and record an ingestion error.
- Recovery: Endpoint resubmits at the next contact or after correction; retry policy is `[TBD]`.

### Offline or stale endpoint
- Condition: No report arrives within the stale-data threshold.
- Behavior: Retain the last known inventory and mark freshness explicitly.
- Recovery: Reconcile when the endpoint contacts again.

## Edge cases
- Multiple versions or installation locations for the same agent on one endpoint.
- Renamed, portable, embedded, or extension-based agents.
- Agent removed while the endpoint is offline.
- A technician's scope changes between inventory refreshes.
- MSP customer context or Summary Server probe context is missing or invalid.

## Related pages
- `page.endpoint.ai-governance.overview` - Consumes aggregate inventory.
- `page.endpoint.ai-governance.agent-details` - Consumes agent installations.
- `page.endpoint.ai-governance.endpoints` - Consumes endpoint inventory.
- `page.endpoint.ai-governance.endpoint-details` - Consumes one endpoint's state.

## Open questions
- What component performs detection and how often?
- What freshness threshold changes an endpoint or installation to stale?
