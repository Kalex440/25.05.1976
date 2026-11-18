/* ========================= SALON ENTRE AMIS (multijoueur, coop ou individuel) =========================
   Un élève crée un salon et invite ses amis avec un lien. Tout le monde joue sur son propre appareil.
   Connexion directe entre navigateurs (WebRTC) grâce à PeerJS : aucun serveur ni compte à créer. */
const PEER_PREFIX = "p25051976-";
const SHAPES = ["▲", "◆", "●", "■"], COLORS = ["#e2453c", "#1f63d6", "#e5a300", "#2e8a3e"];
const HEARTS = 5, NEXT_DELAY = 7;
let L = {role: null};

function peerOpts(){
  const q = new URLSearchParams(location.search);
  if (q.get("peer") === "local") return {host: location.hostname, port: 9000, path: "/p", secure: false, debug: 0};
  return {debug: 0};
}
function loadPeer(){
  if (window.Peer) return Promise.resolve();
  const srcs = ["https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js", "https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js"];
  return new Promise((ok, ko) => {
    const tryLoad = i => {
      if (i >= srcs.length) return ko(new Error("lib"));
      const s = document.createElement("script"); s.src = srcs[i]; s.onload = () => ok(); s.onerror = () => tryLoad(i + 1);
      document.head.appendChild(s);
    };
    tryLoad(0);
  });
}
const lv = h => { $("#lBody").innerHTML = h; };
const inviteLink = code => location.origin + location.pathname.replace(/[^/]*$/, "") + "revisions.html#salon-" + code;
const rankTxt = r => r + (r === 1 ? "er" : "e");

/* ---------------- Accueil de l'onglet ---------------- */
function renderDirect(code){
  if (L.role) return;
  const myName = store.get("pseudo", "") || "";
  if (code){ // arrivé par un lien d'invitation
    lv(`<div class="stage pstage"><div class="bigemoji">💌</div><h2>Invitation au salon ${code.replace(/(\d{3})(\d{3})/, "$1 $2")}</h2>
      <p>Un ami t'invite à réviser avec lui !</p>
      <input type="text" id="jName" maxlength="20" placeholder="Ton pseudo" value="${esc(myName)}" style="max-width:320px;margin:0 auto 10px;display:block;text-align:center">
      <button class="btn green" id="jGo">Rejoindre le salon</button><p class="note" id="jMsg"></p></div>`);
    $("#jGo").onclick = () => joinRoom(code);
    return;
  }
  lv(`<div class="grid2">
    <div class="card"><h3 style="margin-top:0">🎮 Créer un salon</h3>
      <p class="note">Tu crées la partie, tu invites tes amis avec un lien, et vous jouez chacun sur votre téléphone.</p>
      <input type="text" id="hName" maxlength="20" placeholder="Ton pseudo" value="${esc(myName)}" style="margin-bottom:10px">
      <button class="btn green" id="hGo" style="width:100%">Créer le salon</button><p class="note" id="hMsg"></p></div>
    <div class="card"><h3 style="margin-top:0">🔗 Rejoindre un salon</h3>
      <p class="note">Ouvre le lien d'invitation reçu, ou entre le code du salon.</p>
      <input type="text" id="jCode" inputmode="numeric" maxlength="7" placeholder="Code à 6 chiffres" style="font-size:22px;letter-spacing:.2em;text-align:center;margin-bottom:8px">
      <input type="text" id="jName" maxlength="20" placeholder="Ton pseudo" value="${esc(myName)}" style="margin-bottom:10px">
      <button class="btn" id="jGo" style="width:100%">Rejoindre</button><p class="note" id="jMsg"></p></div>
  </div>
  <div class="card note"><b>Deux modes :</b><br>🤝 <b>Coop</b> : vous formez une équipe. À chaque question, la réponse choisie par la majorité compte pour toute l'équipe. Bonne réponse : +1000 pour l'équipe ; mauvaise réponse : l'équipe perd un cœur (5 cœurs).<br>⚔️ <b>Individuel</b> : chacun pour soi. Bonne réponse : jusqu'à +1000 selon ta rapidité ; mauvaise réponse : −250 ; pas de réponse : 0. Classement après chaque question.</div>`);
  $("#hGo").onclick = createRoom;
  $("#jGo").onclick = () => joinRoom(($("#jCode").value || "").replace(/\D/g, ""));
}

