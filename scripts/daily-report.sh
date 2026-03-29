#!/usr/bin/env bash

set -euo pipefail

ROOT="/Users/alexa"
BLACKROAD_ROOT="$ROOT/blackroad"
KPI_REPORT="$ROOT/blackroad-os-kpis/reports/daily-report.sh"
STARTER="$BLACKROAD_ROOT/start-road-websites.sh"

if [ -x "$KPI_REPORT" ] || [ -f "$KPI_REPORT" ]; then
  if bash "$KPI_REPORT"; then
    exit 0
  fi
  echo ""
  echo "KPI report unavailable, falling back to road websites status."
  echo ""
fi

echo "BLACKROAD DAILY REPORT"
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo ""
echo "Road websites"
bash "$STARTER" status
