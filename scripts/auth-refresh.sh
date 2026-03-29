#!/bin/bash
# BlackRoad Auth Refresh — check and renew all service tokens
set -uo pipefail

PINK='\033[38;5;205m'
GREEN='\033[38;5;82m'
RED='\033[38;5;196m'
AMBER='\033[38;5;214m'
RESET='\033[0m'

echo -e "${PINK}BlackRoad Auth Refresh${RESET} — $(date)"
echo ""

check_and_fix() {
  local name="$1"
  local check_cmd="$2"
  local fix_cmd="$3"
  
  if eval "$check_cmd" >/dev/null 2>&1; then
    echo -e "  ${GREEN}✓${RESET} $name"
    return 0
  else
    echo -e "  ${RED}✗${RESET} $name — expired"
    if [ "${AUTO_FIX:-0}" = "1" ]; then
      echo -e "    ${AMBER}→${RESET} Running: $fix_cmd"
      eval "$fix_cmd"
    else
      echo -e "    ${AMBER}→${RESET} Fix: $fix_cmd"
    fi
    return 1
  fi
}

expired=0

# GitHub
check_and_fix "GitHub (gh)" \
  "gh auth status 2>&1 | grep -q 'Logged in'" \
  "gh auth login" || ((expired++))

# Stripe
check_and_fix "Stripe" \
  "stripe balance retrieve 2>&1 | grep -q 'balance'" \
  "stripe login" || ((expired++))

# npm
check_and_fix "npm" \
  "npm whoami 2>/dev/null | grep -q ." \
  "npm login" || ((expired++))

# Cloudflare (wrangler)
check_and_fix "Cloudflare (wrangler)" \
  "npx wrangler whoami 2>&1 | grep -q 'Account'" \
  "npx wrangler login" || ((expired++))

# DigitalOcean
check_and_fix "DigitalOcean (doctl)" \
  "doctl account get 2>&1 | grep -q 'Email'" \
  "doctl auth init" || ((expired++))

# Railway
check_and_fix "Railway" \
  "railway status 2>&1 | grep -qv 'Unauthorized'" \
  "railway login" || ((expired++))

# Vercel
check_and_fix "Vercel" \
  "vercel whoami 2>&1 | grep -q ." \
  "vercel login" || ((expired++))

# Tailscale
check_and_fix "Tailscale" \
  "tailscale status 2>/dev/null | grep -q ." \
  "sudo tailscale up" || ((expired++))

echo ""
if [ "$expired" -eq 0 ]; then
  echo -e "${GREEN}All tokens valid${RESET}"
else
  echo -e "${RED}${expired} token(s) expired${RESET}"
  echo -e "Run with AUTO_FIX=1 to auto-renew: ${AMBER}AUTO_FIX=1 bash $0${RESET}"
fi
