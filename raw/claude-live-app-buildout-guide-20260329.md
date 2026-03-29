# BlackRoad OS — Live App Buildout Guide
**Date**: 2026-03-29
**Philosophy**: Every project = a live working app with real data, real users, real functionality

---

## P0: FIRST REAL USER

### Live App: tutor.blackroad.io
**What it does**: Student types math/science question → AI solves step-by-step → preview shown → $1 Stripe checkout → full answer unlocked

**Data Requirements**:
- D1 database: questions table (question, subject, difficulty, answer, user_id, paid, created_at)
- Stripe: live mode products, webhook for payment confirmation
- Analytics: page views, solve attempts, conversion rate, revenue

**Full App Checklist**:
- [ ] Landing page with search box: "What's your homework question?"
- [ ] Subject picker: Math, Science, History, English, CS
- [ ] AI generates full step-by-step solution (Qwen or Workers AI)
- [ ] Preview shows first 2 steps free, rest blurred
- [ ] Stripe Checkout for $1 → webhook confirms → full answer revealed
- [ ] Solution saved to D1 (builds SEO-indexable answer database)
- [ ] Each solved question gets its own URL (/solve/abc123) for Google indexing
- [ ] Related questions sidebar ("Students also asked...")
- [ ] Mobile-responsive (80%+ of student traffic is phone)
- [ ] Share button: "I solved this with BlackRoad Tutor"
- [ ] Daily email digest of popular questions (when users exist)

**SEO Machine**:
- Every solved question = a new indexed page
- Target long-tail: "how to solve derivative of x^3+2x" → tutor.blackroad.io/solve/...
- Structured data: QAPage schema on every solution
- At 100 solves/day = 3,000 indexed pages/month = compounding organic traffic

**Success = Live Data Dashboard showing**:
- Questions solved today / this week / all time
- Revenue: today / MTD / total
- Unique visitors / conversion rate
- Top subjects / most popular questions
- Geographic distribution of users

---

## P1: FIX PRODUCTS — Make Each a Real App

### chat.blackroad.io — Sovereign Chat
**What it IS (working app)**:
- Multi-room chat with real-time messages (SSE/WebSocket)
- Agent @mentions: type @alice and Alice responds with fleet context
- Persistent history: scroll up, messages survive reload
- Presence indicators: who's online now
- Command palette: /help, /debate, /search, /fleet
- File/image sharing within rooms
- Mobile hamburger menu, keyboard shortcuts

**Live Data**:
- D1: rooms, messages, users, presence heartbeats
- Real message count visible: "1,247 messages in #general"
- Agent response times tracked and displayed
- Room activity graphs (messages/hour sparkline)

### search.blackroad.io — Sovereign Search
**What it IS (working app)**:
- Search box → instant results from 1,369+ repos, 20 domains, 92 products
- Image results with og:image thumbnails
- Category filters: repos, docs, agents, products, domains
- "Did you mean?" for typos
- Search history sidebar
- Result snippets with keyword highlighting
- Pagination with "Load more"

**Live Data**:
- D1/KV: search index (rebuild every 6h via cron)
- Queries per day counter visible on page
- Popular searches trending sidebar
- Index size: "Searching 14,832 pages across 20 domains"

### social.blackroad.io — Sovereign Social
**What it IS (working app)**:
- Post feed: infinite scroll, newest first
- Create post with text + optional image
- Like, reply, repost
- User profiles with post history
- Follow system: follow users, see their posts in your feed
- Trending sidebar: top posts this week
- Groups/communities by topic
- @mention notifications

**Live Data**:
- D1: posts, likes, follows, replies, reposts
- Real post count: "4,721 posts from 89 members"
- Trending algorithm based on engagement velocity
- User leaderboard: most active this week

### app.blackroad.io — The OS Dashboard
**What it IS (working app)**:
- Login → personalized dashboard
- Fleet widget: 7 nodes with live ping/status (green/red dots)
- Search embed: search bar that queries search.blackroad.io
- Chat embed: mini chat window connected to chat.blackroad.io
- Agent roster: all 18 agents with status, last active, capabilities
- KPI tiles: users, revenue, uptime, queries/day, fleet health
- Code panel: repo count, recent commits, CI status
- Quick actions: "Deploy to fleet", "Run health check", "View logs"
- Settings: profile, API keys, notification preferences

