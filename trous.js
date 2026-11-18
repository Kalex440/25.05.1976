/* ========================= TEXTES À TROUS ========================= */
TROUS.forEach(t => { LABELS["trou-" + t.id] = "Texte à trous — " + t.titre; });

function parseTrou(t){
  const parts = []; const answers = []; const re = /\[([^\]]+)\]/g; let last = 0, m;
  while ((m = re.exec(t.texte))) {
    parts.push({txt: t.texte.slice(last, m.index)});
    const alts = m[1].split("|"); answers.push(alts);
    parts.push({blank: answers.length - 1});
    last = re.lastIndex;
  }
  parts.push({txt: t.texte.slice(last)});
  return {parts, answers};
}

function renderTrous(id){
  const t = TROUS.find(x => x.id === id);
  if (!t){
    $("#tTiles").classList.remove("hide"); $("#tBody").innerHTML = "";
    $("#tTiles").innerHTML = TROUS.map((x, i) => {
      const r = myLocal["trou-" + x.id];
      return `<a class="tile" href="#trou-${x.id}"><svg class="ic"><use href="#seed"/></svg><b>${i + 1}. ${esc(x.titre)}</b><p class="note" style="margin:6px 0 0">${parseTrou(x).answers.length} trous${r ? ` · dernière note : <b>${fmt(Math.max(0, r.s))}/20</b>` : ""}</p></a>`;
    }).join("");
    return;
  }
  $("#tTiles").classList.add("hide");
  const {parts, answers} = parseTrou(t);
  const bank = [...new Set([...answers.map(a => a[0]), ...t.pieges])].sort((a, b) => a.localeCompare(b, "fr"));
  const opts = `<option value="">— choisir —</option>` + bank.map(w => `<option>${esc(w)}</option>`).join("");
  const html = parts.map(p => p.txt !== undefined ? esc(p.txt) : `<select class="hole" data-i="${p.blank}">${opts}</select>`).join("");
  $("#tBody").innerHTML = `<p><a href="#trous" class="btn alt sm">← Tous les textes</a></p>
   <h2>${esc(t.titre)}</h2>
   <div class="card"><div class="note" style="margin-bottom:6px">Banque de mots (attention, il y a des pièges !)</div><div class="bank">${bank.map(w => `<span class="chip">${esc(w)}</span>`).join("")}</div></div>
   <div class="texte trou">${html}</div>
   <div class="row" style="margin-top:14px"><button class="btn" id="tGo">Valider</button><button class="btn alt sm" id="tAgain">Recommencer</button></div>
   <div id="tRes" class="card hide"></div>`;
  $("#tAgain").onclick = () => renderTrous(id);
  $("#tGo").onclick = async () => {
    let good = 0, bad = 0, empty = 0;
    document.querySelectorAll("#tBody .hole").forEach(s => {
      const i = +s.dataset.i, v = s.value, ok = answers[i].some(a => norm(a) === norm(v));
      s.disabled = true; s.classList.remove("ok", "ko", "empty");
      if (!v){ empty++; s.classList.add("empty"); }
      else if (ok){ good++; s.classList.add("ok"); }
      else { bad++; s.classList.add("ko"); }
      if (!ok){ const c = document.createElement("span"); c.className = "fix"; c.textContent = answers[i][0]; s.after(c); }
    });
    const pts = good - 0.5 * bad, note = Math.round(Math.max(0, pts) / answers.length * 20 * 10) / 10;
    $("#tGo").disabled = true;
    const res = await saveResult("trou-" + t.id, note, 20);
    const r = $("#tRes");
    r.innerHTML = resultBox(t.titre, note, 20, res) + `<p class="note">${good} bonnes réponses (+1), ${bad} erreurs (−0,5), ${empty} trous vides (0) : ${fmt(pts)} points sur ${answers.length}, ramenés sur 20. Les bonnes réponses manquées sont écrites en vert à côté de chaque trou.</p>`;
    r.classList.remove("hide"); r.scrollIntoView({behavior: "smooth", block: "center"});
  };
}
