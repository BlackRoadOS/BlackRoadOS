# RoadID Persistence — Complete Deep Dive
**Source**: Grok (xAI) analysis, 2026-03-29

RoadID persistence in BlackRoad OS is the foundational mechanism for creating sovereign, portable, and accumulative AI identities. It ensures that your AI "remembers everything unless you explicitly tell it to forget," builds long-term context across sessions and agents, and remains fully user-owned with no vendor lock-in.

## High-Level Design

Key pillars:
- **Persistent Memory**: AI accumulates context indefinitely via a SHA-256 hash-chain
- **Cryptographic Proofs**: Every interaction generates verifiable cryptographic evidence
- **Portability**: Entire identity exports as JSON and imports on any BlackRoad node
- **Agent Relationships**: RoadID builds evolving trust with the fleet (~18 agents)

## Technical Implementation

### 1. Append-Only Journal Storage
- Each agent/RoadID maintains journal at `.blackroad/memory/{agent_id}.journal`
- JSON Lines format (one JSON object per line)
- Each commit includes: timestamp, key-value data, cryptographic digest via `ps_sha()`
- Immediate disk flush for durability, in-memory cache for fast reads
- `restore()` replays entire journal to reconstruct state on startup/migration

### 2. PS-SHA∞: Recursive Hash Ladder
```python
def ps_sha(data: str, depth: int = 3) -> str:
    h = data
    for _ in range(depth):
        h = hashlib.sha256(h.encode()).hexdigest()
    return h
```
- Iteratively hashes data `depth` times (default 3)
- Tamper evidence through append-only nature + per-commit digests
- Chain verified through full journal replay and digest re-computation

### 3. System Integration
- RoadID anchors identity across 20+ apps and agent fleet
- Journals feed FTS5 search, embeddings, RAG-style recall
- In-memory caching ensures sub-100ms access during local inference
- Explicit forget commands prune while preserving audit log
- Self-healing mesh keeps journals accessible across 7-node fleet

### 4. Strengths
- Full export/import as JSON — truly portable
- Lightweight for Raspberry Pi constraints
- Cryptographic proofs + "chain active" enable auditing
- Everything stays local — privacy-first
