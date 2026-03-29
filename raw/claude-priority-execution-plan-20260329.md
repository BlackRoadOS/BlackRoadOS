# BlackRoad Priority Execution Plan
**Date**: 2026-03-29
**Context**: Full system audit complete. 12GB disk free. 3 Pis down. $0 revenue.

## Immediate (Today)

### 1. Physical Fleet Recovery
- [ ] Power cycle Octavia, Cecilia, Lucidia
- [ ] Verify SSH reconnection
- [ ] Check Gitea (Octavia), Ollama (Cecilia), nginx (Lucidia)
- [ ] Run `wg show` on each to verify WireGuard mesh
- **Why**: 80% of self-hosted stack is down

### 2. Re-authenticate Cloud Services
- [ ] `wrangler login` — unblocks all CF Worker management
- [ ] `doctl auth init` — unblocks droplet management
- [ ] Fix Gematria/Anastasia SSH keys via DO console
- [ ] `railway login` if Railway services exist
- **Why**: Can't deploy or manage anything without auth

### 3. Verify Stripe Live Mode
- [ ] Check if products are in test mode vs live mode
- [ ] If test: create live mode products and prices
- [ ] Test a real $1 checkout on tutor.blackroad.io
- **Why**: Can't collect money in test mode

## This Week

### 4. Drive Traffic to Tutor (P0 — First Revenue)
- [ ] SEO optimize tutor.blackroad.io (meta tags, structured data, sitemap)
- [ ] Submit to Google Search Console
- [ ] Post on Reddit (r/HomeworkHelp, r/learnmath, r/AskAcademia)
- [ ] Create TikTok/Twitter content showing AI solving homework
- [ ] Consider $5-10/day Google Ads experiment
- **Why**: Product works, zero traffic is the only problem

### 5. Push Code to BlackRoadOS/app
- [ ] Deploy app.blackroad.io source to BlackRoadOS/app repo
- [ ] This is THE canonical product — the repo shouldn't be empty
- **Why**: BlackRoadOS org exists but has no code

### 6. Install Tailscale on Fleet
- [ ] Install on all 7 nodes using the deployed auth key
- [ ] Configure ACLs
- [ ] Test MagicDNS
- [ ] Create health-check GitHub Action using Tailscale
- **Why**: Keys deployed, mesh connectivity is the next step

## This Month

### 7. Form 1120 Filing (due 04/15)
- [ ] Prepare tax return (likely $0 revenue, startup expenses)
- [ ] File or request extension
- **Why**: Legal deadline in 17 days

### 8. Cloudflare Token Automation
- [ ] Build `br auth-refresh` command
- [ ] Set up token rotation reminders
- **Why**: Tokens keep expiring, breaking all deployments

### 9. Complete P2 — SEO & Discoverability
- [ ] Already 52% done (50/99 todos)
- [ ] Focus on Google indexing for all 17 websites
- [ ] GitHub Topics on all 1,369 repos
- **Why**: Closest priority to completion

## Backlog (Not Now)
- P5 OpenClaw (0%)
- P6 Amundson Math paper (0%)
- P7 Operator Tooling (0%)
- P9 Org Architecture (1%)
- 29 planned products (don't start any)
- New domains/workers/repos (NO — fix what exists)
