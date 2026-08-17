---
id: workflow.endpoint.ai-governance.policy-deploy
type: workflow
title: Deploy an AI Agent Policy to Endpoints
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
pages:
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.endpoint-details
---

# Deploy an AI Agent Policy to Endpoints

## Purpose
Associate one policy with a target endpoint group, deliver it to eligible endpoints, and track endpoint-level results.

## Trigger
A user with Deployments Manage permission saves or executes a deployment task from `page.endpoint.ai-governance.deployment-list`. Whether Save and Execute are the same action is `[TBD]`.

## Preconditions
- The selected policy exists and is valid.
- Exactly one policy is mapped to the task.
- The target endpoint group exists and contains endpoints.
- The user can access both the policy and the target group.

## Inputs
- Deployment task identity and name.
- Policy identity and immutable version/checksum `[TBD]`.
- Target endpoint group identity and resolved endpoint membership.
- Actor and request time.

## Flow
### Server behavior
1. Validate authorization, policy, target group, and platform compatibility.
2. Resolve and snapshot target membership for the execution `[TBD]`.
3. Create per-endpoint deployment records in Pending state.
4. Queue the policy for endpoint delivery.
5. Process acknowledgements and update status, remarks, and task summary.

### Server -> Agent data
| Field / data | Purpose | Required | Notes |
|---|---|---|---|
| Deployment/task ID | Correlate delivery | Yes | Idempotency key behavior `[TBD]` |
| Policy ID and version | Identify intended policy | Yes | Must not drift during delivery |
| Agent control settings | Enforce allow/block and mode | Yes | Includes auto-uninstall |
| Advanced execution rules | Constrain allowed agents | No | Per-agent folders and groups |
| Prompt/DLP settings | Configure monitoring | No | Includes collection, Data Groups, DLP mode |

### Agent behavior
1. Receive or fetch the queued policy during supported delivery/contact.
2. Validate platform compatibility and policy structure.
3. Apply controls atomically where possible.
4. Perform authorized auto-uninstallation when applicable.
5. Return acknowledgement, resulting status, and remarks.

### Agent -> Server response
| Field / data | Purpose | Required | Notes |
|---|---|---|---|
| Deployment/task ID | Correlate result | Yes | |
| Endpoint ID | Identify target | Yes | |
| Policy ID/version | Confirm applied artifact | Yes | |
| Status | Report Success, Pending, or Failed | Yes | Final status taxonomy `[TBD]` |
| Remarks/error | Explain result | Yes | Should be actionable |
| Applied time | Establish recency | Yes | |

## Success state
Every resolved target endpoint reaches a terminal result, successful endpoints report the intended policy version, and effective controls are recalculated.

## Failure, retry, and recovery
### Offline endpoint
- Condition: Endpoint cannot receive the policy.
- Behavior: Keep Pending with last-contact context.
- Recovery: Deliver on the next contact until expiry `[TBD]`.

### Validation or application failure
- Condition: Endpoint rejects or cannot apply the policy.
- Behavior: Mark Failed with remarks and preserve previous effective controls.
- Recovery: Automatic and manual retry policies are `[TBD]`.

### Partial deployment
- Condition: Some endpoints succeed and others do not.
- Behavior: Preserve per-endpoint results; do not represent the task as wholly successful.
- Recovery: Retry or rollback behavior is `[TBD]`.

## Edge cases
- Endpoint changes group membership during deployment.
- Policy is edited, deleted, or superseded during delivery.
- Duplicate delivery or acknowledgement.
- Target OS does not match policy OS.

## Related pages
- `page.endpoint.ai-governance.deployment-list` - Creates/modifies the task.
- `page.endpoint.ai-governance.deployment-details` - Shows status and remarks.
- `page.endpoint.ai-governance.endpoint-details` - Shows applied policy state.

## Open questions
- What acknowledgement means Success: received, validated, activated, or verified?
- What are retry intervals, expiration, scheduling, cancellation, and rollback rules?
