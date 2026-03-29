# Ready-to-Post Social Content
**Copy and paste these. Right now.**

---

## Reddit: r/HomeworkHelp

**Title**: I built an AI homework solver — $1 per answer, no subscription

**Body**:
I got frustrated with Chegg dying and free AI giving wrong answers, so I built tutor.blackroad.io

How it works:
- Type your question
- AI generates a step-by-step solution
- See a preview free
- Full answer: $1

No subscription. No account needed. Just paste and solve.

It handles math, science, history, economics — anything with a step-by-step answer.

Try it: https://tutor.blackroad.io

Built it myself on Raspberry Pis because I wanted homework help that doesn't cost $16/month or require signing up for another service.

---

## Reddit: r/learnmath

**Title**: Free tool: AI step-by-step math solver (preview free, full answer $1)

**Body**:
Made a thing: tutor.blackroad.io

Type any math question → get a full step-by-step solution. Preview is free. Full answer is $1 if you want it.

Example: "What is the derivative of x³ + 2x?" → shows the power rule applied step by step.

No subscription. No account. No ads. Just math help.

https://tutor.blackroad.io

---

## Reddit: r/selfhosted

**Title**: I run 17 websites on 5 Raspberry Pis and 2 droplets for $136/month

**Body**:
Stack:
- 5x Raspberry Pi 5 (8GB) with WireGuard mesh
- 2x Hailo-8 NPU (52 TOPS AI acceleration)
- 2x DigitalOcean droplets
- Cloudflare Workers for edge
- Tailscale for remote access
- Gitea, MinIO, PostgreSQL, Redis, PowerDNS, Caddy — all self-hosted

Total monthly cost: ~$136

Runs: sovereign chat, AI search engine, homework tutor ($1/solve with Stripe), social network, fleet dashboard, and 12 more.

All source on GitHub: github.com/BlackRoadOS

The thesis: intelligence already exists (Llama, Qwen, Mistral). You don't need $40,000 GPUs. You need routing. $80 Pis + $150 Hailo chips + free open-source models = sovereign AI.

---

## Reddit: r/LocalLLaMA

**Title**: Running Qwen2.5-3B on Pi fleet + Mac Metal — 20 tok/s gen, real production use

**Body**:
Fleet benchmarks on Q4_K_M quantization:

- Alexandria (Mac M-series Metal): 20 tok/s generation, 139 tok/s prompt
- Gematria (DO droplet, CPU): 10.3 tok/s
- Pi5 nodes: OOM on 3B with Ollama running — viable at 1.5B max

Using this for a live homework solver (tutor.blackroad.io) — Cloudflare Workers AI for fast inference, local fleet for sovereignty.

The local AI movement is real. 52M Ollama downloads/month. 135K GGUF models on HuggingFace. We're past the hobby phase.

---

## Twitter/X: @BlackRoadOS (create account first)

**Tweet 1 (launch):**
Built an AI homework solver on 5 Raspberry Pis.

$1 per answer. No subscription.
Step-by-step solutions for math, science, history.
112 questions already solved and indexed.

Chegg collapsed. Students still need help.
tutor.blackroad.io

**Tweet 2 (thread starter):**
I spent 11 months building a sovereign operating system.

8,521 commits. 19,943 files. One person.

Started as quantum consciousness research.
Became an AI memory system.
Became agent orchestration.
Became an OS.

$136/month infrastructure vs $700B hyperscaler spending.

Thread 🧵

**Tweet 3 (the number):**
$273/month — what the average American pays in subscriptions they forgot about.

$136/month — what it costs to run 17 websites, 18 AI agents, and a sovereign OS on Raspberry Pis.

$29/month — what BlackRoad costs.

$1 — what a homework answer costs.

$0 — our revenue so far. But the math converges.

---

## Hacker News: Show HN

**Title**: Show HN: AI homework solver on Raspberry Pi fleet – $1/answer, no subscription

**Body**:
I built tutor.blackroad.io — an AI homework solver that charges $1 per step-by-step answer instead of a monthly subscription.

Technical details:
- Workers AI (Llama-3.1-8B) for generation
- Cloudflare Workers + D1 for serving and persistence
- Each solved question gets its own URL with QAPage structured data (SEO flywheel)
- Stripe live checkout — real $1 transactions
- 112 questions pre-seeded in the sitemap

The bigger project: BlackRoad OS — a sovereign computing platform on commodity hardware (Raspberry Pi + Hailo-8 NPU). Self-hosted Gitea, MinIO, PostgreSQL, Ollama, PowerDNS. Total infra: $136/month.

The thesis: AI already exists. You don't need to train models. You need to route to them. $80 Pi + free Llama = the same homework answer that Chegg used to charge $16/month for.

Source: github.com/BlackRoadOS
Live: tutor.blackroad.io

Looking for feedback, not funding. Solo founder, 11 months of development, $0 revenue. The first $1 is all that matters.
