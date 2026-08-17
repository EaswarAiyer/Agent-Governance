---
id: feature.endpoint.ai-governance.policy-deployment
type: feature
title: AI Agent Policy Deployment
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.policy-deploy
  - workflow.endpoint.ai-governance.effective-policy-resolve
pages:
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.endpoint-details
---

# AI Agent Policy Deployment

## Problem
Administrators need to associate an AI-agent policy with target computers and monitor the result on every endpoint.

## Outcome
Users can manage deployment tasks, each mapping exactly one policy to a target endpoint group, and inspect endpoint-level deployment results.

## Scope
### In scope
- Create, modify, and delete deployment tasks.
- Associate one policy with a target endpoint group.
- Show deployment task metadata and targeted endpoint count.
- Show endpoint name, domain, last contact, deployment status, and remarks.
- Show a read-only snapshot of the associated policy.

### Out of scope
- Mapping multiple policies within one deployment task.
- Direct endpoint selection in the current prototype.
- General-purpose software deployment.

## Users / Roles
- Deployments View for read access.
- Deployments Manage for create, modify, execute, retry, and delete capabilities; the exact split is `[TBD]`.

## Product behavior
Clicking a task opens its dedicated details page. Endpoint results distinguish successful, pending, and failed application and include operational remarks.

## Workflows
- `workflow.endpoint.ai-governance.policy-deploy` - Delivers and tracks the selected policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Recalculates endpoint controls after successful application.

## Pages
- `page.endpoint.ai-governance.deployment-list` - Lists and manages deployment tasks.
- `page.endpoint.ai-governance.deployment-details` - Shows endpoint results and policy detail.
- `page.endpoint.ai-governance.endpoint-details` - Shows policies effective on an endpoint.

## Dependencies and constraints
- Requires an existing policy and target endpoint group.
- Offline and stale endpoints require explicit delivery semantics.

## Release / completion criteria
- Each task maps exactly one policy.
- Status and remarks are available per targeted endpoint.
- Failed and pending results have defined recovery behavior.
- Deletion behavior preserves required audit history.

## Open questions
- Does Save immediately deploy or create a draft task?
- Can a deployment be paused, canceled, scheduled, retried, or rolled back?
- Is the displayed policy live or a versioned deployment snapshot?
