#!/bin/bash
set -uo pipefail
PINK='\033[38;5;205m'
GREEN='\033[38;5;82m'
RED='\033[38;5;196m'
AMBER='\033[38;5;214m'
RESET='\033[0m'

echo -e "${PINK}BlackRoad Fleet Status${RESET} — $(date)"
echo ""
printf "  %-12s %-8s %-12s %-8s %s\n" "NODE" "STATUS" "UPTIME" "LOAD" "ROLE"
printf "  %-12s %-8s %-12s %-8s %s\n" "----" "------" "------" "----" "----"

online=0
nodes="aria:blackroad@192.168.4.98:Compute
alice:pi@192.168.4.49:Gateway+Redis+Qdrant
gematria:root@100.108.132.8:Caddy+Ollama+DNS
anastasia:root@100.94.33.37:Compute+Actions
octavia:pi@192.168.4.101:Gitea+Workers+NATS
cecilia:blackroad@192.168.4.96:Ollama+MinIO
lucidia:blackroad@192.168.4.38:WebApps+DNS"

echo "$nodes" | while IFS=: read -r name target role; do
  result=$(ssh -o ConnectTimeout=3 -o BatchMode=yes "$target" 'uptime' 2>&1)
  if [ $? -eq 0 ]; then
    up=$(echo "$result" | grep -oE 'up [^,]+' | head -1 | sed 's/up //')
    load=$(echo "$result" | grep -oE 'load average[s]*: [0-9.]+' | head -1 | sed 's/load average[s]*: //')
    printf "  %-12s ${GREEN}%-8s${RESET} %-12s %-8s %s\n" "$name" "UP" "$up" "$load" "$role"
    ((online++)) || true
  else
    printf "  %-12s ${RED}%-8s${RESET} %-12s %-8s %s\n" "$name" "DOWN" "—" "—" "$role"
  fi
done
