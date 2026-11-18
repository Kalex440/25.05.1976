/* Données : niveaux du QCM, questions justice, flashcards, mots mêlés, sujets de bac, mnémotechniques */

/* Niveau de difficulté des 31 premières questions (1 facile, 2 moyen, 3 difficile) */
const NIV = [1,1,1,2,1,2,2,1,3,3,2,2,3,2,2,3,3,3,1,2, 1,2,1,1,1,1,2,3,2,1,3];

/* 12 questions supplémentaires sur la justice */
const QCM_JUSTICE = [
 {niv:1,q:"La formule romaine « rendre à chacun le sien » définit :",o:["La charité","La justice","La liberté","La propriété"],a:1,e:"Suum cuique tribuere : la justice consiste à donner à chacun ce qui lui revient, ni plus ni moins."},
 {niv:1,q:"La balance, symbole de la justice, représente surtout :",o:["La richesse des juges","L'équilibre et l'impartialité du jugement","La force de l'État","La rapidité des procès"],a:1,e:"On pèse les arguments des deux parties sans pencher d'un côté : la justice doit être impartiale. Le glaive, lui, symbolise la force qui fait appliquer la décision."},
 {niv:1,q:"La « loi du talion » (« œil pour œil, dent pour dent ») établit :",o:["Le pardon systématique","Une proportion entre le crime et la peine","La peine de mort pour tous les crimes","L'absence de punition"],a:1,e:"Le talion limite la vengeance : la riposte ne doit pas dépasser l'offense. C'est une première forme de proportionnalité des peines."},
 {niv:2,q:"Dans le Criton de Platon, Socrate refuse de s'évader de prison parce que :",o:["Il a peur d'être repris","Il doit respecter les lois de la cité, même s'il a été condamné injustement","Il pense être coupable","Ses amis refusent de l'aider"],a:1,e:"Les Lois lui parlent : s'évader serait détruire les lois qui l'ont élevé et protégé. Pour Socrate, il ne faut jamais répondre à l'injustice par l'injustice."},
 {niv:2,q:"Dans le livre I de la République, Thrasymaque définit la justice comme :",o:["L'harmonie de l'âme","L'intérêt du plus fort","Le respect des dieux","L'égalité entre tous"],a:1,e:"Pour Thrasymaque, les gouvernants font les lois à leur avantage : obéir aux lois, c'est servir l'intérêt des puissants. Socrate le réfute."},
 {niv:2,q:"Qui a théorisé la « désobéissance civile » en 1849 ?",o:["Rousseau","Thoreau","Hobbes","Kant"],a:1,e:"Henry David Thoreau refuse de payer l'impôt pour ne pas financer l'esclavage et la guerre. Gandhi et Martin Luther King s'en inspireront : désobéir publiquement et sans violence à une loi injuste."},
 {niv:2,q:"Ce qui distingue la justice de la vengeance, c'est que la justice :",o:["Punit plus sévèrement","Est rendue par un tiers impartial, selon des règles et avec mesure","Est rendue par la victime elle-même","N'existe que dans les démocraties"],a:1,e:"La vengeance est personnelle, passionnée et sans limite (elle appelle la contre-vengeance). La justice confie le jugement à un tiers neutre et met fin au cycle de la violence."},
 {niv:2,q:"Selon Hobbes, avant l'institution de l'État :",o:["Tout est juste par nature","Il n'y a ni juste ni injuste","La pitié fait office de loi","La propriété est un droit naturel"],a:1,e:"Là où il n'y a pas de pouvoir commun, il n'y a pas de loi, et là où il n'y a pas de loi, il n'y a pas d'injustice (Léviathan, chap. 13)."},
 {niv:3,q:"« De chacun selon ses capacités, à chacun selon ses besoins » est une formule de :",o:["Rawls","Marx","Aristote","Proudhon"],a:1,e:"Critique du programme de Gotha (1875) : dans la société communiste, la justice ne serait plus un droit égal (bourgeois) mais une répartition selon les besoins."},
 {niv:3,q:"Pour le positivisme juridique de Kelsen, une loi est valide :",o:["Si elle est juste","Si elle est conforme au droit naturel","Si elle a été posée conformément à une norme supérieure","Si la majorité l'approuve"],a:2,e:"La validité d'une norme dépend de sa place dans la « pyramide des normes », pas de son contenu moral. Le droit et la morale sont séparés."},
 {niv:3,q:"Le « principe de différence » de Rawls affirme que des inégalités sont justes si :",o:["Elles récompensent le mérite","Elles profitent aux plus défavorisés","Elles sont votées","Elles sont naturelles"],a:1,e:"Théorie de la justice (1971) : une inégalité n'est acceptable que si elle améliore la situation des moins favorisés (par exemple un médecin mieux payé qui soigne tout le monde)."},
 {niv:3,q:"Selon Beccaria (Des délits et des peines, 1764), ce qui dissuade le plus du crime, c'est :",o:["La cruauté des peines","La certitude d'être puni","La peine de mort","L'exemple des supplices publics"],a:1,e:"Beccaria critique la torture et la peine de mort : une peine modérée mais certaine dissuade mieux qu'une peine terrible mais incertaine. Il fonde le droit pénal moderne."},
];