/* ======================= HÔTE (créateur du salon, qui joue aussi) ======================= */
async function createRoom(){
  const name = ($("#hName").value || "").trim().slice(0, 20);
  if (!name){ $("#hMsg").textContent = "Choisis un pseudo."; return; }
  store.set("pseudo", name);
  $("#hMsg").textContent = "Création du salon…";
  try { await loadPeer(); } catch(e){ $("#hMsg").textContent = "Impossible de charger le module de jeu. Vérifie ta connexion internet."; return; }
  L = {role: "host", me: "host", players: {host: {id: "host", name, score: 0, good: 0, online: true, ans: {}}},
       mode: "coop", nq: 10, dur: 20, phase: "lobby", qi: -1, hearts: HEARTS, team: 0};
  const tryOpen = attempt => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const peer = new Peer(PEER_PREFIX + code, peerOpts());
    peer.on("open", () => { L.peer = peer; L.code = code; history.replaceState(null, "", "#direct"); bcastLobby(); });
    peer.on("error", err => {
      if (err.type === "unavailable-id" && attempt < 5){ peer.destroy(); tryOpen(attempt + 1); }
      else if (!L.peer){ L = {role: null}; renderDirect(); $("#hMsg").textContent = "Connexion au service de jeu impossible (" + err.type + "). Réessaie dans un instant."; }
    });
    peer.on("connection", conn => {
      conn.on("data", d => hostOnData(conn, d));
      conn.on("close", () => {
        const p = Object.values(L.players).find(x => x.conn === conn); if (!p) return;
        p.online = false; if (L.phase === "lobby") delete L.players[p.id];
        if (L.phase === "lobby") bcastLobby(); else checkAllAnswered();
      });
    });
  };
  tryOpen(0);
}
function sendTo(p, msg){ if (p.id === "host") return onMsg(msg); try { if (p.online && p.conn) p.conn.send(msg); } catch(e){} }
function bcast(msg){ Object.values(L.players).forEach(p => sendTo(p, msg)); }
function online(){ return Object.values(L.players).filter(p => p.online); }

