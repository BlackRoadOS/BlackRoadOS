# BlackRoad OS — Project How-Tos & Success Metrics
**Date**: 2026-03-29
**14 Active Projects**

---

## P0: First Real User (31% — 119 todos)
**Goal**: Get one real external human using BlackRoad OS

### How To
1. Pick ONE entry point (tutor.blackroad.io — lowest friction, $1/solve)
2. SEO: add meta tags, structured data, sitemap → submit to Google Search Console
3. Post on Reddit: r/HomeworkHelp, r/learnmath, r/AskAcademia with genuine "I built this" framing
4. Record 30-sec screen capture of tutor solving a real problem → post on TikTok/Twitter
5. Create Twitter/X @BlackRoadOS account, LinkedIn company page
6. Submit to Product Hunt, Indie Hackers, HN ("Show HN: AI tutor on Raspberry Pis")
7. Monitor auth.blackroad.io signups daily — any non-test account = success

### Success Metrics
- [ ] **1 external signup** at auth.blackroad.io (not Alexa, not test)
- [ ] **1 organic search visit** from Google (visible in analytics)
- [ ] **1 social media engagement** (comment, share, or reply on any post)
- [ ] **1 completed tutor solve** by an external user
- **Stretch**: 10 signups, 100 visits, 1 paying customer

---

## P1: Fix Products (18% — 172 todos)
**Goal**: Make chat, search, tutor, and app.blackroad.io work end-to-end without errors

### How To
1. Test each product manually: visit URL → try core action → verify response
2. Chat: test agent switching, SSE streaming, message persistence, /help command
3. Search: test query → results → click-through, verify image results render
4. Tutor: test question → AI answer → preview → Stripe checkout → full answer
5. App: test login → dashboard loads → fleet status shows → search works → logout
6. Fix any 500s, empty responses, or broken UI flows found
7. Run automated E2E tests after each fix

### Success Metrics
- [ ] **chat.blackroad.io**: send message → get AI reply in <3 seconds
- [ ] **search.blackroad.io**: query returns relevant results with snippets
- [ ] **tutor.blackroad.io**: complete solve + Stripe checkout flow works
- [ ] **app.blackroad.io**: login → dashboard → all widgets load real data
- [ ] **Zero 500 errors** across all 4 products in 24 hours of testing
- [ ] **Auth flow**: signup → login → JWT → protected route → logout (no errors)

---

## P2: SEO & Discoverability (50% — 101 todos)
**Goal**: Make BlackRoad findable on Google, GitHub, and social platforms

