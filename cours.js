/* ========================= COURS : résumé illustré + références pour la dissertation ========================= */
const C_BLUE="#1f63d6", C_NAVY="#12306b", C_GREEN="#3f8a2e", C_LG="#7ccb5e", C_SUN="#ffc634", C_RED="#c43d3d";

const SCHEMAS = {
/* A. Les 5 sens du mot nature (fleur MOINE) */
moine: `<svg viewBox="0 0 640 400" class="schema" role="img" aria-label="Les cinq sens du mot nature : Monde, Ordre, Inné, Norme, Essence">
  ${[["M","Monde","l'ensemble des êtres",320,92,-58],["O","Ordre","les lois de la nature",528,182,66],["I","Inné","opposé à l'acquis",462,322,64],["N","Norme","« c'est naturel donc bien »",178,322,64],["E","Essence","« la nature humaine »",112,182,66]].map(([l,t,s,x,y,dy])=>`
  <line x1="320" y1="207" x2="${x}" y2="${y}" stroke="${C_LG}" stroke-width="6"/>
  <circle cx="${x}" cy="${y}" r="46" fill="#e6f0ff" stroke="${C_BLUE}" stroke-width="3"/>
  <text x="${x}" y="${y-6}" text-anchor="middle" font-size="26" font-weight="800" fill="${C_BLUE}">${l}</text>
  <text x="${x}" y="${y+16}" text-anchor="middle" font-size="14" font-weight="700" fill="${C_NAVY}">${t}</text>
  <text x="${x}" y="${y+dy}" text-anchor="middle" font-size="13" fill="#5a6a85">${s}</text>`).join("")}
  <circle cx="320" cy="207" r="54" fill="#ffd34d" stroke="#ffb400" stroke-width="4"/>
  <text x="320" y="202" text-anchor="middle" font-size="17" font-weight="800" fill="${C_NAVY}">NATURE</text>
  <text x="320" y="224" text-anchor="middle" font-size="12" fill="${C_NAVY}">phusis : croître</text>
</svg>`,

/* B. Aristote : l'arbre et le lit */
aristote: `<svg viewBox="0 0 640 230" class="schema" role="img" aria-label="Aristote : l'arbre a en lui le principe de son mouvement, le lit le reçoit du menuisier">
  <rect x="10" y="10" width="295" height="210" rx="18" fill="#eef9e8" stroke="${C_GREEN}" stroke-width="2"/>
  <text x="157" y="40" text-anchor="middle" font-size="17" font-weight="800" fill="${C_GREEN}">ÊTRE NATUREL</text>
  <rect x="148" y="120" width="18" height="60" fill="#9c6a3a"/><circle cx="157" cy="100" r="42" fill="${C_LG}" stroke="${C_GREEN}" stroke-width="3"/>
  <path d="M157 150 v-55" stroke="${C_RED}" stroke-width="4" marker-end="url(#ar)"/>
  <text x="157" y="205" text-anchor="middle" font-size="13.5" fill="#1b2840">Le principe du mouvement est <tspan font-weight="800">en lui</tspan></text>
  <rect x="335" y="10" width="295" height="210" rx="18" fill="#e6f0ff" stroke="${C_BLUE}" stroke-width="2"/>
  <text x="482" y="40" text-anchor="middle" font-size="17" font-weight="800" fill="${C_BLUE}">OBJET TECHNIQUE</text>
  <rect x="440" y="120" width="120" height="22" rx="4" fill="#c9925a"/><rect x="440" y="100" width="18" height="60" fill="#9c6a3a"/><rect x="542" y="112" width="18" height="48" fill="#9c6a3a"/>
  <circle cx="380" cy="90" r="16" fill="#ffd34d" stroke="#ffb400" stroke-width="3"/><text x="380" y="134" text-anchor="middle" font-size="12" fill="#1b2840">menuisier</text>
  <path d="M398 95 q30 -10 40 20" stroke="${C_RED}" stroke-width="4" fill="none" marker-end="url(#ar)"/>
  <text x="482" y="205" text-anchor="middle" font-size="13.5" fill="#1b2840">Le principe vient <tspan font-weight="800">de l'extérieur</tspan></text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="${C_RED}"/></marker></defs>
</svg>`,

/* C. La nature est-elle une norme ? spectre */
norme: `<svg viewBox="0 0 640 210" class="schema" role="img" aria-label="Spectre : la nature est-elle une norme ? des stoïciens à Hume et Mill">
  <defs><linearGradient id="gn" x1="0" x2="1"><stop offset="0" stop-color="${C_LG}"/><stop offset=".5" stop-color="${C_SUN}"/><stop offset="1" stop-color="${C_RED}"/></linearGradient></defs>
  <rect x="30" y="92" width="580" height="16" rx="8" fill="url(#gn)"/>
  <text x="30" y="80" font-size="14" font-weight="800" fill="${C_GREEN}">OUI, il faut suivre la nature</text>
  <text x="610" y="80" text-anchor="end" font-size="14" font-weight="800" fill="${C_RED}">NON, la nature n'est pas une norme</text>
  ${[["Stoïciens",60,"vivre selon la nature"],["Cicéron",150,"droite raison"],["Rousseau",240,"l'homme naturel est bon"],["Jonas",330,"respecter la nature"],["Merleau-Ponty",420,"nature = culture"],["Hume",505,"être ≠ devoir"],["Mill",590,"la nature est cruelle"]].map(([n,x,s],i)=>`
  <circle cx="${x}" cy="100" r="9" fill="#fff" stroke="${C_NAVY}" stroke-width="3"/>
  <text x="${x}" y="${i%2?150:140}" text-anchor="middle" font-size="13.5" font-weight="800" fill="${C_NAVY}">${n}</text>
  <text x="${x}" y="${i%2?168:158}" text-anchor="middle" font-size="11.5" fill="#5a6a85">${s}</text>`).join("")}
</svg>`,

/* D. Le contrat : état de nature → contrat → état civil */
contrat: `<div class="flowgrid">
  <div class="fh"></div><div class="fh">🌿 État de nature</div><div class="fh">✍️ Contrat</div><div class="fh">🏛️ État civil</div>
  <div class="fa">Hobbes<small>Léviathan, 1651</small></div><div class="fc red">Guerre de chacun contre chacun. Ni juste ni injuste.</div><div class="fc">Chacun cède sa puissance par peur de la mort.</div><div class="fc">Un souverain absolu garantit la paix.</div>
  <div class="fa">Locke<small>Second traité, 1690</small></div><div class="fc green">Paix fragile ; droits naturels : vie, liberté, propriété.</div><div class="fc">On s'unit pour protéger ces droits.</div><div class="fc">Un État limité ; droit de résistance s'il viole les droits.</div>
  <div class="fa">Rousseau<small>Contrat social, 1762</small></div><div class="fc green">L'homme est bon : amour de soi + pitié. La société le corrompt.</div><div class="fc">Chacun s'unit à tous et n'obéit qu'à la volonté générale.</div><div class="fc">« La justice remplace l'instinct » : l'homme devient moral et libre.</div>
</div>`,

/* E. Légal / légitime (diagramme de Venn) */
venn: `<svg viewBox="0 0 640 300" class="schema" role="img" aria-label="Diagramme légal et légitime avec exemples">
  <circle cx="235" cy="160" r="130" fill="rgba(31,99,214,.14)" stroke="${C_BLUE}" stroke-width="3"/>
  <circle cx="405" cy="160" r="130" fill="rgba(63,138,46,.14)" stroke="${C_GREEN}" stroke-width="3"/>
  <text x="170" y="20" text-anchor="middle" font-size="17" font-weight="800" fill="${C_BLUE}">LÉGAL</text>
  <text x="470" y="20" text-anchor="middle" font-size="17" font-weight="800" fill="${C_GREEN}">LÉGITIME</text>
  <text x="185" y="148" text-anchor="middle" font-size="13" font-weight="800" fill="${C_NAVY}">Légal mais injuste</text>
  <text x="185" y="168" text-anchor="middle" font-size="12" fill="#1b2840">lois de Vichy,</text><text x="185" y="184" text-anchor="middle" font-size="12" fill="#1b2840">ségrégation,</text><text x="185" y="200" text-anchor="middle" font-size="12" fill="#1b2840">apartheid</text>
  <text x="320" y="150" text-anchor="middle" font-size="13" font-weight="800" fill="${C_NAVY}">Loi juste</text>
  <text x="320" y="170" text-anchor="middle" font-size="12" fill="#1b2840">abolition de</text><text x="320" y="186" text-anchor="middle" font-size="12" fill="#1b2840">l'esclavage</text>
  <text x="455" y="148" text-anchor="middle" font-size="13" font-weight="800" fill="${C_NAVY}">Juste mais illégal</text>
  <text x="455" y="168" text-anchor="middle" font-size="12" fill="#1b2840">Antigone,</text><text x="455" y="184" text-anchor="middle" font-size="12" fill="#1b2840">Rosa Parks,</text><text x="455" y="200" text-anchor="middle" font-size="12" fill="#1b2840">Thoreau</text>
</svg>`,

/* F. Aristote : justice distributive / corrective */
justice: `<svg viewBox="0 0 640 230" class="schema" role="img" aria-label="Justice distributive selon le mérite et justice corrective à égalité stricte">
  <rect x="10" y="10" width="300" height="210" rx="18" fill="#fff7d6" stroke="#e5a300" stroke-width="2"/>
  <text x="160" y="38" text-anchor="middle" font-size="16" font-weight="800" fill="#8a5a00">DISTRIBUTIVE</text>
  <text x="160" y="58" text-anchor="middle" font-size="12.5" fill="#1b2840">selon le mérite : égalité géométrique</text>
  ${[[60,40,"A"],[130,80,"B"],[200,120,"C"]].map(([x,h,l])=>`<rect x="${x}" y="${190-h}" width="44" height="${h}" rx="6" fill="#ffd34d" stroke="#e5a300" stroke-width="2"/><text x="${x+22}" y="208" text-anchor="middle" font-size="13" font-weight="800" fill="#8a5a00">${l}</text>`).join("")}
  <text x="268" y="120" font-size="26">🏅</text>
  <rect x="330" y="10" width="300" height="210" rx="18" fill="#e6f0ff" stroke="${C_BLUE}" stroke-width="2"/>
  <text x="480" y="38" text-anchor="middle" font-size="16" font-weight="800" fill="${C_BLUE}">CORRECTIVE</text>
  <text x="480" y="58" text-anchor="middle" font-size="12.5" fill="#1b2840">échanges, réparations : égalité stricte</text>
  <line x1="480" y1="90" x2="480" y2="190" stroke="${C_NAVY}" stroke-width="5"/><line x1="390" y1="110" x2="570" y2="110" stroke="${C_NAVY}" stroke-width="5"/>
  <path d="M390 110 l-22 45 h44z M570 110 l-22 45 h44z" fill="#cfe0fb" stroke="${C_NAVY}" stroke-width="3"/>
  <circle cx="390" cy="150" r="9" fill="${C_SUN}"/><circle cx="570" cy="150" r="9" fill="${C_SUN}"/>
  <rect x="455" y="188" width="50" height="10" rx="4" fill="${C_NAVY}"/>
</svg>`,

/* G. La force et le droit */
force: `<div class="chain">
  <div class="ck red"><b>Calliclès</b><span>Gorgias</span><p>« Selon la nature », le plus fort doit avoir plus. Les lois sont l'arme des faibles.</p></div>
  <div class="carrow">→</div>
  <div class="ck sun"><b>Pascal</b><span>Pensées</span><p>Faute de savoir ce qui est juste, « on a fait que ce qui est fort fût juste ».</p></div>
  <div class="carrow">→</div>
  <div class="ck green"><b>Rousseau</b><span>Contrat social I, 3</span><p>« Force ne fait pas droit » : céder à la force est une nécessité, pas un devoir.</p></div>
</div>`,

/* H. Droit naturel / droit positif */
droit: `<svg viewBox="0 0 640 250" class="schema" role="img" aria-label="Le droit naturel au-dessus du droit positif qui le juge">
  <circle cx="320" cy="48" r="34" fill="#ffd34d" stroke="#ffb400" stroke-width="4"/>
  ${Array.from({length:8},(_,k)=>{const a=k*Math.PI/4;return `<line x1="${320+Math.cos(a)*42}" y1="${48+Math.sin(a)*42}" x2="${320+Math.cos(a)*54}" y2="${48+Math.sin(a)*54}" stroke="#ffb400" stroke-width="5" stroke-linecap="round"/>`}).join("")}
  <text x="400" y="38" font-size="15" font-weight="800" fill="#8a5a00">DROIT NATUREL</text>
  <text x="400" y="58" font-size="12.5" fill="#1b2840">universel, non écrit, fondé sur la nature ou la raison</text>
  <text x="400" y="76" font-size="12" fill="#5a6a85">Antigone · Cicéron · Locke · 1789</text>
  <path d="M320 100 v26" stroke="${C_RED}" stroke-width="4" marker-end="url(#ar2)"/><text x="332" y="118" font-size="12.5" font-weight="800" fill="${C_RED}">juge</text>
  <path d="M320 135 L430 235 H210 Z" fill="#e6f0ff" stroke="${C_BLUE}" stroke-width="3"/>
  <line x1="276" y1="175" x2="364" y2="175" stroke="${C_BLUE}" stroke-width="2"/><line x1="243" y1="205" x2="397" y2="205" stroke="${C_BLUE}" stroke-width="2"/>
  <text x="320" y="167" text-anchor="middle" font-size="11.5" font-weight="800" fill="${C_NAVY}">Constitution</text><text x="320" y="197" text-anchor="middle" font-size="11.5" font-weight="800" fill="${C_NAVY}">Lois</text><text x="320" y="226" text-anchor="middle" font-size="11.5" font-weight="800" fill="${C_NAVY}">Décrets, jugements</text>
  <text x="450" y="170" font-size="15" font-weight="800" fill="${C_BLUE}">DROIT POSITIF</text>
  <text x="450" y="190" font-size="12.5" fill="#1b2840">écrit, posé par l'État, variable</text>
  <text x="450" y="208" font-size="12" fill="#5a6a85">Kelsen : la pyramide des normes,</text><text x="450" y="224" font-size="12" fill="#5a6a85">sans fondement naturel</text>
  <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="${C_RED}"/></marker></defs>
</svg>`,
};