function hostOnData(conn, d){
  if (!d || typeof d !== "object") return;
  if (d.t === "join"){
    const name = String(d.name || "Joueur").trim().slice(0, 20) || "Joueur";
    let p = Object.values(L.players).find(x => norm(x.name) === norm(name));
    if (p && p.online){ conn.send({t: "deny", why: "Ce pseudo est déjà pris dans ce salon, choisis-en un autre."}); return; }
    if (!p){ p = {id: conn.peer, name, score: 0, good: 0, ans: {}}; L.players[p.id] = p; }
    p.conn = conn; p.online = true;
    if (L.phase === "lobby") bcastLobby();
    else {
      conn.send({t: "wait", msg: "La partie a déjà commencé : tu joues dès la prochaine question !"});
      if (L.phase === "q") sendQuestion(p);
    }
  }
  if (d.t === "a"){ const p = Object.values(L.players).find(x => x.conn === conn); if (p) hostAnswer(p, d); }
}
function bcastLobby(){
  const msg = {t: "lobby", code: L.code, mode: L.mode, nq: L.nq, dur: L.dur, players: online().map(p => ({name: p.name, host: p.id === "host"}))};
  bcast(msg);
}
function hostStart(){
  const pool = QCM.filter(q => q.o.length === 4).slice();
  for (let i = pool.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  L.qs = pool.slice(0, L.nq); L.qi = -1; L.hearts = HEARTS; L.team = 0; L.teamGood = 0;
  Object.values(L.players).forEach(p => { p.score = 0; p.good = 0; p.ans = {}; });
  hostNext();
}
function sendQuestion(p){
  const q = L.qs[L.qi];
  sendTo(p, {t: "q", i: L.qi, n: L.qs.length, q: q.q, o: q.o, dur: L.dur, left: Math.max(1, L.dur - (performance.now() - L.t0) / 1000), mode: L.mode, hearts: L.hearts, team: L.team});
}
function hostNext(){
  clearTimeout(L.nextT); L.qi++;
  if (L.qi >= L.qs.length || (L.mode === "coop" && L.hearts <= 0)) return hostEnd();
  L.phase = "q"; L.t0 = performance.now();
  Object.values(L.players).forEach(sendQuestion);
  clearTimeout(L.qT); L.qT = setTimeout(hostReveal, L.dur * 1000 + 300);
}
function hostAnswer(p, d){
  if (L.phase !== "q" || d.i !== L.qi || p.ans[L.qi]) return;
  const ms = Math.min(L.dur * 1000, Math.max(0, +d.ms || 0)), q = L.qs[L.qi], ok = +d.k === q.a;
  const gain = L.mode === "solo" ? (ok ? Math.round(1000 * (1 - ms / (L.dur * 1000) / 2)) : -250) : 0;
  p.ans[L.qi] = {k: +d.k, ok, gain}; p.score += gain; if (ok) p.good++;
  const got = online().filter(x => x.ans[L.qi]).length;
  const votes = [0, 0, 0, 0]; online().forEach(x => { if (x.ans[L.qi]) votes[x.ans[L.qi].k]++; });
  bcast({t: "prog", got, total: online().length, votes: L.mode === "coop" ? votes : null});
  checkAllAnswered();
}
function checkAllAnswered(){
  if (L.phase !== "q") return;
  const on = online(); if (on.length && on.every(x => x.ans[L.qi])) hostReveal();
}
function hostReveal(){
  if (L.phase !== "q") return;
  L.phase = "r"; clearTimeout(L.qT);
  const q = L.qs[L.qi], votes = [0, 0, 0, 0];
  Object.values(L.players).forEach(p => { const a = p.ans[L.qi]; if (a) votes[a.k]++; });
  let teamOk = null;
  if (L.mode === "coop"){
    const mx = Math.max(...votes);
    teamOk = mx > 0 && votes[q.a] === mx && votes.filter(v => v === mx).length === 1; // majorité nette sur la bonne réponse
    if (teamOk){ L.team += 1000; L.teamGood++; } else L.hearts--;
  }
  const ranked = Object.values(L.players).sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 5).map(p => ({name: p.name, score: p.score, on: p.online}));
  const last = L.qi + 1 >= L.qs.length || (L.mode === "coop" && L.hearts <= 0);
  ranked.forEach((p, r) => {
    const a = p.ans[L.qi];
    sendTo(p, {t: "r", i: L.qi, n: L.qs.length, mode: L.mode, q: q.q, o: q.o, correct: q.a, e: q.e, votes, teamOk, hearts: L.hearts, team: L.team,
      me: {ok: a ? a.ok : null, gain: a ? a.gain : 0, score: p.score, rank: r + 1, total: ranked.length, k: a ? a.k : null}, top, last, delay: NEXT_DELAY});
  });
  L.nextT = setTimeout(hostNext, NEXT_DELAY * 1000);
}
function hostEnd(){
  L.phase = "end"; clearTimeout(L.nextT); clearTimeout(L.qT);
  const ranked = Object.values(L.players).sort((a, b) => (L.mode === "coop" ? b.good - a.good : b.score - a.score));
  const list = ranked.map(p => ({name: p.name, score: p.score, good: p.good}));
  const played = Math.min(L.qi + 1, L.qs.length);
  ranked.forEach((p, r) => sendTo(p, {t: "end", mode: L.mode, list, rank: r + 1, team: L.team, teamGood: L.teamGood, hearts: L.hearts, played, n: L.qs.length, me: {score: p.score, good: p.good}}));
}
function quitLive(){ try { L.peer && L.peer.destroy(); } catch(e){} clearTimeout(L.qT); clearTimeout(L.nextT); clearInterval(L.tick); L = {role: null}; if (location.hash.startsWith("#salon-")) history.replaceState(null, "", "#direct"); renderDirect(); }

