# ChatGPT — Cadence Benchmark Assessment
**Date:** 2026-03-29
**Source:** ChatGPT (OpenAI)
**Context:** Realistic performance expectations for BlackRoad's text-to-music tool

---

## No Published Benchmarks Yet

No generation times, FAD scores, listening tests, or side-by-side comparisons with Suno/Udio.

## Inferred Performance (based on hardware)

### Generation Speed
- Short clips (5-30s): **5-30 seconds** on 1-2 nodes
- Full tracks (1-3 min): **30-120+ seconds** on basic setup
- Iteration: **unlimited, no credits** — big win over cloud

### Quality
- **Strong**: persistent memory for brand-consistent output
- **Good for**: music beds, intros/outros, backgrounds, ideation
- **Limitations**: complex orchestral/vocal may show artifacts until models mature
- No public audio samples available

### Scalability
- Start 1 Pi + Hailo → add nodes for speed
- Low power, 24/7 feasible
- Zero recurring costs after setup

## vs Cloud Tools

| Dimension | Suno/Udio | Cadence |
|---|---|---|
| Speed | Fast (cloud GPU) | 5-30s short clips (edge) |
| Cost | Credits add up fast | Zero after hardware |
| Memory | None (re-prompt every time) | Remembers brand/style |
| Privacy | Uploads required | Fully local |
| Quality | Higher fidelity (big GPU) | Trade-off for ownership |
| Consistency | Generic each session | Brand DNA preserved |

## vs Traditional (Logic, Ableton)
- Faster for AI-assisted generation/beds
- Likely needs DAW export for pro mixing/mastering

## Honest Bottom Line

> "Cadence looks promising as a sovereign, memory-driven music ideation and bed generator. On a 5-node Pi fleet, it should deliver responsive performance for typical creator needs with excellent cost/privacy wins."

> "However, without published benchmarks, audio samples, or detailed quality metrics, it's hard to quantify exactly how it performs today versus hype."

---

*Raw ChatGPT output preserved verbatim. Filed 2026-03-29.*
