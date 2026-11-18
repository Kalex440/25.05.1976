/* Données : textes à trous et cartes mentales */

/* Dans chaque texte, [mot] est un trou ; [mot|variante] accepte aussi la variante. */
const TROUS = [
{id:"t1", titre:"Les sens du mot « nature »",
 texte:"Le mot nature vient du latin [natura], qui traduit le grec [phusis] : il désigne d'abord ce qui naît et croît de soi-même. Pour Aristote, un être naturel possède en lui-même le principe de son [mouvement], alors qu'un objet [technique] le reçoit de l'extérieur, comme le lit reçoit sa forme du menuisier. On oppose souvent la nature à la [culture], et l'[inné] à l'acquis. Mais selon Merleau-Ponty, chez l'homme « tout est [fabriqué] et tout est naturel ». Sartre va plus loin : il n'y a pas de nature humaine, car « l'existence précède l'[essence] ».",
 pieges:["logos","raison","immobilité","acquis","instinct","existence"]},
{id:"t2", titre:"Rousseau et l'état de nature",
 texte:"Pour Rousseau, l'homme naturel est guidé par deux principes : l'[amour de soi], qui le pousse à se conserver, et la [pitié], qui lui inspire une répugnance à voir souffrir son semblable. C'est la société qui fait naître l'[amour-propre], c'est-à-dire le désir de se comparer et de dominer. Selon le Discours sur l'inégalité, le premier qui, ayant enclos un terrain, s'avisa de dire « Ceci est à moi » fut le vrai fondateur de la [société civile]. La faculté propre à l'homme de se transformer s'appelle la [perfectibilité]. Rousseau ne veut pas revenir à l'état de nature : dans le [Contrat social], il cherche une association légitime fondée sur la [volonté générale].",
 pieges:["Léviathan","égoïsme","propriété","raison","volonté de tous","état de guerre"]},
{id:"t3", titre:"Hobbes : de la guerre au contrat",
 texte:"Dans le [Léviathan] (1651), Hobbes décrit l'état de nature comme une guerre de [chacun] contre chacun. Sans pouvoir commun, la vie humaine est « solitaire, misérable, dangereuse, animale et [brève] ». Dans cet état, il n'existe ni juste ni [injuste], car il n'y a pas encore de loi. Poussés par la [peur] de la mort violente, les hommes passent un [contrat] par lequel ils confient leur puissance à un [souverain] chargé de garantir la paix.",
 pieges:["pitié","bonheur","longue","Dieu","peuple","joie"]},
{id:"t4", titre:"Aristote : les formes de la justice",
 texte:"Dans l'Éthique à Nicomaque, Aristote distingue deux formes de justice. La justice [distributive] répartit les honneurs et les biens selon le [mérite] de chacun : elle repose sur une égalité [géométrique], c'est-à-dire proportionnelle. La justice [corrective] règle les échanges et les réparations selon une égalité [arithmétique], stricte. Enfin, l'[équité] corrige la [loi] là où, à cause de sa généralité, elle conduirait à une injustice dans un cas particulier.",
 pieges:["besoin","naturelle","force","coutume","sociale","morale"]},
{id:"t5", titre:"Légal, légitime et droit naturel",
 texte:"Ce qui est [légal] est conforme aux lois en vigueur ; ce qui est [légitime] est conforme à ce qui est juste. Le droit [positif] désigne l'ensemble des lois posées par une autorité dans une société donnée. Le droit [naturel] serait universel, fondé sur la nature humaine ou la raison. Dans la tragédie de Sophocle, [Antigone] désobéit à l'édit de [Créon] au nom des « lois non écrites ». En 1945-1946, le procès de [Nuremberg] a jugé des crimes commis en obéissant aux lois du régime nazi.",
 pieges:["moral","Ismène","Versailles","divin","Socrate","coutumier"]},
{id:"t6", titre:"La force peut-elle faire le droit ?",
 texte:"Dans le Gorgias de Platon, [Calliclès] soutient que, selon la nature, il est juste que le plus [fort] ait plus que le plus faible. Rousseau répond que « céder à la force est un acte de [nécessité], non de [volonté] » : la force ne crée aucun [devoir]. Il conclut que « force ne fait pas [droit] ». Pascal, plus pessimiste, constate que « ne pouvant faire que ce qui est juste fût fort, on a fait que ce qui est fort fût [juste] ».",
 pieges:["Socrate","faible","liberté","plaisir","injuste","raison"]},
{id:"t7", titre:"Maîtriser ou respecter la nature ?",
 texte:"Dans le Discours de la méthode, Descartes veut que la science nous rende « comme [maîtres] et possesseurs de la nature », notamment pour la conservation de la [santé]. Bacon rappelle qu'on ne commande à la nature qu'en lui [obéissant]. Hume montre qu'on ne peut pas déduire ce qui doit être de ce qui [est] : la nature n'est donc pas une norme. J. S. Mill ajoute que la nature tue et détruit sans distinction, si bien que l'imiter serait [immoral]. Enfin, Hans Jonas fonde Le Principe [responsabilité] : nous avons des devoirs envers la nature et les générations [futures].",
 pieges:["esclaves","richesse","résistant","doit","moral","passées","précaution"]},
];

