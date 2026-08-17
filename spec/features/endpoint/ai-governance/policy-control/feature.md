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
  - page.endpoint.ai-governance.endpoint-details
---

# AI Agent Policy Control

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
- General software restriction policies outside AI agents.

## Users / Roles
- Policies View for read access.
- Policies Manage for create, modify, duplicate, and delete operations.
- Auto-uninstall Execute is a separate sensitive capability at enforcement time.

## Product behavior
Agent Strict mode permits only Allow List agents. Agent Audit mode blocks Block List agents and allows all others, even when Allow List is empty. DLP Strict mode collects/classifies prompts and blocks transfers matching selected Data Groups. DLP Audit mode collects/classifies without blocking. Agent and DLP modes are independent.

## Workflows
- `workflow.endpoint.ai-governance.policy-save` - Validates and persists a policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Combines deployed policies per endpoint.
- `workflow.endpoint.ai-governance.prompt-collect-classify` - Applies prompt monitoring and DLP settings after deployment.

## Pages
- `page.endpoint.ai-governance.policy-list` - Lists policies and initiates OS-specific creation.
- `page.endpoint.ai-governance.policy-details` - Creates or edits granular settings.
- `page.endpoint.ai-governance.endpoint-details` - Displays applied and merged policy state.

## Dependencies and constraints
- Advanced rules can reference only allowlisted agents.
- Accessible domains use Website Groups only; allowed child processes use Application Groups only.
- Classifiers use Data Groups.

## Release / completion criteria
- Invalid overlap between Allow List and Block List is prevented.
- Prompt collection dependencies are disabled when collection is off.
- Saved policy detail is available to deployment and endpoint views.
- Authorization and audit logging are enforced for mutations.

## Open questions
- Are policy names unique globally or per OS?
- What validation applies to folder patterns and incompatible settings?
- Are approvals, drafts, versions, and rollback required?
