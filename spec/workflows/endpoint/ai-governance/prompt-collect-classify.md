---
id: workflow.endpoint.ai-governance.prompt-collect-classify
type: workflow
title: Collect and Classify AI Prompt Activity
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.prompt-observability
pages:
  - page.endpoint.ai-governance.policy-editor
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Collect and Classify AI Prompt Activity

## Purpose
Collect supported AI prompt activity, classify it with configured Data Groups, and apply the policy's DLP mode.

## Flow
1. A deployed policy enables Prompt Data Collection and provides the selected Data Groups and DLP mode to the endpoint.
2. The endpoint captures supported prompt interactions, including available prompt, response, attachments, model, session, reasoning summary, and tool calls.
3. The endpoint classifies the interaction and every attached file using the configured Data Groups.
4. In DLP Audit mode, the endpoint allows the interaction and reports any matches. In DLP Strict mode, it blocks matching transfers and reports the result.
5. The server stores the authorized activity and classification results, then makes them available in prompt logs and Prompt Details according to observability roles and technician scope.

## Related pages
- `page.endpoint.ai-governance.policy-editor` - Configures collection, Data Groups, and DLP mode.
- `page.endpoint.ai-governance.agent-details` - Shows prompt activity for one AI agent.
- `page.endpoint.ai-governance.observability` - Shows prompt activity across AI agents.
- `page.endpoint.ai-governance.prompt-details` - Shows one captured interaction.
