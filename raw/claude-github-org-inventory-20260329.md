# BlackRoad GitHub Organization Inventory
**Date**: 2026-03-29
**Source**: gh CLI API queries

## Enterprise
- **Enterprise**: github.com/enterprises/blackroad-os
- **Seats**: 1,000 (per memory — API returned 404, needs enterprise admin token)
- **Billing**: $21/mo seat + $1 budgets on 7 products

## Organization Breakdown

### Tier 1: Core (831 repos)
| Org | Repos | Purpose | Secrets |
|-----|-------|---------|---------|
| BlackRoad-OS | 500 | Main open-source org | TAILSCALE_AUTH_KEY, TAILSCALE_API_KEY + 18 others |
| BlackRoad-OS-Inc | 330 | Corporate/private repos | TAILSCALE_AUTH_KEY, TAILSCALE_API_KEY + 18 others |
| BlackRoadOS | 1 | NEW canonical product org (app.blackroad.io) | TAILSCALE_AUTH_KEY, TAILSCALE_API_KEY |

### Tier 2: Product Orgs (344 repos)
| Org | Repos | Purpose |
|-----|-------|---------|
| BlackRoad-AI | 81 | AI models, training, inference |
| BlackRoad-Cloud | 63 | Cloud infrastructure, workers |
| BlackRoad-Labs | 52 | Research, experimental projects |
| BlackRoad-Media | 52 | Video, streaming, social media |
| BlackRoad-Studio | 50 | Creator tools (canvas, writing, video) |
| BlackRoad-Interactive | 44 | Games, metaverse, interactive |

### Tier 3: Vertical Orgs (176 repos)
| Org | Repos | Purpose |
|-----|-------|---------|
| BlackRoad-Security | 41 | Security tools, auditing |
| BlackRoad-Education | 34 | Tutoring, homework, learning |
| BlackRoad-Hardware | 30 | Pi fleet, Hailo, edge devices |
| BlackRoad-Gov | 28 | RoadCoin, governance, policy |
| BlackRoad-Foundation | 26 | Community, open source foundation |
| BlackRoad-Ventures | 17 | Investment, partnerships |

### Legacy
| Org | Repos | Purpose |
|-----|-------|---------|
| Blackbox-Enterprises | 15 | Original org (pre-BlackRoad) |
| blackboxprogramming | 5 | Personal account |

## Totals
- **16 organizations** + 1 personal account
- **~1,369 repositories** (500 may be the API pagination limit for BlackRoad-OS)
- **34 total orgs** in enterprise (per memory — 16 verified via API)

## Key Repos
| Repo | Org | Description |
|------|-----|-------------|
| app | BlackRoadOS | Main product — EMPTY, needs code push |
| blackroad-disaster-recovery | blackboxprogramming | DR documentation (private) |
| blackroad-garage | blackboxprogramming | Garage/workshop (private) |
| roadc | blackboxprogramming | RoadC language (public) |
| BLACKROAD-OS-MASTER | blackboxprogramming | Master planning (private) |
| Pico3D | blackboxprogramming | 3D engine (public) |

## Secrets Deployed
### Tailscale (deployed 2026-03-29)
- TAILSCALE_AUTH_KEY: 5 orgs, visibility=all
- TAILSCALE_API_KEY: 5 orgs, visibility=all

### Previously Deployed (per collab inbox)
- STRIPE_SECRET_KEY, CLERK_SECRET_KEY, HF_TOKEN, NPM_TOKEN, COINBASE_API_KEY, BASE44_API_KEY, RAILWAY_TOKEN, VERCEL_TOKEN — 3 orgs (Inc, OS, BlackRoadOS)
- 18 secrets on CF Workers

## Observations
1. BlackRoadOS org has only 1 repo (app) and it's empty — this is supposed to be THE canonical org
2. BlackRoad-OS has 500 repos but may have more (API pagination limit)
3. 34 orgs claimed in enterprise but only 16 verified via API
4. Most repos are likely forks — need audit of original vs forked content