/* Cartes mentales : chaque feuille {a:"amorce", r:"réponse", b:true si à compléter} */
const CARTES = [
{id:"c1", titre:"La nature", centre:"LA NATURE", temps:150,
 branches:[
  {nom:"Définitions", f:[{a:"Grec",r:"phusis",b:1},{a:"Opposé",r:"culture",b:1},{a:"Ce qui est donné",r:"inné",b:0}]},
  {nom:"Nature et technique", f:[{a:"Aristote",r:"principe de mouvement",b:1},{a:"Descartes",r:"maîtres et possesseurs",b:1},{a:"Bacon",r:"obéir pour commander",b:0}]},
  {nom:"Une norme ?", f:[{a:"Stoïciens",r:"vivre selon la nature",b:1},{a:"Hume",r:"être ≠ devoir-être",b:1},{a:"Mill",r:"nature cruelle",b:0}]},
  {nom:"Nature humaine", f:[{a:"Rousseau",r:"perfectibilité",b:1},{a:"Sartre",r:"existence précède l'essence",b:1},{a:"Merleau-Ponty",r:"tout est fabriqué",b:0}]},
 ], pieges:["logos","contrat social","voile d'ignorance"]},
{id:"c2", titre:"La justice", centre:"LA JUSTICE", temps:150,
 branches:[
  {nom:"Trois sens", f:[{a:"Vertu",r:"rendre à chacun le sien",b:1},{a:"Institution",r:"tribunaux",b:0},{a:"Idéal",r:"juger les lois",b:1}]},
  {nom:"Aristote", f:[{a:"Distributive",r:"selon le mérite",b:1},{a:"Corrective",r:"égalité arithmétique",b:1},{a:"Correction de la loi",r:"équité",b:1}]},
  {nom:"Distinctions", f:[{a:"Conforme à la loi",r:"légal",b:1},{a:"Conforme au juste",r:"légitime",b:1},{a:"Lois posées",r:"droit positif",b:0}]},
  {nom:"Modernes", f:[{a:"Rawls",r:"voile d'ignorance",b:1},{a:"Marx",r:"selon ses besoins",b:0},{a:"Kelsen",r:"positivisme juridique",b:1}]},
 ], pieges:["égalité géométrique","coutume","pitié"]},
{id:"c3", titre:"Justice : nature ou convention ?", centre:"JUSTE PAR NATURE ?", temps:140,
 branches:[
  {nom:"Oui, il y a un juste naturel", f:[{a:"Sophocle",r:"lois non écrites",b:1},{a:"Cicéron",r:"droite raison",b:1},{a:"Montesquieu",r:"rapport de convenance",b:1}]},
  {nom:"Non, c'est une convention", f:[{a:"Pascal",r:"coutume",b:1},{a:"Hobbes",r:"rien d'injuste avant l'État",b:1},{a:"Hume",r:"vertu artificielle",b:0}]},
  {nom:"La force ?", f:[{a:"Calliclès",r:"droit du plus fort",b:1},{a:"Rousseau",r:"force ne fait pas droit",b:1},{a:"Spinoza",r:"droit = puissance",b:0}]},
  {nom:"Exemples", f:[{a:"1789",r:"droits naturels",b:1},{a:"1945",r:"Nuremberg",b:1},{a:"Désobéissance",r:"Rosa Parks",b:0}]},
 ], pieges:["amour-propre","Léviathan","maîtres et possesseurs"]},
{id:"c4", titre:"L'homme et la nature", centre:"L'HOMME FACE À LA NATURE", temps:140,
 branches:[
  {nom:"Démuni", f:[{a:"Mythe",r:"Prométhée",b:1},{a:"À la naissance",r:"le plus faible",b:1},{a:"Solution",r:"technique",b:0}]},
  {nom:"Être de culture", f:[{a:"Face au besoin",r:"différer",b:1},{a:"Enfant sauvage",r:"Victor de l'Aveyron",b:1},{a:"Kant",r:"insociable sociabilité",b:1}]},
  {nom:"Rousseau", f:[{a:"L'homme naturel",r:"bon",b:1},{a:"La société",r:"corrompt",b:1},{a:"Émile",r:"éducation naturelle",b:0}]},
  {nom:"Responsabilité", f:[{a:"Jonas",r:"générations futures",b:1},{a:"Antibiotiques",r:"contre la nature mais utiles",b:1},{a:"Moustique",r:"naturel mais dangereux",b:0}]},
 ], pieges:["Calliclès","égalité arithmétique","Antigone"]},
];
