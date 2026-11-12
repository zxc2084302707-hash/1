# BuyLink NG — Free MVP

**Status:** prototype implementation; GitHub Pages publish step and end-to-end test on public URL still required.

- Official WhatsApp Channel: https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c
- No local employees, payments, ecommerce checkout, scraping or AI API dependencies.
- 4 sample A/B accessory polls, starts with 0 real votes; budget and quantity interest are **nonbinding**.
- Anonymous browser token and real Supabase persisted results. Token is only *per-browser dedup*, not proof of unique humans or fraud prevention.
- Solo management via Supabase Table Editor; no public admin or secret in frontend.

## Host for $0 on GitHub Pages

In this repository Settings → Pages, choose **Deploy from a branch**; branch **buylink-ng-free** and folder **/docs**, then Save. GitHub Pages gives an HTTPS URL after successful deployment. An alternative GitHub Actions workflow exists in this branch, but only one Pages source should be selected.

The page already references the owner's separate Supabase project. Do not enable it for traffic unless the Supabase project is active and its tables/RPCs pass tests. Check the first real public vote, visible counts, optional interest, WhatsApp sharing, and phone layout. Privacy disclosures are basic MVP text; add a real support contact before broad launch.

## Backend

The owner Supabase free project was restored and migration **buylink_ng_free_mvp** applied. Four polls seeded; zero real votes as of the migration. Public poll reads are RLS-protected, votes and interests have no raw public table access. Only limited RPCs accept anonymous votes and return aggregate results.

## Limits and security

These providers offer $0 tiers, not a legally guaranteed permanently free service. Supabase can pause low-activity free projects. Browser-level vote dedup cannot stop determined bots; add stronger anti-spam if participation rises.

## First content

Polls:
1. Satin scrunchies vs claw clips
2. Crossbody bag vs canvas tote
3. Travel jewellery organiser vs mini pouch
4. Minimalist hair pins vs colourful headbands

No made-up sales or market prices; vote counts reflect actual submissions only.
