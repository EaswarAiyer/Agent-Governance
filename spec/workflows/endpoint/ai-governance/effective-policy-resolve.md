---
id: workflow.endpoint.ai-governance.effective-policy-resolve
type: workflow
title: Resolve an Endpoint's Effective AI Policy
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.endpoint-details
---

# Resolve an Endpoint's Effective AI Policy

## Purpose
Have an endpoint merge all successfully applied AI-agent policies and report the final policy to the server for technician visibility.

## Flow
1. The server delivers the successfully applied, platform-compatible policy definitions to the endpoint.
2. The endpoint combines Allow Lists, Block Lists, accessible folders, Website Groups, Application Groups, and Data Groups additively.
3. When an agent appears in both lists, the endpoint applies allow precedence: it remains allowed and is removed from the effective Block List.
4. The endpoint resolves Agent Enforcement Mode and DLP Mode as Strict when any contributing policy is Strict; otherwise it resolves them as Audit.
5. The endpoint enables auto-uninstallation and Prompt Data Collection when any contributing policy enables them.
6. The endpoint reports the merged policy, contributing policy versions, and resolution status to the server.
7. The server stores the reported result and returns it to technicians with AI Agent Policy Read or higher.

## Related pages
- `page.endpoint.ai-governance.endpoint-details` - Shows the endpoint-reported final policy.