const COURS = [
 {id:"c-intro", t:"🌱 Introduction : pourquoi lier nature et justice ?", h:`
  <p>Les deux notions se rencontrent sur une question centrale : <b>le juste existe-t-il « par nature », ou est-il une invention humaine ?</b> Si la justice est naturelle, elle est universelle et permet de juger les lois. Si elle est conventionnelle, elle varie selon les sociétés et se confond avec ce que les lois décident.</p>
  <div class="keybox"><b>Fil rouge du cours</b> : nature = ce qui est donné, sans l'homme · justice = ce qui doit être, ce qui est dû à chacun. Le grand piège est de <b>passer de ce qui est à ce qui doit être</b> (Hume).</div>`},
 {id:"c-nat1", t:"1. Qu'est-ce que la nature ?", h:`
  <p>Le mot vient du latin <i>natura</i> (naître), qui traduit le grec <i>phusis</i> (croître). La nature désigne ce qui existe et se développe <b>sans intervention humaine</b>. Retiens ses 5 sens avec le mot <b>MOINE</b> :</p>
  ${SCHEMAS.moine}
  <p>On l'oppose à la <b>culture</b> (ce que l'homme produit et transmet) et à la <b>technique</b> (ce que l'homme fabrique). Aristote distingue ainsi l'être naturel et l'objet technique :</p>
  ${SCHEMAS.aristote}`},
 {id:"c-nat2", t:"2. L'homme : un être naturel ?", h:`
  <ul>
   <li><b>Un être démuni</b> : dans le mythe de Prométhée (Platon, <i>Protagoras</i>), l'homme naît sans griffes ni fourrure ; il compense par la technique.</li>
   <li><b>Un animal politique</b> : pour Aristote, la cité est naturelle, car l'homme a le langage, qui permet de discuter du juste et de l'injuste.</li>
   <li><b>Un être perfectible</b> : pour Rousseau, l'homme naturel est bon, mais sa perfectibilité le transforme, pour le meilleur et pour le pire.</li>
   <li><b>Un être de culture</b> : face à la faim, l'homme peut différer la satisfaction de ses besoins. Pour Merleau-Ponty, « tout est fabriqué et tout est naturel » chez l'homme.</li>
   <li><b>Pas de nature humaine ?</b> Sartre : « l'existence précède l'essence ». L'enfant sauvage (Victor de l'Aveyron) montre que, sans éducation, l'humanité ne se développe pas.</li>
  </ul>`},
 {id:"c-nat3", t:"3. La nature est-elle une norme ?", h:`
  <p>Peut-on dire « c'est naturel, donc c'est bien » ? Les auteurs se répartissent sur un spectre :</p>
  ${SCHEMAS.norme}
  <div class="duo"><div><h4>Arguments pour</h4><ul><li>La nature est un ordre rationnel (stoïciens).</li><li>Elle permet de critiquer une société corrompue (Rousseau).</li><li>L'écologie montre qu'il faut respecter ses équilibres (Jonas).</li></ul></div>
  <div><h4>Arguments contre</h4><ul><li>On ne tire pas un devoir d'un fait (Hume).</li><li>La nature tue et fait souffrir sans distinction (Mill) ; le moustique transmet le paludisme.</li><li>La médecine (les antibiotiques) va contre la nature et sauve des vies.</li></ul></div></div>`},
 {id:"c-nat4", t:"4. Maîtriser ou respecter la nature ?", h:`
  <div class="timeline">
   <div><b>Bacon</b><span>1620</span><p>« On ne commande à la nature qu'en lui obéissant » : connaître ses lois pour agir.</p></div>
   <div><b>Descartes</b><span>1637</span><p>Nous rendre « comme maîtres et possesseurs de la nature », surtout pour la santé.</p></div>
   <div><b>Rousseau</b><span>1762</span><p>« Tout dégénère entre les mains de l'homme » : il défigure la nature.</p></div>
   <div><b>Jonas</b><span>1979</span><p>Le Principe responsabilité : devoirs envers la nature et les générations futures.</p></div>
  </div>`},
 {id:"c-jus1", t:"5. Qu'est-ce que la justice ?", h:`
  <div class="three"><div><b>⚖️ Une vertu</b><p>« Rendre à chacun le sien » : respecter ce qui est dû à autrui.</p></div><div><b>🏛️ Une institution</b><p>Les tribunaux : un tiers impartial qui juge selon des règles. La justice met fin à la vengeance.</p></div><div><b>⭐ Un idéal</b><p>Ce au nom de quoi on juge les lois elles-mêmes : « cette loi est injuste ».</p></div></div>
  <p>Distinction capitale : <b>légal</b> (conforme à la loi) et <b>légitime</b> (conforme au juste).</p>
  ${SCHEMAS.venn}
  <p>Aristote distingue deux formes de justice, et ajoute l'<b>équité</b>, qui corrige la loi trop générale dans un cas particulier :</p>
  ${SCHEMAS.justice}`},
 {id:"c-jus2", t:"6. La force peut-elle fonder le droit ?", h:`${SCHEMAS.force}
  <p>À retenir : la force est un <b>fait</b>, le droit est une <b>obligation</b>. Un « droit » qui disparaît dès que la force cesse n'est pas un droit (Rousseau). Pascal, lui, ne justifie pas la force : il constate que, faute d'accès à la vraie justice, les hommes ont donné à la force l'apparence du droit.</p>`},
 {id:"c-jus3", t:"7. De l'état de nature à l'état civil : le contrat", h:`
  <p>Les philosophes du contrat imaginent l'homme <b>sans État</b> pour comprendre ce qui rend un pouvoir légitime.</p>
  ${SCHEMAS.contrat}
  <p class="note">L'état de nature est une <b>fiction théorique</b>, pas un moment historique : il sert à penser le fondement du pouvoir.</p>`},
 {id:"c-lien", t:"8. Le cœur du sujet : la justice est-elle naturelle ?", h:`
  ${SCHEMAS.droit}
  <div class="duo"><div><h4>🌞 Il existe un juste par nature</h4><ul><li><b>Antigone</b> : les lois non écrites contre l'édit de Créon.</li><li><b>Cicéron</b> : « la vraie loi est la droite raison conforme à la nature ».</li><li><b>Montesquieu</b> : la justice est un « rapport de convenance » éternel.</li><li><b>1789</b> : « droits naturels, inaliénables et sacrés ».</li></ul></div>
  <div><h4>🏛️ La justice est une convention</h4><ul><li><b>Pascal</b> : « Plaisante justice qu'une rivière borne ! »</li><li><b>Hobbes</b> : ni juste ni injuste avant l'État.</li><li><b>Hume</b> : la justice est une vertu artificielle, née de l'utilité.</li><li><b>Kelsen</b> : le droit est un système de normes posées.</li></ul></div></div>
  <div class="keybox"><b>Dépassement</b> : la justice n'est ni dictée par la nature ni arbitraire. Elle repose sur la <b>raison</b> (Kant, Rawls et le voile d'ignorance) : le « naturel » des droits de l'homme signifie en fait « rationnel et universel ».</div>`},
];