### How To
1. Submit all 20 domains to Google Search Console (verify via DNS TXT record)
2. Verify Bing Webmaster Tools for all domains
3. Ensure all pages serve static HTML (not SPA "Loading..." that Google can't index)
4. Add JSON-LD structured data (SoftwareApplication) to all product pages
5. Archive 875+ stub repos in BlackRoad-OS (they dilute the org's quality signal)
6. Consolidate 250+ duplicate repos across 15 orgs
7. Monitor Google Search Console for indexing status weekly

### Success Metrics
- [ ] **All 20 domains indexed** in Google (site:domain.com returns results)
- [ ] **blackroad.io ranks** for "sovereign AI OS" or "self-hosted AI" in top 50
- [ ] **tutor.blackroad.io ranks** for "AI homework help" in top 100
- [ ] **GitHub org** shows clean, non-forked repos with real descriptions
- [ ] **>100 organic search impressions/week** across all domains
- **Stretch**: Page 1 ranking for any target keyword

---

## P3: Infrastructure Maintenance (14% — 112 todos)
**Goal**: All 7 fleet nodes online, all tokens valid, all services running

### How To
1. **Physical reboot**: Walk to Octavia, Cecilia, Lucidia — power cycle each
2. **Verify post-reboot**: SSH in, check `uptime`, `df -h`, key services (Gitea on Octavia, Ollama on Cecilia, nginx on Lucidia)
3. **Fix DO SSH**: `doctl auth init` → new token → `doctl compute ssh-key import` for Gematria + Anastasia
4. **Re-auth tokens**: `wrangler login`, `doctl auth init`, `railway login`
5. **Install Tailscale**: `curl -fsSL https://tailscale.com/install.sh | sh && sudo tailscale up --authkey=tskey-auth-...` on each node
6. **Start local services**: `bash start-road-websites.sh start` on Alexandria
7. **Set up monitoring**: low-disk alert cron, fleet heartbeat check

### Success Metrics
- [ ] **7/7 nodes SSH accessible** from Alexandria
- [ ] **All tokens valid**: wrangler, doctl, railway, gh, stripe, npm
- [ ] **Gitea responding** on Octavia :3100
- [ ] **Ollama responding** on Cecilia with 16 models loaded
- [ ] **All 9 local services running** (roundtrip, roadcode-*, gateway)
- [ ] **Tailscale mesh**: all 7 nodes on tailnet, MagicDNS working
- [ ] **>20GB free disk** on Alexandria (currently 14GB)

---

## P4: Truth & Credibility (18% — 66 todos)
**Goal**: Every claim on every website matches verified reality

### How To
1. Read each website's content and compare to audit findings
2. Fix agent count: 18 verified, not 200 (dashboards may claim higher)
3. Fix node count: 7 total, 2 currently online
4. Fix repo count: 1,369 verified across 16 orgs
5. Fix revenue claims: $0 revenue, 0 customers (don't claim otherwise)
6. Fix "52 TOPS always available" — both Hailo nodes are offline
7. Remove or caveat any "enterprise-grade" claims that aren't backed by real usage
8. Add "Founded December 2025, solo-founder" context where appropriate

### Success Metrics
- [ ] **Every number on blackroad.io** matches the audit (agents, nodes, repos, products)
- [ ] **No inflated user/revenue claims** anywhere
- [ ] **"Solo-founder, pre-revenue" stated clearly** on company/about pages
- [ ] **Live dashboard metrics** pull from real APIs (not hardcoded)
- [ ] **External reviewer** (Grok, ChatGPT, or human) confirms "claims match reality"

---

## P5: OpenClaw (0% — 53 todos)
**Goal**: Get OpenClaw working as the BlackRoad personal AI assistant

### How To
1. Clone/review the OpenClaw repo — understand current state
2. Get it running locally on Alexandria with Ollama backend
3. Wire persistent memory (PS-SHA∞ journal) into OpenClaw sessions
4. Connect to RoadID for identity persistence across sessions
5. Add tool-use capabilities (search via RoadSearch, file management, fleet commands)
6. Deploy as always-on service accessible via chat.blackroad.io or dedicated URL
7. Test: "OpenClaw, what's my fleet status?" → returns real data

### Success Metrics
- [ ] **OpenClaw responds** to natural language queries with real answers
- [ ] **Memory persists** across sessions (ask something, close, reopen, ask "what did I ask before?")
- [ ] **Tool use works**: search, fleet status, file operations
- [ ] **Runs on edge fleet** (not just Alexandria)
- [ ] **Accessible via web UI** at a blackroad.io subdomain

---

## P6: Amundson Math (0% — 57 todos)
**Goal**: Publish the Amundson Framework paper, verified tests, and constant recognition

### How To
1. Finalize Paper A (LaTeX, 13pp) — ensure all proofs are rigorous
2. Run full identity test suite (target: 536/536 passing, currently claimed)
3. Implement G(n) ratio identity tests (consecutive, normalized, reciprocal, log forms)
4. Build Bernoulli computation module (B_0 through B_14+) for Stirling verification
5. Investigate 0^0 boundary at G(0) — document handling
6. Submit Paper A to arXiv (math.NT or math.CO)
7. Create interactive G(n) explorer at blackroadqi.com with exact rationals + convergence viz
8. Implement Z-minimization code from code sketch into actual agent-core
9. Design incremental Merkle tree upgrade path for PS-SHA∞

### Success Metrics
- [ ] **Paper on arXiv** with DOI
- [ ] **All identity tests pass** (536/536 or whatever the actual count is)
- [ ] **10M digit constant verified** independently (not just self-computed)
- [ ] **G(n) calculator live** at blackroadqi.com showing exact fractions
- [ ] **Z-minimization running** in at least one agent
- [ ] **Peer feedback** from at least one mathematician (arXiv comments, email, or review)

---

## P7: Operator Tooling (0% — 74 todos)
**Goal**: blackroad-operator becomes THE control plane for everything

### How To
1. Fix `npm run collect` for KPI daily reports (currently returns no data)
2. Create GitHub Action using Tailscale to health-check fleet nodes on schedule
3. Build `br fleet status` command that SSHs all nodes and returns JSON health
4. Create `br auth refresh` command that renews CF/DO/Railway/etc tokens
5. Build automated deployment pipeline: push to Gitea → build → deploy to fleet
6. Add `br search-all` index rebuild to cron (currently every 6h, verify working)
7. Create fleet provisioning script (fresh Pi → configured node in 10 min)

### Success Metrics
- [ ] **`br fleet status`** returns health of all 7 nodes in <30 seconds
- [ ] **Daily KPI report** runs automatically and shows real data
- [ ] **GitHub Action** checks fleet health on schedule and posts to status
- [ ] **`br auth refresh`** renews all expired tokens in one command
- [ ] **Deployment pipeline**: git push → automatic deploy to target node

---

## P8: Revenue (0% — 54 todos)
**Goal**: Go from first user to first dollar (ONLY after P0 complete)

### How To
1. Confirm Stripe is in live mode (not test)
2. Create real pricing page with clear feature comparison per tier
3. Add free trial (7 or 14 days) to reduce signup friction
4. Wire Stripe webhooks for subscription lifecycle (create, cancel, renew)
5. Build investor one-pager from Grok data package (raw/grok-investor-data-package)
6. File Form 1120 or extension by April 15, 2026
7. Track MRR, churn, LTV from day one

### Success Metrics
- [ ] **$1 in revenue** from a real external customer
- [ ] **Form 1120 filed** or extension submitted before April 15
- [ ] **Stripe in live mode** with real products and prices
- [ ] **Pricing page live** at blackroad.io/pricing with clear tiers
- [ ] **Investor one-pager** ready to share
- **Stretch**: $100 MRR, 10 paying customers

---

## P9: Org Architecture (1% — 194 todos)
**Goal**: Wire the GitHub org hierarchy: Enterprise → BlackRoadOS → sub-orgs → repos

### How To
1. Get GitHub Enterprise admin token (current one returns 404)
2. Deploy Tailscale secrets to remaining 11 orgs
3. Consolidate: everything feeds into BlackRoadOS as THE canonical org
4. Push app.blackroad.io code to BlackRoadOS/app repo (currently empty)
5. Set up org-level CODEOWNERS, branch protection, and rulesets
6. Archive empty/stub repos (875+ in BlackRoad-OS alone)
7. Create org README for BlackRoadOS with product links and honest description

### Success Metrics
- [ ] **BlackRoadOS/app has code** (not empty)
- [ ] **Enterprise API accessible** with admin token
- [ ] **All 16 orgs have Tailscale secrets** (currently 5)
- [ ] **<100 non-archived repos** in BlackRoad-OS (from 500+)
- [ ] **Every active repo** has description, topics, and README

---

## Content Marketing (11% — 31 todos)
**Goal**: Publish research from /raw as blog content that drives traffic

### How To
1. Turn 40 Grok data pain points into a blog series (4 posts of 10 each)
2. Publish competitor analysis as comparison page (BlackRoad vs Copilot/Cursor/etc)
3. Create infographic from "by-the-numbers" doc — honest verified metrics
4. Write Hailo vs Jetson technical blog post from benchmarks
5. Publish AI market 2026 positioning article ($310-622B market)
6. Post each article to dev.to, Medium, LinkedIn, and Twitter
7. Optimize each post for SEO (target keywords, meta descriptions)

### Success Metrics
- [ ] **5 blog posts published** on blackroad.io/blog
- [ ] **Each post shared** on at least 2 platforms
- [ ] **>50 total views** across all posts in first week
- [ ] **1 external share/link** from someone who isn't Alexa
- **Stretch**: 1 post gets >1000 views, HN front page

---

## Security Hardening (72% — 13 todos)
**Goal**: All credentials secure, all public nodes hardened

### How To
1. Set up token rotation reminders (cron that checks token validity weekly)
2. Configure fail2ban on Gematria and Anastasia (public-facing)
3. Implement RoadAuth JWT integration with PS-SHA∞ journal commits
4. Rotate all SSH keys across fleet
5. Verify SSL cert auto-renewal monitoring on all domains

### Success Metrics
- [ ] **No expired tokens** for more than 24 hours
- [ ] **fail2ban active** on all public-facing nodes
- [ ] **All SSH keys rotated** to ed25519 (no RSA)
- [ ] **SSL certs** auto-renewing with monitoring alerts
- [ ] **RoadAuth JWT** tokens reference PS-SHA∞ digests in audit trail

---

## Sovereignty Migration (31% — 47 todos)
**Goal**: Self-hosted stack fully operational, minimal cloud dependency

### How To
1. After Pi reboot: verify Gitea, MinIO, Workers, PowerDNS all come back
2. Re-mirror all critical repos from GitHub to Gitea
3. Verify WireGuard mesh reconnects (12/12 connections)
4. Test self-hosted Workers (Octavia :9001-9015) serve real traffic
5. Evaluate Tailscale Funnel as Caddy/nginx replacement for edge routing
6. Document the sovereignty stack status (what's self-hosted vs CF)
7. Set target: 80% of traffic served from self-hosted stack

### Success Metrics
- [ ] **Gitea operational** with 239+ repos mirrored
- [ ] **MinIO operational** with 4 buckets serving assets
- [ ] **PowerDNS operational** on Lucidia + Gematria
- [ ] **12/12 WireGuard connections** verified
- [ ] **Self-hosted Workers** serving at least 5 domains
- [ ] **Sovereignty score**: 8/12 services operational (from 2/12 today)

---

## Testing (55% — 20 todos)
**Goal**: Automated tests catch regressions before users do

### How To
1. Run existing E2E test suite against all live products
2. Add load tests: SCP test script to fleet, run in parallel via SSH
3. Create smoke test script that hits all 17 websites and checks for 200
4. Add fleet connectivity test (SSH + ping all nodes)
5. Run tests on CI (GitHub Actions) on schedule (daily)
6. Fix any failing tests before adding new ones

### Success Metrics
- [ ] **Smoke test passes** (all 17 sites return 200)
- [ ] **E2E tests pass** for chat, search, tutor, auth flows
- [ ] **Load test**: tutor handles 100 concurrent users without errors
- [ ] **Fleet test**: all online nodes respond within 5 seconds
- [ ] **CI runs tests daily** and alerts on failure
