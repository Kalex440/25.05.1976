/* ========================= LE JARDIN DES IDÉES (cartes mentales animées) ========================= */
CARTES.forEach(c => { LABELS["carte-" + c.id] = "Carte mentale — " + c.titre; });

const SVG_BUD = `<svg viewBox="0 0 60 60" class="bud"><path d="M30 58V34" stroke="#3f8a2e" stroke-width="4"/><path d="M30 46c-8-6-16-4-18-1 6 4 12 5 18 1z" fill="#7ccb5e"/><path d="M30 10c-9 8-11 18-4 26h8c7-8 5-18-4-26z" fill="#9bd77e" stroke="#3f8a2e" stroke-width="3"/><text x="30" y="30" text-anchor="middle" font-size="14" font-weight="800" fill="#2b6420">?</text></svg>`;
const flowerSVG = (hue) => `<svg viewBox="0 0 60 60" class="flower"><path d="M30 58V34" stroke="#3f8a2e" stroke-width="4"/><path d="M30 48c-8-6-16-4-18-1 6 4 12 5 18 1z" fill="#7ccb5e"/><g class="petals" fill="hsl(${hue},80%,66%)" stroke="hsl(${hue},70%,42%)" stroke-width="2"><circle cx="30" cy="10" r="8"/><circle cx="43" cy="20" r="8"/><circle cx="38" cy="34" r="8"/><circle cx="22" cy="34" r="8"/><circle cx="17" cy="20" r="8"/></g><circle cx="30" cy="23" r="7" fill="#ffd34d" stroke="#ffb400" stroke-width="2"/></svg>`;
const SVG_DROP = `<svg viewBox="0 0 24 30" class="drop"><path d="M12 2C8 10 3 15 3 20a9 9 0 0 0 18 0c0-5-5-10-9-18z" fill="#5aa0ff" stroke="#1f63d6" stroke-width="2"/><path d="M8 20a4 4 0 0 0 4 4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
const SVG_FLY = `<svg viewBox="0 0 40 30" class="fly"><g class="wing"><path d="M20 15C10 0 0 4 4 14c2 6 10 4 16 1z" fill="#ffb3d1" stroke="#c4467a" stroke-width="1.5"/><path d="M20 15C30 0 40 4 36 14c-2 6-10 4-16 1z" fill="#ffb3d1" stroke="#c4467a" stroke-width="1.5"/><path d="M20 16c-6 2-10 10-6 12 3 1 5-6 6-12zM20 16c6 2 10 10 6 12-3 1-5-6-6-12z" fill="#ffd6e6" stroke="#c4467a" stroke-width="1.5"/></g><rect x="19" y="8" width="2.4" height="16" rx="1.2" fill="#5a2a3e"/></svg>`;

let G = null; // état de la partie

function renderJardin(id){
  if (G && G.timer){ clearInterval(G.timer); }
  G = null;
  const c = CARTES.find(x => x.id === id);
  if (!c){
    $("#jTiles").classList.remove("hide"); $("#jBody").innerHTML = "";
    $("#jTiles").innerHTML = CARTES.map((x, i) => {
      const n = x.branches.reduce((s, b) => s + b.f.filter(f => f.b).length, 0), r = myLocal["carte-" + x.id];
      return `<a class="tile" href="#carte-${x.id}"><svg class="ic"><use href="#flower"/></svg><b>${i + 1}. ${esc(x.titre)}</b><p class="note" style="margin:6px 0 0">${n} bourgeons à faire fleurir · ${Math.round(x.temps / 60 * 10) / 10} min${r ? ` · dernière note : <b>${fmt(Math.max(0, r.s))}/20</b>` : ""}</p></a>`;
    }).join("");
    return;
  }
  $("#jTiles").classList.add("hide");
  const blanks = []; c.branches.forEach((b, bi) => b.f.forEach((f, fi) => { if (f.b) blanks.push({bi, fi, r: f.r}); }));
  const seeds = [...blanks.map(b => b.r), ...c.pieges].map(s => s.trim());
  for (let i = seeds.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [seeds[i], seeds[j]] = [seeds[j], seeds[i]]; }
  G = {c, blanks, left: blanks.length, good: 0, bad: 0, lives: 5, t: c.temps, sel: null, selBud: null, over: false, timer: null};

  const beds = c.branches.map((b, bi) => `<div class="bed" style="--d:${bi * 0.12}s"><div class="sign">${esc(b.nom)}</div>${b.f.map((f, fi) => {
    const hue = (bi * 70 + fi * 25 + 200) % 360;
    return `<div class="leaf ${f.b ? "blank" : "done"}" data-k="${bi}-${fi}" data-r="${esc(f.r)}" data-h="${hue}"><div class="pot">${f.b ? SVG_BUD : flowerSVG(hue)}</div><div class="lt"><span class="am">${esc(f.a)}</span><span class="an">${f.b ? "…" : esc(f.r)}</span></div></div>`;
  }).join("")}</div>`).join("");

  $("#jBody").innerHTML = `<p><a href="#jardin" class="btn alt sm">← Toutes les cartes</a></p>
  <div class="game" id="game">
    <div class="sky"><div class="cl c1"></div><div class="cl c2"></div><div class="track"><div class="gsun" id="gSun"><svg viewBox="0 0 100 100"><use href="#sun"/></svg></div></div></div>
    <div class="hud"><div><span class="note">Temps</span><div class="big" id="gTime"></div></div><div><span class="note">Gouttes d'eau</span><div id="gLives" class="lives"></div></div><div><span class="note">Fleurs</span><div class="big" id="gScore">0 / ${blanks.length}</div></div></div>
    <div class="center"><div class="core"><svg viewBox="0 0 100 100"><use href="#flower"/></svg><span>${esc(c.centre)}</span></div></div>
    <div class="beds">${beds}</div>
    <div class="seedbar"><div class="note" id="gHint">Touche une graine, puis le bourgeon où elle doit fleurir.</div><div class="seeds">${seeds.map((s, i) => `<button class="seed" data-s="${esc(s)}" data-i="${i}"><svg viewBox="0 0 20 20"><use href="#seed"/></svg>${esc(s)}</button>`).join("")}</div></div>
    <div class="overlay" id="gStart"><div class="ocard"><svg viewBox="0 0 100 100" class="oicon"><use href="#flower"/></svg><h2 style="margin:4px 0">${esc(c.titre)}</h2><p>Fais fleurir les <b>${blanks.length} bourgeons</b> de la carte mentale avant que le soleil se couche (${c.temps} s).</p><ul class="rules"><li>🌱 Bonne graine : la fleur pousse, <b>+1</b></li><li>💧 Mauvaise graine : tu perds une goutte d'eau, <b>−0,5</b></li><li>🥀 Plus de gouttes ou plus de temps : le jardin fane</li><li>⚠️ Certaines graines sont des pièges</li></ul><button class="btn green" id="gGo">Planter !</button></div></div>
  </div>`;
  drawLives(); $("#gTime").textContent = fmtT(G.t); moveSun();
  $("#gGo").onclick = () => { $("#gStart").remove(); G.timer = setInterval(tick, 1000); };
  $("#game").addEventListener("click", onGameClick);
}

function fmtT(s){ return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function drawLives(){ $("#gLives").innerHTML = Array.from({length: 5}, (_, i) => `<span class="lv ${i < G.lives ? "" : "lost"}">${SVG_DROP}</span>`).join(""); }
function moveSun(){ const p = 1 - G.t / G.c.temps; const s = $("#gSun"); s.style.left = (p * 100) + "%"; s.style.top = (Math.pow(p - 0.5, 2) * 4 * 40) + "px"; $("#game").style.setProperty("--dusk", Math.max(0, p - 0.6) * 1.6); }
function tick(){ if (G.over) return; G.t--; $("#gTime").textContent = fmtT(G.t); moveSun(); if (G.t <= 10) $("#gTime").classList.add("hurry"); if (G.t <= 0) endGame(false, "Le soleil s'est couché…"); }

function onGameClick(e){
  if (!G || G.over) return;
  const seed = e.target.closest(".seed"), leaf = e.target.closest(".leaf.blank");
  if (seed){
    document.querySelectorAll(".seed.sel").forEach(x => x.classList.remove("sel"));
    if (G.sel === seed){ G.sel = null; return; }
    G.sel = seed; seed.classList.add("sel");
    if (G.selBud) plant(G.selBud, seed);
    else $("#gHint").textContent = "Graine « " + seed.dataset.s + " » choisie : touche un bourgeon.";
  } else if (leaf){
    document.querySelectorAll(".leaf.sel").forEach(x => x.classList.remove("sel"));
    if (G.sel) plant(leaf, G.sel);
    else { G.selBud = leaf; leaf.classList.add("sel"); $("#gHint").textContent = "Bourgeon choisi : touche maintenant une graine."; }
  }
}

function floatTxt(el, txt, cls){ const f = document.createElement("div"); f.className = "floaty " + cls; f.textContent = txt; el.appendChild(f); setTimeout(() => f.remove(), 1100); }

function plant(leaf, seed){
  G.sel = null; G.selBud = null;
  document.querySelectorAll(".sel").forEach(x => x.classList.remove("sel"));
  const ok = norm(seed.dataset.s) === norm(leaf.dataset.r);
  if (ok){
    G.good++; G.left--;
    leaf.classList.remove("blank"); leaf.classList.add("bloom");
    leaf.querySelector(".pot").innerHTML = flowerSVG(+leaf.dataset.h);
    leaf.querySelector(".an").textContent = leaf.dataset.r;
    for (let i = 0; i < 8; i++){ const p = document.createElement("i"); p.className = "petal"; p.style.setProperty("--a", (i * 45) + "deg"); p.style.background = `hsl(${leaf.dataset.h},80%,70%)`; leaf.querySelector(".pot").appendChild(p); setTimeout(() => p.remove(), 900); }
    floatTxt(leaf, "+1", "plus");
    seed.classList.add("gone"); setTimeout(() => seed.remove(), 350);
    $("#gScore").textContent = G.good + " / " + G.blanks.length;
    $("#gHint").textContent = ["Superbe !", "Ça pousse !", "Bien planté !", "Le jardin s'épanouit !"][G.good % 4];
    if (G.left === 0) setTimeout(() => endGame(true, "Toute la carte a fleuri !"), 500);
  } else {
    G.bad++; G.lives--;
    leaf.classList.add("shake"); seed.classList.add("shake");
    setTimeout(() => { leaf.classList.remove("shake"); seed.classList.remove("shake"); }, 500);
    floatTxt(leaf, "−0,5", "minus");
    const lv = document.querySelectorAll("#gLives .lv:not(.lost)"); if (lv.length){ lv[lv.length - 1].classList.add("falling"); }
    setTimeout(drawLives, 450);
    $("#gHint").textContent = "« " + seed.dataset.s + " » ne pousse pas ici…";
    if (G.lives <= 0) setTimeout(() => endGame(false, "Plus une goutte d'eau…"), 500);
  }
}

async function endGame(win, msg){
  if (G.over) return; G.over = true; clearInterval(G.timer);
  const game = $("#game");
  if (win){
    game.classList.add("won");
    for (let i = 0; i < 6; i++){ const f = document.createElement("div"); f.className = "flyer"; f.style.setProperty("--y", (10 + Math.random() * 60) + "%"); f.style.setProperty("--d", (4 + Math.random() * 4) + "s"); f.style.setProperty("--dl", (i * 0.5) + "s"); f.innerHTML = SVG_FLY; game.appendChild(f); }
  } else {
    game.classList.add("lost");
    document.querySelectorAll(".leaf.blank").forEach(l => { l.querySelector(".an").textContent = l.dataset.r; l.classList.add("wilt"); });
  }
  const pts = G.good - 0.5 * G.bad, note = Math.round(Math.max(0, pts) / G.blanks.length * 20 * 10) / 10;
  const res = await saveResult("carte-" + G.c.id, note, 20);
  const o = document.createElement("div"); o.className = "overlay end";
  o.innerHTML = `<div class="ocard">${win ? '<div class="trophy">🌻</div>' : '<div class="trophy">🥀</div>'}<h2 style="margin:4px 0">${msg}</h2><p class="note">${G.good} fleurs (+1), ${G.bad} erreurs (−0,5)${G.left ? ", " + G.left + " bourgeons non fleuris (réponses affichées en brun)" : ""}${win ? " · il restait " + fmtT(G.t) : ""}.</p>${resultBox(G.c.titre, note, 20, res)}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn green" onclick="renderJardin('${G.c.id}')">Rejouer</button><button class="btn alt" onclick="this.closest('.overlay').remove()">Voir la carte</button><a class="btn alt" href="#jardin">Autres cartes</a></div></div>`;
  setTimeout(() => game.appendChild(o), win ? 1400 : 700);
}
