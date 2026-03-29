# Hailo NPU Advancements — 2026
**Source**: Grok (xAI) analysis, 2026-03-29

## Key Products and Performance Milestones

### Hailo-8 Series (flagship for vision/classical AI)
- Up to 26 TOPS (INT8) per chip
- Best-in-class power efficiency (~10 TOPS/W or better)
- Fully integrated on-chip memory — no external DRAM required for many workloads
- Major differentiator amid 2025-2026 DRAM shortages, reducing BOM costs by up to $100 per device
- Variants: Hailo-8L (entry-level, ~13 TOPS) for lighter applications
- Form factors: M.2 modules, PCIe cards (up to multi-chip configurations delivering 52-208 TOPS)

### Hailo-10H (second-generation, GenAI-focused, released/expanded ~2024-2025)
- 40 TOPS (INT4) / 20 TOPS (INT8)
- Designed for generative AI on the edge
- Runs Llama2-7B at up to ~10 tokens/second
- Stable Diffusion 2.1 in under 5 seconds per image
- All under ~5W (chip typical <3.5W)
- Supports LPDDR4/4X in some modules

### Hailo-15 Family (AI Vision Processors)
- Integrated SoC solutions for on-camera AI
- AI-ISP for superior image quality (low-light denoising)
- Privacy masking, search/indexing, advanced analytics
- Targeted at security, surveillance, retail, smart cameras

## Recent Advancements (2025-2026)

### Mass-market push for GenAI at the edge
At CES 2026, Hailo highlighted real-world adoption across consumer, commercial, and industrial sectors. Demos showed scalable, independent edge intelligence.

### Raspberry Pi Integration
- Original AI HAT+/AI Kit used Hailo-8 or Hailo-8L for strong vision AI
- **Raspberry Pi AI HAT+ 2** (announced Jan 2026) features the Hailo-10H, delivering 40 TOPS (INT4) specifically for generative AI workloads (LLMs, VLMs) on the Pi 5
- Bridges the gap from vision-only to full GenAI capabilities while keeping everything local and private
- Enables practical local LLM inference on modest hardware with Ollama-compatible runtimes

### Partner Ecosystem Expansion
- ASUS UGen300: World's first USB edge AI accelerator powered by Hailo-10H — plug-and-play GenAI for laptops and edge PCs
- Advantech modules (M.2/PCIe) with dual Hailo-8 delivering up to 52 TOPS
- Broader integrations in retail checkout, x-ray screening, robotics

### Software and Developer Support
- Unified software suite with Dataflow Compiler for easy model porting (TensorFlow, PyTorch, ONNX)
- Strong community and examples, especially for Raspberry Pi 5
- Robustness for industrial (-40C to 85C) and automotive (-40C to 105C) grades

## Strategic Advantages
- DRAM independence for Hailo-8/8L — resilience against memory shortages and lower system costs
- Efficiency over GPUs/integrated NPUs — often 2x+ performance at half the power
- Sovereignty and privacy — keeps data local, aligning with 2026 edge computing trends

## BlackRoad OS Context
The Hailo-8 accelerators on Raspberry Pi nodes provide dedicated, efficient AI inference (contributing to the reported 52 TOPS total) for local chat, agents, search, and other sovereign apps — supporting sub-100ms latency, persistent identities, and low overall infrastructure costs without vendor lock-in.
