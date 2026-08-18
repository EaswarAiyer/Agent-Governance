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
  - page.endpoint.ai-governance.policy-editor
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Prompt Monitoring and Classification

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Workflows:** [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]] · [[workflows/endpoint/ai-governance/prompt-review|Prompt Review]]
> **Pages:** [[pages/endpoint/ai-governance/policy-editor|Policy Editor]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/observability|Observability]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Problem
Security and governance users need to understand sensitive information used with AI agents across the organization and investigate individual interactions.

## Outcome
The product collects policy-enabled prompt activity, classifies it with selected Data Groups, and provides global, agent-specific, and prompt-level investigation views.

## Users / Roles
- AI DLP Observability Read or higher for prompt logs and captured prompt details, including available prompt, response, attachment, finding, reasoning-summary, and tool-call content.
- AI DLP Observability Write includes Read; no additional prompt mutation exists in the current release.
- AI DLP Observability Full for export.
- All observability results are limited to endpoints in the technician's Endpoint Central scope.

## Product behavior
- Prompt monitoring begins only when a deployed policy enables prompt-data collection.
- Global and agent-specific prompt logs show the agent, prompt preview, attachments, classification, endpoint, and time.
- Prompt details provide the captured prompt, response, model, session or account context, attachments, per-file findings, available recorded reasoning summary, and tool calls.
- General classification uses configured Data Groups; each attachment retains its own classification and findings.
- Raw hidden chain-of-thought is not shown.

## Workflows
- `workflow.endpoint.ai-governance.prompt-collect-classify` - Captures, classifies, and optionally blocks prompt data transfer.
- `workflow.endpoint.ai-governance.prompt-review` - Retrieves and presents an interaction for investigation.

## Pages
- `page.endpoint.ai-governance.policy-editor` - Configures prompt collection, Data Groups, and DLP mode.
- `page.endpoint.ai-governance.agent-details` - Shows prompts for one agent.
- `page.endpoint.ai-governance.observability` - Shows prompts across all agents.
- `page.endpoint.ai-governance.prompt-details` - Shows the complete captured interaction.