const FLASH = [
 {th:"nature",f:"Phusis",b:"Mot grec traduit par « nature » : ce qui naît et croît de soi-même, sans intervention humaine."},
 {th:"nature",f:"Les 5 sens du mot « nature »",b:"Monde (ensemble des êtres), Ordre (lois), Inné, Norme, Essence. Moyen mnémotechnique : MOINE."},
 {th:"nature",f:"Nature / culture",b:"La nature est ce qui est donné ; la culture est ce que l'homme produit, transforme et transmet (langage, techniques, règles)."},
 {th:"nature",f:"Aristote : objet naturel / objet technique",b:"L'objet naturel a en lui le principe de son mouvement (l'arbre pousse). L'objet technique le reçoit de l'extérieur (le lit vient du menuisier)."},
 {th:"nature",f:"Mythe de Prométhée (Platon, Protagoras)",b:"L'homme naît démuni, le plus faible des animaux : Prométhée lui donne le feu et les techniques pour compenser."},
 {th:"nature",f:"Descartes, Discours de la méthode VI",b:"La science doit nous rendre « comme maîtres et possesseurs de la nature », surtout pour la santé, « premier bien »."},
 {th:"nature",f:"Bacon",b:"« On ne commande à la nature qu'en lui obéissant » : pour maîtriser la nature, il faut d'abord connaître ses lois."},
 {th:"nature",f:"Les stoïciens",b:"« Vivre conformément à la nature » : la nature est un ordre rationnel (logos) ; vivre selon elle, c'est vivre selon la raison."},
 {th:"nature",f:"Loi de Hume",b:"On ne peut pas déduire ce qui doit être de ce qui est. Le naturel n'est donc pas forcément bon : la nature n'est pas une norme."},
 {th:"nature",f:"J. S. Mill, La Nature",b:"La nature tue, détruit et fait souffrir sans distinction : l'imiter serait immoral. La morale consiste plutôt à la corriger."},
 {th:"nature",f:"Rousseau : l'homme naturel",b:"Il est bon, guidé par l'amour de soi et la pitié. C'est la société qui crée l'amour-propre, l'inégalité et les vices."},
 {th:"nature",f:"La perfectibilité",b:"Pour Rousseau, la faculté propre à l'homme de se transformer et de se perfectionner, pour le meilleur comme pour le pire."},
 {th:"nature",f:"Merleau-Ponty",b:"« Tout est fabriqué et tout est naturel chez l'homme » : on ne peut séparer en lui une couche naturelle et une couche culturelle."},
 {th:"nature",f:"Sartre",b:"« L'existence précède l'essence » : il n'y a pas de nature humaine fixée d'avance ; l'homme se définit par ses actes."},
 {th:"nature",f:"Hans Jonas",b:"Le Principe responsabilité (1979) : la puissance technique crée des devoirs envers la nature et les générations futures."},
 {th:"justice",f:"Les 3 sens de « justice »",b:"Une vertu (rendre à chacun le sien), une institution (les tribunaux), un idéal (ce au nom de quoi on juge les lois)."},
 {th:"justice",f:"Légal / légitime",b:"Légal : conforme à la loi en vigueur. Légitime : conforme à ce qui est juste. Une loi peut être légale et illégitime."},
 {th:"justice",f:"Droit naturel / droit positif",b:"Le droit positif est posé par une autorité et varie selon les pays. Le droit naturel serait universel, fondé sur la nature humaine ou la raison."},
 {th:"justice",f:"Antigone (Sophocle)",b:"Elle enterre son frère malgré l'édit de Créon, au nom des « lois non écrites et immuables » : figure du droit naturel contre la loi de la cité."},
 {th:"justice",f:"Aristote : justice distributive",b:"Répartir honneurs et biens selon le mérite : égalité géométrique (proportionnelle)."},
 {th:"justice",f:"Aristote : justice corrective",b:"Dans les échanges et les réparations : égalité arithmétique (stricte), sans tenir compte des personnes."},
 {th:"justice",f:"L'équité",b:"Correction de la loi là où sa généralité la rend injuste dans un cas particulier. Aristote : elle est « meilleure qu'une certaine justice »."},
 {th:"justice",f:"Calliclès (Gorgias)",b:"Selon la nature, il est juste que le plus fort ait plus que le plus faible ; les lois sont inventées par les faibles."},
 {th:"justice",f:"Rousseau, Contrat social I, 3",b:"« Force ne fait pas droit » : céder à la force est un acte de nécessité, non de volonté. On n'obéit qu'aux puissances légitimes."},
 {th:"justice",f:"Pascal et la justice",b:"« Plaisante justice qu'une rivière borne ! » La justice humaine dépend de la coutume ; « on a fait que ce qui est fort fût juste »."},
 {th:"justice",f:"Hobbes : état de nature",b:"Guerre de chacun contre chacun ; ni juste ni injuste avant l'État. Le contrat institue un souverain pour garantir la paix."},
 {th:"justice",f:"Montesquieu, Lettres persanes 83",b:"La justice est un « rapport de convenance » objectif, le même pour Dieu, un ange ou un homme ; même sans Dieu, il faudrait l'aimer."},
 {th:"justice",f:"Rawls : le voile d'ignorance",b:"Choisir les règles de la société sans savoir quelle place on y occupera : on choisit alors des principes impartiaux."},
 {th:"justice",f:"Justice / vengeance",b:"La vengeance est personnelle et sans fin ; la justice est rendue par un tiers impartial, selon des règles, avec mesure."},
 {th:"justice",f:"Socrate dans le Criton",b:"Il refuse de s'évader : on ne répond pas à l'injustice par l'injustice, et l'on doit respecter les lois de la cité."},
];

