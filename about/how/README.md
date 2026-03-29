# How

## For Users

1. **Go to** [blackroad.io](https://blackroad.io)
2. **Sign up** — first month is completely free. Everything unlocked.
3. **Use any product**: Tutor, Chat, Search, Social, Canvas, Video, Memory, RoadTrip
4. **Earn RoadCoin** from every action (+1 ROAD per tutor solve, +0.5 per social post, etc.)
5. **After free month**: $10/module or $100/everything
6. **Export your data** anytime as JSON. Take it anywhere. Even if you leave.

## For Developers

```bash
# One command to install
curl -sL https://blackroad.io/install | bash

# Or clone and run
git clone https://github.com/BlackRoadOS/app
cd app && npm install && npm run dev
```

- **API**: OpenAI-compatible. One line change to switch from OpenAI.
- **CLI**: 248 commands. `br fleet status`, `br search-all`, `br deploy`
- **Self-host**: Runs on any Raspberry Pi, laptop, or server

## For Device Onboarding

1. Find any old device (laptop, phone, Pi, speaker, camera)
2. Install the BlackRoad agent: `curl -sL https://blackroad.io/install | bash`
3. Or discover via Bluetooth on the same network
4. The device becomes a node. Your data migrates. Your mesh grows.
5. **Your devices are already paid for. Make them work for you.**

## The Architecture

```
Experience Layer     → app.blackroad.io (what users see)
    ↓
Governance Layer     → RoadAuth + RoadID + PS-SHA∞ (identity + memory)
    ↓
Agent Layer          → RoadTrip + NEXUS (18+ agents, 16 divisions)
    ↓
Infrastructure Layer → Pi fleet + Cloudflare Workers + D1 + Tailscale mesh
    ↓
Economic Layer       → RoadCoin (ERC-20 on Base) + RoadChain + x402 + Coinbase
```

## The Math

- G(n) = n^(n+1) / (n+1)^n → converges to 1/e from pure integers
- PS-SHA∞ = recursive SHA-256 with adaptive depth (3-7 rounds)
- Z := yx - w → trinary equilibrium mechanism (+1/0/-1)
- RoadChain = append-only D1 ledger with hash-linked blocks
- Every block: prev_hash → PS-SHA∞(payload) → hash. Verifiable by anyone.

## The Pricing

| Tier | Price | What |
|------|-------|------|
| Free month | $0 | Everything, no limits |
| Module | $10/mo | Pick what you need |
| All Access | $100/mo | Everything forever (human max) |
| Enterprise | $300-8,000/mo | Still cheaper than Salesforce |

## The Source

Everything is on GitHub: [github.com/BlackRoadOS](https://github.com/BlackRoadOS)

33+ repos. Open for inspection. The code is the proof.

---

*Remember the Road. Pave Tomorrow.*
