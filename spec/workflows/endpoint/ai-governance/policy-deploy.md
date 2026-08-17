---
id: workflow.endpoint.ai-governance.policy-deploy
type: workflow
title: Deploy an AI Agent Policy to Endpoints
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-deployment
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.deployment-list
  - page.endpoint.ai-governance.deployment-editor
  - page.endpoint.ai-governance.deployment-details
  - page.endpoint.ai-governance.endpoint-details
---

# Deploy an AI Agent Policy to Endpoints

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-deployment/feature|Policy Deployment]] · [[features/endpoint/ai-governance/rbac/feature|Role-Based Access]]
> **Pages:** [[pages/endpoint/ai-governance/deployment-list|Deployment List]] · [[pages/endpoint/ai-governance/deployment-editor|Deployment Editor]] · [[pages/endpoint/ai-governance/deployment-details|Deployment Details]] · [[pages/endpoint/ai-governance/endpoint-details|Endpoint Details]]

## Purpose
Associate one policy with a target endpoint group, deliver it to eligible endpoints, and track endpoint-level results.

## Trigger
A user with AI Agent Policy Deployment Write or Full saves, executes, or retries a deployment task from `page.endpoint.ai-governance.deployment-editor`. Whether Save and Execute are the same action is `[TBD]`.

## Preconditions
- The selected policy exists and is valid.
- The user has AI Agent Policy Deployment Write or Full; Read alone cannot mutate or execute a task.
- Exactly one policy is mapped to the task.
- The target endpoint group exists and contains endpoints.
- The user can access both the policy and the target group.
- Every resolved target endpoint is within the technician's existing Endpoint Central scope.
- Shared CG/DCG administrative-group deployment for scoped technicians is not supported in the current release.

## Inputs
- Deployment task identity and name.
- Policy identity and immutable version/checksum `[TBD]`.
- Target endpoint group identity and resolved endpoint membership.
- Actor and request time.

## Flow
### Server behavior
1. Validate authorization through `workflow.endpoint.ai-governance.authorize-access`, then validate the policy, target group, and platform compatibility.
2. Resolve the target group's current membership within the technician's Endpoint Central scope; do not use an immutable creation-time endpoint snapshot.
3. Create per-endpoint deployment records in Pending state and set a newly saved task to Yet to start until endpoints begin reading the policy.
4. Queue or expose the policy for endpoint delivery and move the task to In progress when endpoint processing begins.
5. Process acknowledgements and update per-endpoint status, remarks, and task summary.
6. Set the task to Completed when every endpoint in the currently resolved target membership has reported a terminal result; per-endpoint failures remain visible and do not create a separate Failed task state.
7. Record deployment create/modify/delete and auto-uninstallation as applicable in the Endpoint Central Action Log.
8. Send aggregate deployment adoption and failure metrics to ME tracking without policy or endpoint-sensitive values.

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
The task is Completed when every endpoint in the currently resolved target-group membership reaches a terminal result. Successful endpoints report the intended policy version, failed endpoint results remain visible, and effective controls are recalculated for successful applications.

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
- Recovery: Retry behavior is `[TBD]`; rollback is not provided in the current release.

## Edge cases
- Endpoint changes group membership during deployment; current group membership is authoritative rather than the original membership.
- Endpoint leaves the technician's scope after task creation.
- Policy is edited, deleted, or superseded during delivery.
- Duplicate delivery or acknowledgement.
- Target OS does not match policy OS.

## Related pages
- `page.endpoint.ai-governance.deployment-list` - Creates/modifies the task.
- `page.endpoint.ai-governance.deployment-editor` - Provides the dedicated task creation/modification form and initiates save/deploy.
- `page.endpoint.ai-governance.deployment-details` - Shows status and remarks.
- `page.endpoint.ai-governance.endpoint-details` - Shows applied policy state.

## Open questions
- What acknowledgement means Success: received, validated, activated, or verified?
- What are retry intervals, eligibility, limits, and expiration behavior?
- If current group membership changes after a task reaches Completed, does the task return to In progress until the new targets report?
