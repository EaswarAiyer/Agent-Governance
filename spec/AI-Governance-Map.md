---
title: AI Governance Specification Map
type: map
tags:
  - ai-governance
  - product-spec
  - moc
---

# AI Governance Specification Map

This note is the Obsidian map of content for the AI Governance product specification. The semantic IDs in each note remain the machine-readable source of truth; these path-qualified wiki links provide human navigation, backlinks, and graph connections.

Start with [[README|AI Governance product specification]].

## Features

- [[features/endpoint/ai-governance/discovery/feature|AI Agent Discovery and Inventory]]
- [[features/endpoint/ai-governance/endpoint-coverage/feature|Endpoint Coverage and Effective Controls]]
- [[features/endpoint/ai-governance/policy-control/feature|AI Agent Policy Control]]
- [[features/endpoint/ai-governance/policy-deployment/feature|AI Agent Policy Deployment]]
- [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]]
- [[features/endpoint/ai-governance/rbac/feature|AI Agent Governance Role-Based Access]]

## Workflows

- [[workflows/endpoint/ai-governance/inventory-refresh|Refresh AI Agent and Endpoint Inventory]]
- [[workflows/endpoint/ai-governance/policy-save|Create or Modify an AI Agent Policy]]
- [[workflows/endpoint/ai-governance/policy-deploy|Deploy an AI Agent Policy to Endpoints]]
- [[workflows/endpoint/ai-governance/effective-policy-resolve|Resolve an Endpoint's Effective AI Policy]]
- [[workflows/endpoint/ai-governance/prompt-collect-classify|Collect and Classify AI Prompt Activity]]
- [[workflows/endpoint/ai-governance/prompt-review|Review a Captured AI Prompt Interaction]]
- [[workflows/endpoint/ai-governance/authorize-access|Authorize AI Governance Access and Project Fields]]

## Pages

### Discovery and endpoint coverage

- [[pages/endpoint/ai-governance/overview|AI Governance Overview]]
- [[pages/endpoint/ai-governance/agent-details|AI Agent Details]]
- [[pages/endpoint/ai-governance/endpoints|AI Governance Endpoints]]
- [[pages/endpoint/ai-governance/endpoint-details|AI Governance Endpoint Details]]

### Policy control and deployment

- [[pages/endpoint/ai-governance/policy-list|AI Agent Policies]]
- [[pages/endpoint/ai-governance/policy-details|AI Agent Policy Details]]
- [[pages/endpoint/ai-governance/deployment-list|Policy Deployment]]
- [[pages/endpoint/ai-governance/deployment-details|Deployment Task Details]]

### DLP observability

- [[pages/endpoint/ai-governance/observability|Prompt Observability]]
- [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Product flow

1. [[workflows/endpoint/ai-governance/inventory-refresh|Inventory refresh]] supplies [[pages/endpoint/ai-governance/overview|Overview]], [[pages/endpoint/ai-governance/agent-details|Agent Details]], and endpoint coverage.
2. Administrators define controls in [[pages/endpoint/ai-governance/policy-details|Policy Details]] through [[workflows/endpoint/ai-governance/policy-save|Policy Save]].
3. [[pages/endpoint/ai-governance/deployment-list|Deployment]] applies one policy through [[workflows/endpoint/ai-governance/policy-deploy|Policy Deploy]].
4. [[workflows/endpoint/ai-governance/effective-policy-resolve|Effective Policy Resolution]] produces the final controls shown in [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]].
5. Deployed prompt-DLP settings drive [[workflows/endpoint/ai-governance/prompt-collect-classify|Prompt Collection and Classification]], surfaced in [[pages/endpoint/ai-governance/observability|Observability]] and [[pages/endpoint/ai-governance/prompt-details|Prompt Details]].
6. [[workflows/endpoint/ai-governance/authorize-access|Access Authorization]] applies the RBAC rules in [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]] across every page and workflow.

## Useful Obsidian views

- **Backlinks:** open a feature to see the workflows and pages that reference it.
- **Local graph:** open this map and use Local Graph to inspect the complete AI Governance specification.
- **Outgoing links:** open any page specification to jump directly to its owning features, represented workflows, and navigation destinations.
