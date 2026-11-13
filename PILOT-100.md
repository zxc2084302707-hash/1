# BuyLink NG｜尼日利亚首批 100 人试运营手册

**项目目标：** 在不购买广告、没有本地团队、没有虚构数据的条件下，找到第一批愿意参与产品二选一投票的尼日利亚用户，并验证他们是否自然转发和愿意表达采购兴趣。

**主站：** https://buylink-ng.onrender.com/
**官方 WhatsApp Channel：** https://whatsapp.com/channel/0029Vb9IWzl7YSd20eU4SC0c
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

正式对外称“100 个真实参与者”前，需要排除本人/团队测试，且尽可能通过真实交流、群组响应和来源核实真实性与尼日利亚相关性。匿名浏览器数只能作为近似指标。

## 2. 免费分渠道追踪链接

这些链接已可直接用于不同渠道；`?src=` 是来源代码，用来区分渠道：

- WhatsApp Channel 首发： https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel
- WhatsApp 自发转给朋友： https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_friend
- TikTok 主页： https://buylink-ng.onrender.com/?src=tiktok
- Instagram： https://buylink-ng.onrender.com/?src=instagram
- LinkedIn： https://buylink-ng.onrender.com/?src=linkedin

网站也已增加支持标准 `utm_source`：例如 `https://buylink-ng.onrender.com/?utm_source=tiktok`。当两个标签同时存在时优先使用 `src`。

注意：用户在网页完成投票后点击网站的 WhatsApp 分享按钮，系统用 `src=whatsapp` 标记下游流量，因此不会完整保留上游传播链，也不是真正的多级邀请关系分析。

## 3. 7 天首轮执行：优先真实反馈，不追求假繁荣

- **Day 1：** 在 WhatsApp Channel 发布第一组二选一投票的短文案、带来源标签的网页链接；找 10–15 个真实熟人，自愿请他们帮忙用尼日利亚朋友的视角试用（不请求反复投票）。
- **Day 2：** 手机录屏制作首条 10–15 秒英文 TikTok，真实展示投票操作和网站；无需制造“热卖”“现货”假象。
- **Day 3：** 征得允许后在相关本地群组分享一次；避免非自愿私信轰炸和骚扰。
- **Day 4：** 用 Supabase 查看来源/投票/兴趣；检查用户反馈问题，不是立即增加十种功能。
- **Day 5：** 重点宣传第二组（crossbody vs tote），比较不同话题的自然互动。
- **Day 6：** 录制下一条短视频，用实际反馈做创意（量少时不伪造多数结果）。
- **Day 7：** 汇总不同浏览器标识、有效自愿参与、不同渠道来源及分享行为。未达到 100 时延长实验，而不是购买虚假流量。

## 4. 英文渠道启动文案

WhatsApp Channel：

> Quick question for anyone in Nigeria: for everyday hair, are you more of a satin scrunchie person or a claw clip person? 🎀
>
> I put together a simple two-choice poll for BuyLink NG. You can vote in a few seconds, see the actual results and share it with a friend.
>
> No sign-up, no shopping and no payment — just your pick.
>
> Vote here: https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=wa_channel

TikTok 15-second video shot list:

- 0–3s: Show both simple concept illustrations in the site; on-screen: “Which would you actually pick?”
- 3–8s: Screen record choosing a scrunchie or a clip; no fake results.
- 8–12s: Show the actual result bars.
- 12–15s: On-screen: “Vote on BuyLink NG · Free · Nigeria 🇳🇬”. Add site URL to TikTok profile if the account is eligible; otherwise use a clearly visible brand name and avoid claiming a clickable link when none exists.

English caption:

> Quick one for Nigeria 🇳🇬: satin scrunchies or claw clips? We made a simple voting page to see what people actually prefer. No sign-up, no checkout. Pick yours on BuyLink NG and send it to a friend. #Nigeria #NaijaStyle #HairAccessories

## 5. 运营风险/边界

只卖“有趣的选择和社区反馈”这个体验，当前没有现货、成交、定金或配送承诺。产品概念图不可冒充真实实拍。
目前匿名设备去重可以被清缓存/换浏览器绕过，不是正式防刷系统；高流量前再补强。
免费平台可能会有使用配额、限流/休眠，不能宣传“永久免费不限量”。
用户自愿体验优先，群组发布需符合社区规则。周报必须明确把测试/自然投票拆开。
