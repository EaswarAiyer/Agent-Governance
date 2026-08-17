---
id: page.endpoint.ai-governance.prompt-details
type: page
title: Prompt Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.prompt-review
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
---

# Prompt Details

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Workflows:** [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]] · [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]]
> **Navigation:** [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/observability|Observability]]

## Purpose
Give an authorized investigator the available context for one AI interaction, its data classifications, and its outcome.

## Access / roles
- AI DLP Observability Read or higher for session metadata, prompt, response, attachments, findings, reasoning summary, and tool calls that were captured under policy.
- AI DLP Observability Full for export; viewing does not require Full.
- Every sensitive-content view should be access-audited.
- The associated endpoint must be within the technician's existing Endpoint Central scope.

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
- Logging: record authorized sensitive-content access in the Endpoint Central Action Log; ME tracking records only aggregate usage/failure signals.

## States
### Loading
- Load sensitive content only after authorization; use section skeletons.

### Empty
- Attachments/tool calls/reasoning sections explicitly state None or Unavailable.

### Error
- Localize partial-data failures and preserve available metadata.

### Permission / disabled
- Deny the page and direct API access without AI DLP Observability Read; do not disclose whether the interaction exists.
- Hide export controls below AI DLP Observability Full.

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
