# BuyLink NG — zero-cost MVP

Status: code committed and Supabase backend working. GitHub Pages is NOT yet enabled; do not announce the site as publicly launched until the Pages settings are saved and a live browser end-to-end test passes.

## Free publishing — one-time GitHub action by repository owner

1. Open https://github.com/zxc2084302707-hash/1/settings/pages
2. Under Build and deployment, choose **Deploy from a branch** (not GitHub Actions).
3. Choose branch **buylink-ng-free**, folder **/docs**, click **Save**.
4. Wait for GitHub itself to display a successful deployment URL; open that URL on a real mobile device.
5. Test all four polls, real vote totals, duplicate-vote prevention, optional nonbinding interest, unique WhatsApp share links and Follow Channel URL.

No GitHub Actions deployment is necessary. The previous workflow was removed after its logs showed Pages was not enabled; branch publishing is simpler and automatically republishes future commits.

## Current implementation

- Lightweight static pages, no build or dependency install required. All pages live under `docs/`.
- Four editorial A/B product polls start with 0 real votes and have their own crawlable social-sharing page title/description.
- HTTPS mobile browser can vote without registering; results are from Supabase (no fake counts).
- One vote per browser/device identifier per poll; can still be bypassed by clearing storage or using another browser, so it is not robust anti-bot identity proof.
- Optional quantity and NGN budget interest; no names, phone numbers, checkout, payments, shipping or stock promises.
- Share via WhatsApp, copy link, Next pick, official channel: https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c
- Public database access is restricted to active polls and specific vote/result/interest RPC endpoints. No raw public votes/interests table read.
- Owner can edit polls and inspect responses in Supabase Table Editor; no new custom admin login in MVP.

## Boundaries

$0 plans have provider-imposed limits and Supabase free projects can pause after inactivity. Use only anonymous pilot traffic until HTTPS live tests and permission review pass. Do not upload any Egatee company data.

## Testing

Browser DOM mock tests and real database transaction-based voting and interest checks were performed without leaving artificial votes. Tests on the eventual public production address are still pending. Share links and backend permissions should be rechecked whenever deployment settings change.