const REFS = {
 cit:[
  ["Nature","Aristote","« L'homme est par nature un animal politique. »","Politiques"],
  ["Nature","Descartes","« Nous rendre comme maîtres et possesseurs de la nature. »","Discours de la méthode, VI"],
  ["Nature","Bacon","« On ne commande à la nature qu'en lui obéissant. »","Novum Organum"],
  ["Nature","Rousseau","« Tout est bien sortant des mains de l'Auteur des choses, tout dégénère entre les mains de l'homme. »","Émile"],
  ["Nature","Merleau-Ponty","« Tout est fabriqué et tout est naturel chez l'homme. »","Phénoménologie de la perception"],
  ["Nature","Sartre","« L'existence précède l'essence. »","L'existentialisme est un humanisme"],
  ["Nature","Montaigne","« Chacun appelle barbarie ce qui n'est pas de son usage. »","Essais, « Des cannibales »"],
  ["Justice","Pascal","« Plaisante justice qu'une rivière borne ! Vérité au-deçà des Pyrénées, erreur au-delà. »","Pensées"],
  ["Justice","Pascal","« Ne pouvant faire que ce qui est juste fût fort, on a fait que ce qui est fort fût juste. »","Pensées"],
  ["Justice","Rousseau","« Force ne fait pas droit. »","Contrat social, I, 3"],
  ["Justice","Rousseau","« Céder à la force est un acte de nécessité, non de volonté. »","Contrat social, I, 3"],
  ["Justice","Rousseau","« L'obéissance à la loi qu'on s'est prescrite est liberté. »","Contrat social, I, 8"],
  ["Justice","Montesquieu","« La justice est un rapport de convenance, qui se trouve réellement entre deux choses. »","Lettres persanes, 83"],
  ["Justice","Aristote","L'équité est « meilleure qu'une certaine justice ».","Éthique à Nicomaque, V"],
  ["Justice","Cicéron","« La vraie loi est la droite raison conforme à la nature. »","La République, III"],
  ["Justice","Marx","« De chacun selon ses capacités, à chacun selon ses besoins. »","Critique du programme de Gotha"],
  ["Les deux","Hume","On ne peut pas déduire ce qui doit être de ce qui est (loi de Hume).","Traité de la nature humaine"],
  ["Les deux","Jonas","« Agis de façon que les effets de ton action soient compatibles avec la permanence d'une vie authentiquement humaine sur terre. »","Le Principe responsabilité"],
 ],
 ex:[
  ["Antigone (Sophocle)","Désobéir à une loi injuste au nom de lois non écrites."],
  ["Procès de Nuremberg (1945-1946)","Obéir aux lois n'excuse pas le crime contre l'humanité."],
  ["Déclaration de 1789","Les « droits naturels » de l'homme fondent la loi."],
  ["Rosa Parks (1955), Martin Luther King","Désobéissance civile : illégal mais légitime."],
  ["Lois de Vichy, apartheid","Des lois légales mais injustes."],
  ["Victor de l'Aveyron","Sans éducation, pas d'humanité : l'homme est un être de culture."],
  ["Antibiotiques / moustique et paludisme","Le naturel n'est pas toujours bon ; l'artificiel peut sauver."],
  ["Le fleuve Whanganui (2017)","La nature devient sujet de droit : on lui reconnaît une personnalité juridique."],
  ["Changement climatique","La maîtrise technique crée une responsabilité (Jonas)."],
 ],
 plans:[
  ["La justice n'est-elle qu'une convention ?","I. Oui : diversité des lois (Pascal), pas de juste avant l'État (Hobbes) · II. Non : on juge les lois (Antigone, Nuremberg, Rousseau) · III. Une convention peut être juste si elle est rationnelle (contrat, Rawls, équité)."],
  ["Faut-il suivre la nature ?","I. Oui : stoïciens, Rousseau, écologie · II. Non : Hume, Mill, Descartes, Sartre · III. Ni suivre ni dominer : comprendre et respecter (Bacon, Merleau-Ponty, Jonas)."],
  ["Peut-on fonder le droit sur la nature ?","I. Le droit naturel contre l'arbitraire (Antigone, Cicéron, Locke) · II. La nature, c'est la force (Calliclès, Spinoza) ; force ne fait pas droit (Rousseau) · III. Le droit se fonde sur la raison et la liberté (contrat, Kant)."],
  ["Peut-on être juste sans obéir aux lois ?","I. La loi rend la justice possible (Hobbes, Socrate dans le Criton) · II. Le légal n'est pas le légitime (Antigone, désobéissance civile) · III. Obéir aux lois justes et réformer les autres (équité, Rousseau)."],
  ["L'homme est-il un être naturel ?","I. Oui : il a des besoins et des instincts · II. Non : il se fait par la culture (Prométhée, Sartre, enfant sauvage) · III. Nature et culture sont mêlées (Merleau-Ponty, perfectibilité)."],
 ]
};

