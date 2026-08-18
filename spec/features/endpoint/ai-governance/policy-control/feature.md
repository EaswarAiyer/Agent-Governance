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

## Users / Roles
- AI Agent Policy Read or higher for policy lists/details, applied-policy data, and merged effective controls.
- AI Agent Policy Write or Full for create, duplicate, modify, and auto-uninstallation configuration.
- AI Agent Policy Full for delete.
- Endpoint enforcement executes the saved/deployed policy as a system operation; no separate interactive auto-uninstall role is introduced in this module.

## Product behavior
- Users create Windows, Mac, or Linux policies with searchable Allow List and Block List fields.
- Agent Strict mode permits only Allow List agents; an empty Allow List is valid but warns that all AI agents will be blocked.
- Agent Audit mode blocks Block List agents and allows all others.
- Policies can automatically uninstall Block List agents.
- Per-agent rules can restrict allowlisted agents through folders, Website Groups, and Application Groups.
- Prompt collection, Data Groups, and DLP Audit or Strict mode are configured independently.
- A policy mapped to a deployment task cannot be deleted until its mappings change.

## Workflows
- `workflow.endpoint.ai-governance.policy-save` - Validates and persists a policy.
- `workflow.endpoint.ai-governance.effective-policy-resolve` - Combines deployed policies per endpoint.
- `workflow.endpoint.ai-governance.prompt-collect-classify` - Applies prompt monitoring and DLP settings after deployment.

## Pages
- `page.endpoint.ai-governance.policy-list` - Lists policies and initiates OS-specific creation.
- `page.endpoint.ai-governance.policy-details` - Shows the saved configuration as a read-only policy summary.
- `page.endpoint.ai-governance.policy-editor` - Creates or edits granular settings.
- `page.endpoint.ai-governance.endpoint-details` - Displays applied and merged policy state.
