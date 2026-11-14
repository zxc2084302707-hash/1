'use strict';
// Publishable key is explicitly PUBLIC; authorization is enforced in Supabase via RLS and RPC permissions.
const API='https://ytmaitqwejjkjrkmmzpl.supabase.co';
const PUBLIC_KEY='sb_publishable_JqDACzC5We5P4Cc0-DHeAw_RP4sdkKX';
const $app=document.getElementById('app');
const icons={scrunchies:['🎀','SCRUNCHIES'],clips:['🦋','CLIPS'],crossbody:['👜','BAG'],tote:['🛍️','TOTE'],organiser:['💍','JEWELLERY'],pouch:['👝','POUCH'],pins:['✨','PINS'],headbands:['🌈','BANDS']};
const photoRefs={
  scrunchies:{url:'https://images.pexels.com/photos/6044144/pexels-photo-6044144.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Assorted satin scrunchies on a display'},
  clips:{url:'https://images.pexels.com/photos/20166053/pexels-photo-20166053.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Hair claw clips on a soft fabric background'},
  crossbody:{url:'https://images.pexels.com/photos/27204286/pexels-photo-27204286.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Brown crossbody shoulder bag'},
  tote:{url:'https://images.pexels.com/photos/30382341/pexels-photo-30382341.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Canvas tote bag with everyday items'},
  organiser:{url:'https://images.pexels.com/photos/11031636/pexels-photo-11031636.png?auto=compress&cs=tinysrgb&w=720',alt:'Open jewellery storage box showing compartments'},
  pouch:{url:'https://images.pexels.com/photos/7171399/pexels-photo-7171399.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Small pink zip pouch with keys'},
  pins:{url:'https://images.pexels.com/photos/36553497/pexels-photo-36553497.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Pearl hair pins displayed on a table'},
  headbands:{url:'https://images.pexels.com/photos/5500526/pexels-photo-5500526.jpeg?auto=compress&cs=tinysrgb&w=720',alt:'Woman wearing a colourful headband'}
};
const params=new URLSearchParams(window.location.search);
// Accept simple share tags (?src=tiktok) and standard UTM source tags
// (?utm_source=tiktok). Tags are self-reported attribution, not proof of identity.
const source=(params.get('src')||params.get('utm_source')||'direct')
  .slice(0,24).replace(/[^a-zA-Z0-9_-]/g,'')||'direct';
