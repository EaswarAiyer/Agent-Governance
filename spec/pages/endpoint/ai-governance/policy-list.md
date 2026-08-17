---
id: page.endpoint.ai-governance.policy-list
type: page
title: AI Agent Policies
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.overview
---

# AI Agent Policies

## Purpose
List AI-agent policies and provide OS-specific creation and modification entry points.

## Access / roles
- AI Agent Policy Read or higher to list and inspect policies.
- AI Agent Policy Write or higher to create, duplicate, and modify policies.
- AI Agent Policy Full to delete policies.

## Entry points
- Main AI Governance navigation -> Policies.
- `page.endpoint.ai-governance.endpoint-details` -> select an applied policy.

## Page structure
### Policy toolbar
- Displays: All Policies.
- Controls: Create policy menu with Windows, Mac, and Linux.

### Policy table
- Displays: policy name, OS platform, mode, Allow List, Block List, auto-uninstall, modified by, last modified, and action.
- Controls: policy link and per-row action menu.

## User actions
### Create policy
- Available when: user has AI Agent Policy Write or Full.
- Triggers: begins `workflow.endpoint.ai-governance.policy-save` after editing.
- UX feedback: require platform selection.
- On success: open `page.endpoint.ai-governance.policy-details` as a new policy.
- On failure: remain on the list and explain the error.

### Modify policy
- Available when: user has AI Agent Policy Write or Full.
- Triggers: `workflow.endpoint.ai-governance.policy-save` when saved.
- UX feedback: open the selected policy.
- On success: return to the updated list after save.
- On failure: preserve unsaved edits on details.

### Delete policy
- Available when: user has AI Agent Policy Full.
- Triggers: policy deletion workflow `[TBD]`.
- UX feedback: require confirmation and disclose deployment impact.
- On success: remove or archive the row.
- On failure: retain the row and explain dependencies.

### Administrative logging
- Create, modify, and delete actions are recorded in the Endpoint Central Action Log.
- Aggregate adoption and failure data is recorded through ME tracking without policy-sensitive values.

## States
### Loading
- Show table skeleton and disable mutations.

### Empty
- Explain that no policies exist and offer platform-specific creation when allowed.

### Error
- Show retry without losing current list context.

### Permission / disabled
- Deny the page without AI Agent Policy Read.
- Hide create/duplicate/modify actions for Read-only users and delete for users below Full.

## Validation and feedback
- Counts and mode summaries must reflect the saved policy version.

## Navigation
- Policy/create/modify -> `page.endpoint.ai-governance.policy-details`.
- Breadcrumb -> `page.endpoint.ai-governance.overview`.

## Open questions
- What blocks or warns on deleting a deployed policy?
