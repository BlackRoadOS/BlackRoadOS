# BlackRoad Sovereignty Stack Status
**Date**: 2026-03-29
**Philosophy**: Own everything. Depend on nothing external.

## Self-Hosted Services Inventory

| Service | Self-Hosted On | Replaces | Status |
|---------|---------------|----------|--------|
| Git (239+ repos) | Gitea, Octavia :3100 | GitHub | DOWN (Octavia offline) |
| AI Inference (52 TOPS) | Ollama, 4 nodes | OpenAI/Anthropic | DEGRADED (3/4 nodes offline) |
| Workers (15/15) | workerd, Octavia :9001-9015 | CF Workers | DOWN (Octavia offline) |
| Object Storage | MinIO, Cecilia | CF R2 / AWS S3 | DOWN (Cecilia offline) |
| DNS Authority | PowerDNS, Lucidia+Gematria | CF DNS | DEGRADED (Lucidia offline, Gematria SSH denied) |
| PaaS Deploy | Deploy API, Octavia :3500 | Railway/Heroku/Vercel | DOWN (Octavia offline) |
| Database | PostgreSQL, 3 nodes | CF D1 | DEGRADED (Alice only) |
| Cache | Redis, Alice | CF KV | UP |
| TLS Edge | Caddy, Gematria | CF proxy | DEGRADED (SSH denied) |
| VPN | WireGuard mesh | Tailscale | DEGRADED (nodes offline) |
| Chat | RoadTrip (D1) + chat.blackroad.io | Slack | UP (CF-hosted) |
| CI/CD | Gitea Actions + act_runner | GitHub Actions | DOWN (Octavia offline) |

## Sovereignty Score: 2/12 services fully operational (17%)

### What's Actually Working Right Now
1. Redis on Alice — cache layer
2. Chat via CF Workers — but this is cloud-hosted, not sovereign
3. All 17 websites — but they're on Cloudflare Workers, not self-hosted

### The Irony
The "sovereignty stack" depends on Cloudflare for all user-facing services. The self-hosted stack (Gitea, Workers, MinIO, DNS) is 80% down because 3 Pis are offline.

### Recovery Plan
1. Physical reboot: Octavia, Cecilia, Lucidia
2. Fix SSH: Gematria, Anastasia
3. Verify WireGuard mesh reconnects
4. Test Gitea, MinIO, PowerDNS, Workers after reboot
5. Monitor with Fleet Heartbeat (if it's running)

### Tailscale as Bridge
New Tailscale keys deployed. If Tailscale installed on all nodes:
- Eliminates WireGuard config complexity
- Provides MagicDNS (no PowerDNS needed for internal)
- Enables remote access without being on local network
- GitHub Actions can reach fleet nodes

## Hybrid Strategy (Realistic)
Rather than pure sovereignty, a hybrid approach:
- **Cloudflare**: User-facing websites, CDN, DDoS protection (keep)
- **Self-hosted**: Git, AI inference, data storage, CI/CD (restore)
- **Tailscale**: Mesh connectivity replacing WireGuard (migrate)
- **GitHub**: Mirror from Gitea, enterprise org management (keep)

Pure sovereignty is aspirational. Hybrid is operational.
