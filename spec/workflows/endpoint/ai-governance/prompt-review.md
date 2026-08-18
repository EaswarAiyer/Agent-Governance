---
id: workflow.endpoint.ai-governance.prompt-review
type: workflow
title: Review a Captured AI Prompt Interaction
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Review a Captured AI Prompt Interaction

## Purpose
Show an authorized technician the available metadata and sensitive details for one captured AI interaction.

## Flow
1. A technician selects a prompt from an agent-specific or global prompt log.
2. The server verifies AI DLP Observability access and endpoint scope through Access Authorization.
3. The server returns the authorized interaction details: prompt, response, model, session, attachments, classifications, reasoning summary, and tool calls when available.
4. The server records sensitive prompt views and exports in the Endpoint Central Action Log.

## Related pages
- `page.endpoint.ai-governance.agent-details` - Provides the agent-specific prompt-log entry point.
- `page.endpoint.ai-governance.observability` - Provides the global prompt-log entry point.
- `page.endpoint.ai-governance.prompt-details` - Shows the authorized interaction details.
