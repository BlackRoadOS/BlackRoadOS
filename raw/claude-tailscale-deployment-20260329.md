# Tailscale Key Deployment Record
**Date**: 2026-03-29 04:47 CDT
**Action**: Deployed Tailscale auth + API keys as GitHub org secrets

## Keys Deployed
| Key | Type | Purpose |
|-----|------|---------|
| TAILSCALE_AUTH_KEY | tskey-auth-* | Node authentication — allows machines to join tailnet |
| TAILSCALE_API_KEY | tskey-api-* | API access — manage devices, ACLs, DNS programmatically |

## Target Organizations
| Org | TAILSCALE_AUTH_KEY | TAILSCALE_API_KEY | Visibility |
|-----|-------------------|-------------------|------------|
| BlackRoadOS | Deployed 04:47:36Z | Deployed 04:47:36Z | all repos |
| BlackRoad-OS-Inc | Deployed 04:47:37Z | Deployed 04:47:37Z | all repos |
| BlackRoad-OS | Deployed 04:47:38Z | Deployed 04:47:38Z | all repos |
| BlackRoad-AI | Deployed 04:47:39Z | Deployed 04:47:39Z | all repos |
| BlackRoad-Labs | Deployed 04:47:40Z | Deployed 04:47:40Z | all repos |

## Usage in GitHub Actions
```yaml
- name: Setup Tailscale
  uses: tailscale/github-action@v2
  with:
    authkey: ${{ secrets.TAILSCALE_AUTH_KEY }}
```

## Usage for API calls
```yaml
- name: Tailscale API
  env:
    TS_API_KEY: ${{ secrets.TAILSCALE_API_KEY }}
  run: |
    curl -s -H "Authorization: Bearer $TS_API_KEY" \
      https://api.tailscale.com/api/v2/tailnet/-/devices
```

## Network Context
- BlackRoad currently uses WireGuard mesh (12/12 connections previously verified)
- Tailscale can complement or replace WireGuard for:
  - Automatic key rotation
  - MagicDNS for node discovery
  - ACL-based access control
  - GitHub Actions → fleet connectivity
  - Easier onboarding of new nodes

## Potential Use Cases
1. **CI/CD → Fleet**: GitHub Actions workflows can SSH into Pi fleet via Tailscale
2. **Self-hosted runners**: Connect runners to tailnet for secure fleet access
3. **Remote access**: Access Pis when not on local network
4. **Droplet mesh**: Connect Gematria/Anastasia without WireGuard config
5. **Auto-healing**: Actions can reboot/reconfigure offline nodes

## Next Steps
- Install Tailscale on all fleet nodes (Alice, Aria, Octavia, Cecilia, Lucidia, Gematria, Anastasia)
- Configure ACLs for fleet security
- Create GitHub Actions workflow that uses Tailscale to health-check fleet
- Consider Tailscale Funnel for exposing services without Caddy/nginx
