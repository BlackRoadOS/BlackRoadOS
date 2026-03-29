#!/bin/bash
# BlackRoad Smoke Test — checks all live sites
set -euo pipefail

PINK='\033[38;5;205m'
GREEN='\033[38;5;82m'
RED='\033[38;5;196m'
RESET='\033[0m'

sites=(
  blackroad.io
  app.blackroad.io
  chat.blackroad.io
  search.blackroad.io
  tutor.blackroad.io
  pay.blackroad.io
  social.blackroad.io
  status.blackroad.io
  canvas.blackroad.io
  cadence.blackroad.io
  roadcode.blackroad.io
  video.blackroad.io
  live.blackroad.io
  game.blackroad.io
  radio.blackroad.io
  book.blackroad.io
  work.blackroad.io
)

echo -e "${PINK}BlackRoad Smoke Test${RESET} — $(date)"
echo ""

pass=0
fail=0
total=${#sites[@]}

for site in "${sites[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "https://$site" 2>/dev/null || echo "000")
  size=$(curl -s --connect-timeout 5 --max-time 10 "https://$site" 2>/dev/null | wc -c | tr -d ' ')
  
  if [[ "$code" =~ ^(200|301|302)$ ]] && [ "$size" -gt 1000 ] 2>/dev/null; then
    echo -e "  ${GREEN}✓${RESET} $site — $code (${size}B)"
    ((pass++))
  else
    echo -e "  ${RED}✗${RESET} $site — $code (${size}B)"
    ((fail++))
  fi
done

echo ""
echo -e "Results: ${GREEN}${pass}/${total} passed${RESET}, ${RED}${fail} failed${RESET}"
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