/* Mots mêlés : mot (sans accent, en majuscules), forme affichée, lien avec les thèmes */
const MOTS = [
 {m:"PHUSIS", w:"Phusis", th:"nature", x:"Le mot grec que traduit « nature » : ce qui croît de soi-même. Il rappelle que la nature, c'est d'abord ce que l'homme n'a pas fabriqué."},
 {m:"CULTURE", w:"Culture", th:"nature", x:"Le contraire classique de la nature. Mais Merleau-Ponty montre que chez l'homme les deux sont inséparables : notre nature est d'être des êtres de culture."},
 {m:"TECHNIQUE", w:"Technique", th:"nature", x:"Ce par quoi l'homme transforme la nature (Prométhée, Descartes). Elle pose la question de nos devoirs envers la nature (Jonas)."},
 {m:"INSTINCT", w:"Instinct", th:"les deux", x:"Ce qui guide l'homme à l'état de nature. Pour Rousseau, le passage à l'état civil « substitue la justice à l'instinct » : c'est le pont entre nature et justice."},
 {m:"PITIE", w:"Pitié", th:"les deux", x:"Sentiment naturel selon Rousseau : dans l'état de nature, elle « tient lieu de lois, de mœurs et de vertu ». Une justice naturelle avant la justice des lois."},
 {m:"CONTRAT", w:"Contrat", th:"les deux", x:"Chez Hobbes et Rousseau, c'est l'acte qui fait sortir de l'état de nature et fonde un ordre juste et légitime."},
 {m:"FORCE", w:"Force", th:"justice", x:"Calliclès en fait la justice « selon la nature » ; Rousseau répond que « force ne fait pas droit » ; Pascal constate qu'on a fait que ce qui est fort fût juste."},
 {m:"DROIT", w:"Droit", th:"justice", x:"Droit naturel (universel, fondé sur la nature ou la raison) contre droit positif (posé par les hommes) : le cœur du lien entre nature et justice."},
 {m:"EQUITE", w:"Équité", th:"justice", x:"Pour Aristote, elle corrige la loi trop générale. Elle montre que la justice ne se réduit pas à appliquer mécaniquement les règles."},
 {m:"LEGITIME", w:"Légitime", th:"justice", x:"Ce qui est conforme au juste, à distinguer du légal. Invoquer la nature (Antigone) est une façon de juger la légitimité des lois."},
 {m:"ANTIGONE", w:"Antigone", th:"les deux", x:"Elle oppose les « lois non écrites » aux lois de Créon : l'idée d'une justice naturelle, supérieure aux lois humaines."},
 {m:"COUTUME", w:"Coutume", th:"les deux", x:"Pour Pascal et Montaigne, ce que nous croyons juste ou naturel n'est souvent que coutume : « chacun appelle barbarie ce qui n'est pas de son usage »."},
 {m:"JONAS", w:"Jonas", th:"les deux", x:"Il fait de la nature un objet de justice : nous avons des devoirs envers elle et envers les générations futures (justice entre les générations)."},
 {m:"RAWLS", w:"Rawls", th:"justice", x:"Le voile d'ignorance : la justice ne vient pas de la nature, mais d'un accord rationnel et impartial. Les inégalités naturelles (talents) doivent profiter à tous."},
];

