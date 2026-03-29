# Stirling's Higher-Order Terms & Bernoulli Numbers
**Source**: Grok (xAI) analysis, 2026-03-29

## Stirling's Approximation — Higher-Order Terms

### Basic Form
n! ~ sqrt(2*pi*n) * (n/e)^n

### Euler-Maclaurin Derived Series
ln(n!) = n*ln(n) - n + (1/2)*ln(2*pi*n) + 1/(12n) - 1/(360n^3) + 1/(1260n^5) - 1/(1680n^7) + ...

Exponential form:
n! ~ sqrt(2*pi*n) * (n/e)^n * exp(1/(12n) - 1/(360n^3) + 1/(1260n^5) - 1/(1680n^7) + ...)

### Common Truncated Forms
- Up to 1/n: n! ≈ sqrt(2*pi*n) * (n/e)^n * (1 + 1/(12n))
- Up to 1/n^3: n! ≈ sqrt(2*pi*n) * (n/e)^n * (1 + 1/(12n) + 1/(288n^2) - 139/(51840n^3) + ...)

The series is asymptotic (not necessarily convergent), but truncating at smallest term gives excellent approximations.

### Connection to G(n)
- G(n)/n = (n/(n+1))^n -> 1/e
- Dominant (n/e)^n in Stirling mirrors G(n)/n limit
- Higher-order expansions of ln(n+1) reveal discretization effects (gap kappa)
- High-precision A_G computations (10M digits) benefit from these corrections

## Euler-Maclaurin Formula

sum(f(k), a, b) = integral(f(x), a, b) - (1/2)(f(a) + f(b)) + sum(B_{2k}/(2k)! * (f^(2k-1)(b) - f^(2k-1)(a))) + R_m

Applied to f(x) = ln(x) yields the Stirling series.

## Bernoulli Numbers

### Definition (Exponential Generating Function)
x/(e^x - 1) = sum(B_n * x^n / n!, n=0 to inf)  for |x| < 2*pi

### First Values
| n | B_n |
|---|-----|
| 0 | 1 |
| 1 | -1/2 |
| 2 | 1/6 |
| 3 | 0 |
| 4 | -1/30 |
| 5 | 0 |
| 6 | 1/42 |
| 8 | -1/30 |
| 10 | 5/66 |
| 12 | -691/2730 |

Odd indices > 1 all vanish. Even indices alternate sign.

### Recursive Formula
B_n = -(1/(n+1)) * sum(C(n+1, k) * B_k, k=0 to n-1)

Where C(n,k) = binomial coefficient. Allows sequential computation:
- B_1 = -(1/2) * C(2,0) * B_0 = -1/2
- B_2 = -(1/3) * (C(3,0)*B_0 + C(3,1)*B_1) = 1/6
- B_3 = 0 (odd > 1 vanish)

### Why Odd Terms Vanish
x/(e^x - 1) + x/2 is an even function, forcing odd B_n = 0 for n >= 3.

### Properties
- All B_n are rational
- Even indices grow rapidly: |B_{2n}| ~ 4*sqrt(pi*n) * (n/(pi*e))^(2n)
- Connection to Riemann zeta: B_{2n} = (-1)^(n+1) * 2*(2n)! / (2*pi)^(2n) * zeta(2n)

### Role in Stirling Series
Bernoulli numbers generate exact correction coefficients:
n! ~ sqrt(2*pi*n) * (n/e)^n * exp(B_2/(2n) + B_4/(4*3*n^3) + B_6/(6*5*n^5) + ...)

Substituting values:
- B_2 = 1/6 -> +1/(12n)
- B_4 = -1/30 -> -1/(360n^3)
- B_6 = 1/42 -> +1/(1260n^5)

## Relevance to Amundson Framework

- Bernoulli numbers via Euler-Maclaurin bridge discrete sums (G(n) ratios, log expressions) to continuous asymptotic behavior
- Support high-precision convergence studies and A_G computation
- Enable controlled error bounds when comparing exact G(n) rationals to asymptotic predictions
- Deviations from leading 1/e behavior evaluated in trinary +1/0/-1 states
- Efficient verifiable math on Pi + Hailo edge fleet
