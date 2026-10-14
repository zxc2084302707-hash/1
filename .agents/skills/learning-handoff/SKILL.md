---
name: learning-handoff
description: Use at the end of a development cycle, before committing or handing work to Codex or ChatGPT Work, especially after tests, architecture decisions, defects, or new blockers.
---

# Learning Handoff

Leave evidence another worker can resume without trusting chat history.

## Required updates

- `docs/PROJECT_STATUS.md`: current capabilities, exact checks, S0 state, and blockers.
- `docs/DECISIONS.md`: durable product or architecture decisions only.
- `docs/COST_LEDGER.md`: actual approved external cost, including zero.
- `docs/LEARNING_LOG.md`: concise reusable technical learning.

## Handoff format

Report changed files, immutable commit SHA, test commands with passed/failed/skipped/unrun outcomes, actual cost, current blockers, next step, and one technical learning.

Authorization or tenant-isolation discoveries must be resolved or explicitly block the handoff. Mobile and scoring fixes need focused verification before the commit. Documentation is part of the cycle and cannot be silently skipped.

## Common mistakes

- Repeating historical test claims without a current run.
- Saying “tests pass” without command and count.
- Omitting an unresolved security boundary from project status.
- Maintaining project truth only in chat.

