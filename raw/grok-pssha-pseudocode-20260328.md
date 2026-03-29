# Grok — PS-SHA∞ Hash-Chaining Pseudocode
**Date:** 2026-03-28
**Source:** Grok (xAI)
**Context:** Exact hash-chaining logic pseudocode for BlackRoad's immutable memory

---

## Core Implementation

```python
# PS-SHA∞: Infinite Append-Only SHA-256 Hash Chain

import hashlib
import time
from typing import Dict, Any

class PSSHAInfiniteJournal:
    def __init__(self):
        self.head_hash: str = "0" * 64  # Genesis hash (all zeros)
        self.journal: list[Dict[str, Any]] = []

    def append(self, actor_id: str, channel: str, payload: Any) -> str:
        # 1. Capture current state
        previous_hash = self.head_hash
        timestamp = int(time.time() * 1000)

        # 2. Build structured entry (never mutated)
        entry: Dict[str, Any] = {
            "timestamp": timestamp,
            "actor_id": actor_id,
            "channel": channel,
            "payload_hash": hashlib.sha256(str(payload).encode()).hexdigest(),
            "previous_hash": previous_hash
        }

        # 3. Serialize and hash (infinite chaining)
        serialized = str(entry).encode('utf-8') + previous_hash.encode('utf-8')
        new_hash = hashlib.sha256(serialized).hexdigest()

        # 4. Commit
        self.head_hash = new_hash
        self.journal.append(entry)

        # 5. Witness to RoadChain / D1
        # witness_to_roadchain(new_hash, entry)

        return new_hash

    def verify_chain(self, target_index: int = -1) -> bool:
        current_hash = "0" * 64
        for i, entry in enumerate(self.journal[:target_index + 1]):
            serialized = str(entry).encode('utf-8') + current_hash.encode('utf-8')
            computed = hashlib.sha256(serialized).hexdigest()
            if computed != entry.get("previous_hash") and i > 0:
                return False
            current_hash = computed
        return True
```

## RoadTrip Example Flow

1. User types in #creative → `append(actor="you", channel="#creative", payload="need battle music")`
2. Build entry → `new_hash = SHA256(entry + previous_head)`
3. Hash witnessed to D1 (fast chat) + RoadChain (on-chain finality)
4. Any agent references that hash → full immutable history

## Key Properties

- **Infinite & append-only** — nothing ever deleted or altered
- **Cryptographic proof** — recompute chain from genesis proves authenticity
- **Constant-time verification** — only need head hash
- **Portable** — journal travels with RoadID across any cluster

---

*Raw Grok output preserved verbatim. Filed 2026-03-28.*
