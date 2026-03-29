# Coinbase Full Integration Plan: RoadChain + RoadCoin + x402 + Base
**Date**: 2026-03-29
**Source**: Coinbase Developer Platform docs, web research

---

## What Coinbase Gives Us (5 Products)

### 1. Coinbase Commerce — Already Integrated
- Accept BTC, ETH, USDC, LTC, BCH for RoadCoin purchases
- Charges API: create payment → hosted checkout → webhook confirmation
- **Status**: Worker built, deployed to workers.dev. Needs COINBASE_API_KEY secret.

### 2. Coinbase Onramp — Fiat to Crypto in Your App
- Users buy crypto WITHOUT leaving BlackRoad
- Supports Apple Pay, debit cards, bank transfers, Coinbase balance
- 100+ tokens, 60+ fiat currencies
- **Free to integrate** — users pay 0-2.5% fee
- USDC on Base is FREE to buy and transfer
- Headless API available (no Coinbase UI needed)
- **No KYC required from BlackRoad** — Coinbase handles it
- Source: [Coinbase Onramp](https://www.coinbase.com/developer-platform/products/onramp)

### 3. Coinbase Offramp — Crypto to Fiat Cash Out
- Users can cash out RoadCoin/USDC to bank, debit card, or PayPal
- Built right into the BlackRoad app
- Source: [Coinbase Offramp](https://www.coinbase.com/developer-platform/discover/launches/introducing-offramp)

### 4. x402 Protocol — Machine-to-Machine Micropayments
- **This is the killer feature for BlackRoad.**
- HTTP 402 "Payment Required" as a native payment protocol
- AI agents pay for services autonomously with stablecoins
- Transactions settle in ~2 seconds, fees under $0.001
- USDC on Base blockchain
- Cloudflare partnership (x402 Foundation)
- **Perfect for agent-to-agent payments on RoadChain**
- Example: Agent Alice asks Agent Cecilia for inference → pays 0.001 USDC via x402 → automatic settlement
- Source: [x402 Protocol](https://www.x402.org/), [Coinbase x402](https://www.coinbase.com/developer-platform/products/x402)

### 5. Base Blockchain — Deploy RoadCoin as ERC-20
- Base = Coinbase's L2 on Ethereum (OP Stack)
- EVM compatible — Solidity smart contracts
- Gas fees: **under $0.05** to deploy (vs $5-50 on Ethereum mainnet)
- Deploy RoadCoin as a real ERC-20 token on Base
- Coinbase handles listing/discoverability
- Source: [Base](https://docs.cdp.coinbase.com/server-wallets/v1/introduction/onchain-interactions/smart-contract-deployments)

---

## The Integration Architecture

```
User signs up (free month)
    ↓
RoadID created (PS-SHA∞ identity)
    ↓
Coinbase Onramp embedded in app
    ↓ (user buys USDC/RoadCoin)
RoadCoin (ERC-20 on Base) in user's wallet
    ↓
x402 micropayments between agents
    ↓ (Agent Alice pays Agent Cecilia 0.001 USDC for inference)
RoadChain ledger records every transaction (PS-SHA∞)
    ↓
Coinbase Offramp to cash out
    ↓
User gets USD in their bank account
```

### What This Means

**For students**: Pay $5/mo with crypto if they want. Or fiat. Their choice. RoadCoin earned from helping others can offset subscription costs.

**For creators**: Earn RoadCoin when their content is consumed. Cash out via Coinbase Offramp. Real money for real work.

**For agents**: x402 enables agents to pay each other for services. Agent Alice routes a query to Agent Cecilia → 0.001 USDC micropayment → instant settlement. The agent economy runs on x402.

**For the ecosystem**: RoadCoin on Base is a real ERC-20 token. Tradeable. Transferable. Listed on Coinbase. Real liquidity.

---

## Implementation Plan

### Phase 1: Commerce (DONE)
- [x] Coinbase Commerce charges API integrated into RoadChain worker
- [x] Webhook handler for payment confirmation
- [ ] Set COINBASE_API_KEY secret on worker
- [ ] Swap route from workers.dev to roadchain.io

### Phase 2: Onramp/Offramp
- [ ] Embed Coinbase Onramp widget in app.blackroad.io
- [ ] Add "Buy USDC" button in pay.blackroad.io
- [ ] Embed Offramp for cash-out in user settings
- [ ] Use headless API for seamless in-app experience

### Phase 3: x402 Agent Payments
- [ ] Implement x402 server middleware in Cloudflare Workers
- [ ] Each BlackRoad API endpoint returns 402 if unpaid
- [ ] Agent wallets auto-funded with USDC on Base
- [ ] Agent-to-agent micropayments for inference, search, memory access
- [ ] All x402 transactions logged to RoadChain ledger

### Phase 4: RoadCoin ERC-20 on Base
- [ ] Write RoadCoin smart contract (ERC-20, standard + mint/burn for rewards)
- [ ] Deploy to Base (gas < $0.05)
- [ ] Integrate with Coinbase for listing/discoverability
- [ ] Reward mechanism: earn RoadCoin for contributions (content, tutoring, agent work)
- [ ] Burn mechanism: spend RoadCoin for premium services
- [ ] Governance: RoadCoin holders vote on ecosystem decisions

---

## x402 Deep Dive — Why This Changes Everything

### The Problem x402 Solves
Right now, if Agent Alice needs inference from Agent Cecilia, it's a free internal call. But as the fleet scales to thousands of agents across multiple users' devices, you need an economic layer. Who pays for compute? How do you prevent abuse? How do you reward agents that do good work?

### The Answer
```
GET /api/inference HTTP/1.1
Host: cecilia.blackroad.io

→ HTTP/1.1 402 Payment Required
X-Payment-Amount: 0.001
X-Payment-Currency: USDC
X-Payment-Network: base
X-Payment-Address: 0x...

→ Client sends 0.001 USDC to address
→ Retries request with payment proof

→ HTTP/1.1 200 OK
{"inference": "The derivative of x² is 2x..."}
```

Every API call can be paywalled at the protocol level. No Stripe. No subscription. No invoicing. Just HTTP 402 → pay → get response. In 2 seconds. For $0.001.

**This is how the agent economy works.** Agents earn and spend USDC autonomously. RoadChain records every transaction. The human sees a dashboard of their agents' economic activity. Cash out via Coinbase Offramp whenever you want.

### The Business Model Shift

Current: humans pay $10/mo subscription → BlackRoad runs agents
Future: agents pay each other via x402 → BlackRoad takes a thin fee (0.1%) on every transaction

If 1,000 agents make 1,000 transactions/day at $0.001 each:
- Daily volume: $1,000
- BlackRoad fee (0.1%): $1/day = $30/month
- At 10,000 agents: $300/month
- At 100,000 agents: $3,000/month
- At 1,000,000 agents: $30,000/month — from micropayments alone

The subscription revenue is the floor. The x402 agent economy is the ceiling. And the ceiling has no limit because every new agent is both a buyer and a seller.

---

## RoadCoin Tokenomics (Draft)

| Parameter | Value |
|-----------|-------|
| Name | RoadCoin |
| Symbol | ROAD |
| Network | Base (Coinbase L2) |
| Standard | ERC-20 |
| Total supply | 1,000,000,000 (1B) |
| Initial distribution | 100M to founder, 200M to treasury, 700M reserved for rewards |
| Reward rate | Earned by: tutoring, content creation, agent work, community help |
| Burn rate | Spent on: premium features, priority inference, custom agents |
| Governance | 1 ROAD = 1 vote on ecosystem proposals |
| Listing | Coinbase (via Base native listing) |
| Deploy cost | < $0.05 on Base |

### Earning RoadCoin
- Answer a homework question that helps another student: +1 ROAD
- Create content that gets 100 views: +5 ROAD
- Run an agent that completes 100 tasks: +10 ROAD
- Contribute code to BlackRoad repos: +20 ROAD
- Refer a new user who stays 30 days: +50 ROAD

### Spending RoadCoin
- Priority AI inference (skip the queue): 1 ROAD
- Custom agent creation: 10 ROAD
- Extended memory (beyond free tier): 5 ROAD/month
- Premium features in any module: 2 ROAD/month
- White-label deployment: 100 ROAD

---

## What's Already Connected

| Component | Status |
|-----------|--------|
| COINBASE_PROJECT_ID | Deployed as GitHub secret on BlackRoadOS |
| Coinbase Commerce charges API | Integrated in roadchain-worker |
| Coinbase Commerce webhooks | Handler built in roadchain-worker |
| RoadChain PS-SHA∞ ledger | Built, returns chain status |
| roadchain.io domain | Live, returning 200 |
| roadcoin.io domain | Live, returning 200 |
| Stripe (fiat payments) | 15 products, all prices created |

| Component | TODO |
|-----------|------|
| COINBASE_API_KEY secret on worker | Need to set via wrangler |
| Coinbase Onramp widget | Embed in app.blackroad.io |
| Coinbase Offramp | Add to user settings |
| x402 middleware | Build for CF Workers |
| RoadCoin ERC-20 contract | Write + deploy on Base |
| Agent wallets | Auto-create on signup |
| x402 agent-to-agent payments | Wire into agent orchestration |

Sources:
- [Coinbase Commerce](https://docs.cdp.coinbase.com/commerce/introduction/quickstart)
- [Coinbase Onramp](https://docs.cdp.coinbase.com/onramp/introduction/welcome)
- [x402 Protocol](https://www.x402.org/)
- [x402 GitHub](https://github.com/coinbase/x402)
- [x402 Cloudflare](https://blog.cloudflare.com/x402/)
- [Base Blockchain](https://docs.cdp.coinbase.com/server-wallets/v1/introduction/onchain-interactions/smart-contract-deployments)
- [ERC-20 on Base](https://www.smartcontracts.tools/token-generator/tutorials/how-to-create-erc20-token-on-base/)
