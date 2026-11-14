const allowedTags=['Robots After Dark','Books','Movies/TV','Games','Life on Earth'];
const section=document.body.dataset.section||'elsewhere';
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tagsOf=p=>Array.isArray(p.tags)?p.tags.map(String).map(x=>x.trim()).filter(Boolean):String(p.tags||'').split(',').map(x=>x.trim()).filter(Boolean);
const dateOf=p=>/^\d{4}-\d{2}-\d{2}$/.test(p.date||'')?p.date:'';
const fmtDate=s=>s?new Date(s+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}):'Undated';
let all=[],tag='All',query='',year='All',month='All';
function shown(){return all.filter(p=>(section==='archive'||p.section===section)&&(tag==='All'||tagsOf(p).includes(tag))&&(year==='All'||dateOf(p).slice(0,4)===year)&&(month==='All'||dateOf(p).slice(5,7)===month)&&(!query||[p.title,p.body,tagsOf(p).join(' ')].join(' ').toLowerCase().includes(query))).sort((a,b)=>dateOf(b).localeCompare(dateOf(a)));}
function render(){const posts=shown(),area=document.querySelector('#entries'),counter=document.querySelector('#count');counter.textContent=`${posts.length} ${posts.length===1?'entry':'entries'}`;
if(!posts.length){area.innerHTML='<p class="empty">Nothing here yet.</p>';return;}
if(section==='archive'){area.innerHTML='<ul class="archive-list">'+posts.map(p=>`<li><time>${escapeHTML(fmtDate(dateOf(p)))}</time><div><a href="${p.section==='earth'?'index.html':'elsewhere.html'}#${encodeURIComponent(p.id)}">${escapeHTML(p.title||'Untitled')}</a><small>${p.section==='earth'?'Life on Earth':'Elsewhere'} · ${escapeHTML(tagsOf(p).join(' / '))}</small></div></li>`).join('')+'</ul>';return;}
area.innerHTML=posts.map(p=>`<article class="entry" id="${escapeHTML(p.id)}"><time datetime="${escapeHTML(dateOf(p))}">${escapeHTML(fmtDate(dateOf(p)))}</time><h3>${escapeHTML(p.title||'Untitled')}</h3><div class="body">${escapeHTML(p.body||'')}</div>${p.image&&/^(\/assets\/uploads\/|assets\/uploads\/)/.test(p.image)?`<img loading="lazy" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.image_alt||p.title||'Post image')}">`:''}<div class="tags">${tagsOf(p).map(t=>`<button type="button" class="tag" data-tag="${escapeHTML(t)}">${escapeHTML(t)}</button>`).join('')}</div></article>`).join('');}
function filters(){const unique=[...new Set(all.filter(p=>section==='archive'||p.section===section).flatMap(tagsOf))].sort();const wrap=document.querySelector('#filters');wrap.innerHTML=['All',...unique].map(t=>`<button type="button" class="filter ${tag===t?'active':''}" data-tag="${escapeHTML(t)}">${escapeHTML(t)}</button>`).join('');}
function dateFilters(){
 const relevant=all.filter(p=>section==='archive'||p.section===section);
 const years=[...new Set(relevant.map(p=>dateOf(p).slice(0,4)).filter(Boolean))].sort().reverse();
 const yearSelect=document.querySelector('#year-filter'),monthSelect=document.querySelector('#month-filter');
 yearSelect.innerHTML='<option value="All">All years</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('');
 if(year!=='All'&&!years.includes(year))year='All';
 yearSelect.value=year;
 const months=[...new Set(relevant.filter(p=>year==='All'||dateOf(p).startsWith(year+'-')).map(p=>dateOf(p).slice(5,7)).filter(Boolean))].sort();
 monthSelect.innerHTML='<option value="All">All months</option>'+months.map(m=>`<option value="${m}">${new Date(Date.UTC(2026,Number(m)-1,1)).toLocaleDateString('en-GB',{month:'long',timeZone:'UTC'})}</option>`).join('');
 if(month!=='All'&&!months.includes(month))month='All';
 monthSelect.value=month;
}
document.querySelector('#year-filter').addEventListener('change',e=>{year=e.target.value;dateFilters();render();});
document.querySelector('#month-filter').addEventListener('change',e=>{month=e.target.value;render();});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-tag]');if(!b)return;tag=b.dataset.tag;filters();render();});
document.querySelector('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render();});
fetch('./content/posts.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Cannot load posts');return r.json()}).then(data=>{all=Array.isArray(data.posts)?data.posts.filter(p=>p&&typeof p==='object'&&['elsewhere','earth'].includes(p.section)).map((p,i)=>({...p,id:String(p.id||`post-${i}`)})):[];filters();dateFilters();render();if(location.hash&&section!=='archive'){setTimeout(()=>document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(),80);}}).catch(()=>{document.querySelector('#entries').innerHTML='<p class="empty">Posts could not be loaded. Please try refreshing.</p>';});
