# BuyLink NG — 免费 MVP 操作手册 / Operator handbook

## Live deployment

- Render static site: https://buylink-ng.onrender.com
- Render dashboard: https://dashboard.render.com/static/srv-dbr89cei0phs73f3q4t0
- GitHub source repo: https://github.com/zxc2084302707-hash/1/tree/buylink-ng-free
- Backend: Supabase project `ytmaitqwejjkjrkmmzpl` (EU region); do not expose admin/service-role keys
- Official WhatsApp Channel: https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c

Render initial deployment succeeded on 2026-11-13. Third-party independent browser HTTP / complete public-site vote test is still pending; avoid stating those tests passed.

## Three components explained

1. **GitHub is your source-code repository.** The `buylink-ng-free` branch contains the website. Changes committed to this branch are automatically picked up by Render.
2. **Render hosts the public static website.** Service name `buylink-ng`, build command is a simple echo, publish directory is `docs`. The site uses Render Static Site, not a paid Web Service.
3. **Supabase is the database and backend API.** Tables `public.buylink_polls`, `buylink_votes`, `buylink_interests`, and `buylink_events` store live data. Users do not need to register to vote.

## Everyday actions

- **Share the site:** use https://buylink-ng.onrender.com/
- **Share an individual poll:** on the poll page, use Share to WhatsApp or Copy link; each poll has a unique URL and its own social-preview title.
- **Update text/layout:** edit website files in GitHub branch `buylink-ng-free` under `docs/`. When you commit, Render auto-deploys. Wait for the service Deploys tab to say Live.
- **Create or edit polls:** Supabase dashboard → Table Editor → `public.buylink_polls`. Each `slug` must be unique. Set `status` to `active` to show or `closed` to hide; new polls require matching social preview pages if you want individual links to work from direct messages.
- **Review demand:** Supabase Table Editor → `buylink_votes` for votes and `buylink_interests` for optional budget/quantity interest. Do not treat votes as paid orders.
- **Find problems:** Render → Events/Logs for deployment errors; Supabase → Logs for API errors.
- **Follow-up:** user must explicitly opt in for contact; current MVP collects no WhatsApp phone numbers or paid orders.

## Pilot test checklist

1. Open the site on a real mobile browser using the HTTPS Render link.
2. Confirm four polls appear and can open from individual share links.
3. Vote once; confirm real results and that a second vote in the same browser does not change the tally.
4. Complete optional sourcing-interest questionnaire; confirm a row in Supabase.
5. Share poll to WhatsApp, verify receiving phone displays correct title and opens the same poll.
6. Check the Follow WhatsApp Channel link is correct.
7. Review pages on mobile and visible Privacy/Terms.
8. Verify there are no fake vote totals, made-up stock, prices or payments.

**Important:** A browser ID provides only basic deduplication. Different browsers/private windows can submit distinct votes. A public RPC can be abused at scale; strengthen anti-bot checks before serious growth.

## Free tier economics

Render Static Sites are currently free to deploy, subject to monthly included bandwidth and build pipeline minutes. Hobby includes 5 GB bandwidth according to current pricing; overages can incur charges **if a payment method is attached**. Render's billing limits and methods should be checked in the dashboard. Supabase free projects can pause after low activity and have their own storage/API limits. $0 is a pilot cost goal, not an unlimited or permanent service guarantee.

## Project constraints

One-person operated. Nigeria-first, natural English. Keep it simple: discover → vote → real result → share → optionally signal interest. No employees, no paid ads, no payment gateway, no fake metrics, no product-stock promise, no using Egatee work data.
