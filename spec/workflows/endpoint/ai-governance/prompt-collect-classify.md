---
id: workflow.endpoint.ai-governance.prompt-collect-classify
type: workflow
title: Collect and Classify AI Prompt Activity
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.policy-control
  - feature.endpoint.ai-governance.prompt-observability
pages:
  - page.endpoint.ai-governance.policy-details
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.observability
  - page.endpoint.ai-governance.prompt-details
---

# Collect and Classify AI Prompt Activity

> [!info] Related specifications
> **Map:** [[AI-Governance-Map|AI Governance Specification Map]]
> **Features:** [[features/endpoint/ai-governance/policy-control/feature|Policy Control]] · [[features/endpoint/ai-governance/prompt-observability/feature|Prompt Monitoring and Classification]]
> **Pages:** [[pages/endpoint/ai-governance/policy-details|Policy Details]] · [[pages/endpoint/ai-governance/agent-details|Agent Details]] · [[pages/endpoint/ai-governance/observability|Observability]] · [[pages/endpoint/ai-governance/prompt-details|Prompt Details]]

## Purpose
Capture policy-enabled AI interactions, classify sensitive data with selected Data Groups, and apply the configured DLP behavior.

## Trigger
An endpoint observes a prompt-related interaction after a successfully deployed effective policy has enabled Prompt Data Collection.

## Preconditions
- Prompt collection is enabled in the effective policy.
- Relevant Data Group definitions are present on the enforcing component.
- The integration supports collection for the AI agent and interaction channel.

## Inputs
- Agent, model, endpoint, user/account, session, and timestamp context.
- Prompt and response content when available and authorized.
- Zero or more attachments, per-file content/metadata, reasoning summary, and tool calls.
- Effective Data Groups and DLP mode.

## Flow
### Server behavior
1. Distribute current classifier definitions and prompt-DLP configuration with the policy.
2. Receive the interaction event and classification results.
3. Validate, authorize, and store permitted fields under retention controls.
4. Index list metadata and detailed investigation content separately where required.
5. Apply technician endpoint scope before returning observability insights or records.
6. Send aggregate collection, classification, block, and failure counts to ME tracking without prompt, response, attachment, finding, or session content.

### Server -> Agent data
| Field / data | Purpose | Required | Notes |
|---|---|---|---|
| Prompt collection enabled | Activate collection | Yes | |
| DLP mode | Choose Audit or Strict | Yes | Independent of agent control mode |
| Data Group definitions/versions | Detect selected data | Yes | Payload form `[TBD]` |
| Redaction/retention hints | Minimize sensitive content | No | `[TBD]` |

### Agent behavior
1. Observe the supported prompt interaction.
2. Associate agent, model, endpoint, account/user, session, and attachments.
3. Classify prompt data and every attachment using configured Data Groups.
4. In Audit mode, allow the interaction and record matches.
5. In Strict mode, block matching sensitive-data transfers and record the decision; exact interception points are `[TBD]`.
6. Submit the event and enforcement result to the server.

### Agent -> Server response
| Field / data | Purpose | Required | Notes |
|---|---|---|---|
| Interaction ID | Correlate records | Yes | Globally unique behavior `[TBD]` |
| Agent/model/session context | Support investigation | Yes | Availability may vary |
| Prompt/response | Show captured interaction | No | Subject to permissions and support |
| Attachments and findings | Show file-specific risk | No | Multiple files supported |
| General classification | Summarize Data Group result | Yes | May be “none” |
| Reasoning summary/tool calls | Explain activity | No | Never imply unavailable hidden reasoning |
| Enforcement result | Record allowed/blocked/error | Yes | |

## Success state
The interaction is allowed or blocked according to DLP mode, and an authorized user can locate its metadata and available details in observability views.

## Failure, retry, and recovery
### Classifier unavailable
- Condition: Required definitions cannot be loaded or evaluated.
- Behavior: Fail-open/fail-closed behavior is `[TBD]` and must be explicit per mode.
- Recovery: Refresh definitions and retry reporting without duplicating the interaction.

### Upload/storage failure
- Condition: Endpoint cannot submit the event.
- Behavior: Buffer permitted data securely within defined limits.
- Recovery: Retry with idempotency; buffer limits and expiry are `[TBD]`.

## Edge cases
- Collection disabled after a session starts.
- Multiple Data Groups match one item.
- Encrypted, unsupported, oversized, or password-protected attachment.
- Prompt content is unavailable but metadata is observable.
- The observing technician's scope changes after the interaction is stored.

## Related pages
- `page.endpoint.ai-governance.policy-details` - Configures collection and DLP.
- `page.endpoint.ai-governance.agent-details` - Shows agent-scoped events.
- `page.endpoint.ai-governance.observability` - Shows global events.
- `page.endpoint.ai-governance.prompt-details` - Shows one event.

## Open questions
- Which integrations and interaction surfaces are supported?
- What content is retained, redacted, encrypted, or omitted by default?
- What exactly is blocked in Strict mode?
