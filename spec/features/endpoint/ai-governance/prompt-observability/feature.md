---
id: feature.endpoint.ai-governance.prompt-observability
type: feature
title: Prompt Monitoring and Classification
status: draft
domain: endpoint
module: ai-governance
workflows:
  - workflow.endpoint.ai-governance.prompt-collect-classify
  - workflow.endpoint.ai-governance.prompt-review
pages:
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Prompt Monitoring and Classification

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflows:** [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]] · [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]]
> **Pages:** [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/observability|Observability]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Problem
Security and governance users need to understand sensitive information used with AI agents across the organization and investigate individual interactions.

## Outcome
The product collects policy-enabled prompt activity, classifies it with selected Data Groups, and provides global, agent-specific, and prompt-level investigation views.

## Scope
### In scope
- Global prompt log containing agent, prompt preview, attachments, classification, endpoint, and time.
- Agent-specific prompt log.
- Prompt, response, model, session/account/user context, attachments, per-file findings, reasoning summary, and tool calls.
- DLP Audit and Strict behavior configured by policy.
- Review context for classified data events.

### Out of scope
- Raw hidden chain-of-thought; only an available recorded reasoning summary is shown.
- Training, model quality evaluation, or prompt optimization.
- Retention and legal-hold behavior until defined.

## Users / Roles
- AI DLP Observability Read or higher for prompt logs and captured prompt details, including available prompt, response, attachment, finding, reasoning-summary, and tool-call content.
- AI DLP Observability Write includes Read; no additional prompt mutation exists in the current release.
- AI DLP Observability Full for export.
- All observability results are limited to endpoints in the technician's Endpoint Central scope.

## Product behavior
Prompt monitoring begins only when a deployed policy enables prompt-data collection. General classification uses configured Data Groups. Multiple attached files retain independent classifications and findings.

## Workflows
- `workflow.endpoint.ai-governance.prompt-collect-classify` - Captures, classifies, and optionally blocks prompt data transfer.
- `workflow.endpoint.ai-governance.prompt-review` - Retrieves and presents an interaction for investigation.

## Pages
- `page.endpoint.ai-governance.agent-details` - Shows prompts for one agent.
- `page.endpoint.ai-governance.observability` - Shows prompts across all agents.
- `page.endpoint.ai-governance.prompt-details` - Shows the complete captured interaction.

## Dependencies and constraints
- Depends on deployed policy settings and Data Group definitions.
- Model providers may not expose reasoning information; availability must be represented honestly.
- Sensitive content requires AI DLP Observability Read and access auditing; export requires Full.
- Access follows `feature.endpoint.ai-governance.rbac`; sensitive views remain Action Log events even though both metadata and captured content use AI DLP Observability Read.
- Notifications and alerts are not required in the current release.

## Release / completion criteria
- Collection honors deployed policy state and DLP mode.
- Every prompt row links to details when the user has permission.
- Attachments show per-file classifications and findings.
- Retention, redaction, export, and access audit requirements are defined.
- Sensitive prompt views and exports are recorded in the Endpoint Central Action Log; ME tracking excludes prompt, response, and attachment content.

## Open questions
- What exact content is collected from each agent and model integration?
- What is blocked in DLP Strict mode: submission, attachment, tool call, response, or all applicable transfers?
- What retention and masking defaults apply?
- Whether the existing classification-event view remains within Observability is deferred.
