# BlackRoad Fleet Health Report
**Date**: 2026-03-29 04:45 CDT
**Source**: SSH probes + memory system

## Fleet Overview
- **Total Nodes**: 7 (5 Pis + 2 DO droplets)
- **Online**: 2/7 (28.6%)
- **Degraded**: 2/7 (reachable, auth failed)
- **Offline**: 3/7 (unreachable)

## Node Details

### ONLINE

**Aria** (Pi5 8GB) — 192.168.4.98
- Status: UP
- Uptime: 5h 3min
- Load: 0.09, 0.12, 0.17 (healthy)
- Role: Compute node
- Hailo-8: 26 TOPS (if installed)

**Alice** (Pi4 8GB) — 192.168.4.49
- Status: UP
- Uptime: 5h 4min
- Load: 1.01, 1.11, 1.16 (HIGH for Pi4 — investigate)
- Role: Gateway, Pi-hole, PostgreSQL, Qdrant, Redis, nginx (37 sites)
- Note: Running too many services for a Pi4. Load consistently above 1.0.

### DEGRADED

**Gematria** (DO nyc3) — 64.227.124.52
- Status: Reachable but SSH key rejected
- Error: `Permission denied (publickey)`
- Role: Caddy TLS edge (151 domains), Ollama (6 models), PowerDNS (ns1)
- Fix: Upload SSH public key via DO console or API

**Anastasia** (DO nyc1) — 137.184.54.130
- Status: Reachable but SSH key rejected
- Error: `Permission denied (publickey,password)`
- Role: Compute node, llama.cpp
- Fix: Upload SSH public key via DO console or API

### OFFLINE

**Octavia** (Pi5 8GB) — 192.168.4.101
- Status: DOWN (SSH timeout)
- Role: Gitea (PRIMARY git host), 15 self-hosted Workers, PaaS, NATS, Docker
- Impact: CRITICAL — Gitea is the primary git host, all Worker self-hosting down
- Fix: Physical power cycle required

**Cecilia** (Pi5 8GB) — 192.168.4.96
- Status: DOWN (no route to host)
- Role: Ollama (16 models), MinIO (4 buckets), PostgreSQL, InfluxDB
- Hailo-8: 26 TOPS
- Impact: HIGH — AI inference fleet leader, object storage
- Fix: Physical power cycle, check network cable

**Lucidia** (Pi5 8GB) — 192.168.4.38
- Status: DOWN (SSH timeout)
- Role: 334 web apps, nginx, PowerDNS, GitHub Actions runners, Ollama
- Impact: HIGH — web app host, DNS authority
- Fix: Physical power cycle required

## Compute Capacity
| Node | CPU | RAM | Accelerator | Status |
|------|-----|-----|-------------|--------|
| Alexandria (Mac) | M-series | 16GB+ | Metal GPU | Active |
| Aria | Cortex-A76 4-core | 8GB | — | Online |
| Alice | Cortex-A72 4-core | 8GB | — | Online (overloaded) |
| Octavia | Cortex-A76 4-core | 8GB | Hailo-8 (26T) | Offline |
| Cecilia | Cortex-A76 4-core | 8GB | Hailo-8 (26T) | Offline |
| Lucidia | Cortex-A76 4-core | 8GB | — | Offline |
| Gematria | DO vCPU | 2GB+ | — | Auth failed |
| Anastasia | DO vCPU | 2GB+ | — | Auth failed |

**Available compute**: Alexandria + Aria + Alice = ~30% of fleet
**Offline compute**: 52 TOPS Hailo, 16 Ollama models, 334 web apps, Gitea, NATS

## WireGuard Mesh
- Previously 12/12 connections verified
- Current: Unknown — need online nodes to verify
- Likely degraded with 3 Pis and 2 droplets inaccessible

## Recommendations
1. **IMMEDIATE**: Physical reboot of Octavia, Cecilia, Lucidia
2. **IMMEDIATE**: Fix SSH keys for Gematria and Anastasia via DO console
3. **INVESTIGATE**: Alice load 1.01 — may need service offloading
4. **MONITOR**: Aria is healthy but underutilized
5. **CONSIDER**: UPS/watchdog timers for Pi fleet to prevent this state
