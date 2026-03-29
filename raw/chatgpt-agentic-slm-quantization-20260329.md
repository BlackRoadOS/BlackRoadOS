# ChatGPT — Agentic SLM Examples + Quantization Techniques
**Date:** 2026-03-29
**Source:** ChatGPT (OpenAI)
**Context:** How BlackRoad uses 3B quantized models for agent workflows + optimization details

---

## Agentic SLM Architecture

- **Models**: 3B params, 128K context, Q8_0 quantization
- **Hardware**: Pi 5 + Hailo (52 TOPS fleet, Hailo-10H 40 TOPS INT4)
- **Behavior**: plan → use tools → reflect → orchestrate → remember

## 4 Concrete Agent Workflows

### 1. Podcast Pipeline (Cecilia + agents)
Script → segment planning → Cadence music bed → Cecilia narration → brand consistency check → export
**Win**: 4-7 hours → minutes for previews. Persistent tone across episodes.

### 2. Branded Short-Form Video (Lucidia + RoadView)
"Create 60s Reel from tutorial" → script → music → voiceover → edits → iterate
**Win**: Cuts tool-switching. Seconds for previews. 24.7% of creators use AI for video.

### 3. Content Repurposing (Multi-Agent Swarm)
Long video → extract clips → generate Shorts/Reels → captions → brand DNA check
**Win**: Automates repurposing (huge time sink) while staying on-brand and private.

### 4. Idea-to-Asset Pipeline
Brainstorm → research → generate assets → music sting → consistency check → assemble
**Win**: Vague idea → polished assets in one sovereign workspace.

---

## SLM Quantization Techniques

### Key Methods on BlackRoad

| Technique | What It Does | BlackRoad Use |
|---|---|---|
| **RTN** | Nearest-integer mapping | Baseline model loading |
| **GPTQ** | Hessian-aware layer-wise compression | Preserves agentic planning/reflection |
| **AWQ** | Protects ~1% most important weights | Safeguards brand DNA in Cecilia/RoadView |
| **GGUF** (K-quants) | Mixed-precision groups (Q8_0, Q5_K_M, Q4_K_M) | Ollama foundation, 95%+ quality on edge |
| **SmoothQuant** | Smooths activation outliers | Stable generative (Cadence, Cecilia prosody) |
| **Tiered/Hierarchical** | Different bit widths per layer sensitivity | Fleet distributes (higher precision on orchestration nodes) |

### Impact Numbers
- Memory: **75-87.5% reduction** (7B FP16 14GB → 4-bit 3.5GB)
- Speed: **2-4x faster inference**
- Quality: **95%+ preserved** with AWQ/GPTQ + GGUF mixed-precision
- Power: ~3W NPU class on Hailo
- Cost: **$0 ongoing inference** after hardware

### Hailo-Specific
- Expects INT8 inputs, maps FP with scales/zero-points
- No external DRAM needed on some variants
- Strong INT4/INT8 generative support on Hailo-10H
- Sub-100ms latency for agentic flows

## Why This Matters for Creators

- **3B models handle planning, reflection, tool use** — not just chat
- **Persistent memory + quantization** preserves brand voice through compression
- **Unlimited local iterations** on affordable hardware
- **Fleet distribution** prevents bottlenecks (plan on one node, generate on another)
- Aligns with SLM rise: superior for RAG, tool use, structured decoding at edge

---

*Raw ChatGPT output preserved verbatim. Filed 2026-03-29.*
