/* ========================= MOTS MÊLÉS ========================= */
let W = null, mmTimer = null;
const MM_SIZE = 13, MM_DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];

function buildGrid(words){
  for (let attempt = 0; attempt < 60; attempt++){
    const g = Array.from({length: MM_SIZE}, () => Array(MM_SIZE).fill("")), pos = {};
    let ok = true;
    for (const w of [...words].sort((a, b) => b.m.length - a.m.length)){
      let placed = false;
      for (let t = 0; t < 400 && !placed; t++){
        const [dr, dc] = MM_DIRS[Math.floor(Math.random() * (attempt < 30 ? MM_DIRS.length : 4))];
        const r = Math.floor(Math.random() * MM_SIZE), c = Math.floor(Math.random() * MM_SIZE);
        const er = r + dr * (w.m.length - 1), ec = c + dc * (w.m.length - 1);
        if (er < 0 || er >= MM_SIZE || ec < 0 || ec >= MM_SIZE) continue;
        let fits = true;
        for (let k = 0; k < w.m.length; k++){ const ch = g[r + dr * k][c + dc * k]; if (ch && ch !== w.m[k]){ fits = false; break; } }
        if (!fits) continue;
        for (let k = 0; k < w.m.length; k++) g[r + dr * k][c + dc * k] = w.m[k];
        pos[w.m] = {r, c, dr, dc}; placed = true;
      }
      if (!placed){ ok = false; break; }
    }
    if (!ok) continue;
    const A = "ABCDEFGHIJLMNOPRSTUVE";
    for (let r = 0; r < MM_SIZE; r++) for (let c = 0; c < MM_SIZE; c++) if (!g[r][c]) g[r][c] = A[Math.floor(Math.random() * A.length)];
    return {g, pos};
  }
  return null;
}