/* Sujets de bac corrigés */
const BAC = [
{id:"b1", type:"Dissertation", sujet:"Peut-on être juste sans obéir aux lois ?",
 analyse:[
  "<b>« Être juste »</b> : avoir la vertu de justice, agir de manière juste envers autrui ; ce n'est pas seulement « être en règle ».",
  "<b>« Obéir aux lois »</b> : se conformer au droit positif de sa société. Les lois peuvent être justes ou injustes.",
  "<b>« Peut-on »</b> : est-ce possible ? et est-ce légitime ? Deux niveaux : le fait et le droit.",
  "<b>Présupposé à repérer</b> : le sujet suppose que justice et légalité peuvent ne pas coïncider. C'est la distinction légal / légitime qui doit structurer la copie."],
 probleme:"Si la justice se confond avec l'obéissance aux lois, désobéir est toujours injuste. Mais si les lois peuvent être injustes, la justice peut exiger de désobéir. Le risque est alors que chacun décide seul de ce qui est juste. Comment concilier l'exigence de justice et la nécessité d'un ordre commun ?",
 plan:[
  {t:"I. Être juste, c'est d'abord obéir aux lois", p:[
   "<b>A. La loi rend la justice possible.</b> Hobbes : sans État ni loi, c'est la guerre de chacun contre chacun ; il n'y a ni juste ni injuste. La loi est la condition de toute justice.",
   "<b>B. La loi est impartiale.</b> Elle vaut pour tous et met fin à la vengeance privée : un tiers juge selon des règles connues. Exemple : on ne se fait pas justice soi-même.",
   "<b>C. Socrate dans le Criton</b> refuse de s'évader alors qu'il a été condamné injustement : on ne répond pas à l'injustice par l'injustice, et l'on doit respecter les lois de la cité.",
   "<i>Transition</i> : mais si la loi elle-même est injuste, obéir, n'est-ce pas devenir complice ?"]},
  {t:"II. Mais la justice peut exiger de désobéir", p:[
   "<b>A. Le légal n'est pas le légitime.</b> Lois de Vichy, apartheid, ségrégation : des lois peuvent être légales et injustes. Rousseau : on n'est obligé d'obéir qu'aux puissances légitimes.",
   "<b>B. Antigone</b> désobéit à Créon au nom des « lois non écrites ». Nuremberg : obéir aux lois n'excuse pas le crime contre l'humanité.",
   "<b>C. La désobéissance civile</b> (Thoreau, Gandhi, Martin Luther King, Rosa Parks) : désobéir publiquement, sans violence, en acceptant la sanction, pour faire changer une loi injuste.",
   "<i>Transition</i> : mais qui décide qu'une loi est injuste ? Si chacun obéit à sa conscience seule, l'ordre commun disparaît."]},
  {t:"III. Être juste, c'est obéir aux lois justes et travailler à rendre les lois plus justes", p:[
   "<b>A. Le danger de la conscience seule</b> : le fanatique aussi croit obéir à une loi supérieure. La désobéissance doit donc être exceptionnelle, publique et argumentée.",
   "<b>B. L'équité</b> (Aristote) : le juste corrige la loi dans le cas particulier, au nom de l'intention même du législateur, sans détruire la loi.",
   "<b>C. Rousseau</b> : dans une république légitime, obéir à la loi, c'est obéir à la volonté générale, donc à soi-même : « l'obéissance à la loi qu'on s'est prescrite est liberté ». Être juste, c'est obéir aux lois justes et participer à la vie démocratique pour réformer les autres."]}],
 intro:"Rosa Parks a été arrêtée en 1955 pour avoir refusé de céder sa place à un Blanc dans un bus. Elle a désobéi à la loi ; pourtant, nous jugeons aujourd'hui qu'elle était juste. Être juste, c'est agir conformément à ce qui est dû à chacun ; obéir aux lois, c'est se conformer au droit en vigueur. Peut-on être juste sans obéir aux lois ? Si la justice se confond avec la légalité, toute désobéissance est injuste. Mais si les lois peuvent être injustes, la justice semble parfois exiger de désobéir, au risque de laisser chacun juger seul. Nous verrons que l'obéissance aux lois est d'abord la condition de la justice, puis que la justice peut exiger de désobéir à des lois illégitimes, avant de montrer qu'être juste, c'est obéir aux lois justes et œuvrer à rendre les lois plus justes.",
 concl:"Les lois rendent la justice possible en mettant fin à la violence et à la vengeance : on ne peut donc pas être juste en méprisant toute loi. Mais la légalité n'épuise pas la justice : face à une loi manifestement injuste, la justice peut exiger une désobéissance publique, non violente et argumentée. Être juste, ce n'est ni obéir aveuglément ni n'obéir qu'à soi, c'est obéir aux lois justes et travailler à rendre justes les autres.",
 pieges:["Faire une liste d'exemples sans les analyser.","Confondre « juste » et « légal » dès l'introduction : c'est justement la distinction à construire.","Oublier le danger de la désobéissance (le fanatique se croit juste lui aussi)."],
 memo:"Plan <b>« O-D-R »</b> : <b>O</b>béir (Hobbes, Socrate) → <b>D</b>ésobéir (Antigone, Rosa Parks) → <b>R</b>éformer (équité, Rousseau)."},

{id:"b2", type:"Dissertation", sujet:"La nature peut-elle nous dire ce que nous devons faire ?",
 analyse:[
  "<b>« La nature »</b> : à la fois le monde extérieur (ordre, lois) et la nature humaine (instincts, besoins).",
  "<b>« Nous dire »</b> : nous indiquer, servir de modèle ou de règle.",
  "<b>« Ce que nous devons faire »</b> : il s'agit de la morale et de la justice, du devoir, pas seulement de ce qui est utile.",
  "<b>Question cachée</b> : peut-on passer de ce qui <i>est</i> (un fait naturel) à ce qui <i>doit être</i> (une norme) ? Hume est l'auteur clé."],
 probleme:"La nature semble offrir un modèle sûr, puisqu'elle ne dépend pas de nos opinions. Mais elle ne fait que constater ce qui est, et elle contient aussi la violence et l'inégalité. Peut-on fonder nos devoirs sur un fait ?",
 plan:[
  {t:"I. La nature semble nous indiquer la voie", p:[
   "<b>A. Les stoïciens</b> : « vivre conformément à la nature », c'est vivre selon la raison qui ordonne le monde ; c'est la clé du bonheur.",
   "<b>B. Rousseau</b> : l'homme naturel est bon, guidé par la pitié qui « tient lieu de lois ». La nature est une norme pour juger la société corrompue.",
   "<b>C. Le droit naturel</b> : Antigone, Cicéron (« la vraie loi est la droite raison conforme à la nature »), la Déclaration de 1789 et ses « droits naturels ».",
   "<i>Transition</i> : mais la nature dit-elle vraiment quelque chose, ou projetons-nous sur elle nos valeurs ?"]},
  {t:"II. La nature ne peut pas fonder nos devoirs", p:[
   "<b>A. Hume</b> : on ne peut déduire un « doit » d'un « est ». Dire « c'est naturel donc c'est bien » est un sophisme.",
   "<b>B. Mill</b> : la nature tue et fait souffrir sans distinction ; l'imiter serait immoral. Calliclès invoque la nature pour justifier la domination du plus fort.",
   "<b>C. L'homme se réalise contre la nature</b> : Rousseau (Contrat social I, 8) : l'état civil « substitue la justice à l'instinct ». Les antibiotiques vont contre la nature mais sauvent des vies.",
   "<i>Transition</i> : faut-il alors ignorer la nature ? Ce serait oublier que nous en dépendons."]},
  {t:"III. C'est la raison qui fixe nos devoirs, y compris envers la nature", p:[
   "<b>A. Kant</b> : le devoir vient de la raison, qui se donne à elle-même sa loi ; la nature peut seulement y conduire (insociable sociabilité).",
   "<b>B. Merleau-Ponty</b> : chez l'homme, nature et culture sont mêlées ; il n'y a pas de « nature pure » à consulter.",
   "<b>C. Jonas</b> : notre puissance technique nous donne des devoirs envers la nature et les générations futures. Ce n'est pas la nature qui commande, c'est notre responsabilité."]}],
 intro:"On justifie volontiers un comportement en disant qu'il est « naturel », ou on en condamne un autre parce qu'il serait « contre-nature ». La nature semble ainsi fournir un critère du bien. Mais la nature, c'est aussi le moustique qui transmet le paludisme ou la loi du plus fort. La nature peut-elle nous dire ce que nous devons faire ? D'un côté, elle paraît un modèle objectif, indépendant de nos opinions ; de l'autre, elle n'est qu'un fait, et un fait ne semble pas pouvoir fonder un devoir. Nous verrons d'abord que la nature a été pensée comme un guide, puis qu'elle ne peut pas fonder nos devoirs, avant de montrer que c'est la raison qui fixe nos devoirs, y compris envers la nature.",
 concl:"La nature a souvent servi de modèle moral, des stoïciens au droit naturel. Mais un fait ne dit pas ce qui doit être, et la nature contient autant de violence que d'harmonie. Ce n'est donc pas la nature qui nous dit ce que nous devons faire, c'est notre raison. Elle nous apprend pourtant une chose : nous sommes responsables de la nature, qui ne nous commande rien mais que nous devons protéger.",
 pieges:["Opposer « nature = bien » et « culture = mal » sans nuance.","Oublier de définir les deux sens de « nature » (monde et nature humaine).","Ne pas citer Hume, l'argument central du sujet."],
 memo:"<b>« Est ≠ Doit »</b> : « C'est naturel » n'est pas « Il faut ». Retenir l'image : la nature est un <b>constat</b>, pas un <b>contrat</b>."},

{id:"b3", type:"Explication de texte", sujet:"Expliquez le texte suivant : Pascal, Pensées, « Justice, force »",
 texte:"Il est juste que ce qui est juste soit suivi, il est nécessaire que ce qui est le plus fort soit suivi. La justice sans la force est impuissante ; la force sans la justice est tyrannique. La justice sans force est contredite, parce qu'il y a toujours des méchants ; la force sans la justice est accusée. Il faut donc mettre ensemble la justice et la force ; et pour cela faire que ce qui est juste soit fort, ou que ce qui est fort soit juste.\n\nLa justice est sujette à dispute, la force est très reconnaissable et sans dispute. Ainsi on n'a pu donner la force à la justice, parce que la force a contredit la justice et a dit qu'elle était injuste, et a dit que c'était elle qui était juste. Et ainsi ne pouvant faire que ce qui est juste fût fort, on a fait que ce qui est fort fût juste.",
 analyse:[
  "<b>Thème</b> : le rapport entre la justice et la force.",
  "<b>Question</b> : la justice peut-elle s'imposer sans la force ? Et la force peut-elle se faire passer pour la justice ?",
  "<b>Thèse</b> : justice et force doivent être unies ; mais comme on ne s'accorde pas sur ce qui est juste, on a donné à la force l'apparence de la justice.",
  "<b>Enjeu</b> : comprendre pourquoi les lois humaines sont respectées, et si elles sont vraiment justes."],
 probleme:"Si la justice a besoin de la force pour exister, n'est-elle pas toujours menacée de se réduire à la loi du plus fort ?",
 plan:[
  {t:"1er mouvement (du début à « …ce qui est fort soit juste ») : il faut unir justice et force", p:[
   "Opposition <b>juste / nécessaire</b> : ce qu'on doit suivre (droit) et ce qu'on est contraint de suivre (fait).",
   "Chiasme : « la justice sans la force est impuissante ; la force sans la justice est tyrannique ». Chacune seule échoue. Exemple : un jugement sans police est lettre morte ; une police sans loi est arbitraire.",
   "La justice sans force est « contredite » à cause des « méchants » ; la force sans justice est « accusée », jugée illégitime.",
   "Conclusion logique (« donc ») : unir les deux, de deux façons possibles."]},
  {t:"2e mouvement (de « La justice est sujette à dispute » à la fin) : la force a pris la place de la justice", p:[
   "La justice est « sujette à dispute » : chacun a son idée du juste (Pascal, « plaisante justice qu'une rivière borne »).",
   "La force est « reconnaissable et sans dispute » : on voit tout de suite qui est le plus fort.",
   "La force « a dit qu'elle était juste » : elle s'est donné l'apparence du droit.",
   "Formule finale : « on a fait que ce qui est fort fût juste ». Les lois sont suivies parce qu'elles sont établies et soutenues par la force, non parce qu'elles sont vraies."]},
  {t:"Intérêt philosophique (discussion)", p:[
   "Pascal n'est pas cynique comme Calliclès : faute d'accès à la vraie justice (raison corrompue), mieux vaut un ordre établi que la guerre civile.",
   "<b>Objection de Rousseau</b> : « force ne fait pas droit » ; si le juste est ce qui est fort, il suffit de devenir plus fort pour avoir raison.",
   "<b>Ouverture</b> : la démocratie et le débat rationnel (Rawls, voile d'ignorance) permettent de réduire la « dispute » sur le juste et de donner la force à des lois discutées."]}],
 intro:"Une décision de justice que personne ne fait appliquer reste lettre morte ; une police qui n'obéit à aucune loi devient une tyrannie. Dans ce fragment des Pensées, Pascal s'interroge sur le rapport entre justice et force : la justice peut-elle exister sans la force ? Il soutient qu'il faut unir les deux, mais que, faute de s'accorder sur ce qui est juste, les hommes ont donné à la force l'apparence de la justice. L'enjeu est de comprendre pourquoi nous obéissons aux lois, et si elles sont justes. Pascal montre d'abord la nécessité d'unir justice et force, puis explique comment cette union s'est faite au profit de la force.",
 concl:"Pascal montre que la justice a besoin de la force pour exister, mais que, la justice étant toujours disputée, c'est la force qui s'est fait reconnaître comme juste. Ce constat lucide ne justifie pas la tyrannie : il invite à la modestie et à la paix. On peut toutefois, avec Rousseau, refuser que le droit se réduise à la force, et chercher dans le débat démocratique une manière de rendre fort ce qui est juste.",
 pieges:["Paraphraser le texte sans l'expliquer : il faut définir les mots et donner des exemples.","Faire de Pascal un défenseur de la loi du plus fort : il constate, il ne recommande pas.","Oublier l'importance des connecteurs (« donc », « ainsi ») qui structurent le raisonnement."],
 memo:"<b>« Sans force, la justice dort ; sans justice, la force mord. »</b> Puis : la justice <b>se dispute</b>, la force <b>se voit</b>."},
];

