# BlackRoad GitHub Enterprise Secrets Inventory
**Date**: 2026-03-29
**Source**: gh secret list + collab inbox

## Organization Secrets

### BlackRoadOS (NEW canonical org)
| Secret | Deployed | Visibility |
|--------|----------|------------|
| TAILSCALE_AUTH_KEY | 2026-03-29 04:47:36Z | all |
| TAILSCALE_API_KEY | 2026-03-29 04:47:36Z | all |

### BlackRoad-OS-Inc (corporate)
| Secret | Deployed | Visibility |
|--------|----------|------------|
| TAILSCALE_AUTH_KEY | 2026-03-29 04:47:37Z | all |
| TAILSCALE_API_KEY | 2026-03-29 04:47:37Z | all |
| STRIPE_SECRET_KEY | 2026-03-28 (per collab) | all |
| CLERK_SECRET_KEY | 2026-03-28 | all |
| HF_TOKEN | 2026-03-28 | all |
| NPM_TOKEN | 2026-03-28 | all |
| COINBASE_API_KEY | 2026-03-28 | all |
| BASE44_API_KEY | 2026-03-28 | all |
| RAILWAY_TOKEN | 2026-03-28 | all |
| VERCEL_TOKEN | 2026-03-28 | all |

### BlackRoad-OS (main open-source)
| Secret | Deployed | Visibility |
|--------|----------|------------|
| TAILSCALE_AUTH_KEY | 2026-03-29 04:47:38Z | all |
| TAILSCALE_API_KEY | 2026-03-29 04:47:38Z | all |
| (+ same 8 secrets as OS-Inc per collab) | 2026-03-28 | all |

### BlackRoad-AI
| Secret | Deployed | Visibility |
|--------|----------|------------|
| TAILSCALE_AUTH_KEY | 2026-03-29 04:47:39Z | all |
| TAILSCALE_API_KEY | 2026-03-29 04:47:39Z | all |

### BlackRoad-Labs
| Secret | Deployed | Visibility |
|--------|----------|------------|
| TAILSCALE_AUTH_KEY | 2026-03-29 04:47:40Z | all |
| TAILSCALE_API_KEY | 2026-03-29 04:47:40Z | all |

## Cloudflare Worker Secrets
18 secrets deployed across Workers (per collab inbox, 2026-03-28)

## Enterprise Rulesets (from memory)
- 5 rulesets: branch protection, tag protection, sensitive file blocking, agent config
- SHA pinning enabled
- 4 self-hosted runners: octavia-pi, lucidia-pi (arm64), gematria, anastasia (x64)

## Gaps
- **11 orgs** have no secrets deployed (Media, Education, Interactive, Studio, Foundation, Gov, Security, Hardware, Cloud, Ventures, Blackbox-Enterprises)
- **Tailscale only on 5 orgs** — consider deploying to all 16
- **STRIPE/CLERK/etc only on 3 orgs** — may need expansion
- **Enterprise-level secrets** not set (API returns 404)
- **No secret rotation policy** — tokens don't auto-expire/rotate
