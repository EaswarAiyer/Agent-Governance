---
id: page.endpoint.ai-governance.policy-details
type: page
title: AI Agent Policy Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.prompt-observability
workflows:
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.prompt-collect-classify
navigates_to:
  - page.endpoint.ai-governance.policy-list
---

# AI Agent Policy Details

## Purpose
Create or modify all control, execution, remediation, and prompt-DLP settings for one OS-specific AI-agent policy.

## Access / roles
- Policies View for read-only access.
- Policies Manage for editable access.
- Auto-uninstall configuration may require an additional sensitive permission `[TBD]`.
- Referenced endpoints and reusable objects must remain within the technician's existing Endpoint Central scope; shared CG/DCG administrative-group support is not part of the current release.

## Entry points
- `page.endpoint.ai-governance.policy-list` -> create for Windows/Mac/Linux or modify a row.
- `page.endpoint.ai-governance.endpoint-details` -> open an applied policy.

## Page structure
### Policy Details
- Displays/controls: policy name and fixed operating-system platform.

### Agent Control
- Controls: searchable multi-select Allow List and Block List; Strict/Audit agent mode.
- Strict: only Allow List agents run. Audit: Block List agents are blocked and all others run.

### Auto Uninstallation
- Controls: automatically remove detected Block List agents.

### Advanced Execution Rules
- Controls: add multiple rules; select one allowlisted agent; add folder paths; select Website Groups for domains and Application Groups for allowed child processes.

### Prompt Monitoring & Classification
- Controls: enable collection; searchable Data Groups; independent Strict/Audit DLP mode.
- Collection includes available prompts, responses, attachments, reasoning summaries, and tool calls after deployment.

## User actions
### Save policy
- Available when: user has Policies Manage and inputs are valid.
- Triggers: `workflow.endpoint.ai-governance.policy-save`.
- UX feedback: show submitting and field-level validation.
- On success: return to `page.endpoint.ai-governance.policy-list` with saved confirmation.
- On failure: preserve all edits and identify invalid sections.
- Logging: record successful create or modify actions in the Endpoint Central Action Log and ME tracking; do not include sensitive policy values in telemetry.

### Add or remove an advanced rule
- Available when: an agent exists in the Allow List.
- Triggers: no server workflow until Save.
- UX feedback: update the draft immediately.
- On success: rule remains in the draft.
- On failure: explain invalid agent/group/folder input.

## States
### Loading
- Prevent editing until policy and group references load.

### Empty
- New policy starts with empty lists and no required invented defaults; final defaults are `[TBD]`.

### Error
- Preserve recoverable draft state and show retry.

### Permission / disabled
- View-only users see controls as read-only.
- Classifier and DLP controls are disabled when prompt collection is off.

## Validation and feedback
- An agent cannot be in both Allow List and Block List.
- Advanced rules can reference only current Allow List agents.
- Accessible domains accept Website Groups only.
- Allowed child processes accept Application Groups only.
- Data classification accepts Data Groups only.

## Navigation
- Save success/cancel/back -> `page.endpoint.ai-governance.policy-list`.

## Open questions
- Which fields are required and what are default modes?
- Are folder wildcards platform-specific and how are they validated?
