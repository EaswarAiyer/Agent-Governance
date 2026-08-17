---
id: page.endpoint.ai-governance.prompt-details
type: page
title: Prompt Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
workflows:
  - workflow.endpoint.ai-governance.prompt-review
navigates_to:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
---

# Prompt Details

## Purpose
Give an authorized investigator the available context for one AI interaction, its data classifications, and its outcome.

## Access / roles
- Observability Metadata View for permitted session metadata.
- Observability Sensitive Content View for prompt, response, attachments, findings, and reasoning summary.
- Every sensitive-content view should be access-audited.

## Entry points
- `page.endpoint.ai-governance.agent-details` -> select an agent-scoped prompt.
- `page.endpoint.ai-governance.observability` -> select a global prompt.

## Page structure
### Prompt and AI response
- Displays: captured prompt and response when available.

### Reasoning trace
- Displays: recorded reasoning summary only; unsupported/unavailable reasoning is labeled explicitly.

### Tool calls
- Displays: tool name, action, target, status, and time for zero or more calls.

### Session details
- Displays: agent, model, session ID, account, user, computer, and time.

### Classification and attachments
- Displays: general Data Group classification; multiple files with type, independent classification, sensitive-data status, and findings.

## User actions
### View interaction
- Available when: user passes `workflow.endpoint.ai-governance.prompt-review` authorization.
- Triggers: `workflow.endpoint.ai-governance.prompt-review`.
- UX feedback: show authorized fields and explicit redactions.
- On success: investigation context is complete for available data.
- On failure: show not-found, expired, unavailable, or permission state without leakage.

## States
### Loading
- Load sensitive content only after authorization; use section skeletons.

### Empty
- Attachments/tool calls/reasoning sections explicitly state None or Unavailable.

### Error
- Localize partial-data failures and preserve available metadata.

### Permission / disabled
- Redacted sections explain that additional permission is required without revealing their contents.

## Validation and feedback
- Interaction identity must be globally unambiguous; the prototype's agent-plus-prompt composite is not assumed to be the production key.
- General classification must reference configured Data Groups.
- Never label generated or inferred explanations as hidden model chain-of-thought.

## Navigation
- Back returns to the originating agent log or global observability view when origin is known.
- Agent breadcrumb -> `page.endpoint.ai-governance.agent-details`.

## Open questions
- Is raw attachment content retained or only metadata/findings?
- Which data is masked by default and which may be revealed on demand?
