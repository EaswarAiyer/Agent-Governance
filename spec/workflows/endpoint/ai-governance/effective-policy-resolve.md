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
pages:
  - page.endpoint.ai-governance.endpoint-details
---

# Resolve an Endpoint's Effective AI Policy

## Purpose
Produce one deterministic set of final AI-agent and prompt-DLP controls from all policies successfully applied to an endpoint.

## Trigger
The workflow runs when an endpoint's applied-policy set or any contributing policy version changes, and when endpoint details require a current effective-policy view.

## Preconditions
- Contributing policies are valid and applicable to the endpoint platform.
- Only successfully applied policy versions participate; handling of pending/failed records is `[TBD]`.

## Inputs
- Endpoint identity and platform.
- Applied policy identities, versions, and complete control definitions.

## Flow
### Server behavior
1. Load all applicable policy versions for the endpoint.
2. Choose Strict when any contributing policy uses Strict agent mode.
3. Union Block Lists; blocking takes precedence over allowing.
4. Restrict permitted resources to values common to applicable policies.
5. Enable auto-uninstallation when any contributing policy enables it.
6. Enable prompt collection when any contributing policy enables it.
7. Choose Strict DLP when any contributing prompt policy uses Strict; union monitored Data Groups.
8. Persist or return the effective result with contributing-policy provenance.

### Agent behavior
If effective resolution occurs on the agent instead, the division of responsibility and signed input format are `[TBD]`. The prototype represents a server-readable result.

## Success state
A deterministic effective policy is available for the endpoint, and each installed agent can be labeled Allowed, Blocked, or Unmanaged.

## Failure, retry, and recovery
### Missing or invalid contributing policy
- Condition: A referenced policy/version cannot be loaded or validated.
- Behavior: Do not silently omit the policy; expose an inconsistent state.
- Recovery: Reconcile deployment records and recompute.

## Edge cases
- No policies results in an Unmanaged endpoint.
- Empty intersection of permitted resources means no resource in that category is allowed.
- An agent present in both effective Allow and Block sets is Blocked.
- Strict mode with an empty effective Allow List blocks all agents.

## Related pages
- `page.endpoint.ai-governance.endpoint-details` - Displays contributing and effective controls.

## Open questions
- Are all controls merged using the prototype's restrictive precedence, or can policies have priority/order?
- Should users see a field-level explanation of contributing policies?
