# PickVela｜尼日利亚首批 100 人试运营手册

**项目目标：** 在不购买广告、没有本地团队、没有虚构数据的条件下，找到第一批愿意参与产品二选一投票的尼日利亚用户，并验证他们是否自然转发和愿意表达采购兴趣。

**主站：** https://buylink-ng.onrender.com/
**现有 WhatsApp Channel：** https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c （截至 2026-11-14，公开预览仍为旧品牌 BuyLink NG；需频道管理员在本人设备上更名）
**GitHub：** `buylink-ng-free` 分支
**托管：** Render 静态网站；`docs/` 发布目录
**数据：** Supabase 免费项目。严禁在网站中暴露数据库 service_role/secret key。
**付费限制：** 无新域名、无广告预算、无收费插件、无人工批量群发。

## 1. 试运营基线和测量口径

基线保存于非公开 SQL schema `buylink_internal.pilot_baselines`，key 为 `first_100_organic`。

基线前累计 **2 条投票 + 1 条采购兴趣 + 3 条事件**，可能含内部测试，**不算进入首批 100 用户成绩**。首次启用试验时，新阶段投票为 0。

在 Supabase SQL Editor 直接运行：

```sql
select * from buylink_internal.pilot_summary;
select * from buylink_internal.pilot_sources order by votes_after_start desc;
```

- `votes_since_start`：开始日后新增投票次数（同一浏览器可投不同问题）。
- `new_voting_browser_ids`：参与投票的不同匿名浏览器标识数。**不等于通过身份核验的真实尼日利亚人**。
- `new_interest_records`：这些新投票所关联的非约束性采购兴趣。
- `share_button_taps`：点击分享按钮次数，**不等于实际转发成功/被阅读**。
- `poll_view_events`：打开投票详情的事件，不包括首页总访客；30 分钟内同设备重复打开同一投票会被去重。
- `pilot_sources`：投票 URL 的来源标签；用户可手动修改，**仅做方向性归因**。

**2026-11-14 Work 测试流量标记：** 原始 `buylink_events` 中 `id=5`（2026-11-13 09:34 UTC）及 `id=6`（2026-11-14 01:14 UTC）是 Work 用 `src=tiktok` 检查页面时触发的浏览事件，不能算真实 TikTok 访客。保留原始事件以便核查，简报中排除。它们没有产生投票；截至本次只读核查，基线后仍是 1 票，来源 `chatgptcom`，0 条新增采购兴趣、0 次新增分享按钮点击。

正式对外称“100 个真实参与者”前，需要排除本人/团队测试，且尽可能通过真实交流、群组响应和来源核实真实性与尼日利亚相关性。匿名浏览器数只能作为近似指标。

## 2. 免费分渠道追踪链接

这些链接已可直接用于不同渠道；`?src=` 是来源代码，用来区分渠道：

- WhatsApp Channel 首发： https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel
- WhatsApp 自发转给朋友： https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_friend
- TikTok 主页： https://buylink-ng.onrender.com/?src=tiktok
- Instagram： https://buylink-ng.onrender.com/?src=instagram
- LinkedIn： https://buylink-ng.onrender.com/?src=linkedin

网站也已增加支持标准 `utm_source`：例如 `https://buylink-ng.onrender.com/?utm_source=tiktok`。当两个标签同时存在时优先使用 `src`。

注意：2026-11-14 网站更新后，用户投票并点击 WhatsApp 分享，会生成 `src=wa_friend&friend=a|b` 的挑战链接；复制链接生成 `src=share&friend=a|b`。这些参数表示分享者选择和方向性来源，不存储联系人、不证明实际转发成功，也不构成多级邀请关系分析。

## 3. 7 天首轮执行：优先真实反馈，不追求假繁荣

- **Day 0：** 现有 WhatsApp Channel 管理员将旧品牌资料改为 PickVela，并发布第一组带 `src=wa_channel` 的投票链接。不向本人 WhatsApp 好友拉票；该人群不精准。
- **Day 1–3：** 已发布的首条 TikTok 保留；依次使用现有的包、收纳、发饰视频，围绕具体使用场景询问 A/B 和理由。用公开内容争取尼日利亚目标受众，不把频道当作自带流量池。
- **Day 4–7：** 核对 TikTok 后台观看、互动与受众地区；分别查看 Supabase 的到站投票、来源和分享点击。如进入相关公开社群，先遵守社群规则并取得必要许可。

可直接复制的频道资料、视频链接和配文见 `PICKVELA-PUBLIC-LAUNCH-KIT.md`。

## 4. 英文渠道启动文案

WhatsApp Channel：

> Quick question for anyone in Nigeria: for everyday hair, are you more of a satin scrunchie person or a claw clip person? 🎀
>
> I put together a simple two-choice poll for PickVela. You can vote in a few seconds, see the actual results and ask a friend if they'd choose the same.
>
> No sign-up, no shopping and no payment — just your pick.
>
> Vote here: https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel

TikTok 15-second video shot list:

- 0–3s: Show both simple concept illustrations in the site; on-screen: “Which would you actually pick?”
- 3–8s: Screen record choosing a scrunchie or a clip; no fake results.
- 8–12s: Show the actual result bars.
- 12–15s: On-screen: “PickVela · Free vote · Nigeria 🇳🇬”. The current account screenshot has no Website field, so avoid claiming a clickable TikTok profile link.

English caption:

> Quick one for Nigeria 🇳🇬: satin scrunchies or claw clips? Which one would you use for everyday hair, and why? We're collecting honest picks on PickVela. No sign-up or checkout. #Nigeria #NaijaStyle #HairAccessories

## 5. 运营风险/边界

只卖“有趣的选择和社区反馈”这个体验，当前没有现货、成交、定金或配送承诺。产品概念图不可冒充真实实拍。
目前匿名设备去重可以被清缓存/换浏览器绕过，不是正式防刷系统；高流量前再补强。
免费平台可能会有使用配额、限流/休眠，不能宣传“永久免费不限量”。
用户自愿体验优先，群组发布需符合社区规则。周报必须明确把测试/自然投票拆开。
