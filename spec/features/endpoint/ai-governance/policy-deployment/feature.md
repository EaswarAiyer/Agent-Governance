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
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.endpoint-details
---

# AI Agent Policy Deployment

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-deploy|Policy Deployment]] · [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]]
> **Pages:** [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-editor|Deployment Editor]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

## Problem
Administrators need to associate an AI-agent policy with target computers and monitor the result on every endpoint.

## Outcome
Users can manage deployment tasks, each mapping exactly one policy to a target endpoint group, and inspect endpoint-level deployment results.

## Scope
### In scope
- Create, modify, and delete deployment tasks.
- Create and modify deployment tasks on a dedicated editor page.
- Associate one policy with a target endpoint group.
- Show deployment task metadata and targeted endpoint count.
- Show endpoint name, domain, last contact, deployment status, and remarks.
- Show a read-only snapshot of the associated policy.

### Out of scope
- Mapping multiple policies within one deployment task.
- Direct endpoint selection in the current prototype.
- Deployment through shared CG/DCG administrative-group handling for scoped technicians.
- General-purpose software deployment.

## Users / Roles
- AI Agent Policy Deployment Read or higher for task lists, task details, and endpoint rollout results.
- AI Agent Policy Deployment Write or Full for create, modify, execute, and retry.
- AI Agent Policy Deployment Full for delete; cancel is not supported in the current lifecycle.
- AI Agent Policy Read or higher is additionally required to inspect granular policy content from deployment details.

## Product behavior
Clicking a task opens its dedicated details page, while Create and Modify open a dedicated editor page. A task uses only three lifecycle states: Yet to start before endpoints begin reading the policy, In progress while current target-group members are still processing it, and Completed after all current targets have reported a terminal result. Target endpoints follow current group membership rather than an immutable creation-time snapshot. Endpoint results independently distinguish successful, pending, and failed application and include operational remarks. Cancel, schedule, pause, and rollback task actions are not included in the current release.

## Workflows
- `workflow.endpoint.ai-governance.policy-deploy` - Delivers and tracks the selected policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Recalculates endpoint controls after successful application.

## Pages
- `page.endpoint.ai-governance.deployment-list` - Lists and manages deployment tasks.
- `page.endpoint.ai-governance.deployment-editor` - Creates or modifies a deployment task on a dedicated page.
- `page.endpoint.ai-governance.deployment-details` - Shows endpoint results and policy detail.
- `page.endpoint.ai-governance.endpoint-details` - Shows policies effective on an endpoint.

## Dependencies and constraints
- Requires an existing policy and target endpoint group.
- Target endpoints must be within the technician's existing Endpoint Central scope.
- Target membership is resolved from the group's current membership rather than an original execution snapshot.
- Offline and stale endpoints require explicit delivery semantics.
- Access and linked endpoint field projection follow `feature.endpoint.ai-governance.rbac`.

## Release / completion criteria
- Each task maps exactly one policy.
- Every task exposes only Yet to start, In progress, or Completed lifecycle state.
- Status and remarks are available per targeted endpoint.
- Failed and pending results have defined recovery behavior.
- Deletion behavior preserves required audit history.
- Deployment create, modify, and delete operations and auto-uninstallation are recorded in the Endpoint Central Action Log and aggregated through ME tracking.

## Open questions
- Does Save immediately deploy or create a draft task?
- What endpoint-level retry behavior and limits are required?
- Is the displayed policy live or a versioned deployment snapshot?