const navigationSource=source==='direct'?'':source;
const friendChoice=['a','b'].includes(params.get('friend'))?params.get('friend'):null;
let polls=[];
const escapeHtml=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function getDevice(){let val;try{val=localStorage.getItem('blng.device');if(!val){val=crypto.randomUUID();localStorage.setItem('blng.device',val)}}catch{val=crypto.randomUUID()}return val}
const device=getDevice();let hashPromise;
async function deviceHash(){if(!hashPromise){hashPromise=crypto.subtle.digest('SHA-256',new TextEncoder().encode('BuyLinkNG-v1:'+device)).then(a=>[...new Uint8Array(a)].map(b=>b.toString(16).padStart(2,'0')).join(''))}return hashPromise}
async function request(route,body){let init={headers:{'apikey':PUBLIC_KEY,'Content-Type':'application/json'}};if(body!==undefined){init.method='POST';init.body=JSON.stringify(body)}const res=await fetch(API+'/rest/v1/'+route,init);if(!res.ok){let obj={};try{obj=await res.json()}catch{/* Some error responses have no JSON body. */}throw new Error(obj.message||`Network problem (${res.status})`)}return res.status===204?null:res.json()}
const rpc=(name,body)=>request(`rpc/${name}`,body);
// Derive site root from script location, including GitHub Pages /repo/ paths.
const SCRIPT_URL=new URL(document.querySelector('script[src$="app.js"]').src);
const SITE_ROOT=new URL('.',SCRIPT_URL);
function href(slug,s=''){
 const url=new URL(slug?`p/${encodeURIComponent(slug)}/`:'',SITE_ROOT);
 if(s)url.searchParams.set('src',s);
 return url.toString();
}
function pollFromPath(){
 const prefix=new URL('p/',SITE_ROOT).pathname;
 if(!location.pathname.startsWith(prefix))return null;
 const slug=location.pathname.slice(prefix.length).replace(/\/+$/,'');
 return /^[a-z0-9-]+$/.test(slug)?slug:null;
}
function updateNavigation(){
 const onPoll=Boolean(pollFromPath());
 const action=document.getElementById('siteAction');
 if(action){action.href=href(onPoll?null:'scrunchies-or-clips',navigationSource);action.textContent=onPoll?'All picks →':'Start voting →'}
 const logo=document.querySelector('.logo');
 if(logo)logo.href=href(null,navigationSource);
}
function go(slug){history.pushState({},'',href(slug,navigationSource));render()}
function art(k,eager=false){
 const item=icons[k]||['✨','PICK'];
 const reference=photoRefs[k];
 const fallback=`<span class="art-fallback" aria-hidden="true">${item[0]}</span>`;
 if(!reference) return `<div class="art">${fallback}<small>${escapeHtml(item[1])}</small></div>`;
 return `<div class="art photo-art">${fallback}<img src="${escapeHtml(reference.url)}" alt="${escapeHtml(reference.alt)}" loading="${eager?'eager':'lazy'}" decoding="async" onerror="this.hidden=true"><span class="photo-reference">REFERENCE PHOTO</span><small>${escapeHtml(item[1])}</small></div>`;
}
function safeError(err){console.error(err);$app.innerHTML=`<div class="panel"><div class="error">We couldn't load the picks right now. Please check your connection and try again.</div><p class="muted small">No fake votes are shown when the service is unavailable.</p><button class="cta" id="retry">Try again</button></div>`;document.getElementById('retry').onclick=render}
async function loadPolls(){if(!polls.length)polls=await request('buylink_polls?select=id,slug,title,subtitle,a_label,a_description,a_art,b_label,b_description,b_art,status,sort_order&status=eq.active&order=sort_order.asc');return polls}
function homeCard(p){return `<a class="poll-card" href="${escapeHtml(href(p.slug,navigationSource))}" data-poll="${escapeHtml(p.slug)}"><div class="preview-art">${art(p.a_art)}${art(p.b_art)}</div><div class="card-bottom"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.subtitle||'')}</p><div class="card-meta"><span>Vote for free</span><span>Pick A or B →</span></div></div></a>`}
async function renderHome(){const list=await loadPolls();$app.innerHTML=`<section class="hero"><div class="eyebrow">Starting in Nigeria · Free style polls</div><h1>You pick.<br><em>We listen.</em></h1><p>Two real-world product styles. One simple choice. See the photos, vote for what you would use, and share your pick with a friend.</p>${list.length?`<a class="cta hero-cta" href="${escapeHtml(href(list[0].slug,navigationSource))}" data-poll="${escapeHtml(list[0].slug)}">Start with a quick vote →</a>`:''}<div class="hint">Real product-style photo references · Free voting · No purchase</div></section><section><div class="section-heading"><h2>Today's picks</h2><span class="muted small">Tap to choose</span></div><div class="cardgrid">${list.length?list.map(homeCard).join(''):'<div class="empty">New picks coming soon.</div>'}</div></section><section class="how"><div><b>01 · Choose</b><p>Pick the product you prefer. It takes seconds.</p></div><div><b>02 · See results</b><p>See actual community voting results, never made-up numbers.</p></div><div><b>03 · Share</b><p>Invite a friend to vote on the same two picks.</p></div></section>${list.length?`<section class="bottom-cta"><div><strong>Ready to pick a side?</strong><p>Start with a quick poll, then share it with a friend.</p></div><a href="${escapeHtml(href(list[0].slug,navigationSource))}" data-poll="${escapeHtml(list[0].slug)}">Choose now →</a></section>`:''}`;document.querySelectorAll('[data-poll]').forEach(a=>a.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();go(a.dataset.poll)}))}
async function track(id,kind){try{await rpc('buylink_log_event',{p_poll_id:id,p_hash:await deviceHash(),p_kind:kind,p_src:source})}catch{/* Noncritical tracking errors are ignored. */}}
async function renderPoll(slug){const list=await loadPolls();const p=list.find(q=>q.slug===slug);if(!p){$app.innerHTML=`<div class="panel"><p>That pick is not available.</p><a class="cta" href="${escapeHtml(href(null,navigationSource))}">View current picks</a></div>`;return}
const hash=await deviceHash();const [v,result]=await Promise.all([rpc('buylink_my_vote',{p_poll_id:p.id,p_hash:hash}),rpc('buylink_result',{p_poll_id:p.id})]);const current=v||null;
$app.innerHTML=`<div class="panel"><a class="back" href="${escapeHtml(href(null,navigationSource))}" id="back">← All picks</a><div class="poll-top"><div class="eyebrow" style="margin-top:25px">COMMUNITY PICK</div><h1>${escapeHtml(p.title)}</h1>${friendChoice?`<p class="friend-pick">A friend picked ${escapeHtml(friendChoice==='a'?p.a_label:p.b_label)}. Would you choose the same?</p>`:''}<p>${escapeHtml(p.subtitle||'Choose your favourite below.')}</p><p class="tap-instruction">${current?'Your vote is recorded. See the live results below.':'Tap A or B to vote. See the live results after.'}</p></div><div class="choices"><button class="choice ${current==='a'?'selected':''}" data-choice="a" aria-label="Vote for ${escapeHtml(p.a_label)}" ${current?'disabled':''}>${art(p.a_art,true)}<h3>A. ${escapeHtml(p.a_label)}</h3><p>${escapeHtml(p.a_description||'')}</p></button><button class="choice ${current==='b'?'selected':''}" data-choice="b" aria-label="Vote for ${escapeHtml(p.b_label)}" ${current?'disabled':''}>${art(p.b_art,true)}<h3>B. ${escapeHtml(p.b_label)}</h3><p>${escapeHtml(p.b_description||'')}</p></button></div><div id="resultSpace"></div><div class="note">Real reference photos (Pexels), not verified PickVela stock or specific supplier listings. Vote for the style you prefer. No items are for sale and no order is placed.</div></div>`;
document.getElementById('back').onclick=e=>{e.preventDefault();go(null)};
if (current) {
  showResults(p,current,result);
} else {
  document.querySelectorAll('[data-choice]').forEach(button => {
    button.onclick = async () => {
      document.querySelectorAll('[data-choice]').forEach(el => {el.disabled=true});
      button.classList.add('selected');
      try {
        const chosen=await rpc('buylink_cast_vote',{p_poll_id:p.id,p_hash:hash,p_choice:button.dataset.choice,p_src:source});
        const r=await rpc('buylink_result',{p_poll_id:p.id});
        showResults(p,chosen,r);
      } catch(e) {
        document.querySelectorAll('[data-choice]').forEach(el=>{el.disabled=false});
        document.getElementById('resultSpace').innerHTML='<p class="error">Vote could not be saved. Please try again.</p>';
        console.error(e);
      }
    };
  });
}
track(p.id,'view')}
function parseResult(r){return Array.isArray(r)?r[0]||{}:r||{}}
function challengeUrl(p,chosen,channel){const url=new URL(href(p.slug,channel));url.searchParams.set('friend',chosen);return url.toString()}
function showResults(p,chosen,data){const r=parseResult(data),a=Number(r.a_votes||0),b=Number(r.b_votes||0),total=a+b,ap=total?Math.round(a*100/total):0,bp=total?100-ap:0;const el=document.getElementById('resultSpace');el.innerHTML=`<div class="results"><h2>Thanks for voting! ${chosen==='a'?'You chose A.':'You chose B.'}</h2>${friendChoice?`<p class="compare-pick">${friendChoice===chosen?'You and your friend picked the same style.':'You and your friend picked different styles.'}</p>`:''}<p class="muted small">${total} ${total===1?'vote':'votes'} so far · Live totals</p><div class="percent"><div class="percent-header"><span>${escapeHtml(p.a_label)}</span><span>${ap}%</span></div><div class="track"><div class="fill" style="width:${ap}%"></div></div></div><div class="percent"><div class="percent-header"><span>${escapeHtml(p.b_label)}</span><span>${bp}%</span></div><div class="track"><div class="fill" style="width:${bp}%"></div></div></div><p class="share-prompt">Who would pick the other one? Send them your choice.</p><div class="cta-row"><button class="cta" id="shareWhatsApp">Challenge a friend on WhatsApp ↗</button><button class="outline" id="copyLink">Copy challenge link</button></div><p id="shareMessage" class="toast" aria-live="polite"></p><div class="interest" id="interest"><h3>Would you actually consider buying this?</h3><p class="muted small">Optional interest research only. No price offer, order, notification or delivery promise.</p><div class="cta-row"><button class="outline" id="interestYes">Maybe, yes</button><button class="outline" id="interestNo">Not now</button></div></div><button class="outline next-pick" id="nextPick">Try another pick →</button></div>`;const picked=chosen==='a'?p.a_label:p.b_label;document.getElementById('shareWhatsApp').onclick=()=>{track(p.id,'share');window.open('https://wa.me/?text='+encodeURIComponent(`I picked ${picked}. Would you choose the same? Vote and see the real results: ${challengeUrl(p,chosen,'wa_friend')}`),'_blank','noopener,noreferrer')};document.getElementById('copyLink').onclick=async()=>{try{await navigator.clipboard.writeText(challengeUrl(p,chosen,'share'));document.getElementById('shareMessage').textContent='Challenge link copied!';track(p.id,'copy')}catch{document.getElementById('shareMessage').textContent='Please copy the URL from your address bar.'}};document.getElementById('interestNo').onclick=()=>{document.getElementById('interest').innerHTML='<p class="muted small">Thanks for taking part!</p>'};document.getElementById('interestYes').onclick=()=>showInterestForm(p,chosen);document.getElementById('nextPick').onclick=()=>{const index=polls.findIndex(x=>x.id===p.id);if(polls.length>1)go(polls[(index+1)%polls.length].slug);else go(null)}}
function showInterestForm(p,chosen){const box=document.getElementById('interest');box.innerHTML=`<h3>Tell us a little more</h3><p class="muted small">Non-binding product research. No order, guaranteed price, or delivery promise. We do not ask for contact details.</p><label class="field-label" for="qty">Possible quantity</label><select id="qty"><option value="1-2">1–2 pieces</option><option value="3-5">3–5 pieces</option><option value="6-10">6–10 pieces</option><option value="10+">More than 10 pieces</option></select><label class="field-label" for="budget">Total budget in naira (₦)</label><select id="budget"><option value="under-5k">Under ₦5,000</option><option value="5k-10k">₦5,000–10,000</option><option value="10k-20k">₦10,000–20,000</option><option value="20k+">Above ₦20,000</option></select><div class="cta-row"><button class="cta" id="saveInterest">Save interest</button><button class="outline" id="skipInterest">Skip</button></div><p id="interestStatus" class="small muted"></p>`;document.getElementById('skipInterest').onclick=()=>{box.innerHTML='<p class="muted small">Thanks for your vote!</p>'};document.getElementById('saveInterest').onclick=async()=>{const btn=document.getElementById('saveInterest');btn.disabled=true;try{await rpc('buylink_submit_interest',{p_poll_id:p.id,p_hash:await deviceHash(),p_choice:chosen,p_qty:document.getElementById('qty').value,p_budget:document.getElementById('budget').value});box.innerHTML='<p class="success">Thanks! Your non-binding interest was recorded.</p>'}catch(e){console.error(e);document.getElementById('interestStatus').textContent='Could not save. Try again.';btn.disabled=false}}}
function renderInfo(type){const privacy=type==='privacy';$app.innerHTML=`<section class="panel legal"><a class="back" href="./" id="back">← Back to picks</a><h1>${privacy?'Privacy notice':'Terms of use'}</h1>${privacy?`<p>PickVela is a free product-interest polling experiment focused on Nigeria. We use a random identifier stored in your browser to help avoid repeat votes on each poll. The identifier is hashed before sending to the database. We collect your poll choice, optional quantity and budget ranges, and basic referral/source information if present in the link.</p><p>We do not require your name, phone number or account, and we do not sell, ship or take payments. Only aggregate vote totals are shown publicly. We use technical services to host the page and store results. Style-reference photos load from Pexels image servers, which may receive basic connection data such as your IP address. The pictured goods are examples, not items we have verified in stock. We may remove abusive or invalid activity. Avoid entering personal details into any optional field.</p><p>Clearing browser storage resets your local identifier; this does not erase already submitted anonymous vote counts. For privacy requests, use the official PickVela WhatsApp Channel; it is a broadcast channel, so we cannot guarantee a private reply there. A dedicated support address is not yet available.</p>`:`<p>This site is a free demonstration of community preferences. Voting and interest responses do not create a purchase order, sale contract, product reservation, price offer or shipping promise.</p><p>Product concepts and illustrations are for research and may not correspond to an available item. Vote counts reflect submitted choices; anonymous votes are not proof of unique individuals or purchase intent.</p><p>Do not abuse the voting system or attempt to interfere with other visitors. We may change or discontinue polls at any time. No promotions or prizes are offered.</p>`}</section>`;document.getElementById('back').onclick=e=>{e.preventDefault();go(null)}}
async function render(){updateNavigation();$app.innerHTML='<div class="loading">Loading today’s picks…</div>';try{const p=new URLSearchParams(location.search);if(p.has('info'))renderInfo(p.get('info'));else if(pollFromPath()||p.has('poll'))await renderPoll(pollFromPath()||p.get('poll'));else await renderHome()}catch(err){safeError(err)}}
window.addEventListener('popstate',render);render();