/* ======================= INVITÉ ======================= */
async function joinRoom(code){
  const name = ($("#jName").value || "").trim().slice(0, 20);
  if (code.length !== 6){ $("#jMsg").textContent = "Le code fait 6 chiffres."; return; }
  if (!name){ $("#jMsg").textContent = "Choisis un pseudo."; return; }
  store.set("pseudo", name);
  $("#jMsg").textContent = "Connexion au salon…";
  try { await loadPeer(); } catch(e){ $("#jMsg").textContent = "Impossible de charger le module de jeu. Vérifie ta connexion internet."; return; }
  L = {role: "guest", code, name};
  const peer = new Peer(undefined, peerOpts()); L.peer = peer;
  const fail = m => { if (L.role === "guest" && !L.conn){ try { peer.destroy(); } catch(e){} L = {role: null}; renderDirect(); $("#jMsg").textContent = m; } };
  const to = setTimeout(() => fail("Salon introuvable. Vérifie le code ou demande un nouveau lien à ton ami."), 15000);
  peer.on("error", err => { clearTimeout(to); fail(err.type === "peer-unavailable" ? "Salon introuvable : il est peut-être fermé. Demande un nouveau lien à ton ami." : "Connexion impossible (" + err.type + ")."); });
  peer.on("open", () => {
    const conn = peer.connect(PEER_PREFIX + code, {reliable: true});
    conn.on("open", () => { clearTimeout(to); L.conn = conn; conn.send({t: "join", name}); history.replaceState(null, "", "#direct"); });
    conn.on("data", onMsg);
    conn.on("close", () => { if (L.role === "guest" && L.phase !== "end") lv(`<div class="stage pstage"><div class="bigemoji">📡</div><h2>Connexion perdue</h2><p>Le créateur du salon a quitté la partie ou ta connexion a coupé.</p><button class="btn" onclick="rejoin()">Revenir dans le salon</button> <button class="btn alt" onclick="quitLive()">Quitter</button></div>`); });
  });
}
function rejoin(){ const {code, name} = L; try { L.peer.destroy(); } catch(e){} L = {role: null}; renderDirect(code); $("#jName").value = name; joinRoom(code); }
function sendAnswer(d){ if (L.role === "host") hostAnswer(L.players.host, d); else L.conn && L.conn.send(d); }