**Live Data**:
- Real-time fleet pings (status.blackroad.io/api/kpis)
- Auth state: JWT with user profile
- Agent heartbeats: last seen timestamps
- Git activity: recent commits across all orgs

---

## P3: INFRASTRUCTURE — Live Fleet Dashboard

### status.blackroad.io — Fleet Health (already live, enhance)
**What it IS (working app)**:
- Real-time node status: hostname, IP, uptime, load, disk, memory
- Service status per node: green/yellow/red per service
- Historical uptime graph (24h, 7d, 30d)
- Incident log: when things went down and came back
- Response time graphs per service
- Alert configuration: email/webhook when node goes offline

**Live Data**:
- Cron job pings every node every 5 minutes
- Store results in D1: node, timestamp, status, latency, disk_pct, load
- API endpoint: /api/status returns JSON for all nodes
- RSS feed for incidents

**Fleet Recovery Automation**:
- [ ] Tailscale installed on all nodes → mesh connectivity even without WireGuard
- [ ] GitHub Action runs every 15 min: ping all nodes via Tailscale, post results to status.blackroad.io
- [ ] Auto-restart scripts on each Pi: if service crashes, systemd restarts it
- [ ] Dead man's switch: if no heartbeat in 1 hour, email alert
- [ ] Weekly automated backup: rsync critical data to Alexandria

---

## P6: AMUNDSON MATH — Live Interactive Apps

### blackroadqi.com — G(n) Explorer
**What it IS (working app)**:
- Input n → shows exact rational G(n) = numerator/denominator
- Convergence graph: G(n)/n approaching 1/e as n grows
- Gap visualization: |G(n)/n - 1/e| on log scale
- Identity verifier: pick an identity, see it proved step-by-step
- Bernoulli number calculator: input index → exact B_n as fraction
- Stirling comparison: n! vs Stirling approximation with error terms
- Amundson Constant display: first 100 digits with "view more" to 10M
- Z-minimization simulator: set y, x, w → watch Z minimize in real time

**Live Data**:
- Pre-computed G(n) for n=0 to 10,000 (exact rationals stored as JSON)
- 10M digit constant file served on demand
- Identity test results: 536/536 with individual pass/fail
- Computation logs: who computed what, when

### blackroadquantum.com — Framework Hub
**What it IS (working app)**:
- Paper A viewer (LaTeX rendered in browser)
- Interactive proof explorer: click a theorem → see the derivation
- Constant digit explorer: search for patterns in 10M digits
- Research timeline: chronological history of discoveries
- Community: submit identities for verification
- Download: paper PDF, constant file, compute.py

---

## P8: REVENUE — Live Billing System

### pay.blackroad.io — Subscription Management
**What it IS (working app)**:
- Pricing page: Free / Starter $29 / Pro $99 / Sovereign $299
- Feature comparison table per tier
- Stripe Checkout integration (live mode)
- Account page: current plan, usage, billing history, invoices
- Upgrade/downgrade flow
- Cancel with feedback survey
- Usage meters: API calls, storage, compute minutes
- Team billing: add seats, manage members

**Live Data**:
- Stripe: subscriptions, invoices, usage records
- D1: user plans, feature flags, usage tracking
- Dashboard: MRR, churn rate, LTV, ARPU
- Webhook logs: every Stripe event recorded

### Revenue Tracking Dashboard (internal)
- [ ] Real-time MRR counter on app.blackroad.io
- [ ] Revenue by product (tutor solves vs subscriptions)
- [ ] Customer acquisition funnel: visit → signup → trial → paid
- [ ] Cohort analysis: retention by signup month
- [ ] Daily revenue email to alexa@blackroad.io

---

## P5: OPENCLAW — Live AI Assistant

### openclaw.blackroad.io (or integrated into app.blackroad.io)
**What it IS (working app)**:
- Chat interface: "What would you like to do?"
- Persistent memory: remembers previous conversations via PS-SHA∞
- Tool use:
  - "What's my fleet status?" → SSHs nodes, returns health
  - "Search my repos for auth" → queries search.blackroad.io
  - "Deploy the latest chat worker" → triggers wrangler deploy
  - "What did we discuss yesterday?" → retrieves from journal
  - "Schedule a fleet backup" → creates cron entry