/* Moyens mnémotechniques */
const MNEMO = [
 {th:"nature", t:"Les 5 sens de « nature » : MOINE", d:"<b>M</b>onde (ensemble des êtres) · <b>O</b>rdre (lois de la nature) · <b>I</b>nné (opposé à l'acquis) · <b>N</b>orme (le « naturel » serait bon) · <b>E</b>ssence (« la nature humaine »)."},
 {th:"nature", t:"Aristote : l'Arbre et le Lit", d:"L'<b>A</b>rbre pousse tout seul (principe de mouvement <b>A</b>u-dedans) ; le <b>L</b>it vient de <b>L</b>'extérieur (le menuisier)."},
 {th:"nature", t:"Descartes = MP comme « Médecine Prioritaire »", d:"« <b>M</b>aîtres et <b>P</b>ossesseurs de la nature » : le but principal, c'est la santé, « premier bien »."},
 {th:"nature", t:"Hume : « C'est » n'est pas « Il faut »", d:"Un fait (ce qui <b>est</b>) ne donne jamais un devoir (ce qui <b>doit être</b>). Utilise-le dès qu'un sujet demande si la nature est un modèle."},
 {th:"nature", t:"Rousseau : les 3 P et l'intrus", d:"L'homme naturel a l'amour de soi, la <b>P</b>itié et la <b>P</b>erfectibilité ; la <b>P</b>ropriété arrive avec la société, et avec elle l'amour-<b>P</b>ropre (l'intrus)."},
 {th:"nature", t:"Jonas = J comme Jeunes générations", d:"Le Principe responsabilité : agir pour que la vie humaine reste possible pour les générations futures."},
 {th:"nature", t:"Merleau-Ponty : le « marbré »", d:"Comme un gâteau marbré, on ne peut pas séparer la nature et la culture chez l'homme : « tout est fabriqué et tout est naturel »."},
 {th:"justice", t:"Légal / légitime : le Code et la Conscience", d:"Le <b>LÉGAL</b> se lit dans la <b>Loi</b> ; le <b>LÉGITIME</b> se juge avec la justice. Rosa Parks : illégale mais légitime."},
 {th:"justice", t:"Aristote : Géo pour les Grades, Arithmé pour les Achats", d:"Justice <b>distributive</b> : égalité <b>géométrique</b>, selon le mérite (les grades, les primes). Justice <b>corrective</b> : égalité <b>arithmétique</b>, stricte (les achats, les réparations)."},
 {th:"justice", t:"L'équité, la « retouche » de la loi", d:"Comme un tailleur retouche un costume de série pour qu'il aille à une personne précise, l'équité adapte la loi générale au cas particulier."},
 {th:"justice", t:"Hobbes, Locke, Rousseau : Hache, Lots, Rose", d:"<b>H</b>obbes = <b>H</b>ache (la guerre de tous contre tous) · <b>L</b>ocke = <b>L</b>ots de terre (la propriété, droit naturel) · <b>R</b>ousseau = <b>R</b>ose (l'homme naturel bon, la pitié)."},
 {th:"justice", t:"Calliclès Cogne, Rousseau Refuse", d:"Calliclès : le plus fort doit avoir plus. Rousseau : « force ne fait pas droit » ; céder à la force est une <b>N</b>écessité, pas une <b>V</b>olonté (N comme Non choisi)."},
 {th:"justice", t:"Pascal : la justice a un passeport", d:"« Vérité au-deçà des Pyrénées, erreur au-delà » : ce qui est juste change en passant la frontière, comme si la justice devait montrer son passeport."},
 {th:"justice", t:"Rawls : le voile = « Vous ne savez pas qui vous serez »", d:"Sous le voile d'ignorance, tu choisis les règles sans savoir si tu seras riche ou pauvre : tu choisis donc des règles justes pour tous."},
 {th:"justice", t:"Antigone = A comme « Au-dessus des lois »", d:"Elle invoque des lois non écrites, au-dessus des lois de Créon : c'est l'exemple type du droit naturel."},
 {th:"justice", t:"Justice ou vengeance : le Tiers et la Mesure", d:"La justice, c'est un <b>T</b>iers impartial + une <b>M</b>esure (la peine proportionnée). Sans ces deux choses, c'est de la vengeance."},
];

/* Fusion dans le QCM : niveaux + questions justice */
NIV.forEach((n, i) => { if (QCM[i]) QCM[i].niv = n; });
QCM_JUSTICE.forEach(q => { q.src = "cours"; QCM.push(q); });
