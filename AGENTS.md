# Africa Buyer AI Agent Instructions

## Product truth

Africa Buyer AI helps Chinese exporters review African B2B buyer opportunities. The initial market is Nigerian small-appliance importers and wholesalers. GitHub is the only source of code truth.

S0 is `undetermined` until all frozen acceptance metrics are measured from eligible real data. Demo data never contributes to acceptance. Before S0 passes, never claim that the product is commercially deliverable.

## Required working rules

- Read `docs/DECISIONS.md` and `docs/PROJECT_STATUS.md` before changing product behavior.
- Use the existing cloud checkout. Do not create a Git worktree unless the user explicitly requests one.
- Protect evidence provenance. Never replace missing proof with inference or silently upgrade a verification state.
- Keep all tenant-owned database rows behind RLS. Test cross-tenant denial before describing a schema as safe.
- External outreach requires explicit human approval. Do not send email, WhatsApp, or other messages from this project.
- Do not execute destructive database operations without a separately reviewed operation plan.
- The S0 budget cap is CNY 1,000. Obtain approval before any new paid service or paid API use.
- Keep synthetic fixtures visibly marked `DEMO` and separated from real acceptance calculations.

## Development workflow

Use Bun and frozen dependency installation. Implement behavior test-first. Before committing product changes, run the focused test and the relevant full suite. Before reporting completion, run:

```bash
bun run typecheck
bun run test:run
bun run lint
bun run build
bun run test:mobile
```

Update `docs/PROJECT_STATUS.md`, `docs/COST_LEDGER.md`, and `docs/LEARNING_LOG.md` each development cycle. Update `docs/DECISIONS.md` when an architectural or product rule changes.

Every handoff reports changed files, commit SHA, exact test results, actual cost, blockers, next step, and one concise technical learning.

## Project workflows

Load the matching project skill when its trigger applies:

- `.agents/skills/data-validation/SKILL.md`
- `.agents/skills/architecture-review/SKILL.md`
- `.agents/skills/cost-aware-development/SKILL.md`
- `.agents/skills/learning-handoff/SKILL.md`

