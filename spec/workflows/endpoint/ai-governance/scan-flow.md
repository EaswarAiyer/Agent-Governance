---
id: workflow.endpoint.ai-governance.inventory-refresh
type: workflow
title: AI Agent Scan Flow
status: draft
domain: endpoint
module: ai-governance
features:
  - feature.endpoint.ai-governance.discovery
  - feature.endpoint.ai-governance.endpoint-coverage
  - feature.endpoint.ai-governance.rbac
pages:
  - page.endpoint.ai-governance.overview
  - page.endpoint.ai-governance.agent-details
  - page.endpoint.ai-governance.endpoints
  - page.endpoint.ai-governance.endpoint-details
---

# AI Agent Scan Flow

## Purpose
Synchronize the supported-agent catalog from Crawler, use it to scan managed endpoints for AI agents, detect customer-network application-control mapping differences, and return scan results to the server for AI Governance inventory views.

## Flow
### Server behavior
1. Synchronize the versioned supported-agent catalog from Crawler. The catalog contains each supported AI agent's detection rules and application-control rules.
2. Make the current catalog available to endpoints for scanning and to the AI Agent Policy capability for policy authoring and control enforcement.
3. A catalog change must be used consistently by both paths.
4. Receive endpoint scan data, update the AI-agent inventory, and make it available to authorized technicians in Overview and endpoint views.

### Agent behavior
1. Validate and store the latest Crawler catalog. When its detection or application-control rules change, use the updated rules for the next scan and for policy-control evaluation.
2. Scan the endpoint using Crawler detection rules to identify supported AI-agent installations and relevant metadata.
3. Compare the application-control rule mapping expected by Crawler with the mapping observed or configured in the customer network for each supported agent.
4. Record an application-control mapping difference when the expected and observed mappings do not match.
5. Report the current endpoint inventory, scan catalog version, detections, and mapping-difference results at the configured contact. Notify the team when mapping differences need correction.

## Related pages
- `page.endpoint.ai-governance.overview` - Consumes aggregate inventory.
- `page.endpoint.ai-governance.agent-details` - Consumes agent installations.
- `page.endpoint.ai-governance.endpoints` - Consumes endpoint inventory.
- `page.endpoint.ai-governance.endpoint-details` - Consumes one endpoint's state.
