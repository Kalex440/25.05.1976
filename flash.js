/* ========================= FLASHCARDS ========================= */
let F = {filt: "tous", deck: [], pos: 0, flipped: false};
function flashKnown(){ return store.get("flashKnown", {}); }

function renderFlash(){
  const known = flashKnown();
  const nK = FLASH.filter((c, i) => known[i]).length;
  $("#fBody").innerHTML = `
  <div class="row" style="justify-content:space-between;margin-bottom:8px">
    <div class="seg">${[["tous", "Toutes"], ["nature", "🌿 Nature"], ["justice", "⚖️ Justice"], ["revoir", "↺ À revoir"]].map(([k, l]) => `<button class="${F.filt === k ? "on" : ""}" data-f="${k}">${l}</button>`).join("")}</div>
    <div class="note">Je connais : <b>${nK}</b> / ${FLASH.length}</div>
  </div>
  <div class="bar" style="max-width:none;margin-bottom:12px"><i style="width:${nK / FLASH.length * 100}%"></i></div>
  <div id="fStage"></div>`;
  document.querySelectorAll("#fBody .seg button").forEach(b => b.onclick = () => { F.filt = b.dataset.f; buildDeck(); renderFlash(); });
  if (!F.deck.length || F.deckFilt !== F.filt) buildDeck();
  drawCard();
}
function buildDeck(){
  const known = flashKnown();
  let ids = FLASH.map((c, i) => i).filter(i => F.filt === "tous" || (F.filt === "revoir" ? !known[i] : FLASH[i].th === F.filt));
  for (let i = ids.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  F.deck = ids; F.pos = 0; F.flipped = false; F.deckFilt = F.filt;
}
function drawCard(){
  const st = $("#fStage");
  if (!F.deck.length){ st.innerHTML = `<div class="card pstage" style="text-align:center"><div class="bigemoji">🎉</div><h3>Aucune carte ici !</h3><p class="note">${F.filt === "revoir" ? "Tu connais toutes les cartes. Bravo !" : ""}</p><button class="btn alt sm" id="fReset">Remettre toutes les cartes à revoir</button></div>`; $("#fReset").onclick = () => { store.set("flashKnown", {}); F.filt = "tous"; buildDeck(); renderFlash(); }; return; }
  if (F.pos >= F.deck.length){
    st.innerHTML = `<div class="card pstage" style="text-align:center"><div class="bigemoji pop">🌻</div><h3>Paquet terminé !</h3><p>Tu as passé les ${F.deck.length} cartes.</p><div class="row" style="justify-content:center"><button class="btn" id="fAgain">Remélanger</button><button class="btn alt" id="fRev">Revoir celles que je ne connais pas</button></div></div>`;
    $("#fAgain").onclick = () => { buildDeck(); drawCard(); };
    $("#fRev").onclick = () => { F.filt = "revoir"; buildDeck(); renderFlash(); };
    return;
  }
  const i = F.deck[F.pos], c = FLASH[i], known = flashKnown();
  st.innerHTML = `
  <div class="note" style="text-align:center;margin-bottom:6px">Carte ${F.pos + 1} / ${F.deck.length} · ${c.th === "nature" ? "🌿 Nature" : "⚖️ Justice"}${known[i] ? " · ✓ déjà connue" : ""}</div>
  <div class="flip ${F.flipped ? "on" : ""}" id="fCard" tabindex="0" role="button" aria-label="Retourner la carte">
    <div class="face front ${c.th}"><div class="fq">${esc(c.f)}</div><div class="note">Touche la carte pour voir la réponse</div></div>
    <div class="face back ${c.th}"><div class="fa">${esc(c.b)}</div></div>
  </div>
  <div class="row" style="justify-content:center;margin-top:14px">
    <button class="btn alt sm" id="fPrev" ${F.pos ? "" : "disabled"}>←</button>
    <button class="btn sm" id="fNo" style="background:var(--ko);box-shadow:0 3px 0 #8f2a2a">↺ À revoir</button>
    <button class="btn green sm" id="fYes">✓ Je savais</button>
    <button class="btn alt sm" id="fNext">→</button>
  </div>`;
  const flip = () => { F.flipped = !F.flipped; $("#fCard").classList.toggle("on", F.flipped); };
  $("#fCard").onclick = flip; $("#fCard").onkeydown = e => { if (e.key === " " || e.key === "Enter"){ e.preventDefault(); flip(); } };
  const go = d => { F.pos = Math.max(0, F.pos + d); F.flipped = false; drawCard(); };
  $("#fPrev").onclick = () => go(-1); $("#fNext").onclick = () => go(1);
  const mark = v => { const k = flashKnown(); if (v) k[i] = 1; else delete k[i]; store.set("flashKnown", k); const cd = $("#fCard"); cd.classList.add(v ? "yes" : "no"); setTimeout(() => { go(1); renderFlashHeader(); }, 280); };
  $("#fYes").onclick = () => mark(true); $("#fNo").onclick = () => mark(false);
}
function renderFlashHeader(){
  const known = flashKnown(), nK = FLASH.filter((c, i) => known[i]).length;
  const n = $("#fBody .note b"); if (n) n.textContent = nK;
  const b = $("#fBody .bar i"); if (b) b.style.width = (nK / FLASH.length * 100) + "%";
}
