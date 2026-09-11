import React, { useState } from "react";
import { Copy, CheckCheck, Search } from "lucide-react";

const prompts = [
  {
    category: "Anamnèse",
    color: "blue",
    items: [
      {
        title: "Anamnèse DT2",
        text: "Génère une anamnèse nutritionnelle structurée pour un patient diabétique de type 2 en consultation de diététique. Inclure : habitudes alimentaires, fréquence des repas, consommation de glucides, activité physique, traitements en cours.",
      },
      {
        title: "Anamnèse gériatrique",
        text: "Propose une grille d'évaluation nutritionnelle pour une personne âgée en institution. Inclure : appétit, capacités masticatoires, déglutition, autonomie, poids récent et variations.",
      },
      {
        title: "Anamnèse oncologie",
        text: "Génère un questionnaire nutritionnel adapté à un patient en cours de traitement oncologique. Focus : effets secondaires alimentaires, modifications gustatives, nausées, poids.",
      },
      {
        title: "Première consultation cabinet",
        text: "Crée un guide de première consultation diététique en cabinet libéral. Inclure : motif de consultation, antécédents médicaux et nutritionnels, mode de vie, objectifs du patient.",
      },
    ],
  },
  {
    category: "Dénutrition & Enrichissement",
    color: "amber",
    items: [
      {
        title: "Enrichissement hyperprotéiné",
        text: "Propose 10 enrichissements alimentaires hyperprotéinés adaptés à une personne âgée avec petit appétit et dénutrition légère à modérée. Privilégier des aliments courants et accessibles.",
      },
      {
        title: "Texture modifiée",
        text: "Donne des idées de repas enrichis en protéines et calories pour une personne âgée nécessitant des textures mixées ou hachées. Mentionner la densité nutritionnelle de chaque proposition.",
      },
      {
        title: "Collations gériatriques",
        text: "Propose 8 collations hypercaloriques et hyperprotéinées pour une personne âgée institutionnalisée présentant une dénutrition protéino-énergétique. Tenir compte des contraintes gustatives.",
      },
      {
        title: "Compléments nutritionnels oraux",
        text: "Explique quand et comment intégrer des compléments nutritionnels oraux (CNO) dans la prise en charge d'une dénutrition. Donne des conseils pratiques pour favoriser l'adhésion.",
      },
    ],
  },
  {
    category: "Éducation patient",
    color: "emerald",
    items: [
      {
        title: "Index glycémique (simple)",
        text: "Explique l'index glycémique simplement pour un patient diabétique sans formation médicale. Utilise des exemples d'aliments du quotidien. Maximum 150 mots.",
      },
      {
        title: "Assiette équilibrée DT2",
        text: "Décris la méthode de l'assiette pour un patient diabétique de type 2. Utilise un langage simple, des proportions visuelles et des exemples concrets de repas.",
      },
      {
        title: "Hydratation personne âgée",
        text: "Crée un message éducatif simple sur l'importance de l'hydratation pour une personne âgée. Donne des conseils pratiques pour augmenter les apports hydriques au quotidien.",
      },
      {
        title: "Lecture étiquettes",
        text: "Explique à un patient comment lire les étiquettes nutritionnelles sur les produits alimentaires. Focus sur les sucres, graisses saturées, sel et fibres. Langage accessible.",
      },
    ],
  },
  {
    category: "Insuffisance Rénale Chronique",
    color: "violet",
    items: [
      {
        title: "Collations pauvres en potassium",
        text: "Donne des idées de collations pauvres en potassium (< 200mg par portion) adaptées à un patient en IRC stade 4. Préciser la teneur approximative en potassium.",
      },
      {
        title: "Repas IRC complet",
        text: "Propose un exemple de repas principal adapté à une insuffisance rénale chronique stade 3-4 : restriction protéique modérée, faible en phosphore et en potassium. Justifier brièvement les choix.",
      },
      {
        title: "Éducation IRC",
        text: "Explique simplement à un patient IRC pourquoi certains aliments sont déconseillés (potassium, phosphore, sel). Utilise des exemples pratiques du quotidien.",
      },
    ],
  },
  {
    category: "Oncologie",
    color: "rose",
    items: [
      {
        title: "Nausées sous chimio",
        text: "Propose des conseils alimentaires pratiques pour gérer les nausées chez un patient sous chimiothérapie. Inclure : texture, température, fréquence des prises, aliments à éviter.",
      },
      {
        title: "Anorexie oncologique",
        text: "Donne des stratégies pour stimuler l'appétit chez un patient oncologique présentant une anorexie sévère. Focus sur l'enrichissement, la présentation et l'organisation des repas.",
      },
      {
        title: "Post-chirurgie digestive",
        text: "Propose un schéma de réalimentation progressive pour un patient après une résection intestinale ou gastrectomie partielle. Étapes, textures, volumes et fréquences adaptés.",
      },
    ],
  },
  {
    category: "Créations de menus",
    color: "teal",
    items: [
      {
        title: "Menu semaine DT2",
        text: "Crée un menu équilibré sur 5 jours pour un adulte diabétique de type 2, à faible index glycémique, riche en fibres. Inclure petit-déjeuner, déjeuner, dîner et collation si besoin.",
      },
      {
        title: "Menu végétarien protéiné",
        text: "Propose un menu végétarien sur 3 jours couvrant les besoins protéiques d'un adulte actif (1.2g/kg/j). Variété des sources protéiques végétales, équilibre micronutritionnel.",
      },
      {
        title: "Menu allergie lait enfant",
        text: "Conçois un menu sur 3 jours sans protéines de lait de vache pour un enfant de 8-10 ans, couvrant les besoins en calcium avec des alternatives adaptées.",
      },
    ],
  },
  {
    category: "Calculs & Évaluations",
    color: "indigo",
    items: [
      {
        title: "Calcul besoins énergétiques",
        text: "Explique la méthode de calcul des besoins énergétiques totaux chez un adulte hospitalisé dénutri. Utilise la formule Harris-Benedict avec facteur de stress. Donne un exemple concret.",
      },
      {
        title: "Besoins protéiques IRC",
        text: "Détaille le calcul des apports protéiques recommandés pour un patient IRC non dialysé selon le stade de la maladie. Donne des exemples pratiques d'application.",
      },
      {
        title: "Score MNA",
        text: "Explique comment interpréter le score MNA (Mini Nutritional Assessment) chez une personne âgée. Que faire selon les résultats : normal, risque, dénutrition ?",
      },
      {
        title: "Calcul nutritionnel sur base des ingesta",
        text: "À partir des ingesta recueillis lors de l'anamnèse (rappel des 24h ou journal alimentaire), évalue les apports caloriques et protéiques réels du patient et compare-les aux besoins estimés par le diététicien (en kcal/kg et g protéines/kg selon le contexte clinique). Identifie les déficits ou excès, et propose des ajustements ciblés et progressifs pour atteindre les objectifs nutritionnels.",
      },
    ],
  },
];