function renderCours(){
  if ($("#cBody").dataset.done) return;
  $("#cBody").dataset.done = 1;
  $("#cBody").innerHTML = `
  <div class="toc">${COURS.map(s => `<button data-go="${s.id}">${esc(s.t.replace(/^[^ ]+ /, "").replace(/^\d+\. /, ""))}</button>`).join("")}<button data-go="c-refs">📚 Références</button></div>
  ${COURS.map(s => `<section class="csec" id="${s.id}"><h2>${s.t}</h2>${s.h}</section>`).join("")}
  <section class="csec" id="c-refs"><h2>📚 Boîte à références pour la dissertation</h2>
   <p class="mut">Choisis 2 ou 3 citations par partie, toujours <b>expliquées</b> et reliées à ton argument : une citation seule ne prouve rien.</p>
   <div class="seg" id="refSeg">${["Tout", "Nature", "Justice", "Les deux"].map((k, i) => `<button class="${i ? "" : "on"}" data-f="${k}">${k}</button>`).join("")}</div>
   <div class="cits">${REFS.cit.map(([th, a, c, o]) => `<div class="cit" data-th="${th}"><span class="tag">${th}</span><blockquote>${esc(c)}</blockquote><div class="ca"><b>${esc(a)}</b>, <i>${esc(o)}</i></div></div>`).join("")}</div>
   <h3>Exemples à placer</h3>
   <div class="exs">${REFS.ex.map(([e, s]) => `<div><b>${esc(e)}</b><span>${esc(s)}</span></div>`).join("")}</div>
   <h3>Plans types pour les sujets fréquents</h3>
   ${REFS.plans.map(([s, p]) => `<details class="acc"><summary>« ${esc(s)} »</summary><div class="accb"><p>${esc(p).replace(/ · /g, "<br>")}</p></div></details>`).join("")}
   <div class="row" style="margin-top:14px"><a class="btn green" href="#qcm">Je me teste avec le QCM ▶</a><a class="btn alt" href="#bac">Voir les sujets corrigés</a></div>
  </section>`;
  document.querySelectorAll("#cBody .toc button").forEach(b => b.onclick = () => document.getElementById(b.dataset.go).scrollIntoView({behavior: "smooth", block: "start"}));
  document.querySelectorAll("#refSeg button").forEach(b => b.onclick = () => {
    document.querySelectorAll("#refSeg button").forEach(x => x.classList.toggle("on", x === b));
    document.querySelectorAll(".cit").forEach(c => c.classList.toggle("hide", b.dataset.f !== "Tout" && c.dataset.th !== b.dataset.f));
  });
}
