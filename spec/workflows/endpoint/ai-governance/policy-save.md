---
id: workflow.endpoint.ai-governance.policy-save
type: workflow
title: Create or Modify an AI Agent Policy
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.policy-editor
---

# Create or Modify an AI Agent Policy

## Purpose
Save an OS-specific AI-agent control and prompt-DLP policy.

## Flow
1. A technician with AI Agent Policy Write or Full configures the policy in Policy Editor.
2. The editor validates Allow List and Block List overlap, advanced-rule references, group selections, and supported folder patterns.
3. Strict mode with an empty Allow List warns that all AI agents will be blocked, but the policy can still be saved.
4. The server validates the configuration, saves the policy, and records the modification details.
5. The saved policy is available for deployment and opens as a read-only Policy Details summary.
6. Any modification in associated policies should trigger the deployment.

## Related pages
- `page.endpoint.ai-governance.policy-editor` - Creates and modifies the policy.
- `page.endpoint.ai-governance.policy-details` - Shows the saved policy summary.
- `page.endpoint.ai-governance.policy-list` - Lists saved policies.
