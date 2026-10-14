# Data Model

The authoritative foundation design is in `docs/superpowers/specs/2026-10-14-africa-buyer-ai-s0-foundation-design.md`. The executable proposal will live in `supabase/migrations/`.

Core aggregates are tenant membership, buyer identity, evidence, contacts and verifications, buyer assessments, duplicate decisions, provider authorizations, costs, supplier evaluations, delivery batches, and outreach approvals.

Every tenant-owned record includes `tenant_id`. Evidence and review history are append-oriented so later corrections do not erase provenance. Strong identifiers may produce deterministic duplicate candidates; fuzzy similarity requires human review.

No migration has been applied to a live Supabase project.

