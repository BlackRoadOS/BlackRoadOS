# BlackRoad Disk Usage Analysis — Alexandria (Mac)
**Date**: 2026-03-29
**Device**: Alexandria (Mac), /dev/disk3s5 APFS

## Before Cleanup
- **Total**: 460GB
- **Used**: 430GB (Data volume)
- **Free**: 37MB (CRITICAL)

## Cleanup Actions
| Target | Size Freed | Risk |
|--------|-----------|------|
| ~/blackroad-os-prism-enterprise/node_modules | ~800MB | Low — `npm install` restores |
| ~/blackroad-os-prism-enterprise/frontend/node_modules | ~200MB | Low |
| ~/blackroad/clerk-nextjs/node_modules | ~1GB | Low |
| ~/blackroad-os-prism-enterprise/.next | ~105MB | Low — `npm run build` restores |
| ~/isometric-city/.next | ~42MB | Low |
| ~/blackroad-os-web/.next | ~17MB | Low |
| ~/.npm/_npx | ~320MB | Low — auto-recreated |
| ~/roadcode-worker/node_modules | ~171MB | Low |
| ~/openclaw/extensions/memory-core/node_modules | ~129MB | Low |
| ~/Library/Caches/com.openai.codex | ~927MB | Low — cache only |
| ~/Library/Caches/Cypress | ~556MB | Low — `npx cypress install` restores |
| ~/Library/Caches/node-gyp | ~64MB | Low |
| ~/Library/Caches/Homebrew | ~197MB | Low |
| npm cache | ~varies | Low — `npm cache clean` |
| ~/blackroad-operator/archive | ~4.6GB | MEDIUM — old archives, may want backup |
| ~/blackroad-operator/node_modules | ~218MB | Low |
| **TOTAL FREED** | **~9.3GB** | |

## After Cleanup
- **Used**: 419GB
- **Free**: 12GB
- **Capacity**: 98%

## Remaining Large Directories
| Directory | Size | Can Clean? |
|-----------|------|-----------|
| ~/blackroad-operator/orgs | 3.5GB | Maybe — org data, check if regenerable |
| ~/blackroad-operator/apps | 1.2GB | Maybe — app bundles |
| ~/blackroad-operator/fleet | 1.0GB | Maybe — fleet configs |
| ~/blackroad-operator/repos | 559MB | Maybe — repo mirrors |
| ~/blackroad-operator/docs | 453MB | No — documentation |
| ~/blackroad-operator/packages | 284MB | Maybe — built packages |
| ~/Downloads | 12GB | YES — review and purge old downloads |
| ~/.ollama | 2.8GB | Partial — remove unused models |
| ~/models | 2.0GB | Partial — remove unused models |
| ~/Library/Caches | ~1.8GB | YES — more caches to clean |

## Recommendations
1. **Downloads**: Review ~/Downloads (12GB) — likely has old installers, videos, PDFs
2. **Ollama models**: `ollama list` and remove unused models
3. **~/models**: Check for duplicate/unused model files
4. **Library/Caches**: Firefox (105MB), GeoServices (32MB), Tailscale (29MB) — clearable
5. **Docker**: If Docker Desktop installed, `docker system prune -a` can free GBs
6. **Xcode**: If installed, derived data can be 10-50GB
7. **Consider**: External storage for operator archive, old model files
8. **Monitor**: Set up low-disk alert (cron job that warns at <5GB)
