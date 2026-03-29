# AI Workload Benchmarks: Hailo vs Jetson on Edge
**Source**: Grok (xAI) analysis, 2026-03-29

## Object Detection (YOLOv8/v5/v6)

### Hailo-8 on Raspberry Pi 5 (26 TOPS INT8)
| Model | FPS | Conditions |
|-------|-----|-----------|
| YOLOv8s | 127-150 | batch=8, 640x640 |
| YOLOv6n | ~354 | batch=8, 640x640 |
| YOLOv5s_personface | ~150 | standard |
| YOLOv8m 1-stream 720p | ~77 | PCIe Gen3 |
| YOLOv8m 4-stream 720p | ~17 | PCIe Gen3 |
| YOLOv8m 8-stream 720p | ~8 | PCIe Gen3 |
| YOLOv8m 12-stream 720p | ~5 | PCIe Gen3 |

### Jetson Orin Nano Super (67 TOPS sparse)
| Model | FPS | Conditions |
|-------|-----|-----------|
| YOLO nano/small (TensorRT INT8) | 100-150+ | optimized |
| YOLO (C++ TensorRT e2e) | ~33 e2e / ~90 raw | 12ms latency |
| YOLO (Python/ONNX) | ~16 | overhead |

### Hailo-8L (13 TOPS)
| Model | FPS | Conditions |
|-------|-----|-----------|
| YOLOv8s | 100-120 | similar setup |

## Generative AI / LLM Inference

### Hailo-8 on Pi 5 (CPU fallback)
| Model | TPS | Notes |
|-------|-----|-------|
| 1-2B quantized (llama.cpp/BitNet) | 1-8 | CPU-bound |
| Larger models | <1 | Not viable real-time |

### Hailo-10H on Pi 5 (40 TOPS INT4, AI HAT+ 2)
| Model | Performance | Notes |
|-------|------------|-------|
| Qwen2.5-1.5B-4int | TTFT ~320ms | vs ~2s CPU alone |
| DeepSeek-R1 1.5B | Single-digit TPS | Quality limited |
| Llama 3.2 1B | Single-digit TPS | Lightweight tasks |
| Stable Diffusion 2.1 | <5 sec/image | Under 5W |
| Llama2-7B | ~10 TPS | Manufacturer claim |

### Jetson Orin Nano Super
| Model | TPS | Notes |
|-------|-----|-------|
| Qwen 2.5 3B (quantized) | 15-35 | TensorRT optimized |
| Llama 3.2 3B (quantized) | 15-35 | CUDA acceleration |
| Mixed vision + LLM | Viable | 8GB shared RAM limit |

### BlackRoad Fleet Actual (from session benchmarks)
| Node | Model | Performance | Notes |
|------|-------|------------|-------|
| Alexandria (Mac Metal) | Qwen2.5-3B Q4_K_M | 20 tok/s gen, 139 tok/s prompt | Best fleet performer |
| Gematria (DO CPU) | Qwen2.5-3B Q4_K_M | 10.3 tok/s | CPU-only |
| Pi5 nodes | 3B models | OOM with Ollama running | Need to stop Ollama, use llama-server |
| Pi5 recommendation | 1.5B max | Viable | With Ollama stopped |

## Power Efficiency Comparison

| Metric | Hailo-8 (Pi 5) | Hailo-10H (Pi 5) | Jetson Orin Nano Super |
|--------|----------------|-------------------|----------------------|
| Chip power | ~2.5W | ~3.5W | 7-25W |
| System power | ~10-15W | ~10-15W | 15-25W |
| TOPS/Watt | ~10+ | ~8-11 | ~3-9 |
| Cooling | Passive OK | Passive OK | Active recommended |
| DRAM needed | No (on-chip SRAM) | Host memory | 8GB LPDDR5 shared |

## Multi-Stream Video

| Setup | Streams | FPS/stream | Total power |
|-------|---------|-----------|-------------|
| Hailo-8 Pi 5 (YOLOv8m 720p) | 1 | 77 | ~12W |
| Hailo-8 Pi 5 (YOLOv8m 720p) | 4 | 17 | ~15W |
| Hailo-8 Pi 5 (YOLOv8m 720p) | 8 | 8 | ~15W |
| Jetson Orin Nano (multi-cam) | 4+ | Higher | 20-25W |

## Summary for BlackRoad OS Use Case

**Best fit: Hailo on Pi** because:
- 52 TOPS across fleet at ~50-75W total
- ~$38-136/month operating cost
- No DRAM dependency (Hailo-8)
- Sovereign, no vendor lock-in
- Scales by adding cheap nodes

**When to consider Jetson**:
- Need CUDA for custom model work
- Robotics with ROS integration
- Single-node high-throughput (>67 TOPS)
- Complex multi-modal pipelines

**Upgrade path**: Hailo-10H AI HAT+ 2 on Pi 5 brings 40 TOPS GenAI to existing fleet for ~$70-100 per node upgrade.
