(function(){
const C=window.COURSES||[],$m=document.getElementById('main');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safe(h){if(!h)return'';const d=new DOMParser().parseFromString(h,'text/html');d.querySelectorAll('script,style,iframe,img,object').forEach(n=>n.remove());
 d.body.querySelectorAll('*').forEach(n=>{[...n.attributes].forEach(a=>{if(!(n.tagName==='A'&&a.name==='href'&&/^https?:/.test(a.value)))n.removeAttribute(a.name)})});return d.body.innerHTML}
const txt=h=>new DOMParser().parseFromString(h||'','text/html').body.textContent.trim();
const MODES={FT:'Full time',PT:'Part time',DL:'Distance learning',AP:'Apprenticeship'};const mode=m=>MODES[m]||m||'—';
const IMG={'Hair':'hairdressing','Beauty':'hairdressing','Catering':'catering','Cookery':'catering','Hospitality':'catering','Construction':'carpentiry','Carpentry':'carpentiry','Painting':'carpentiry','Fashion':'fashion-textiles','Art':'fashion-textiles','Creative':'fashion-textiles'};
function img(c){const s=(c.section+' '+c.C_TITLE);for(const k in IMG)if(s.includes(k))return'img/'+IMG[k]+'.jpg';return'img/students-learning.jpg'}
// FICTITIOUS sample events
const EV=[{id:1,t:'Open Evening – all subjects',type:'Open event',d:'2027-02-10',time:'17:00–19:30',loc:'Moulsham Street campus (sample)',desc:'Meet tutors, tour workshops and get help with your application.',img:'group-of-learners'},
{id:2,t:'Adult Learning Information Session',type:'Information session',d:'2027-02-17',time:'18:00–19:00',loc:'Online (Microsoft Teams)',desc:'Find out about part-time and evening courses, funding and Advanced Learner Loans.',img:'students-learning'},
{id:3,t:'Hair & Beauty Taster Day',type:'Taster day',d:'2027-03-03',time:'10:00–14:00',loc:'Princes Road campus (sample)',desc:'Try practical activities in our training salons.',img:'hairdressing'},
{id:4,t:'Apprenticeships Employer Breakfast',type:'Employer event',d:'2027-03-11',time:'08:00–09:30',loc:'Moulsham Street campus (sample)',desc:'For local businesses considering taking on an apprentice.',img:'carpentiry'},
{id:5,t:'Catering Showcase Lunch',type:'Taster day',d:'2027-03-24',time:'12:00–14:00',loc:'Training restaurant (sample)',desc:'Lunch cooked and served by our Professional Cookery learners.',img:'catering'}];
const fmtD=d=>new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'long',year:'numeric'});
function setNav(r){document.querySelectorAll('nav a').forEach(a=>{const h=a.getAttribute('href').slice(2);a.toggleAttribute('aria-current',false);if((r.split('/')[0]||'')===h.split('/')[0]&&!(h===''&&r!==''))a.setAttribute('aria-current','page')})}
function title(t){document.title=t+' – Chelmsford College (prototype)'}
function card(c){return `<article class="card"><img src="${img(c)}" alt="" loading="lazy"><div class="body"><h3><a href="#/course/${c.C_ID}">${esc(c.C_TITLE)}</a></h3>
<p>${c.section?`<span class="tag">${esc(c.section)}</span>`:''}${(c.levels||[]).slice(0,1).map(l=>`<span class="tag">${esc(l)}</span>`).join('')}<span class="tag">${esc(mode(c.C_MODE))}</span></p><p class="muted">${esc(c.C_DURATION||'')}</p></div></article>`}
function home(){title('Home');$m.innerHTML=`<section class="hero"><div class="wrap"><p>Find your future at Chelmsford College</p><h1>Courses for school leavers, adults and apprentices</h1>
<form class="search" role="search" onsubmit="location.hash='#/search?q='+encodeURIComponent(this.q.value);return false"><label for="q" class="visually-hidden">Search courses</label><input id="q" name="q" type="search" placeholder="Search courses, e.g. hairdressing" autocomplete="off"><button class="btn green">Search</button></form>
<p style="margin-top:1rem"><a class="btn ghost" href="#/search">Browse all courses</a></p></div></section>
<div class="campaign" role="region" aria-label="Key message"><div class="wrap">Applications open for September 2027 – <a href="#/events" style="color:#111">book an Open Evening</a> (sample campaign message)</div></div>
<section class="block"><div class="wrap"><h2>Featured courses</h2><div class="grid three">${C.slice(0,6).map(card).join('')}</div></div></section>
<section class="block alt"><div class="wrap layout"><div><h2>Life at Chelmsford College</h2><div class="video" role="img" aria-label="Video placeholder: campus tour"><span>▶ Video area (placeholder)</span></div></div>
<div><h2>Upcoming events</h2><ul>${EV.slice(0,3).map(e=>`<li><a href="#/event/${e.id}">${esc(e.t)}</a><br><span class="muted">${fmtD(e.d)}</span></li>`).join('')}</ul><a class="btn" href="#/events">All events</a></div></div></section>`}
function uniq(a){return[...new Set(a.filter(Boolean))].sort()}
function search(p){title('Course search');const q=(p.get('q')||'').toLowerCase(),s=p.get('section')||'',l=p.get('level')||'',m=p.get('mode')||'';
const res=C.filter(c=>(!q||(c.C_TITLE+' '+c.section+' '+txt(c.C_QUALIFICATION)).toLowerCase().includes(q))&&(!s||c.section===s)&&(!l||(c.levels||[]).includes(l))&&(!m||c.C_MODE===m));
const opt=(arr,v,f=x=>x)=>arr.map(x=>`<option value="${esc(x)}"${x===v?' selected':''}>${esc(f(x))}</option>`).join('');
$m.innerHTML=`<div class="wrap"><h1>Find a course</h1><form class="filters" id="f"><div><label for="fq">Keyword</label><input id="fq" name="q" value="${esc(p.get('q')||'')}"></div>
<div><label for="fs">Subject area</label><select id="fs" name="section"><option value="">All subjects</option>${opt(uniq(C.map(c=>c.section)),s)}</select></div>
<div><label for="fl">Level</label><select id="fl" name="level"><option value="">All levels</option>${opt(uniq(C.flatMap(c=>c.levels||[])),l)}</select></div>
<div><label for="fm">Study mode</label><select id="fm" name="mode"><option value="">All modes</option>${opt(uniq(C.map(c=>c.C_MODE)),m,mode)}</select></div></form>
<p class="muted">Campus filter: not present in the supplied sample data – would be added from the campus field of the live course table.</p>
<p role="status" aria-live="polite"><strong>${res.length}</strong> course${res.length===1?'':'s'} found</p><div class="grid three">${res.map(card).join('')||'<p>No courses match. Try removing a filter.</p>'}</div></div>`;
const f=document.getElementById('f');f.addEventListener('change',()=>{const n=new URLSearchParams(new FormData(f));[...n.keys()].forEach(k=>!n.get(k)&&n.delete(k));location.hash='#/search?'+n});f.addEventListener('submit',e=>{e.preventDefault();f.dispatchEvent(new Event('change'))})}
function course(id){const c=C.find(x=>String(x.C_ID)===id);if(!c)return notFound();title(c.C_TITLE);
const sec=(t,h)=>h?`<details><summary>${t}</summary><div>${safe(h)}</div></details>`:'';
$m.innerHTML=`<div class="course-hero"><div class="wrap"><p><a href="#/search" style="color:#fff">← Back to courses</a></p><h1>${esc(c.C_TITLE)}</h1><p>${esc(c.section)}</p></div></div>
<div class="wrap layout"><div><img src="${img(c)}" alt="" style="border-radius:10px;margin-top:1rem">
<ul class="facts"><li><strong>Mode</strong><br>${esc(mode(c.C_MODE))}</li><li><strong>Duration</strong><br>${esc(c.C_DURATION||'—')}</li><li><strong>Level</strong><br>${esc((c.levels||[]).join(', ')||'—')}</li><li><strong>Course code</strong><br>${esc(c.C_COURSECODE||'—')}</li></ul>
${sec('Qualification',c.C_QUALIFICATION)}${sec('What you will study',c.C_STUDYOVERVIEW)}${sec('Additional qualifications and support',c.C_ADDITIONALQUALS)}${sec('Entry requirements',c.C_ELIGIBILITY||c.C_ELIGIBILITYSPECIFIC)}${sec('How you are assessed',c.C_ASSESSMENT)}${sec('Career and progression',c.C_EMPLOYABILITY)}${sec('Fees',c.C_FEES||c.C_ADDITIONALFEES)}
${(c.funding||[]).length?`<details><summary>Funding options</summary><div><ul>${c.funding.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div></details>`:''}
<details><summary>How this page gets its data (for the panel)</summary><div><p>One Razor template renders every course. Fields map to the College tables: <code>courses</code> (title, mode, duration, qualification, overview…), <code>course_sections</code> (subject area), <code>course_levels</code> via <code>course_level_link</code>, and <code>course_funding</code> via <code>course_fund_link</code>. In the live build these are read-only queries against the College SQL Server, cached and refreshed on change.</p></div></details></div>
<aside><div class="sticky-cta"><a class="btn green" href="#/pay?course=${c.C_ID}">Apply / pay deposit</a><a class="btn ghost" href="#/events">Open events</a></div></aside></div>`}
function events(p){title('Events');const t=p.get('type')||'',m=p.get('month')||'';const types=uniq(EV.map(e=>e.type));
const res=EV.filter(e=>(!t||e.type===t)&&(!m||e.d.slice(0,7)===m));
$m.innerHTML=`<div class="wrap"><h1>Events</h1><p class="notice">All events below are <strong>fictitious samples</strong> for the prototype.</p><form class="filters" id="ef"><div><label for="et">Event type</label><select id="et" name="type"><option value="">All types</option>${types.map(x=>`<option${x===t?' selected':''}>${esc(x)}</option>`).join('')}</select></div>
<div><label for="em">Month</label><select id="em" name="month"><option value="">Any month</option>${uniq(EV.map(e=>e.d.slice(0,7))).map(x=>`<option value="${x}"${x===m?' selected':''}>${new Date(x+'-01T12:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</option>`).join('')}</select></div></form>
<p role="status" aria-live="polite">${res.length} event(s)</p><div class="grid three">${res.map(e=>`<article class="card"><img src="img/${e.img}.jpg" alt="" loading="lazy"><div class="body"><p class="tag">${esc(e.type)}</p><h3><a href="#/event/${e.id}">${esc(e.t)}</a></h3><p><time datetime="${e.d}">${fmtD(e.d)}</time> · ${esc(e.time)}</p></div></article>`).join('')}</div></div>`;
const f=document.getElementById('ef');f.addEventListener('change',()=>{const n=new URLSearchParams(new FormData(f));[...n.keys()].forEach(k=>!n.get(k)&&n.delete(k));location.hash='#/events?'+n})}
function event(id){const e=EV.find(x=>String(x.id)===id);if(!e)return notFound();title(e.t);
$m.innerHTML=`<div class="wrap"><p><a href="#/events">← All events</a></p><h1>${esc(e.t)}</h1><p class="tag">${esc(e.type)} (sample)</p><img src="img/${e.img}.jpg" alt="" style="border-radius:10px">
<ul class="facts"><li><strong>Date</strong><br><time datetime="${e.d}">${fmtD(e.d)}</time></li><li><strong>Time</strong><br>${esc(e.time)}</li><li style="grid-column:1/-1"><strong>Location</strong><br>${esc(e.loc)}</li></ul><p>${esc(e.desc)}</p>
<form id="bk" novalidate><h2>Book your place</h2><div class="field"><label for="bn">Full name</label><input id="bn" required autocomplete="name"></div><div class="field"><label for="be">Email</label><input id="be" type="email" required autocomplete="email"></div><button class="btn">Book (demo)</button><p id="bm" role="status" aria-live="polite"></p></form></div>`;
document.getElementById('bk').onsubmit=ev=>{ev.preventDefault();const ok=bn.value.trim()&&/\S+@\S+\.\S+/.test(be.value);bm.className=ok?'notice':'error';bm.textContent=ok?'Demo only: booking confirmation would be emailed. No data has been sent.':'Enter your name and a valid email address.'}}
// Payment journey (simulated)
const TYPES={deposit:{l:'Course deposit',d:'Paid before enrolment to secure your place',amt:50},materials:{l:'Materials fee',d:'Paid after enrolment for kit and materials',amt:85},trip:{l:'Trip or one-off payment',d:'Educational visits and other one-off items',amt:35}};
let P={};
function pay(p){title('Make a payment');const step=+(p.get('step')||1);if(p.get('course'))P.course=p.get('course');
const steps=['Payment type','Who is paying','Details','Review','Confirmation'];
let h=`<div class="wrap" style="max-width:720px"><h1>Make a payment</h1><p class="notice"><strong>Simulated payment journey.</strong> Amounts are fictitious; no card data is collected and no payment is taken. In the live build the card step is a provider-hosted checkout (provider not yet selected by the College).</p>
<ol class="steps" aria-label="Progress">${steps.map((s,i)=>`<li${i+1===step?' aria-current="step"':''} class="${i+1<step?'done':''}">${i+1}. ${s}</li>`).join('')}</ol><form id="pf" novalidate>`;
if(step===1)h+=`<fieldset><legend>What are you paying for?</legend>${Object.entries(TYPES).map(([k,v])=>`<div class="opt"><input type="radio" name="type" id="t${k}" value="${k}"${P.type===k?' checked':''}><label for="t${k}"><strong>${v.l}</strong> – £${v.amt}.00 (sample)<br><span class="hint">${v.d}</span></label></div>`).join('')}</fieldset>`;
if(step===2)h+=`<fieldset><legend>Who is making the payment?</legend><div class="opt"><input type="radio" name="payer" id="ps" value="student"${P.payer==='student'?' checked':''}><label for="ps">I am the student</label></div><div class="opt"><input type="radio" name="payer" id="pp" value="parent"${P.payer==='parent'?' checked':''}><label for="pp">I am a parent or carer paying for a student</label></div></fieldset>`;
if(step===3){const cs=P.course?C.find(c=>String(c.C_ID)===P.course):null;h+=`<div class="field"><label for="sid">Student ID number</label><span class="hint" id="sidh">Printed on the offer letter. Example: 1234567</span><input id="sid" name="sid" inputmode="numeric" aria-describedby="sidh" value="${esc(P.sid||'')}"></div>
<div class="field"><label for="sname">Student full name</label><input id="sname" name="sname" autocomplete="${P.payer==='parent'?'off':'name'}" value="${esc(P.sname||'')}"></div>
${P.payer==='parent'?`<div class="field"><label for="pname">Your full name (payer)</label><input id="pname" name="pname" autocomplete="name" value="${esc(P.pname||'')}"></div>`:''}
<div class="field"><label for="pem">Email for the receipt</label><input id="pem" name="pem" type="email" autocomplete="email" value="${esc(P.pem||'')}"></div>
<div class="field"><label for="pc">Course</label><select id="pc" name="course" style="width:100%;min-height:44px">${C.map(c=>`<option value="${c.C_ID}"${cs&&cs.C_ID===c.C_ID?' selected':''}>${esc(c.C_TITLE)}</option>`).join('')}</select></div>`}
if(step===4){const c=C.find(x=>String(x.C_ID)===P.course)||{};h+=`<h2>Check your payment</h2><dl class="facts"><div><dt>Payment</dt><dd>${esc(TYPES[P.type].l)}</dd></div><div><dt>Amount</dt><dd>£${TYPES[P.type].amt}.00 (sample)</dd></div><div><dt>Student</dt><dd>${esc(P.sname)} (${esc(P.sid)})</dd></div><div><dt>Payer</dt><dd>${P.payer==='parent'?esc(P.pname)+' (parent/carer)':'Student'}</dd></div><div style="grid-column:1/-1"><dt>Course</dt><dd>${esc(c.C_TITLE||'')}</dd></div></dl><p class="hint">Next: provider-hosted secure checkout (simulated here – no card fields).</p>`}
if(step===5){const ref='DEMO-'+Math.random().toString(36).slice(2,8).toUpperCase();h+=`<div class="notice" role="status"><h2>Payment simulated</h2><p>Reference <strong>${ref}</strong> (fictitious). In the live build the receipt is emailed and the payment is recorded against student ID and course ID for finance reporting.</p></div><p><a class="btn" href="#/">Back to home</a></p>`;P={}}
if(step<5)h+=`<p id="perr" class="error" role="alert"></p><div style="display:flex;gap:.5rem">${step>1?`<a class="btn ghost" href="#/pay?step=${step-1}">Back</a>`:''}<button class="btn green">${step===4?'Pay now (simulated)':'Continue'}</button></div>`;
$m.innerHTML=h+'</form></div>';const f=document.getElementById('pf');if(!f)return;
f.onsubmit=e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(f));let err='';
if(step===1){if(!fd.type)err='Choose what you are paying for.';else P.type=fd.type}
if(step===2){if(!fd.payer)err='Choose who is making the payment.';else P.payer=fd.payer}
if(step===3){Object.assign(P,fd);if(!/^\d{5,9}$/.test(fd.sid||''))err='Enter the student ID using numbers only.';else if(!fd.sname?.trim())err='Enter the student name.';else if(P.payer==='parent'&&!fd.pname?.trim())err='Enter your name.';else if(!/\S+@\S+\.\S+/.test(fd.pem||''))err='Enter a valid email address.'}
if(err){perr.textContent=err;return}location.hash='#/pay?step='+(step+1)}}
function notFound(){title('Not found');$m.innerHTML='<div class="wrap"><h1>Page not found</h1><p><a href="#/">Go to home</a></p></div>'}
function route(){const h=location.hash.slice(2)||'';const [path,qs]=h.split('?');const p=new URLSearchParams(qs||'');const seg=path.split('/');setNav(path);
if(!path)home();else if(seg[0]==='search')search(p);else if(seg[0]==='course')course(seg[1]);else if(seg[0]==='events')events(p);else if(seg[0]==='event')event(seg[1]);else if(seg[0]==='pay')pay(p);else notFound();
window.scrollTo(0,0);$m.focus({preventScroll:true});document.getElementById('nav').classList.remove('open');document.querySelector('.menu-btn').setAttribute('aria-expanded','false')}
document.querySelector('.menu-btn').onclick=e=>{const n=document.getElementById('nav'),o=n.classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
addEventListener('hashchange',route);route();
})();
