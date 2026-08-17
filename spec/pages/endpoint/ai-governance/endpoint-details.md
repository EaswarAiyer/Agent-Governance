---
id: page.endpoint.ai-governance.endpoint-details
type: page
title: AI Governance Endpoint Details
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.policy-deployment
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.effective-policy-resolve
navigates_to:
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.policy-details
---

# AI Governance Endpoint Details

## Purpose
Explain an endpoint's installed AI agents, applied policies, and final merged controls.

## Access / roles
- Endpoints View permission.
- Policies View may be required to open a policy; field-level visibility rules are `[TBD]`.
- The endpoint must be within the technician's existing Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.endpoints` -> select an endpoint.
- `page.endpoint.ai-governance.deployment-details` -> select a targeted endpoint.

## Page structure
### Summary
- Displays: AI-agent count, policy count, operating system, and endpoint status.

### Installed AI Agents
- Displays: agent, version, install location, and effective control (Allowed, Blocked, or Unmanaged).

### Applied AI Agent Policies
- Displays: policy, agent mode, prompt collection, DLP mode, and auto-uninstallation.

### Merged Effective Policy
- Displays: final control values and explains restrictive precedence.
- Controls: read-only.

## User actions
### Open installed agent
- Available when: agent row is visible.
- Triggers: no backend workflow; navigation reads existing agent data.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.agent-details`.
- On failure: show agent unavailable.

### Open applied policy
- Available when: user has Policies View.
- Triggers: no backend workflow; navigation reads the existing policy.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.policy-details` in view/edit mode according to permission.
- On failure: show permission or not-found feedback.

## States
### Loading
- Load summary and sections without temporarily labeling the endpoint Unmanaged.

### Empty
- Show explicit empty states for no agents and no policies; merged policy is Unmanaged.

### Error
- Show source section and freshness when partial data is available.

### Permission / disabled
- Policy links and sensitive settings respect feature permissions.

## Validation and feedback
- Effective statuses must derive from the same result as the merged-policy section.
- Unknown endpoint IDs display not-found.

## Navigation
- Agent -> `page.endpoint.ai-governance.agent-details`.
- Policy -> `page.endpoint.ai-governance.policy-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.endpoints`.

## Open questions
- Should the page show field-level merge provenance and deployment history?
