---
id: workflow.endpoint.ai-governance.policy-deploy
type: workflow
title: Deploy an AI Agent Policy to Endpoints
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.endpoint-details
---

# Deploy an AI Agent Policy to Endpoints

## Purpose
Associate one AI-agent policy with one target endpoint group and show the deployment result for each endpoint.

## Flow
1. A technician with AI Agent Policy Deployment Write or Full creates or modifies a deployment task.
2. The server validates one policy, one target endpoint group, and platform compatibility.
3. The server resolves the target group's current endpoint membership and sends the policy to those endpoints.
4. Each endpoint validates and applies the policy, then reports Success, Pending, or Failed with a deployment remark.
5. The server stores the endpoint results, updates the task lifecycle, and refreshes the endpoint's effective policy after successful application.
6. Any change in the target should trigger the policy deployment.

## Related pages
- `page.endpoint.ai-governance.deployment-editor` - Creates and modifies the task.
- `page.endpoint.ai-governance.deployment-details` - Shows endpoint deployment results and the associated policy.
- `page.endpoint.ai-governance.endpoint-details` - Shows applied and final policy state.
