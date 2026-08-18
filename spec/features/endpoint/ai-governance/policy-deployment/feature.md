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

## Users / Roles
- AI Agent Policy Deployment Read or higher for task lists, task details, and endpoint rollout results.
- AI Agent Policy Deployment Write or Full for create, modify, execute, and retry.
- AI Agent Policy Deployment Full for delete; cancel is not supported in the current lifecycle.
- AI Agent Policy Read or higher is additionally required to inspect granular policy content from deployment details.

## Product behavior
- Users create, modify, and delete deployment tasks on dedicated pages.
- Each task maps exactly one policy to one target endpoint group; target membership follows the group's current membership.
- The task list shows task metadata and targeted endpoint count.
- Task details show endpoint name, domain, last contact, deployment status, remarks, and the associated policy's read-only summary.
- Tasks progress through Yet to start, In progress, and Completed.
- Endpoint results identify successful, pending, or failed application.
- Cancel, schedule, pause, and rollback are not included.

## Workflows
- `workflow.endpoint.ai-governance.policy-deploy` - Delivers and tracks the selected policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Recalculates endpoint controls after successful application.

## Pages
- `page.endpoint.ai-governance.deployment-list` - Lists and manages deployment tasks.
- `page.endpoint.ai-governance.deployment-editor` - Creates or modifies a deployment task on a dedicated page.
- `page.endpoint.ai-governance.deployment-details` - Shows endpoint results and policy detail.
- `page.endpoint.ai-governance.endpoint-details` - Shows policies effective on an endpoint.
