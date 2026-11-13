# PickVela · Week 1 Cold Start (Nigeria)

## Operating principle
One human operator, one phone, $0 ad spend, no paid influencer or extra accounts. Site https://buylink-ng.onrender.com already exists and the WhatsApp Channel is https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c.

This is **style preference research**, not a retail storefront. Photos are commercially usable **Pexels reference photography**, NOT actual supplier photos, verified inventory, Nigeria stock, or goods for sale. Photo provenance: PHOTO-SOURCES.md.

Local catalogue presence checked, but not a procurement verification:
- Nigeria crossbody category exists: https://www.jumia.com.ng/womens-cross-body-bags/
- Nigeria scrunchies category exists: https://www.jumia.com.ng/mlp-scrunchies/
- Nigeria jewellery organisers category exists: https://www.jumia.com.ng/jewelry-organizers/
This establishes that product types are listed in Nigeria, NOT that these exact photos/SKUs have reliable suppliers or known economics. Do not use marketplace copyrighted photos; use licensed reference photography instead.

## Account settings (one TikTok account)
Candidate display name: **PickVela | A or B?**.
Candidate handles (availability must be checked in TikTok): `@pickvela`, `@pickvela.picks`, `@pickvelahq`.
English bio:
**Two styles. One vote. Real results. Starting in Nigeria 🇳🇬**
Website: https://buylink-ng.onrender.com/?src=tiktok

TikTok account setup may request account/security confirmation, depending on region. Use own legitimate credentials; don't rent multiple accounts or bypass region checks. Official documentation says personal accounts with 1,000+ followers may add profile links, while Business accounts can add a website link; availability and business verification can vary. Check actual profile UI before calling anything clickable. Business content must use properly licensed sound, ideally TikTok Commercial Music Library or original voiceover.

## Publish sequence for first 7 days
- **D1 — Website + Channel:** Verify product-reference images load on a Nigerian mobile network and screenshots. Post WhatsApp poll #1. Ask 10 personal contacts voluntarily (not mass blasting) to vote once and provide honest usability feedback. Record outreach channel count separate from poll count.
- **D2 — TikTok 01:** 15-second first A/B hair accessories video. Screen-record PickVela voting page; do not claim "most popular" with tiny counts.
- **D3 — Community seeding:** Ask admins for permission before posting in 1 or 2 relevant women's style/consumer-choice WhatsApp communities. Ask "Which would you pick and why?" not "buy now".
- **D4 — TikTok 02:** Crossbody versus tote. Use new licensed photo options displayed on website.
- **D5 — Channel 02:** Open bags poll and share link with label `src=wa_channel`. Observe referrals and discuss user replies.
- **D6 — TikTok 03:** Which would you prefer for daily essentials? Use screenshots or viewer comments after permission.
- **D7 — Review:** Supabase private pilot summary and per-source stats; log user-reported image issues, potential Nigerian audience fit, and abandonment points.

**First-week realistic hurdle:** 10–20 voluntary Nigerian participants and 3 usable qualitative responses. The project’s long-term experiment aims for 100 verified external people, but anonymous browser tokens alone cannot prove unique Nigerians.

## TikTok video templates (vertical 9:16)
Produce from one phone using its screen recording and native TikTok editor; no paid AI or stock-trading apps. One 1080x1920 video, 12-20 seconds. Use 3-5 simple cuts, a visible first-second question, and avoid footage copyrighted by third-party sellers.

### Video 01: Hair comparison, ~15 sec
0–2 sec: Show real reference photo A, text **"Nigeria: A or B?"**
2–4 sec: Show real reference photo B, text **"Scrunchies or claw clips?"**
4–8 sec: Screen record opening https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=tiktok
8–12 sec: Tap A or B and show actual results (do not change results to exaggerate).
12–15 sec: Text **"Pick yours · PickVela · Free poll"**.

English voice (optional): “Quick one, Nigeria. Which would you actually choose for everyday hair: satin scrunchies or claw clips? Vote on PickVela and send your pick to a friend.”

Caption:
“Team scrunchies 🎀 or team claw clips? I’m testing something small for Nigeria: two styles, one vote, real results. Vote at PickVela. No checkout. #Nigeria #NaijaStyle #HairAccessories”

### Video 02: Bags, ~15 sec
0–3s: “Going out: carry less or carry everything?”
3–7s: Crossbody photo A vs tote photo B
7–12s: Real app vote and result
12–15s: “Your pick? PickVela.”
Voice: “Crossbody bag or canvas tote for your everyday errands? I’d love to see what people in Nigeria prefer.”
Caption:
“Which bag fits your day better? 👜 Crossbody vs canvas tote. Vote on PickVela — no sign-up, just a quick pick. #Nigeria #EverydayStyle #BagStyle”

### Video 03: Explain purpose, ~18 sec
0–3s: “Why are we asking people to vote?”
3–8s: 2 real photo-based polls on phone
8–13s: “To learn what people actually prefer BEFORE sourcing anything.”
13–18s: “Your choices shape what we explore next. No payment.”
Caption:
“We’re not pretending to have a shop full of products. PickVela is an early experiment: discover everyday styles, vote, see actual results. Your feedback matters. 🇳🇬 #Nigeria #ConsumerChoices”

## WhatsApp Channel launch message (ready to paste)
🇳🇬 Quick pick from PickVela!

Satin scrunchies or claw clips — which would you actually use for everyday hair?

I’m trying a simple product-choice experiment. You can see real reference photos, vote in seconds and view the current results.

No sign-up. No selling. No payment. Just your honest choice.

🗳️ https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel

Know a friend who'd pick differently? Send them this poll. 👀

## Private pilot data
Run in Supabase SQL Editor:
```sql
select * from buylink_internal.pilot_summary;
select * from buylink_internal.pilot_sources order by votes_after_start desc;
```
The baseline is saved separately; do NOT count old test votes as new real users. Monitor unique browser tokens, vote records, engagement, and interest records separately. Current site uses `src` or `utm_source` query parameters for attribution. User-originated tags are not proof of actual geography or referral chain.

## Constraints and privacy
- Do not send bulk unsolicited DMs, use unconsented contacts, or purchase followers.
- No fake stock, supplier, prices, sales, endorsements, images, votes or popularity claims.
- Third-party Pexels photo hotlinks may fail on some networks. UI has emoji fallback. Get own authorized supplier images once a style is validated.
- Never post TikTok videos via connected apps without user authorizing channel and reviewing the first posts.
- No user comments or phone data are collected by the web app; use the channel for general broadcast only, not private support.
