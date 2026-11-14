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
Display name to configure: **PickVela | Style Picks**.
Existing account supplied by owner: **@pickvela0** → https://www.tiktok.com/@pickvela0.
English bio:
**Everyday style choices for Nigeria 🇳🇬** followed by **A or B? Tell us why.**
Website: https://buylink-ng.onrender.com/?src=tiktok

TikTok account setup may request account/security confirmation, depending on region. Use own legitimate credentials; don't rent multiple accounts or bypass region checks. Official documentation says personal accounts with 1,000+ followers may add profile links, while Business accounts can add a website link; availability and business verification can vary. Check actual profile UI before calling anything clickable. Business content must use properly licensed sound, ideally TikTok Commercial Music Library or original voiceover.

## Current public cold-start sequence (owner correction, 2026-11-14)
- **D0 — Existing Channel:** Owner/admin updates BuyLink NG name, description and icon to PickVela and posts the first direct poll link. No recruitment from the owner's personal WhatsApp contacts.
- **D1 — TikTok 02:** The hair video is already public and Account Check shows no unresolved issues. Verify its individual post eligibility, disclosure and sound, then review the new bags-comment-test candidate with an errand scenario and native comment question.
- **D2 — Read the post:** Inspect actual impressions, recommendation eligibility, watch time, shares and countries. If still zero with no eligibility notice after the chosen diagnostic interval, report the specific post problem through TikTok; do not mass upload similar templates.
- **D3 — Choose from evidence:** Respond to actual comments or select a remaining original video with a useful new use-case question. No need to remake the other originals before this test produces evidence.
- **D4–D7 — Read the funnel:** Separate owner-side TikTok views, watch time, comments, shares and audience location from Supabase poll votes, source tags and share-button taps. Test one permitted public Nigerian style community only if the community rules allow it.

The copy-ready Channel profile, three MP4 links and captions are in `PICKVELA-PUBLIC-LAUNCH-KIT.md`. WhatsApp Channel is for retention and direct voting; public video is the primary discovery channel while its following is unknown.

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
