/* ========================= ACCÈS ========================= */
(function(){
  let ok=false;
  try{ const a=JSON.parse(localStorage.getItem("auth")||"null"); ok=!!(a&&a.ok&&(a.rem||Date.now()-a.t<12*3600e3)); }catch(e){}
  if(!ok) location.replace("index.html"+location.hash);
})();
function logout(){ try{localStorage.removeItem("auth")}catch(e){} location.replace("index.html"); }

/* ========================= UTILITAIRES ========================= */
const $ = s => document.querySelector(s);
const norm = s => (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[’`]/g,"'");
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = n => (Math.round(n*10)/10).toString().replace(".",",");
const store = { get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}}, set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}} };
const SALT="philo-nature-justice-2026";
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(36)}
const LABELS={qcm:"QCM"}; ETUDES.forEach(e=>LABELS["etude-"+e.id]=e.titre.split(" — ")[0]+" — "+e.titre.split(" — ")[1]);
const COLS=["qcm",...ETUDES.map(e=>"etude-"+e.id),"trou-","carte-"];
const validKind=k=>COLS.includes(k)||/^(trou|carte)-[a-z0-9]+$/.test(k);
const SHORT={qcm:"QCM","etude-pascal":"Pascal","etude-rousseau-cs":"Rousseau CS","etude-rousseau-emile":"Rousseau Émile","etude-montesquieu":"Montesquieu","trou-":"Textes à trous (moy.)","carte-":"Cartes mentales (moy.)"};

/* ========================= PSEUDO ========================= */
const pseudoIn=$("#pseudo"); pseudoIn.value=store.get("pseudo","");
let pseudoT; pseudoIn.addEventListener("input",()=>{clearTimeout(pseudoT);pseudoT=setTimeout(()=>{store.set("pseudo",pseudoIn.value.trim());$("#pseudoOk").textContent=pseudoIn.value.trim()?"✓ enregistré":"";},400)});
function pseudo(){return (pseudoIn.value||"").trim()||"Anonyme"}

/* ========================= ENREGISTREMENT ========================= */
let canSave=false, myDoc=null;
const myLocal = store.get("myResults",{});
$("#saveInfo").innerHTML='<span class="note">📨 À la fin de chaque module, ta note et ta <b>moyenne générale</b> sont envoyées automatiquement à Kendji. Pense à indiquer ton prénom ci-dessus.</span>';

async function saveResult(kind,score,max){
  const at=Date.now();
  const prev=myLocal[kind];
  myLocal[kind]={s:score,m:max,at,best:Math.max(score,prev?prev.best??prev.s:-99),n:(prev?prev.n||1:0)+1};
  store.set("myResults",myLocal);
  const go=()=>sendMail(kind,score,at);
  if(!(pseudoIn.value||"").trim()&&!store.get("pseudo","")){ mailState[at]={s:"need",go}; }
  else { if(!(pseudoIn.value||"").trim()) pseudoIn.value=store.get("pseudo",""); go(); }
  return {at};
}
function makeCode(kind,s,m,at){
  const p={p:pseudo(),k:kind,s,m,t:at}; const raw=JSON.stringify(p);
  p.h=hash(raw+SALT);
  return "PHILO-"+btoa(unescape(encodeURIComponent(JSON.stringify(p)))).replace(/=+$/,"");
}
function readCode(c){
  try{
    const b=c.replace(/^PHILO-/,""); const p=JSON.parse(decodeURIComponent(escape(atob(b))));
    const h=p.h; delete p.h; const ok=hash(JSON.stringify({p:p.p,k:p.k,s:p.s,m:p.m,t:p.t})+SALT)===h;
    return ok?p:null;
  }catch(e){return null}
}
/* ========================= MOYENNE ET ENVOI DES NOTES PAR MAIL ========================= */
const MAIL_URL="https://formsubmit.co/ajax/kendji37005413@gmail.com";
const MODULES=[["QCM",k=>k==="qcm"],["Études de texte",k=>k.startsWith("etude-")],["Textes à trous",k=>k.startsWith("trou-")],["Cartes mentales",k=>k.startsWith("carte-")]];
const n20=r=>Math.max(0,Math.max(r.best??r.s,r.s))/r.m*20;
function moyennes(){
  const mods=MODULES.map(([nom,f])=>{const ks=Object.keys(myLocal).filter(k=>f(k)&&LABELS[k]);return {nom,n:ks.length,moy:ks.length?ks.reduce((t,k)=>t+n20(myLocal[k]),0)/ks.length:null}});
  const faits=mods.filter(m=>m.moy!==null);
  return {mods,gen:faits.length?faits.reduce((t,m)=>t+m.moy,0)/faits.length:null};
}
const mailState={};
async function sendMail(kind,score,at){
  const st=mailState[at]={s:"sending"}; updMail(at);
  const M=moyennes(), lab=LABELS[kind]||kind, name=pseudo();
  const detail=Object.keys(myLocal).filter(k=>LABELS[k]).map(k=>`• ${LABELS[k]} : ${fmt(Math.max(0,myLocal[k].s))}/20 (meilleure ${fmt(n20(myLocal[k]))}/20, ${myLocal[k].n||1} essai(s))`).join("\n");
  const body={_subject:`📚 25.05.1976 — ${name} : ${lab} ${fmt(Math.max(0,score))}/20 · moyenne ${M.gen===null?"—":fmt(M.gen)}/20`,_template:"table",_captcha:"false",
    "Élève":name,"Module terminé":lab,"Note obtenue":fmt(Math.max(0,score))+"/20","Moyenne générale":M.gen===null?"—":fmt(M.gen)+"/20"};
  M.mods.forEach(m=>{body["Moyenne "+m.nom]=m.moy===null?"pas encore fait":`${fmt(m.moy)}/20 (${m.n} épreuve${m.n>1?"s":""})`});
  body["Détail de toutes les notes"]=detail; body["Date"]=new Date(at).toLocaleString("fr-FR");
  try{
    const r=await fetch(MAIL_URL,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body)});
    const j=await r.json().catch(()=>({}));
    st.s=(r.ok&&String(j.success)!=="false")?"ok":"err";
  }catch(e){ st.s="err"; }
  st.retry=()=>sendMail(kind,score,at); updMail(at);
}
function mailHTML(at){
  const st=mailState[at]||{};
  if(st.s==="need") return `<div class="mailst warn">✏️ Indique ton prénom pour envoyer ta note à Kendji : <input type="text" class="mailname" maxlength="40" placeholder="Ton prénom"> <button class="btn sm" data-mailgo="${at}">Envoyer</button></div>`;
  if(st.s==="sending") return `<div class="mailst">📨 Envoi de ta note à Kendji…</div>`;
  if(st.s==="ok") return `<div class="mailst ok">✓ Ta note et ta moyenne ont été envoyées à Kendji.</div>`;
  if(st.s==="err") return `<div class="mailst warn">⚠️ L'envoi n'a pas marché (connexion ?). <button class="btn sm" data-mailretry="${at}">Réessayer</button></div>`;
  return "";
}
function updMail(at){ const e=document.getElementById("mail-"+at); if(e) e.innerHTML=mailHTML(at); }
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-mailgo]"), r=e.target.closest("[data-mailretry]");
  if(g){ const v=g.parentElement.querySelector(".mailname").value.trim(); if(!v) return; pseudoIn.value=v; store.set("pseudo",v); const at=+g.dataset.mailgo; mailState[at].go(); }
  if(r){ const at=+r.dataset.mailretry; mailState[at].retry&&mailState[at].retry(); }
});
function resultBox(title,score,max,res){
  const M=moyennes();
  let h=`<h3 style="margin-top:0">${esc(title)} : <span class="big">${fmt(Math.max(0,score))} / ${max}</span></h3>`;
  h+=`<div class="avgline">📊 Ta moyenne générale (tous modules) : <b>${M.gen===null?"—":fmt(M.gen)+" / 20"}</b> <span class="note">${M.mods.filter(m=>m.moy!==null).map(m=>m.nom+" "+fmt(m.moy)).join(" · ")}</span></div>`;
  h+=`<div id="mail-${res.at}">${mailHTML(res.at)}</div>`;
  return h;
}
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-copy]"); if(!b) return;
  try{await navigator.clipboard.writeText(b.getAttribute("data-copy"));b.parentElement.querySelector(".copied").textContent="Copié ✓"}catch(err){b.parentElement.querySelector(".copied").textContent="Sélectionne le code et copie-le à la main."}
});

/* ========================= QCM ========================= */
let qState;
function qInit(){
  qState={ans:QCM.map(()=>null),score:0,done:false};
  const perm=[];[1,2,3].forEach(n=>{const g=QCM.map((q,i)=>i).filter(i=>(QCM[i].niv||2)===n);for(let i=g.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[g[i],g[j]]=[g[j],g[i]]}perm.push(...g)});qState.perm=perm;
  // ordre d'options mélangé une fois par session
  qState.order=QCM.map(q=>{const idx=q.o.map((_,i)=>i);for(let i=idx.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}return idx});
  const NIVN={1:["🌱","Niveau 1 · Facile","Les bases à connaître absolument."],2:["🌿","Niveau 2 · Moyen","Les auteurs et leurs thèses."],3:["🌳","Niveau 3 · Difficile","Les nuances et les concepts plus fins."]};
  $("#qList").innerHTML=qState.perm.map((i,pos)=>{const q=QCM[i],n=q.niv||2,first=pos===0||(QCM[qState.perm[pos-1]].niv||2)!==n,cnt=qState.perm.filter(x=>(QCM[x].niv||2)===n).length;return (first?`${pos?"</div>":""}<div class="lvl" data-n="${n}"><div class="lvlh"><span class="lvi">${NIVN[n][0]}</span><div><b>${NIVN[n][1]}</b><div class="note">${cnt} questions · ${NIVN[n][2]}</div></div></div><div class="lock">🔒 Termine le niveau ${n-1} pour débloquer ce niveau.</div>`:"")+`<div class="card" id="q${i}"><div class="qhead"><span class="badge">${pos+1}</span><span>${esc(q.q)}${q.src==="video"?'<span class="tag">📺 vidéo</span>':''}</span></div><div class="opts">${qState.order[i].map(k=>`<button class="opt" data-q="${i}" data-k="${k}">${esc(q.o[k])}</button>`).join("")}<button class="opt skip" data-q="${i}" data-k="-1">Je ne sais pas (0 point)</button></div><div class="expl hide"></div></div>`}).join("")+"</div>";
  $("#qEnd").classList.add("hide"); qUpd(); qLocks();
}
function qLocks(){document.querySelectorAll("#qList .lvl").forEach(l=>{const n=+l.dataset.n;const prevDone=n===1||QCM.every((q,i)=>(q.niv||2)!==n-1||qState.ans[i]!==null);const was=l.classList.contains("locked");l.classList.toggle("locked",!prevDone);if(was&&prevDone){l.classList.add("unlocked");setTimeout(()=>l.scrollIntoView({behavior:"smooth",block:"start"}),300)}})}
function qNote(){return Math.max(0,qState.score)/QCM.length*20}
function qUpd(){const n=qState.ans.filter(a=>a!==null).length;$("#qScore").textContent=fmt(qNote())+" / 20";$("#qProg").textContent=n+" / "+QCM.length+" répondues · "+fmt(qState.score)+" pts";$("#qBar").style.width=(n/QCM.length*100)+"%"}
$("#qList").addEventListener("click",async e=>{
  const b=e.target.closest(".opt"); if(!b||b.disabled) return;
  const i=+b.dataset.q,k=+b.dataset.k,q=QCM[i]; if(qState.ans[i]!==null) return;
  qState.ans[i]=k; const card=$("#q"+i);
  card.querySelectorAll(".opt").forEach(o=>{o.disabled=true;const kk=+o.dataset.k;if(kk===q.a)o.classList.add("ok");if(kk===k&&k!==q.a&&k!==-1)o.classList.add("ko")});
  let pts=0,lab; if(k===q.a){pts=1;lab="Bonne réponse : +1"}else if(k===-1){lab="Passée : 0"}else{pts=-0.5;lab="Erreur : −0,5"}
  qState.score+=pts;
  const ex=card.querySelector(".expl"); ex.innerHTML=`<b>${lab}.</b> ${esc(q.e)}`; ex.classList.remove("hide"); qUpd();
  qLocks();
  if(qState.ans.every(a=>a!==null)&&!qState.done){
    qState.done=true;
    const good=qState.ans.filter((a,j)=>a===QCM[j].a).length, bad=qState.ans.filter((a,j)=>a!==-1&&a!==QCM[j].a).length, skip=QCM.length-good-bad;
    const note=Math.round(qNote()*10)/10; const res=await saveResult("qcm",note,20);
    const end=$("#qEnd"); end.innerHTML=gateMsg("qcm",note)+resultBox("QCM",note,20,res)+`<p class="note">${good} bonnes réponses, ${bad} erreurs, ${skip} passées : ${fmt(qState.score)} points sur ${QCM.length}, ramenés sur 20.${qState.score<0?" Ton total est négatif : la note est ramenée à 0.":""}</p><button class="btn alt" onclick="qInit();scrollTo(0,0)">Refaire le QCM</button>`;
    end.classList.remove("hide"); end.scrollIntoView({behavior:"smooth",block:"center"});
  }
});
$("#qReset").onclick=()=>{qInit();scrollTo(0,0)};
qInit();

/* ========================= ÉTUDES ========================= */
$("#eTiles").innerHTML=ETUDES.map(e=>`<a class="tile" href="#etude-${e.id}"><svg class="ic"><use href="#leaf"/></svg><b>${esc(e.titre)}</b><p class="note" style="margin:6px 0 0">${esc(e.auteur)}</p></a>`).join("");
const drafts=store.get("drafts",{});
function renderEtude(id){
  const e=ETUDES.find(x=>x.id===id); if(!e){$("#eBody").innerHTML="";$("#eTiles").classList.remove("hide");return}
  $("#eTiles").classList.add("hide");
  $("#eBody").innerHTML=`<p><a href="#etudes" class="btn alt sm">← Toutes les études</a></p><h2>${esc(e.titre)}</h2><div class="texte">${esc(e.texte)}</div><div class="src">${esc(e.auteur)}</div>
  ${e.qs.map((q,i)=>`<div class="card"><div class="qhead"><span class="badge">${i+1}</span><span>${esc(q.q)}</span></div>
   <div class="row" style="margin:10px 0"><button class="btn alt sm" data-t="ind${i}">💡 Indice</button><button class="btn alt sm" data-t="ref${i}">🔁 Reformuler la question</button></div>
   <div class="help hide" id="ind${i}"><b>Indice :</b> ${esc(q.ind)}</div><div class="help hide" id="ref${i}"><b>Autrement dit :</b> ${esc(q.ref)}</div>
   <textarea id="ans${i}" placeholder="Ta réponse…" style="margin-top:8px">${esc((drafts[id]||[])[i]||"")}</textarea><div id="cor${i}"></div></div>`).join("")}
  <div class="row"><button class="btn" id="eGo">Corriger mon étude</button></div><div id="eRes" class="card hide"></div>`;
  $("#eBody").querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>$("#"+b.dataset.t).classList.toggle("hide"));
  e.qs.forEach((_,i)=>$("#ans"+i).addEventListener("input",()=>{drafts[id]=e.qs.map((_,j)=>$("#ans"+j).value);store.set("drafts",drafts)}));
  $("#eGo").onclick=async()=>{
    let tot=0;
    e.qs.forEach((q,i)=>{
      const a=norm($("#ans"+i).value); let pts=0;
      const lis=q.el.map(el=>{const hit=a.length>0&&el.k.some(k=>a.includes(norm(k)));if(hit)pts+=el.p;return `<li class="${hit?"y":"n"}">${hit?"✓":"✗"} ${esc(el.l)} <span class="note">(${fmt(el.p)} pt)</span></li>`}).join("");
      tot+=pts;
      $("#cor"+i).innerHTML=`<div style="margin-top:10px"><b>${fmt(pts)} / 5</b> — éléments attendus :<ul class="elts">${lis}</ul><div class="model"><b>Proposition de corrigé :</b> ${esc(q.mod)}</div></div>`;
    });
    const note=Math.round(tot/(5*e.qs.length)*20*10)/10; const res=await saveResult("etude-"+id,note,20);
    const r=$("#eRes"); r.innerHTML=gateMsg("etude",note)+resultBox(e.titre,note,20,res)+`<p class="note">Total : ${fmt(tot)} points sur ${5*e.qs.length}, ramenés sur 20. La correction repère les idées et les mots-clés attendus. Si tu as exprimé une idée autrement, compare avec le corrigé et sois honnête avec toi-même.</p>`;
    r.classList.remove("hide"); r.scrollIntoView({behavior:"smooth",block:"center"});
  };
}

/* ========================= MES NOTES ========================= */
function renderMine(){
  const M=moyennes();
  const head=`<div class="card avgcard"><div><span class="note">Moyenne générale</span><div class="big" style="font-size:40px">${M.gen===null?"—":fmt(M.gen)+"<small>/20</small>"}</div></div><div class="avgmods">${M.mods.map(m=>`<div><span class="note">${m.nom}</span><b>${m.moy===null?"—":fmt(m.moy)+"/20"}</b></div>`).join("")}</div></div><p class="note">La moyenne générale est la moyenne des 4 modules ; dans chaque module, on prend ta meilleure note à chaque épreuve.</p>`;
  const rows=Object.keys(myLocal).filter(k=>LABELS[k]).sort((a,b)=>myLocal[b].at-myLocal[a].at).map(k=>{const r=myLocal[k];return `<tr><td>${esc(LABELS[k])}</td><td><b>${fmt(Math.max(0,r.s))} / ${r.m}</b></td><td>${fmt(Math.max(0,r.best??r.s))} / ${r.m}</td><td>${r.n||1}</td><td class="note">${new Date(r.at).toLocaleString("fr-FR")}</td></tr>`}).join("");
  $("#myNotes").innerHTML=head+(rows?`<div class="card" style="overflow-x:auto"><table><tr><th>Épreuve</th><th>Dernière note</th><th>Meilleure</th><th>Essais</th><th>Date</th></tr>${rows}</table></div><p class="note">Notes gardées sur cet appareil.</p>`:`<div class="card"><span class="note">Aucune épreuve terminée pour l'instant. Commence par le <a href="#qcm">QCM</a>.</span></div>`);
}

/* ========================= TABLEAU (propriétaire) ========================= */
let boardDocs=store.get("board",[]);
function startBoard(){ boardDocs=store.get("board",[]); drawBoard(); }
function drawBoard(){
  if(!boardDocs.length){$("#board").innerHTML='<span class="note">Aucune note pour l\'instant.</span>';return}
  const rows=boardDocs.slice().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)).map(d=>{
    const r=d.results||{}; let sum=0,n=0;
    const cells=COLS.map(k=>{let x=r[k];
      if(k.endsWith("-")){const ks=Object.keys(r).filter(z=>z.startsWith(k));if(!ks.length)return "<td class='note'>—</td>";const av=ks.reduce((t,z)=>t+Math.max(0,r[z].s)/r[z].m*20,0)/ks.length;sum+=av;n++;return `<td><b>${fmt(av)}</b>/20 <span class="note">(${ks.length} fait${ks.length>1?"s":""})</span></td>`}
      if(!x)return "<td class='note'>—</td>";const v=Math.max(0,x.s)/x.m*20;sum+=v;n++;return `<td><b>${fmt(Math.max(0,x.s))}</b>/${x.m}${x.n>1?` <span class="note">(${x.n} essais, max ${fmt(Math.max(0,x.best??x.s))})</span>`:""}</td>`}).join("");
    return `<tr><td>${esc(String(d.pseudo||"Anonyme").slice(0,40))}${d.imported?' <span class="pill">code</span>':''}</td>${cells}<td><b>${n?fmt(sum/n):"—"}</b></td><td class="note">${d.updatedAt?new Date(d.updatedAt).toLocaleDateString("fr-FR"):""}</td></tr>`}).join("");
  $("#board").innerHTML=`<table><tr><th>Élève</th>${COLS.map(k=>`<th>${SHORT[k]}</th>`).join("")}<th>Moyenne /20</th><th>Date</th></tr>${rows}</table>`;
}
/* (tableau des notes par codes retiré : les notes arrivent désormais par mail) */