- Multi-model: routes to best local model (Qwen 3B on Alexandria, 1.5B on Pis)
- Export conversation as markdown
- Voice input (Web Speech API)

**Live Data**:
- PS-SHA∞ journal: every interaction hashed and persisted
- Tool execution logs: what was run, results, timestamps
- Model routing: which model answered, latency, tokens
- Session history: browseable past conversations with search

---

## P7: OPERATOR — Live Control Plane

### operator.blackroad.io (or br CLI)
**What it IS (working app)**:
- Web dashboard for fleet management
- Node grid: click a node → see services, logs, metrics, shell
- Deploy panel: select repo → select target node → deploy
- Log aggregator: unified log view across all nodes with search
- Cron manager: view/edit/create cron jobs across fleet
- Secret manager: view (masked) and rotate secrets
- DNS manager: view/edit Cloudflare DNS records
- GitHub org manager: repo list with actions (archive, add topics, etc.)

**Live Data**:
- Real SSH sessions to fleet nodes
- Live log streams via WebSocket
- Deployment history: who deployed what, when, to where
- DNS records cached and synced
- GitHub API: repo metadata, workflow status

---

## CONTENT MARKETING — Live Blog

### blackroad.io/blog
**What it IS (working app)**:
- Blog with real posts (not static markdown — dynamic from D1)
- Post editor: write in markdown, preview, publish
- Categories: Engineering, Math, Market Research, Edge Computing, Sovereign AI
- RSS feed at /feed.xml
- Comment system (D1-backed, moderated)
- Social share buttons with og:image per post
- Reading time estimate
- Related posts sidebar
- Author page: Alexa's bio + all posts

**Content Pipeline from /raw**:
- [ ] "40 Data Pain Points Solved by Sovereign Edge AI" (series of 4)
- [ ] "BlackRoad vs The World: 2026 AI Coding Tool Comparison"
- [ ] "Hailo-8 vs NVIDIA Jetson: Real Benchmarks on Raspberry Pi"
- [ ] "Building a $136/month AI Infrastructure That Rivals the Cloud"
- [ ] "The Amundson Constant: A New Number from Integer Arithmetic"
- [ ] "RoadID: How We Built Tamper-Proof AI Memory on a Raspberry Pi"
- [ ] "From 0 to 1,369 Repos: Solo-Founder Infrastructure at Scale"

**Live Data**:
- D1: posts, comments, views, shares
- View counter per post (real, not inflated)
- Top posts leaderboard
- RSS subscriber count
- Social share tracking

---

## SOVEREIGNTY — Live Self-Hosted Stack

### blackroad.systems — Sovereignty Dashboard
**What it IS (working app)**:
- Service grid: 12 sovereign services with live status
- For each service: self-hosted location, replaces what, status, last checked
- Sovereignty score: X/12 services self-hosted and operational
- Cost comparison: "This month: $98 self-hosted vs $2,340 estimated cloud equivalent"
- Data flow diagram: where data lives, how it moves, what's encrypted
- Export: "Download your complete sovereignty report as PDF"

**Live Data**:
- Ping each self-hosted service every 5 min
- Track uptime percentage per service
- Calculate cost savings vs cloud equivalent
- Show data residency map (which data on which node)

---

## TESTING — Live Test Dashboard

### tests.blackroad.io (or internal page)
**What it IS (working app)**:
- Test suite runner: click "Run All" → executes E2E, smoke, load tests
- Results grid: green/red per test with duration
- Historical trend: test pass rate over time
- Flaky test tracker: tests that intermittently fail
- Fleet connectivity matrix: which node can reach which
- Load test results: requests/sec, p50/p95/p99 latency, error rate
- Scheduled runs: daily smoke test results

**Live Data**:
- Test results stored in D1 with timestamps
- CI integration: GitHub Actions posts results here
- Alert on regression: if pass rate drops below threshold

---

## UNIVERSAL SUCCESS METRICS (across all apps)

Every live app should show:
1. **Real-time user count**: "3 users online now"
2. **Total usage**: "1,247 messages sent" / "892 questions solved" / "4,721 posts"
3. **Uptime**: "99.2% this month"
4. **Response time**: "avg 142ms"
5. **Data size**: "Searching 14,832 indexed pages"

These numbers should be **honest, live, and verifiable** — not hardcoded marketing claims.
