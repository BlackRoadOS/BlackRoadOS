# RoadAuth — Enterprise IAM Analysis
**Source**: Grok (xAI) analysis, 2026-03-29

RoadAuth is BlackRoad OS's dedicated enterprise-grade identity and access management (IAM) component. It serves as the security and authentication layer for the sovereign computing platform.

## Overview
- **Positioning**: "Enterprise identity and access management" — "IAM built for compliance" with "zero compliance gaps"
- **Repository**: github.com/BlackRoad-OS/roadauth
- **Live Interface**: auth.blackroad.io (sign-in/sign-up with password requirements)
- **Tech Surface**: Primarily HTML frontend, with AGENTS.md, SECURITY.md, BRAND_IDENTITY.md, GitHub workflows. 22 commits on master.

## Supported Protocols
- JWT (JSON Web Tokens)
- MFA (TOTP and WebAuthn)
- OAuth2
- LDAP
- SAML

## Additional Capabilities
- Multi-factor authentication and passwordless options
- Authorization controls (RBAC or similar)
- Integration with AI agents (via AGENTS.md)
- Compliance-oriented audit logging
- Sovereignty-first: runs locally on edge hardware

## Integration with RoadID

RoadAuth acts as the secure gateway complementing RoadID:

### Layered Architecture
- **RoadAuth** = Front-end security and access governance
  - Verifies users/agents before granting access
  - Issues JWTs or session tokens after successful auth
  - Enforces RBAC across 20+ apps, agent fleet, mesh nodes
  - Logs auth events for audit trails

- **RoadID + PS-SHA∞** = Back-end persistent identity and memory
  - Once authenticated, interactions tie into RoadID journals
  - Every post-auth action generates commits in PS-SHA∞ journal
  - Creates tamper-evident, verifiable history linked to authenticated RoadID

### Integration Flow
1. User/agent authenticates at auth.blackroad.io (JWT/MFA/OAuth2)
2. Successful auth yields token referencing a RoadID
3. Operations authorized by RoadAuth, recorded in PS-SHA∞ journal
4. RoadAuth audit logging cross-verifies with RoadID "chain active" Memory Hash
5. On RoadID export/import, RoadAuth ensures secure transfer while PS-SHA∞ preserves integrity

### Closed Sovereign Loop
- RoadAuth prevents unauthorized access
- PS-SHA∞ ensures authorized actions leave immutable, verifiable trace
- Combination supports compliance without external cloud IAM

## PS-SHA∞ Relationship

PS-SHA∞ is NOT directly implemented inside RoadAuth. It originates from the RoadID persistence layer. The separation makes sense:

- **Separation of Concerns**: RoadAuth handles real-time auth (protocol-heavy). PS-SHA∞ is a lightweight memory primitive.
- **Edge Efficiency**: RoadAuth runs lightweight auth flows while PS-SHA∞ journals stay low-overhead
- **Scalability**: RoadAuth scales JWT issuance, PS-SHA∞ handles growing memory chains

## Strengths
- Compliance without compromise: enterprise protocols (LDAP/SAML/MFA) while fully self-hosted
- Privacy and auditability: pairs access controls with tamper-evident journals
- Capital efficiency: avoids costly cloud IAM services
- Future-proofing: supports scaling to larger agent swarms

## Current State (March 2026)
- Early-stage, ~4 months old
- Frontend functional for sign-in
- Deeper backend logic internal or evolving
- No public releases yet
