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
- Observability Metadata View for list-level metadata.
- Observability Sensitive Content View for prompt, response, attachments, and reasoning summary.
- Prompt Export as a separate permission.

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
- Sensitive content requires stronger authorization than aggregate metadata.

## Release / completion criteria
- Collection honors deployed policy state and DLP mode.
- Every prompt row links to details when the user has permission.
- Attachments show per-file classifications and findings.
- Retention, redaction, export, and access audit requirements are defined.

## Open questions
- What exact content is collected from each agent and model integration?
- What is blocked in DLP Strict mode: submission, attachment, tool call, response, or all applicable transfers?
- What retention and masking defaults apply?
