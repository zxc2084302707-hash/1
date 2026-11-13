# PickVela · account and launch review plan · 2026-11-13

**Status:** proposal for the owner. No TikTok profile changes, uploads, scheduled posts, WhatsApp Channel edits or publications were made in this cycle. Approval of this document alone does not publish anything; each video and its exact release time need explicit owner approval.

## Verified project state

- Production site: `buylink-ng-free` at `7ac7f872fb68899805d718b97c58d76ce8f24ad2`; Render deployment `dep-dbrdhd0u01pc73auafs0` is live. The root page, four poll URLs and all eight current Pexels image URLs returned HTTP 200. The live organiser image uses the corrected PNG. A real vote write and Nigerian mobile-network experience were not tested in this review, so they remain open checks.
- Video delivery branch: `pickvela-video-delivery`, with four revised 15-second H.264/AAC videos, four covers, a brand avatar, source files and one ZIP. The previous versions are preserved in Git history. The videos use licensed Pexels style references, original instrumental music, English screen text and no voiceover. They show neither fabricated votes nor a screen recording of a vote.
- TikTok: `@pickvela0` is the owner-provided account. The public page returned a TikTok verification challenge to the research client, so its actual profile and publishing state remain unverified. No account-management tool or signed-in browser is available in this Work session.
- WhatsApp Channel: the existing link works, but its public title and description still say “BuyLink NG” and describe wholesale and B2B supplier offers. This conflicts with PickVela's free style-poll purpose. Keep the original channel link and correct its branding before directing new traffic there.

## Account setup target, for review in a signed-in TikTok session

1. Keep handle `@pickvela0`. Set display name to `PickVela | A or B?` and upload `pickvela-avatar.png` after checking its crop in the actual profile.
2. Set bio to `Two styles. One vote. Real results. Starting in Nigeria 🇳🇬`. If the actual account offers a website field, use `https://buylink-ng.onrender.com/?src=tiktok` and test that it opens. Do not claim a clickable bio link until this succeeds.
3. Because an earlier conversation exposed a TikTok password, the owner must rotate it inside the official app, enable two-step verification and review recovery methods and active devices. Passwords and codes stay in the official security flow.
4. Use TikTok's native draft/publishing flow unless a free social-management connection can be verified as the same `@pickvela0` account. Do not switch account type or pay for a scheduler just to meet this plan; first inspect the actual options and music rules.

## Proposed release queue — all pending approval

The following 13:00 West Africa Time (WAT, UTC+1) slots are also 20:00 Shanghai time. They are proposed for a one-person operator and are not claimed to be empirically optimal. Move the start date if profile setup or review takes longer; nothing has been scheduled.

| Order | Proposed slot | Video and cover | Live poll | Review status |
| --- | --- | --- | --- | --- |
| 01 | Tue 2026-11-17, 13:00 WAT | [hair-final.mp4](hair-final.mp4) · [cover](hair-cover.jpg) | [Scrunchies or clips](https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=tiktok) | Owner approval pending |
| 02 | Thu 2026-11-19, 13:00 WAT | [bags-final.mp4](bags-final.mp4) · [cover](bags-cover.jpg) | [Crossbody or tote](https://buylink-ng.onrender.com/p/crossbody-or-tote/?src=tiktok) | Owner approval pending |
| 03 | Sat 2026-11-21, 13:00 WAT | [carry-final.mp4](carry-final.mp4) · [cover](carry-cover.jpg) | [Jewellery box or pouch](https://buylink-ng.onrender.com/p/organiser-or-pouch/?src=tiktok) | Owner approval pending |
| 04 | Tue 2026-11-24, 13:00 WAT | [hair_details-final.mp4](hair_details-final.mp4) · [cover](hair_details-cover.jpg) | [Pearl pins or headband](https://buylink-ng.onrender.com/p/pins-or-headbands/?src=tiktok) | Owner approval pending |

The final English captions for each video are in [REVIEW.md](REVIEW.md). Caption URLs may be plain text on TikTok. The profile website field, if available, should carry the clickable `src=tiktok` link. Before each release, review the exact video, cover, caption, account identity, URL and time in the real TikTok UI. After release, record the platform's real video URL and publication status. There is no automatic publication authorization here.

## Existing WhatsApp Channel rebrand draft

**Current link, to retain:** https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c

**Title:** `PickVela | You pick. We listen.`

**Description:** `PickVela is a free style poll. Choose between two everyday product ideas, see the real vote totals and share your pick. Starting in Nigeria 🇳🇬 No shop or checkout yet.`

**First channel post, for owner review:**

> Scrunchie or claw clip for everyday hair? 🎀  
> We're trying a simple PickVela poll in Nigeria. Pick the style you'd actually use and see the live results. No sign-up, shopping or payment.  
> Vote here: https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel  
> Know someone who would choose differently? Feel free to share the poll.

Only a channel admin in the authenticated WhatsApp app can confirm the new title, description and first post. Do not publish this draft before the owner approves it. Avoid unsolicited bulk messages.

## Pilot measurement and first 100 people

The private `first_100_organic` baseline started at `2026-11-13 05:05:18 UTC` with 2 earlier votes and 1 earlier interest record. A read-only Supabase check on 2026-11-13 returned **1 vote since start, 1 voting browser token, 0 new linked interest records, 0 share-button taps and 2 poll-view events**. The only vote-source label was `chatgptcom` (1 vote). None of this is evidence of a verified Nigerian participant or TikTok acquisition.

After any approved publication, read `buylink_internal.pilot_summary` and `buylink_internal.pilot_sources` in Supabase. Report real TikTok views from TikTok only when available; report site votes by source, distinct browser tokens, optional interest records and share-button taps separately. A tap is not a confirmed share, and a browser token is not a verified person. Keep owner/test traffic separate from voluntary Nigerian feedback. Aim first for 10–20 willing participants and three useful comments, then work toward 100 without ads, bought engagement or unsolicited mass outreach.

## Current gates

- **Account access:** signed-in TikTok profile and security screens are needed to verify and apply the proposed settings. The owner completes password and verification steps in the official app.
- **Channel admin access:** needed to replace the currently public B2B channel copy.
- **Publication:** each video and exact time require the owner's approval. Current status for all four: prepared for review, not uploaded or published.
- **Cost:** CNY 0 new media/API/ad spend for this cycle; no paid service added.
