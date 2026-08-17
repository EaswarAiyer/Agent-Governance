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
- The user has access to its endpoint/organizational scope.
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
2. Retrieve the interaction, attachment findings, reasoning summary, and tool calls when available.
3. Redact or omit fields the user cannot access.
4. Audit access to sensitive prompt content.

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
- Which views and exports must generate access-audit events?
