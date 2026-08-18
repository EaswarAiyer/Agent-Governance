---
id: feature.endpoint.ai-governance.policy-control
type: feature
title: AI Agent Policy Control
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.policy-save
  - workflow.endpoint.ai-governance.effective-policy-resolve
  - workflow.endpoint.ai-governance.prompt-collect-classify
pages:
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.policy-editor
  - page.endpoint.ai-governance.endpoint-details
---

# AI Agent Policy Control

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflows:** [[workflows/endpoint/ai-governance/policy-save|Policy Save]] · [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]] · [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]]
> **Pages:** [[pages/endpoint/ai-governance/policy-list|Policy List]] · [[pages/endpoint/ai-governance/policy-details|Policy Details]] · [[pages/endpoint/ai-governance/policy-editor|Policy Editor]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

## Problem
Administrators need a repeatable way to control which AI agents may run, what resources allowed agents may access, and how prompt data is monitored or blocked.

## Outcome
Users can create multiple OS-specific policies containing agent control, remediation, advanced execution rules, and prompt DLP settings.

## Scope
### In scope
- Windows, Mac, and Linux policy creation.
- Searchable multi-select Allow List and Block List fields.
- Strict and Audit modes for agent enforcement.
- Optional automatic uninstallation of Block List agents.
- Per-agent advanced rules for folders, Website Groups, and Application Groups.
- Prompt-data collection, Data Group selection, and independent DLP Strict/Audit mode.

### Out of scope
- Deployment targeting; this belongs to policy deployment.
- Definition and membership management for reusable groups; pages are `[TBD]`.
- Administrative-group handling for shared CG/DCG access by scoped technicians.
- General software restriction policies outside AI agents.

## Users / Roles
- AI Agent Policy Read or higher for policy lists/details, applied-policy data, and merged effective controls.
- AI Agent Policy Write or Full for create, duplicate, modify, and auto-uninstallation configuration.
- AI Agent Policy Full for delete.
- Endpoint enforcement executes the saved/deployed policy as a system operation; no separate interactive auto-uninstall role is introduced in this module.

## Product behavior
All policy configuration fields are optional. Agent Strict mode permits only Allow List agents; when Strict mode is selected with an empty Allow List, the policy remains valid but the user is warned that all AI agents will be blocked. Agent Audit mode blocks Block List agents and allows all others, even when Allow List is empty. DLP Strict mode collects/classifies prompts and blocks transfers matching selected Data Groups. DLP Audit mode collects/classifies without blocking. Agent and DLP modes are independent. Folder wildcard syntax is platform-specific and limited to a supported set for each policy OS. A policy mapped to any deployment task cannot be deleted until those mappings are removed or changed.

## Workflows
- `workflow.endpoint.ai-governance.policy-save` - Validates and persists a policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Combines deployed policies per endpoint.
- `workflow.endpoint.ai-governance.prompt-collect-classify` - Applies prompt monitoring and DLP settings after deployment.

## Pages
- `page.endpoint.ai-governance.policy-list` - Lists policies and initiates OS-specific creation.
- `page.endpoint.ai-governance.policy-details` - Shows the saved configuration as a read-only policy summary.
- `page.endpoint.ai-governance.policy-editor` - Creates or edits granular settings.
- `page.endpoint.ai-governance.endpoint-details` - Displays applied and merged policy state.

## Dependencies and constraints
- Available endpoints and reusable objects must respect the technician's existing Endpoint Central scope.
- Access and endpoint policy-field projection follow `feature.endpoint.ai-governance.rbac`.
- Advanced rules can reference only allowlisted agents.
- Accessible domains use Website Groups only; allowed child processes use Application Groups only.
- Classifiers use Data Groups.
- Unsupported folder wildcard patterns are rejected for the selected policy OS.
- Policy deletion depends on deployment-task references; mapped policies are retained.

## Release / completion criteria
- Invalid overlap between Allow List and Block List is prevented.
- Strict mode with an empty Allow List remains saveable and produces an explicit all-agents-blocked warning.
- Platform-specific folder wildcard validation accepts only the supported set.
- Prompt collection dependencies are disabled when collection is off.
- Saved policy detail is available to deployment and endpoint views.
- Authorization and audit logging are enforced for mutations.
- Policy create, modify, and delete operations are recorded in the Endpoint Central Action Log and aggregated through ME tracking without policy-sensitive values.
- Deletion is blocked while any deployment task references the policy.

## Open questions
- Are policy names unique globally or per OS?
- Which folder wildcard patterns are supported on Windows, macOS, and Linux, and what other setting combinations are incompatible?
- Are approvals, drafts, versions, and rollback required?
