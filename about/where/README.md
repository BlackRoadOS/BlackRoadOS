# Where

## Physical

**Lakeville, Minnesota.** Suburb of Minneapolis. Population 73,000.

Not Cupertino. Not Redmond. Not San Francisco. A suburb in the Midwest where the roads freeze in winter and nobody fixes the potholes until spring.

## Digital

- **blackroad.io** — Main site + pricing + device onboarding
- **app.blackroad.io** — The browser-based OS
- **17 product subdomains** — all live, all returning 200
- **20 root domains** under Cloudflare
- **33+ repos** in github.com/BlackRoadOS

## Infrastructure

| Node | Location | Role |
|------|----------|------|
| Alice | Lakeville, MN (192.168.4.49) | Gateway, Pi-hole, PostgreSQL, Redis, nginx |
| Aria | Lakeville, MN (192.168.4.98) | Monitoring, heartbeat |
| Octavia | Lakeville, MN (192.168.4.101) | Gitea, Workers, NATS (offline — needs reboot) |
| Cecilia | Lakeville, MN (192.168.4.96) | Ollama, MinIO, PostgreSQL (offline) |
| Lucidia | Lakeville, MN (192.168.4.38) | 334 web apps, nginx, PowerDNS (offline) |
| Gematria | NYC (DigitalOcean) | Caddy TLS edge, Ollama, 8 models |
| Anastasia | NYC (DigitalOcean) | Compute, llama.cpp, 91 days uptime |
| Alexandria | Lakeville, MN (Mac) | 19,943 files. The library. |

## The Mesh

WireGuard + Tailscale connecting local Pis to cloud droplets. Encrypted. Sovereign. Works across any network.

## Where Your Data Lives

**On YOUR hardware.** Not in a data center. Not in someone else's cloud. On the Raspberry Pi on your shelf. On the old laptop in your closet. On any device you plug in and onboard via Bluetooth.

---

*Remember the Road. Pave Tomorrow.*
