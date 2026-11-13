# Media checks

Files were generated locally with Python/Pillow and FFmpeg. Intended output for each: 15 seconds, 1080x1920, H.264 video and AAC original music, no spoken voice. Every MP4 was probed and fully decoded with FFmpeg. Four sampled frames per file and all four first-frame covers were visually reviewed in a contact sheet. The four direct poll URLs returned HTTP 200. Neither these checks nor a reachable URL proves that the Supabase vote flow works end to end.

The single-download review ZIP was checked with `unzip -t`. The Render site deploy was verified live: `app.js` references the corrected organiser PNG and the image URL returns HTTP 200.

New external media/API spend for this cycle: CNY 0. Music was synthesized from source code in `source/music.py` and is not sourced from a commercial music catalogue. No TikTok backend or profile settings were changed.
