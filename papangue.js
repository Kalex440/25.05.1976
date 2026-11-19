/* ========================= LE PAPANGUE (busard de Maillard) qui survole l'accueil ========================= */
(function(){
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.createElement("div");
  el.className = "papangue"; el.setAttribute("aria-hidden", "true");
  /* Dessin original : mâle de papangue, gris clair dessus, blanc dessous, bouts d'ailes noirs, longue queue */
  el.innerHTML = `<svg viewBox="0 0 160 100" width="150" height="94">
    <g class="wing back"><path d="M70 46 C60 20 40 8 14 6 C22 14 26 20 30 26 C20 24 12 26 6 30 C24 34 44 42 62 52 Z" fill="#9aa6b5" stroke="#4a5566" stroke-width="1.5"/>
      <path d="M14 6 C22 14 26 20 30 26 C20 24 12 26 6 30 C10 22 12 14 14 6Z" fill="#1d2430"/></g>
    <path d="M58 50 L22 58 L20 64 L26 62 L22 70 L60 58Z" fill="#b9c3cf" stroke="#4a5566" stroke-width="1.5"/>
    <path d="M22 58 L20 64 L26 62 L22 70" fill="none" stroke="#2b3340" stroke-width="2"/>
    <ellipse cx="82" cy="52" rx="30" ry="12" fill="#e9eef3" stroke="#4a5566" stroke-width="1.5"/>
    <path d="M60 50 C72 42 92 40 106 46 C96 48 80 50 60 50Z" fill="#a8b3c1"/>
    <circle cx="112" cy="46" r="10" fill="#7d8896" stroke="#3a4452" stroke-width="1.5"/>
    <path d="M120 42 C128 42 131 46 129 51 C127 49 124 48 121 49Z" fill="#2b3340"/><path d="M121 46 L128 47" stroke="#e5b400" stroke-width="2"/>
    <circle cx="115" cy="44" r="2.4" fill="#ffd400" stroke="#1d2430" stroke-width="1"/><circle cx="115.4" cy="44" r="1" fill="#1d2430"/>
    <path d="M84 62 l-3 8 M90 62 l-1 8" stroke="#e5b400" stroke-width="2.5" stroke-linecap="round"/>
    <g class="wing front"><path d="M86 48 C92 18 110 4 140 2 C132 10 128 16 124 24 C134 22 144 24 152 28 C132 34 108 42 92 54 Z" fill="#c9d2dc" stroke="#4a5566" stroke-width="1.5"/>
      <path d="M140 2 C132 10 128 16 124 24 C134 22 144 24 152 28 C150 18 146 8 140 2Z" fill="#1d2430"/>
      <path d="M98 40 C106 30 116 22 128 18" stroke="#8d98a7" stroke-width="1.5" fill="none"/></g>
  </svg>`;
  document.body.appendChild(el);

  let W = innerWidth, H = innerHeight;
  addEventListener("resize", () => { W = innerWidth; H = innerHeight; });
  const p = {x: -140, y: H * 0.3}, v = {x: 2.2, y: 0};
  let target = pick(), mode = "flap", modeUntil = performance.now() + 2500, running = false, raf = 0, last = 0;
  function pick(){ return {x: 60 + Math.random() * Math.max(100, W - 200), y: 70 + Math.random() * Math.max(80, H - 220)}; }
  function frame(t){
    const dt = Math.min(50, t - (last || t)) / 16.7; last = t;
    if (t > modeUntil){ mode = mode === "flap" ? "glide" : "flap"; modeUntil = t + (mode === "flap" ? 1800 + Math.random() * 2000 : 2500 + Math.random() * 3000); el.classList.toggle("glide", mode === "glide"); }
    const dx = target.x - p.x, dy = target.y - p.y, dist = Math.hypot(dx, dy);
    if (dist < 80) target = pick();
    const steer = 0.035, max = mode === "flap" ? 3.6 : 2.6;
    v.x += (dx / dist) * steer * dt * 3; v.y += (dy / dist) * steer * dt * 3;
    if (mode === "glide") v.y += 0.01 * dt; // le planeur descend un peu
    const sp = Math.hypot(v.x, v.y); if (sp > max){ v.x *= max / sp; v.y *= max / sp; } if (sp < 1.2){ v.x *= 1.2 / (sp || 1); v.y *= 1.2 / (sp || 1); }
    p.x += v.x * dt; p.y += v.y * dt;
    const ang = Math.atan2(v.y, v.x) * 180 / Math.PI, left = v.x < 0;
    const tilt = Math.max(-30, Math.min(30, left ? 180 - ang : ang));
    el.style.transform = `translate(${p.x}px,${p.y}px) scaleX(${left ? -1 : 1}) rotate(${left ? -tilt : tilt}deg)`;
    raf = requestAnimationFrame(frame);
  }
  window.papangue = {
    start(){ if (running || reduce) { el.classList.toggle("show", true); if (reduce){ el.style.transform = `translate(${W - 180}px,90px)`; } return; } running = true; el.classList.add("show"); last = 0; raf = requestAnimationFrame(frame); },
    stop(){ running = false; cancelAnimationFrame(raf); el.classList.remove("show"); }
  };
  /* Toucher l'oiseau : il fait un petit looping */
  el.addEventListener("click", () => { el.classList.remove("loop"); void el.offsetWidth; el.classList.add("loop"); target = pick(); });
})();