/* ========================= PARCOURS : QCM → ÉTUDES → TEXTES À TROUS ========================= */
const PASS=12;
const GATE_FROM=Date.UTC(2026,10,18,16,0,0); // 18/11/2026 à 20h00, heure de La Réunion (UTC+4)
const gateOn=()=>Date.now()>=GATE_FROM;
const bestOf=k=>myLocal[k]?Math.max(myLocal[k].best??myLocal[k].s,myLocal[k].s):-1;
const bestEtude=()=>Math.max(-1,...ETUDES.map(e=>bestOf("etude-"+e.id)));
function isOpen(v){ if(!gateOn()) return true; if(v==="etudes") return bestOf("qcm")>=PASS; if(v==="trous") return bestEtude()>=PASS; return true; }
function gateMsg(kind,note){
  if(!gateOn()) return "";
  if(kind==="qcm") return note>=PASS
    ? `<div class="gatemsg ok">🔓 <b>Bravo, ${fmt(note)}/20 !</b> Tu as débloqué les <b>Études de texte</b>. <a class="btn green sm" href="#etudes">Y aller ▶</a></div>`
    : `<div class="gatemsg">🔒 Il te faut au moins <b>${PASS}/20</b> au QCM pour débloquer les Études de texte. ${bestOf("qcm")>=PASS?"(Elles sont déjà débloquées grâce à ta meilleure note.)":"Révise et retente ta chance !"}</div>`;
  return note>=PASS
    ? `<div class="gatemsg ok">🔓 <b>Bravo, ${fmt(note)}/20 !</b> Tu as débloqué les <b>Textes à trous</b>. <a class="btn green sm" href="#trous">Y aller ▶</a></div>`
    : `<div class="gatemsg">🔒 Il te faut au moins <b>${PASS}/20</b> à une étude de texte pour débloquer les Textes à trous. ${bestEtude()>=PASS?"(Ils sont déjà débloqués grâce à ta meilleure note.)":"Relis le corrigé et retente ta chance !"}</div>`;
}
function refreshGates(){
  [["etudes","Études de texte"],["trous","Textes à trous"]].forEach(([v,l])=>{
    const a=document.querySelector(`#nav a[data-v="${v}"]`); if(a) a.textContent=(isOpen(v)?"":"🔒 ")+l;
    document.querySelectorAll(`.tile[href="#${v}"]`).forEach(t=>t.classList.toggle("tlock",!isOpen(v)));
  });
}
function gate(v){
  const sec=$("#v-"+v); if(!sec) return true;
  let g=sec.querySelector(".gatebox"); if(!g){ g=document.createElement("div"); g.className="gatebox"; sec.querySelector(".rule").after(g); }
  const open=isOpen(v); sec.classList.toggle("gated",!open);
  if(!open){
    const prev=v==="etudes"?{n:"au QCM",h:"#qcm",b:bestOf("qcm")}:{n:"à une étude de texte",h:"#etudes",b:bestEtude()};
    g.innerHTML=`<div class="lockcard"><div class="bigemoji">🔒</div><h2>Niveau verrouillé</h2><p>Pour accéder à cette partie, obtiens au moins <b>${PASS}/20</b> ${prev.n}.</p>
      <div class="steps"><span class="${bestOf("qcm")>=PASS?"done":"cur"}">1. QCM</span><span class="${bestOf("qcm")<PASS?"":bestEtude()>=PASS?"done":"cur"}">2. Études de texte</span><span class="${bestEtude()>=PASS?"cur":""}">3. Textes à trous</span></div>
      <p class="note">Ta meilleure note : <b>${prev.b<0?"aucune pour l'instant":fmt(prev.b)+"/20"}</b></p><a class="btn green" href="${prev.h}">${v==="etudes"?"Faire le QCM":"Faire une étude de texte"} ▶</a></div>`;
  } else g.innerHTML="";
  return open;
}

