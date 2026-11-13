# Media checks

Files were generated locally with Python/Pillow and FFmpeg. Intended output for each: 15 seconds, 1080x1920, H.264 video and AAC original music, no spoken voice. Every MP4 was probed and fully decoded with FFmpeg. Four sampled frames per file and all four first-frame covers were visually reviewed in a contact sheet. The four direct poll URLs returned HTTP 200. Neither these checks nor a reachable URL proves that the Supabase vote flow works end to end.

The four copy-edited MP4s were fully decoded again with FFmpeg; each probes as exactly 15.000 seconds. Five sampled frames per file and the revised covers were visually checked for readable natural English, site green, PickVela label and site address. The Render site deploy was verified live: `app.js` references the corrected organiser PNG. The root page, four poll URLs and all eight current image URLs returned HTTP 200. This still does not prove a completed vote write or mobile layout on a Nigerian network. The single-download review ZIP is checked with `unzip -t` after packaging.

New external media/API spend for this cycle: CNY 0. Music was synthesized from source code in `source/music.py` and is not sourced from a commercial music catalogue. No TikTok backend or profile settings were changed.
