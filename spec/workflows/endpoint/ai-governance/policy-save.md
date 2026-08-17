---
id: workflow.endpoint.ai-governance.policy-save
type: workflow
title: Create or Modify an AI Agent Policy
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
pages:
  - page.endpoint.ai-governance.policy-list
  - page.endpoint.ai-governance.policy-details
---

# Create or Modify an AI Agent Policy

## Purpose
Validate and persist a reusable, OS-specific AI-agent control and prompt-DLP policy.

## Trigger
A user with Policies Manage permission selects Save policy on `page.endpoint.ai-governance.policy-details`.

## Preconditions
- The user is authorized to create or modify policies.
- The selected Data, Website, and Application Groups still exist and are accessible.
- Every advanced rule references an agent currently in the Allow List.
- Administrative-group support for shared CG/DCG access by scoped technicians is not available in the current release.

## Inputs
- Policy name and OS platform.
- Allow List, Block List, and agent enforcement mode.
- Auto-uninstallation setting.
- Zero or more per-agent advanced execution rules.
- Prompt collection setting, Data Groups, and DLP mode.

## Flow
### Client behavior
1. Validate required fields and mutually exclusive agent lists.
2. Submit the complete policy definition and, for modification, its identity/version.

### Server behavior
1. Authorize the mutation and validate all identifiers and combinations.
2. Reject allow/block overlap and advanced rules for non-allowlisted agents.
3. Persist the new policy or a new version of the existing policy; versioning is `[TBD]`.
4. Record who modified the policy and when.
5. Record successful create/modify operations in the Endpoint Central Action Log and aggregate operation success/failure through ME tracking without sensitive policy values.
6. Return the saved identity and state.

## Success state
The policy list displays the saved policy with its platform, modes, counts/settings, modifier, and last-modified time.

## Failure, retry, and recovery
### Validation failure
- Condition: Required, conflicting, invalid, or inaccessible references are submitted.
- Behavior: Do not persist; return field-level errors.
- Recovery: Preserve the draft and focus the first invalid section.

### Concurrent modification
- Condition: The submitted version is older than the current version.
- Behavior: Do not overwrite silently.
- Recovery: Conflict and merge behavior is `[TBD]`.

## Edge cases
- Empty Allow List in Strict mode blocks all agents.
- Empty Allow List in Audit mode does not block agents not on the Block List.
- Turning prompt collection off disables dependent classifier and DLP controls.
- Removing an allowlisted agent invalidates or removes its advanced rules.

## Related pages
- `page.endpoint.ai-governance.policy-details` - Initiates and validates the save.
- `page.endpoint.ai-governance.policy-list` - Shows the saved result.

## Open questions
- Are drafts, approvals, version history, and rollback required?
- What happens to active deployments when an associated policy is edited?
