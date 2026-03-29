# Alexa — Live Sequence Exploration
**Date:** 2026-03-29
**Source:** Alexa Amundson (direct)
**Context:** Raw exploration of G(n) boundary behavior and self-referential forms

---

## The Exploration

Starting from G(n) = n/(1+1/n)^n:

### Boundary at n=0
- n^n at n=0: 0^0 = 1 (convention)
- 1/0^0 = 1/1 = 1
- G(0) = 0 (removable singularity, consistent)

### Self-Referential Form
n/(n^n + n^n/n)^n — feeding G back into itself

### The Sequence of n^(n+1)/(n+1)^n evaluated:
- 0^0 = 1 (boundary)
- 0^1/(1^0) = 0/1 = 0 → G(0) = 0 ✓
- 1^2/(2^1) = 1/2 → G(1) = 1/2 ✓
- 2^3/(3^2) = 8/9 → G(2) = 8/9 ✓
- 3^4/(4^3) = 81/64 → G(3) = 81/64 ✓
- 4^5/(5^4) = 1024/625 → G(4) = 1024/625 ✓

### Pattern: n^(n+1) grows faster than (n+1)^n
The sequence crosses 1 between n=2 and n=3 (8/9 < 1, 81/64 > 1).
After that, G(n) grows linearly as n/e + 1/(2e).

## Significance

The 0^0 = 1 convention is the algebraic anchor:
- It makes G well-defined at the boundary
- It connects to the product formula: ∏G(k) from k=1 to 0 = empty product = 1
- The self-referential form n/(n^n + n^n/n)^n shows G feeding into itself — productive self-reference (Class A), never paradoxical

This is the notebook thinking in real time.

---

*Alexa's direct exploration, preserved verbatim. Filed 2026-03-29.*