/* ========================= ROUTAGE ========================= */
function route(){
  const h=(location.hash||"#accueil").slice(1);
  let v=h.startsWith("etude-")?"etudes":h;
  if(h.startsWith("trou-")) v="trous"; if(h.startsWith("carte-")) v="jardin"; if(h.startsWith("salon-")) v="direct"; if(h.startsWith("bac-")) v="bac";
  if(!["accueil","qcm","etudes","trous","jardin","flash","mots","bac","direct","mes-notes"].includes(v)) v="accueil";
  if(v!=="jardin"&&typeof G!=="undefined"&&G&&G.timer){clearInterval(G.timer);G=null}
  document.querySelectorAll("main>section").forEach(s=>s.classList.toggle("hide",s.id!=="v-"+v));
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.v===v));
  refreshGates();
  if((v==="etudes"||v==="trous")&&!gate(v)){ scrollTo(0,0); return; }
  if(v==="etudes") renderEtude(h.startsWith("etude-")?h.slice(6):null);
  if(v==="trous") renderTrous(h.startsWith("trou-")?h.slice(5):null);
  if(v==="jardin") renderJardin(h.startsWith("carte-")?h.slice(6):null);
  if(v==="flash") renderFlash();
  if(v==="mots"&&!W) renderMots();
  if(v==="bac") renderBac(h.startsWith("bac-")?h.slice(4):null);
  if(v==="direct") renderDirect(h.startsWith("salon-")?h.slice(6).replace(/\D/g,""):null);
  if(v==="mes-notes") renderMine();
  scrollTo(0,0);
}
addEventListener("hashchange",route); addEventListener("DOMContentLoaded",route);