function renderMots(){
  const built = buildGrid(MOTS);
  W = {g: built.g, pos: built.pos, found: {}, start: null, t0: Date.now(), drag: null};
  $("#mBody").innerHTML = `
  <div class="row" style="justify-content:space-between"><span class="pill" id="mCount">0 / ${MOTS.length} mots</span><span class="note" id="mTime">0:00</span><button class="btn alt sm" id="mNew">Nouvelle grille</button></div>
  <div class="mmwrap">
    <div class="mm" id="mGrid" style="--n:${MM_SIZE}">${W.g.map((row, r) => row.map((ch, c) => `<div class="mc" data-r="${r}" data-c="${c}">${ch}</div>`).join("")).join("")}</div>
    <div class="mlist">${MOTS.map(w => `<div class="mw" data-m="${w.m}"><span class="mth ${w.th === "nature" ? "n" : w.th === "justice" ? "j" : "b"}"></span>${esc(w.w)}</div>`).join("")}
      <div class="note" style="margin-top:6px"><span class="mth n"></span> nature · <span class="mth j"></span> justice · <span class="mth b"></span> les deux</div></div>
  </div>
  <p class="note">Fais glisser ton doigt (ou la souris) de la première à la dernière lettre d'un mot, ou touche la première lettre puis la dernière. Les mots peuvent être à l'horizontale, à la verticale, en diagonale, à l'endroit ou à l'envers.</p>
  <h3>Les mots trouvés et leur lien avec la nature et la justice</h3>
  <div id="mExpl"><p class="note">Trouve un mot pour découvrir son explication.</p></div>`;
  $("#mNew").onclick = renderMots;
  clearInterval(mmTimer); mmTimer = setInterval(() => { const e = $("#mTime"); if (!e || !W){ return; } if (Object.keys(W.found).length < MOTS.length){ const s = Math.floor((Date.now() - W.t0) / 1000); e.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); } }, 1000);
  const grid = $("#mGrid");
  const cellAt = e => { const t = document.elementFromPoint(e.clientX, e.clientY); return t && t.classList.contains("mc") ? t : null; };
  grid.addEventListener("pointerdown", e => { const c = cellAt(e); if (!c) return; e.preventDefault(); W.drag = {from: c, moved: false}; grid.setPointerCapture(e.pointerId); hl(c, c); });
  grid.addEventListener("pointermove", e => { if (!W.drag) return; const c = cellAt(e); if (c && c !== W.drag.from){ W.drag.moved = true; hl(W.drag.from, c); } });
  grid.addEventListener("pointerup", e => {
    if (!W.drag) return; const c = cellAt(e) || W.drag.from, from = W.drag.from; const moved = W.drag.moved; W.drag = null;
    if (moved && c !== from){ W.start = null; check(from, c); return; }
    if (W.start && W.start !== c){ const s = W.start; W.start = null; check(s, c); }
    else if (W.start === c){ W.start = null; clearHl(); }
    else { W.start = c; clearHl(); c.classList.add("start"); }
  });
}
function line(a, b){
  const r1 = +a.dataset.r, c1 = +a.dataset.c, r2 = +b.dataset.r, c2 = +b.dataset.c, dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1);
  const n = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
  if (!(r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1))) return null;
  return Array.from({length: n + 1}, (_, k) => [r1 + dr * k, c1 + dc * k]);
}
const cell = (r, c) => document.querySelector(`#mGrid .mc[data-r="${r}"][data-c="${c}"]`);
function clearHl(){ document.querySelectorAll("#mGrid .mc.hl,#mGrid .mc.start").forEach(x => x.classList.remove("hl", "start")); }
function hl(a, b){ clearHl(); const l = line(a, b); if (l) l.forEach(([r, c]) => cell(r, c).classList.add("hl")); }
function check(a, b){
  const l = line(a, b); clearHl(); if (!l) return;
  const word = l.map(([r, c]) => W.g[r][c]).join(""), rev = [...word].reverse().join("");
  const w = MOTS.find(x => !W.found[x.m] && (x.m === word || x.m === rev) && samePlace(x.m, l));
  if (!w){ l.forEach(([r, c]) => { const e = cell(r, c); e.classList.add("miss"); setTimeout(() => e.classList.remove("miss"), 400); }); return; }
  W.found[w.m] = 1;
  const hue = (Object.keys(W.found).length * 47 + 190) % 360;
  l.forEach(([r, c], k) => { const e = cell(r, c); e.classList.add("found"); e.style.setProperty("--h", hue); e.style.animationDelay = (k * 0.04) + "s"; });
  document.querySelector(`.mw[data-m="${w.m}"]`).classList.add("done");
  const n = Object.keys(W.found).length; $("#mCount").textContent = n + " / " + MOTS.length + " mots";
  const ex = $("#mExpl"); if (n === 1) ex.innerHTML = "";
  const d = document.createElement("div"); d.className = "mexp"; d.style.setProperty("--h", hue);
  d.innerHTML = `<b>${esc(w.w)}</b> <span class="tag">${w.th === "nature" ? "🌿 nature" : w.th === "justice" ? "⚖️ justice" : "🌿⚖️ les deux"}</span><p>${esc(w.x)}</p>`;
  ex.prepend(d);
  if (n === MOTS.length){
    const s = Math.floor((Date.now() - W.t0) / 1000);
    const end = document.createElement("div"); end.className = "card pstage"; end.style.textAlign = "center";
    end.innerHTML = `<div class="bigemoji pop">🏆</div><h3>Grille terminée en ${Math.floor(s / 60)} min ${s % 60} s !</h3><p class="note">Relis les explications ci-dessous : chaque mot est un argument pour ta dissertation.</p><button class="btn" onclick="renderMots()">Nouvelle grille</button>`;
    ex.before(end); confetti(end);
  }
}
function samePlace(m, l){ const p = W.pos[m]; const cells = Array.from({length: m.length}, (_, k) => (p.r + p.dr * k) + "," + (p.c + p.dc * k)); const got = l.map(x => x.join(",")); return got.every(x => cells.includes(x)) && got.length === cells.length; }
