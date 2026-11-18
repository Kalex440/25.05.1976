/* ========================= SUJETS DE BAC CORRIGÉS + MNÉMOTECHNIQUES ========================= */
function renderBac(id){
  const b = BAC.find(x => x.id === id);
  if (!b){
    $("#bBody").innerHTML = `<div class="grid2">${BAC.map((x, i) => `<a class="tile" href="#bac-${x.id}"><svg class="ic"><use href="#book"/></svg><b>Sujet ${i + 1} · ${esc(x.type)}</b><p class="mut" style="margin:6px 0 0">${esc(x.sujet)}</p></a>`).join("")}</div>
    <h2>🧠 Moyens mnémotechniques</h2><div class="rule"></div>
    <div class="seg" style="margin-bottom:10px" id="mnSeg">${[["tous", "Tous"], ["nature", "🌿 Nature"], ["justice", "⚖️ Justice"]].map(([k, l], i) => `<button class="${i ? "" : "on"}" data-f="${k}">${l}</button>`).join("")}</div>
    <div class="mngrid">${MNEMO.map(m => `<div class="mn ${m.th}" data-th="${m.th}"><b>${esc(m.t)}</b><p>${m.d}</p></div>`).join("")}</div>`;
    document.querySelectorAll("#mnSeg button").forEach(btn => btn.onclick = () => {
      document.querySelectorAll("#mnSeg button").forEach(x => x.classList.toggle("on", x === btn));
      document.querySelectorAll(".mn").forEach(m => m.classList.toggle("hide", btn.dataset.f !== "tous" && m.dataset.th !== btn.dataset.f));
    });
    return;
  }
  const sec = (title, inner, open) => `<details class="acc" ${open ? "open" : ""}><summary>${title}</summary><div class="accb">${inner}</div></details>`;
  $("#bBody").innerHTML = `<p><a href="#bac" class="btn alt sm">← Tous les sujets</a></p>
   <span class="pill">${esc(b.type)}</span><h2 style="margin-top:8px">${esc(b.sujet)}</h2>
   ${b.texte ? `<div class="texte">${esc(b.texte)}</div><div class="src">Pascal, Pensées (fragment « Justice, force », éd. Brunschvicg 298)</div>` : ""}
   <div class="card" style="background:var(--sun-l);border-color:#f1d27a"><b>⏱️ Conseil :</b> cherche d'abord seul pendant 20 minutes (analyse du sujet, problématique, idée de plan), puis ouvre la correction partie par partie.</div>
   ${sec("1. Analyse du sujet", `<ul>${b.analyse.map(x => `<li>${x}</li>`).join("")}</ul>`, true)}
   ${sec("2. Problématique", `<p>${esc(b.probleme)}</p>`)}
   ${sec(b.type === "Dissertation" ? "3. Plan détaillé" : "3. Explication détaillée", b.plan.map(p => `<h4>${esc(p.t)}</h4><ul>${p.p.map(x => `<li>${x}</li>`).join("")}</ul>`).join(""))}
   ${sec("4. Introduction rédigée", `<p>${esc(b.intro)}</p>`)}
   ${sec("5. Conclusion rédigée", `<p>${esc(b.concl)}</p>`)}
   ${sec("6. Pièges à éviter", `<ul>${b.pieges.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`)}
   <div class="card mn justice" style="margin-top:14px"><b>🧠 Pour retenir ce sujet</b><p>${b.memo}</p></div>`;
}
