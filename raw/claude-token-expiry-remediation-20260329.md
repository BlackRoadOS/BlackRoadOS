# BlackRoad Token & Auth Expiry Remediation Plan
**Date**: 2026-03-29
**Source**: System audit

## Expired/Missing Credentials

### 1. Cloudflare (Wrangler) — CRITICAL
- **Error**: `Authentication error [code: 10000]` / `Invalid access token [code: 9109]`
- **Impact**: Cannot deploy Workers, manage D1, KV, R2, or DNS
- **Fix**: `wrangler login` (opens browser OAuth flow)
- **Scope**: All 496+ Workers, 20 domains, D1 databases, KV namespaces, R2 buckets

### 2. DigitalOcean — HIGH
- **Error**: `401 Unable to authenticate you`
- **Impact**: Cannot manage Gematria and Anastasia droplets remotely
- **Fix**: `doctl auth init` (paste new API token from DO dashboard)
- **Scope**: 2 droplets (Gematria nyc3, Anastasia nyc1)

### 3. Railway — MEDIUM
- **Error**: `Unauthorized. Please login with railway login`
- **Impact**: Cannot deploy or manage Railway services
- **Fix**: `railway login` (opens browser OAuth)
- **Scope**: Unknown number of Railway services

### 4. Gematria SSH — HIGH
- **Error**: `Permission denied (publickey)`
- **Impact**: Cannot access TLS edge server (151 domains), Ollama, PowerDNS
- **Fix**: Upload ~/.ssh/id_ed25519.pub via DO console, or `doctl compute ssh-key import`
- **Workaround**: Fix DO auth first, then `doctl compute ssh gematria`

### 5. Anastasia SSH — HIGH
- **Error**: `Permission denied (publickey,password)`
- **Impact**: Cannot access compute node
- **Fix**: Same as Gematria — upload key via DO console
- **Workaround**: Fix DO auth first

### 6. HuggingFace CLI — LOW
- **Error**: `command not found: huggingface-cli`
- **Impact**: Cannot manage HF models/spaces from CLI
- **Fix**: `pip install huggingface-hub && huggingface-cli login`

### 7. GitHub Enterprise API — LOW
- **Error**: `404 Not Found` on `/enterprises/blackroad-os`
- **Impact**: Cannot query enterprise-level stats
- **Fix**: Need enterprise admin PAT (different from org-level token)
- **Note**: Current token has `read:enterprise` scope but may need enterprise admin role

## Working Credentials
| Service | Status | Identity |
|---------|--------|----------|
| GitHub (gh) | OK | blackboxprogramming, admin:org scope |
| Stripe | OK | Connected (test mode) |
| npm | OK | blackboxprogramming |
| Vercel | OK | alexa-amundsons-projects (0 deployments) |
| Tailscale | OK | Keys deployed to 5 orgs |

## Remediation Order
1. **Cloudflare** — unblocks Worker deployments, DNS management
2. **DigitalOcean** — unblocks droplet access, SSH key fix
3. **Gematria/Anastasia SSH** — unblocks after DO auth
4. **Railway** — lower priority, unknown usage
5. **HuggingFace** — nice to have
6. **Enterprise API** — informational only

## Automation Opportunity
Consider storing refresh tokens in a secure location and building a `br auth-refresh` command that renews all expired credentials in one pass.
