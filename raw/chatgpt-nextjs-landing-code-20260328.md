# ChatGPT — Next.js Landing Page Code (Shippable)
**Date:** 2026-03-28
**Source:** ChatGPT (OpenAI)
**Context:** Production-ready Next.js + Tailwind landing page components

---

## File Structure

```
app/page.tsx
components/Hero.tsx
components/Demo.tsx
components/Features.tsx
components/Difference.tsx
components/Lucidia.tsx
components/CTA.tsx
```

## page.tsx

```tsx
import Hero from "@/components/Hero"
import Demo from "@/components/Demo"
import Features from "@/components/Features"
import Difference from "@/components/Difference"
import Lucidia from "@/components/Lucidia"
import CTA from "@/components/CTA"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Demo />
      <Features />
      <Difference />
      <Lucidia />
      <CTA />
    </main>
  )
}
```

## Hero.tsx — "Remember the Road. Pave Tomorrow."

Dark, minimal, alive. Network heartbeat background. Two CTAs only.

## Demo.tsx — THE WEAPON

Interactive: "What are you trying to build?" → type → windows animate in → Lucidia: "Got it. Building this with you."

SHOW instead of explain.

## Features.tsx — 3 Cards

Memory ("never resets") + Connection ("tools work together") + Continuity ("pick up where you left off")

## Difference.tsx — Split Screen

ChatGPT (resets/isolated/manual) vs BlackRoad (persistent/connected/continuous)

"Stop restarting. Start continuing."

## Lucidia.tsx — "The AI that never forgets."

## CTA.tsx — "Start Building Without Starting Over"

Footer: BlackRoad OS, Inc. · Established 2025. Remember the Road. Pave Tomorrow.

---

*Raw ChatGPT output with full code preserved verbatim. Filed 2026-03-28.*
