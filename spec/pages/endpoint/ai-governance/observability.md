---
id: page.endpoint.ai-governance.observability
type: page
title: Prompt Observability
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.prompt-observability
workflows:
  - workflow.endpoint.ai-governance.prompt-collect-classify
  - workflow.endpoint.ai-governance.prompt-review
navigates_to:
  - page.endpoint.ai-governance.prompt-details
  - page.endpoint.ai-governance.overview
---

# Prompt Observability

## Purpose
Provide a global prompt log across all monitored AI agents and support sensitive-data investigation.

## Access / roles
- Observability Metadata View for prompt-list fields permitted by policy.
- Observability Sensitive Content View for unredacted prompt previews/attachments when classified as sensitive.
- Prompt Export is separate.

## Entry points
- Main AI Governance navigation -> Observability.

## Page structure
### Global prompt log
- Displays: AI Agent, Prompt, Attached Files, Data Classification, Computer, and Time.
- Controls: clickable prompt rows.

### Classification event view
- The prototype also contains file/classification event filters, comments, status actions, export, and a detail panel.
- Whether this remains on the same production page or becomes a separate view is `[TBD]`.

## User actions
### Open prompt details
- Available when: user has prompt metadata access.
- Triggers: `workflow.endpoint.ai-governance.prompt-review`.
- UX feedback: navigate to the selected record.
- On success: open `page.endpoint.ai-governance.prompt-details`.
- On failure: show unavailable or permission feedback.

### Filter prompt/classification activity
- Available when: log data is loaded.
- Triggers: no mutation.
- UX feedback: active filter and record count update.
- On success: show matching records.
- On failure: preserve the prior result set.

### Export
- Available when: user has Prompt Export.
- Triggers: export workflow `[TBD]`.
- UX feedback: disclose scope and sensitive-content handling before export.
- On success: provide the generated artifact and audit the action.
- On failure: show export failure without broadening access.

## States
### Loading
- Show metadata skeletons; do not flash sensitive content.

### Empty
- Explain whether no activity was collected, no policy enables collection, or filters match nothing.

### Error
- Distinguish retrieval failure from permission-based redaction.

### Permission / disabled
- Redact or omit sensitive columns according to permissions and product decision `[TBD]`.

## Validation and feedback
- Agent name is mandatory in the global log.
- Interaction links use globally unambiguous IDs.

## Navigation
- Prompt row -> `page.endpoint.ai-governance.prompt-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- Should classification events and prompt activity be separate tabs/pages?
- Which fields are included in export and how are they redacted?
