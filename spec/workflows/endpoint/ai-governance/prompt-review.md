---
id: workflow.endpoint.ai-governance.prompt-review
type: workflow
title: Review a Captured AI Prompt Interaction
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
pages:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Review a Captured AI Prompt Interaction

## Purpose
Authorize and retrieve the metadata and sensitive details required to investigate one captured AI interaction.

## Trigger
An authorized user selects a prompt row from the global or agent-specific prompt log.

## Preconditions
- The interaction exists and is within retention.
- The associated endpoint is within the technician's existing Endpoint Central scope.
- Sensitive fields are returned only with Observability Sensitive Content View permission.

## Inputs
- Interaction ID and agent context.
- Requesting user, permissions, and scope.

## Flow
### Client behavior
1. Navigate to prompt details with stable interaction identity.
2. Request metadata and permitted content.

### Server behavior
1. Authorize metadata and sensitive-content access independently.
2. Verify that the associated endpoint remains inside the technician's scope before retrieving content.
3. Retrieve the interaction, attachment findings, reasoning summary, and tool calls when available.
4. Redact or omit fields the user cannot access.
5. Record sensitive prompt views and exports in the Endpoint Central Action Log.
6. Send aggregate view/failure counts to ME tracking without sensitive interaction content.

## Success state
The detail page shows all authorized available fields and explicitly labels unavailable, redacted, or absent data.

## Failure, retry, and recovery
### Permission denied
- Condition: User lacks metadata or sensitive-content access.
- Behavior: Deny the page or render a redacted view according to permission design `[TBD]`.
- Recovery: Request access through the organization's RBAC process.

### Record unavailable
- Condition: Interaction expired, was deleted, or was never fully collected.
- Behavior: Show a clear unavailable state without leaking sensitive metadata.
- Recovery: None unless retrievable from an approved archive `[TBD]`.

## Edge cases
- Agent-specific and global logs reference the same interaction.
- Reasoning summary or tool calls are unsupported by the integration.
- Attachment metadata exists but content was not retained.

## Related pages
- `page.endpoint.ai-governance.agent-details` - Agent-scoped entry point.
- `page.endpoint.ai-governance.observability` - Global entry point.
- `page.endpoint.ai-governance.prompt-details` - Investigation result.

## Open questions
- Is a redacted details page preferable to a hard permission denial?
- Which additional non-sensitive observability views, if any, should generate Action Log events?
