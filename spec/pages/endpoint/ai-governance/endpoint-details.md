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
  - feature.endpoint.ai-governance.rbac
workflows:
  - workflow.endpoint.ai-governance.inventory-refresh
  - workflow.endpoint.ai-governance.effective-policy-resolve
  - workflow.endpoint.ai-governance.authorize-access
navigates_to:
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.policy-details
---

# AI Governance Endpoint Details

## Purpose
Explain an endpoint's installed AI agents, applied policies, and final merged controls.

## Access / roles
- AI Discovery Read or higher grants the normal endpoint-details view and installed-agent data.
- AI Agent Policy Read or higher grants applied-policy rows, actual policy count, policy drill-downs, and merged effective controls.
- AI Agent Policy Deployment Read or higher may open a targeted endpoint from deployment details even without AI Discovery Read; in that limited view, deployment-relevant endpoint identity/status remains visible and agent-derived fields are permission-projected.
- The endpoint must be within the technician's existing Endpoint Central scope.

## Entry points
- `page.endpoint.ai-governance.endpoints` -> select an endpoint.
- `page.endpoint.ai-governance.deployment-details` -> select a targeted endpoint.

## Page structure
### Summary
- Displays: AI-agent count, policy count, operating system, and endpoint status.
- AI-agent count is `0` without AI Discovery Read. Policy count is `0` without AI Agent Policy Read.

### Installed AI Agents
- Displays: agent, version, install location, and effective control (Allowed, Blocked, or Unmanaged).
- Requires AI Discovery Read; without it the section is empty/hidden and no underlying rows are returned.

### Applied AI Agent Policies
- Displays: policy, agent mode, prompt collection, DLP mode, and auto-uninstallation.
- Requires AI Agent Policy Read; without it the section is empty/hidden and no underlying rows are returned.

### Merged Effective Policy
- Displays: final control values and explains restrictive precedence.
- Controls: read-only.
- Requires AI Agent Policy Read; without it the merged result and contributing-policy provenance are not returned.

## User actions
### Open installed agent
- Available when: agent row is visible.
- Triggers: no backend workflow; navigation reads existing agent data.
- UX feedback: navigate immediately.
- On success: open `page.endpoint.ai-governance.agent-details`.
- On failure: show agent unavailable.

### Open applied policy
- Available when: user has AI Agent Policy Read or higher.
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
- Agent counts/rows require AI Discovery Read; policy counts/rows/merged controls require AI Agent Policy Read.
- Missing permissions produce server-projected zero counts and empty collections, not masked real values.
- Direct URLs enforce the same permissions as navigation.

## Validation and feedback
- Effective statuses must derive from the same result as the merged-policy section.
- Unknown endpoint IDs display not-found.

## Navigation
- Agent -> `page.endpoint.ai-governance.agent-details`.
- Policy -> `page.endpoint.ai-governance.policy-details`.
- Back/breadcrumb -> `page.endpoint.ai-governance.endpoints`.

## Open questions
- Should the page show field-level merge provenance and deployment history?
