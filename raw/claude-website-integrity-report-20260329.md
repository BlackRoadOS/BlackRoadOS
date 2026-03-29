# BlackRoad Website Integrity Report
**Date**: 2026-03-29
**Source**: curl HTTP probes

## Domain Portfolio
- **20 root custom domains** (per Cloudflare inventory)
- **17 product subdomains** on blackroad.io tested
- **100% uptime** on all tested endpoints

## Subdomain Status
| Subdomain | HTTP | Purpose | Worker |
|-----------|------|---------|--------|
| blackroad.io | 200 | Landing page | CF Pages/Worker |
| app.blackroad.io | 200 | Browser OS (main product) | CF Worker |
| chat.blackroad.io | 200 | Sovereign chat rooms | CF Worker + D1 |
| search.blackroad.io | 200 | Search engine | CF Worker |
| tutor.blackroad.io | 200 | AI homework solver ($1/solve) | CF Worker + Stripe |
| pay.blackroad.io | 200 | Payments/subscriptions | CF Worker + Stripe |
| social.blackroad.io | 200 | Social network | CF Worker + D1 |
| status.blackroad.io | 200 | Status dashboard + KPI API | CF Worker |
| canvas.blackroad.io | 200 | Design/drawing studio | CF Worker |
| cadence.blackroad.io | 200 | Music/audio creation | CF Worker |
| roadcode.blackroad.io | 200 | Code platform | CF Worker |
| video.blackroad.io | 200 | Video editing studio | CF Worker |
| live.blackroad.io | 200 | Live streaming | CF Worker |
| game.blackroad.io | 200 | Games/interactive | CF Worker |
| radio.blackroad.io | 200 | Radio/audio streaming | CF Worker |
| book.blackroad.io | 301 | Documentation (redirect) | CF Worker |
| work.blackroad.io | 302 | Workspace (redirect) | CF Worker |

## Root Domains (from memory — 20 total)
Managed via Cloudflare DNS. Full list in cloudflare-domains.md memory file.

## Infrastructure
- All subdomains served via Cloudflare Workers
- D1 databases for persistence (chat, social, products)
- R2 for static assets (images.blackroad.io)
- Stripe integration on tutor + pay
- Auth via auth.blackroad.io (JWT tokens)

## Quality Notes
- All 17 tested endpoints return valid responses
- Content sizes: 10KB-55KB per page (real content, not empty)
- Previous session confirmed v2 upgrades on chat, social, tutor
- app.blackroad.io now has real dashboard with auth, fleet status, search

## Known Issues
- Wrangler token expired — can't deploy updates until re-authenticated
- book.blackroad.io and work.blackroad.io redirect instead of serving content
- Local services (roundtrip, roadcode) all down — only CF-hosted versions work
- hq.blackroad.io needs DNS CNAME (Pixel HQ Worker deployed but not routed)

## Untested Subdomains
These exist per product registry but weren't tested:
- auth.blackroad.io, hq.blackroad.io, api.blackroad.io
- Various root domains: lucidiaqi.com, blackroad.systems, roadcoin.io, roadchain.io, blackroadquantum.com, blackroadquantum.shop, lucidia.studio
