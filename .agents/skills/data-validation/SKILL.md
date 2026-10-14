---
name: data-validation
description: Use when importing, reviewing, scoring, counting, or delivering buyer, contact, evidence, duplicate, supplier-review, or S0 acceptance data.
---

# Data Validation

Treat every acceptance claim as an evidence query with an explicit eligible population.

## Required output

For each check record the dataset snapshot, timestamp, rule, numerator, denominator, excluded rows and reasons, result, and supporting record IDs. Use `unmeasured` when evidence or the required population is absent.

## Rules

- Exclude `is_demo = true` from every real metric.
- Resolve deterministic duplicates before counting unique companies; fuzzy matches remain review candidates.
- Count contacts only when company-level, lawfully usable, and verified with method and time.
- Count operating status, buyer grade, and importer relevance only from reviewed evidence.
- Preserve missing source URLs and failed checks as gaps. Never fill them with inference.
- Do not declare the whole S0 failed merely because some inputs are still unmeasured; use the domain state model.

## Quick check

Ask: What exact record would leave or enter the denominator if this decision changed? If that cannot be answered, the metric is not auditable.

## Common mistakes

- Reporting a percentage without the eligible denominator.
- Treating a reachable phone or WhatsApp account as lawful business use.
- Counting duplicate names as separate buyers.
- Letting synthetic fixtures improve real progress.