const colorMap = {
  blue: { bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", border: "border-blue-100" },
  amber: { bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500", border: "border-amber-100" },
  emerald: { bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-100" },
  violet: { bg: "bg-violet-50", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", border: "border-violet-100" },
  rose: { bg: "bg-rose-50", badge: "bg-rose-100 text-rose-700", dot: "bg-rose-500", border: "border-rose-100" },
  teal: { bg: "bg-teal-50", badge: "bg-teal-100 text-teal-700", dot: "bg-teal-500", border: "border-teal-100" },
  indigo: { bg: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", border: "border-indigo-100" },
};

function PromptCard({ title, text, color }) {
  const [copied, setCopied] = useState(false);
  const c = colorMap[color];

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4 group`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow transition-all"
          title="Copier"
        >
          {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
        </button>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

export default function PromptBank() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = ["Tous", ...prompts.map((p) => p.category)];

  const filtered = prompts
    .filter((group) => activeCategory === "Tous" || group.category === activeCategory)
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          search === "" ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.text.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const totalPrompts = prompts.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Banque de prompts prêts à l'emploi</h2>
          <p className="text-slate-500 mt-1 text-sm">{totalPrompts} prompts diététiques professionnels · 100 % anonymes</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher un prompt (ex: IRC, gériatrie, éducation...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const group = prompts.find((p) => p.category === cat);
          const color = group ? colorMap[group.color] : null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Prompt Groups */}
      <div className="space-y-8">
        {filtered.map((group) => {
          const c = colorMap[group.color];
          return (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${c.dot}`}></div>
                <h3 className="font-semibold text-slate-700">{group.category}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{group.items.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.items.map((item, idx) => (
                  <PromptCard key={idx} {...item} color={group.color} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
