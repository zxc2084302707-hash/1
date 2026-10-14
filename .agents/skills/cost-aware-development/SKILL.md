---
name: cost-aware-development
description: Use when a task may call a paid API, buy data or infrastructure, add a recurring service, or change the S0 cost-per-qualified-buyer calculation.
---

# Cost-Aware Development

The CNY 1,000 cap is a ceiling, not standing authorization to spend.

## Before spend

Record the provider, purpose, maximum amount in CNY, recurring commitment, free alternative considered, expected qualified-buyer yield, and who approved it. Obtain explicit approval before the call or purchase. Silence and remaining budget are not approval.

## After approved spend

Record the actual charge, currency conversion basis, acquisition batch, eligible buyer outcome, and whether labor is excluded. Never estimate actual spend from a list price.

## Unit cost

Compute eligible data cost divided by qualified A/B buyers. If the denominator is zero, the metric is `unmeasured`; do not divide by zero or report CNY 0 per buyer.

## Common mistakes

- Retrospective approval.
- Treating a free trial requiring a paid commitment as zero cost.
- Mixing labor into the frozen data-cost metric.
- Calling a cheap experiment immaterial without recording it.