/* ======================= AFFICHAGE COMMUN (hôte et invités) ======================= */
function heartsHTML(h){ return Array.from({length: HEARTS}, (_, i) => `<span class="heart ${i < h ? "" : "lost"}">❤</span>`).join(""); }
function onMsg(d){
  if (!d || typeof d !== "object") return;
  const host = L.role === "host";
  if (d.t === "deny"){ const m = d.why, code = L.code; try { L.peer.destroy(); } catch(e){} L = {role: null}; renderDirect(code); $("#jMsg").textContent = m; return; }
  if (d.t === "wait"){ L.phase = "wait"; lv(`<div class="stage pstage"><div class="bigemoji spin">⏳</div><h2>${esc(d.msg)}</h2></div>`); }
  if (d.t === "lobby"){
    L.phase = "lobby";
    const link = inviteLink(d.code);
    const msg = `Viens réviser la philo avec moi ! Rejoins mon salon sur 25.05.1976 : ${link}`;
    lv(`<div class="stage">
      <div class="row" style="justify-content:space-between"><span class="pill">Salon ${d.code.replace(/(\d{3})(\d{3})/, "$1 $2")}</span><span class="note">${d.players.length} joueur(s)</span></div>
      ${host ? `<h3>Invite tes amis</h3><div class="invite"><div class="code" id="invLink">${esc(link)}</div>
        <div class="row" style="margin-top:8px"><a class="btn green sm" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Inviter par WhatsApp</a><button class="btn alt sm" data-copy="${esc(link)}">Copier le lien</button><span class="note copied"></span></div>
        <p class="note">Tes amis peuvent aussi entrer le code <b>${d.code}</b> dans « Rejoindre un salon ».</p></div>` : `<h3>Tu es dans le salon !</h3><p class="note">Le créateur du salon choisit le mode et lance la partie.</p>`}
      <h3>Joueurs</h3><div class="plist">${d.players.map(p => `<span class="pchip">${p.host ? "👑 " : ""}${esc(p.name)}</span>`).join("")}</div>
      <h3>Mode de jeu</h3>
      <div class="modes">
        <button class="mode ${d.mode === "coop" ? "on" : ""}" data-m="coop" ${host ? "" : "disabled"}><span class="mi">🤝</span><b>Coop</b><span>Une seule équipe : la majorité décide, 5 cœurs partagés</span></button>
        <button class="mode ${d.mode === "solo" ? "on" : ""}" data-m="solo" ${host ? "" : "disabled"}><span class="mi">⚔️</span><b>Individuel</b><span>Chacun pour soi : vitesse, points négatifs, classement</span></button>
      </div>
      ${host ? `<div class="grid2" style="margin-top:10px"><div><label class="note">Nombre de questions</label><select id="sN" class="sel">${[5, 10, 15, 20].map(n => `<option ${n === d.nq ? "selected" : ""}>${n}</option>`).join("")}</select></div>
        <div><label class="note">Temps par question</label><select id="sT" class="sel">${[15, 20, 30].map(n => `<option value="${n}" ${n === d.dur ? "selected" : ""}>${n} s</option>`).join("")}</select></div></div>
        <div class="row" style="justify-content:center;margin-top:12px"><button class="btn green" id="sGo">Lancer la partie ▶</button><button class="btn alt sm" onclick="quitLive()">Fermer le salon</button></div>`
      : `<p class="note" style="text-align:center">${d.nq} questions · ${d.dur} s par question</p><div class="row" style="justify-content:center"><button class="btn alt sm" onclick="quitLive()">Quitter le salon</button></div>`}
    </div>`);
    if (host){
      document.querySelectorAll(".mode").forEach(b => b.onclick = () => { L.mode = b.dataset.m; bcastLobby(); });
      $("#sN").onchange = () => { L.nq = +$("#sN").value; bcastLobby(); };
      $("#sT").onchange = () => { L.dur = +$("#sT").value; bcastLobby(); };
      $("#sGo").onclick = hostStart;
    }
  }
  if (d.t === "q"){
    L.phase = "q"; L.qi = d.i; L.answered = false; const t0 = performance.now(), offset = (d.dur - d.left) * 1000;
    lv(`<div class="stage pstage">
      <div class="row" style="justify-content:space-between"><span class="pill">Question ${d.i + 1} / ${d.n}</span>${d.mode === "coop" ? `<span class="hearts">${heartsHTML(d.hearts)}</span><span class="pill">Équipe : ${d.team}</span>` : `<span class="pill">⚔️ Individuel</span>`}</div>
      <h3 class="qmid">${esc(d.q)}</h3>
      <div class="timer"><i id="pBar" style="width:${d.left / d.dur * 100}%"></i><span id="pSec">${Math.ceil(d.left)}</span></div>
      <div class="answers pl">${d.o.map((o, k) => `<button class="ans" data-k="${k}" style="--c:${COLORS[k]}"><span class="sh">${SHAPES[k]}</span><span class="at">${esc(o)}</span><span class="vt" id="vt${k}"></span></button>`).join("")}</div>
      <p class="note" id="pProg">${d.mode === "coop" ? "La réponse choisie par la majorité de l'équipe compte." : "Plus tu réponds vite, plus tu marques."}</p></div>`);
    const bar = $("#pBar"); requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `width ${d.left}s linear`; bar.style.width = "0%"; }));
    clearInterval(L.tick); L.tick = setInterval(() => { const s = $("#pSec"); if (!s){ clearInterval(L.tick); return; } s.textContent = Math.max(0, Math.ceil(d.left - (performance.now() - t0) / 1000)); }, 250);
    document.querySelectorAll("#lBody .ans").forEach(b => b.onclick = () => {
      if (L.answered) return; L.answered = true;
      sendAnswer({t: "a", i: d.i, k: +b.dataset.k, ms: Math.round(offset + performance.now() - t0)});
      document.querySelectorAll("#lBody .ans").forEach(x => { x.classList.toggle("picked", x === b); x.classList.toggle("faded", x !== b); x.disabled = true; });
    });
  }
  if (d.t === "prog" && L.phase === "q"){
    $("#pProg") && ($("#pProg").textContent = `${d.got} / ${d.total} ont répondu`);
    if (d.votes) d.votes.forEach((v, k) => { const e = $("#vt" + k); if (e) e.textContent = v ? "👤".repeat(Math.min(v, 6)) + (v > 6 ? "+" : "") : ""; });
  }
  if (d.t === "r"){
    L.phase = "r"; clearInterval(L.tick);
    const me = d.me, mx = Math.max(1, ...d.votes);
    let head;
    if (d.mode === "coop") head = `<div class="bigemoji pop">${d.teamOk ? "🌻" : "💔"}</div><h2>${d.teamOk ? "L'équipe a trouvé !" : "L'équipe s'est trompée…"}</h2><div class="gain">${d.teamOk ? "+1000" : "−1 ❤"}</div><p><span class="hearts">${heartsHTML(d.hearts)}</span> · Score d'équipe : <b>${d.team}</b></p><p class="note">Toi : ${me.ok === true ? "bonne réponse ✔" : me.ok === false ? "mauvaise réponse ✘" : "pas de réponse"}</p>`;
    else head = `<div class="bigemoji pop">${me.ok === true ? "🌻" : me.ok === false ? "🥀" : "⌛"}</div><h2>${me.ok === true ? "Bonne réponse !" : me.ok === false ? "Raté…" : "Pas de réponse"}</h2><div class="gain">${me.gain > 0 ? "+" : ""}${me.gain}</div><p>Score : <b>${me.score}</b> · Tu es <b>${rankTxt(me.rank)}</b> sur ${me.total}</p>`;
    lv(`<div class="stage pstage res ${(d.mode === "coop" ? d.teamOk : me.ok) ? "good" : "bad"}">${head}
      <div class="bars">${d.o.map((o, k) => `<div class="bcol ${k === d.correct ? "good" : "dim"}"><div class="bv" style="--c:${COLORS[k]};height:${8 + d.votes[k] / mx * 90}px">${d.votes[k]}</div><div class="bl"><span class="sh">${SHAPES[k]}</span>${k === d.correct ? " ✔" : ""}</div></div>`).join("")}</div>
      <div class="expl" style="text-align:left"><b>Réponse : ${esc(d.o[d.correct])}.</b> ${esc(d.e)}</div>
      ${d.mode === "solo" ? `<h3>Classement</h3><div class="lboard">${d.top.map((p, i) => `<div class="lrow" style="--i:${i}"><span class="rk">${i + 1}</span><span class="nm">${esc(p.name)}</span><span class="sc">${p.score}</span></div>`).join("")}</div>` : ""}
      <p class="note" id="nextIn">${d.last ? "Fin de la partie dans" : "Question suivante dans"} <b>${d.delay}</b> s</p>
      ${host ? `<button class="btn sm" onclick="hostNext()">${d.last ? "Voir les résultats" : "Passer à la suite"} ▶</button>` : ""}</div>`);
    let s = d.delay; clearInterval(L.tick); L.tick = setInterval(() => { s--; const e = $("#nextIn b"); if (e && s >= 0) e.textContent = s; else clearInterval(L.tick); }, 1000);
  }
  if (d.t === "end"){
    L.phase = "end"; clearInterval(L.tick);
    let body;
    if (d.mode === "coop"){
      const win = d.hearts > 0;
      body = `<div class="bigemoji pop">${win ? "🏆" : "🥀"}</div><h2>${win ? "Victoire de l'équipe !" : "L'équipe n'a plus de cœurs…"}</h2>
        <p>Score d'équipe : <b>${d.team}</b> · ${d.teamGood} bonne(s) réponse(s) collective(s) sur ${d.played} · <span class="hearts">${heartsHTML(d.hearts)}</span></p>
        <h3>Meilleurs coéquipiers</h3><div class="lboard">${d.list.map((p, i) => `<div class="lrow" style="--i:${i}"><span class="rk">${i === 0 ? "⭐" : i + 1}</span><span class="nm">${esc(p.name)}</span><span class="sc">${p.good} ✔</span></div>`).join("")}</div>`;
    } else {
      const pod = [1, 0, 2].map(i => d.list[i] ? `<div class="pod p${i + 1}"><div class="pn">${esc(d.list[i].name)}</div><div class="ps">${d.list[i].score} pts</div><div class="pb">${i + 1}</div></div>` : `<div class="pod p${i + 1} empty"></div>`).join("");
      body = `<h2>🏆 Podium</h2><div class="podium">${pod}</div><p>Tu termines <b>${rankTxt(d.rank)}</b> avec <b>${d.me.score}</b> points (${d.me.good} bonnes réponses).</p>
        <h3>Classement complet</h3><div class="lboard">${d.list.map((p, i) => `<div class="lrow" style="--i:${i}"><span class="rk">${i + 1}</span><span class="nm">${esc(p.name)}</span><span class="sc">${p.score}</span></div>`).join("")}</div>`;
    }
    lv(`<div class="stage pstage">${body}<div class="row" style="justify-content:center;margin-top:14px">${host ? `<button class="btn green" onclick="L.phase='lobby';bcastLobby()">Rejouer avec le même salon</button>` : ""}<button class="btn alt" onclick="quitLive()">${host ? "Fermer le salon" : "Quitter"}</button></div></div>`);
    if (d.mode === "coop" ? d.hearts > 0 : d.rank <= 3) confetti($("#lBody .stage"));
  }
}

function confetti(el){
  if (!el) return;
  for (let i = 0; i < 40; i++){
    const c = document.createElement("i"); c.className = "conf";
    c.style.left = Math.random() * 100 + "%"; c.style.background = ["#ffd34d", "#5aa0ff", "#7ccb5e", "#ff8fb8", "#e2453c"][i % 5];
    c.style.animationDelay = Math.random() * 0.8 + "s"; c.style.setProperty("--x", (Math.random() * 120 - 60) + "px");
    el.appendChild(c); setTimeout(() => c.remove(), 3500);
  }
}
