import React, { useState } from "react";
import { Copy, RefreshCw, CheckCheck } from "lucide-react";

const contexts = [
  { value: "hopital", label: "🏥 Hôpital" },
  { value: "prive", label: "🩺 Consultation privée" },
  { value: "geria", label: "👴 Gériatrie" },
  { value: "diabeto", label: "🍎 Diabétologie" },
  { value: "onco", label: "🎗️ Oncologie" },
  { value: "nephro", label: "💧 Néphrologie" },
  { value: "pedia", label: "🧒 Pédiatrie" },
  { value: "tca", label: "🌱 TCA" },
];

const objectives = [
  { value: "anamnese", label: "Questions d'anamnèse" },
  { value: "explication", label: "Explication patient simple" },
  { value: "plan", label: "Plan alimentaire" },
  { value: "enrichissement", label: "Enrichissement alimentaire" },
  { value: "collation", label: "Idées de collations" },
  { value: "calcul", label: "Calcul des besoins nutritionnels" },
  { value: "enteral", label: "Calcul nutrition entérale" },
  { value: "resume", label: "Résumé de dossier" },
];

const tones = [
  { value: "pro", label: "🔬 Professionnel" },
  { value: "vulga", label: "💬 Vulgarisation patient" },
  { value: "simple", label: "📝 Très simple" },
  { value: "sci", label: "📊 Scientifique" },
];

const promptTemplates = {
  hopital: {
    calcul: {
      pro: "Effectue le calcul des besoins nutritionnels pour un patient hospitalisé en situation de dénutrition modérée à sévère. Utilise une estimation en kcal/kg et g protéines/kg selon l'appréciation clinique du diététicien (ex. 25-35 kcal/kg, 1,2-1,5 g prot/kg selon le contexte), ou toute autre méthode jugée adaptée. Inclure la répartition macronutriments et les apports cibles journaliers.",
      vulga: "Explique simplement comment les diététiciens estiment les besoins en calories et en protéines d'un patient hospitalisé, selon son poids et sa situation.",
      simple: "Donne les étapes de base pour estimer les besoins caloriques et protéiques d'un adulte hospitalisé à partir de son poids.",
      sci: "Décris les méthodes d'estimation des besoins nutritionnels : approche simplifiée kcal/kg et g protéines/kg (préférée en pratique), méthodes équationnelles comme référence si disponibles, facteurs de correction selon l'état clinique (sepsis, chirurgie, brûlures), poids à utiliser (actuel, idéal ou ajusté selon IMC), selon les recommandations ESPEN.",
    },
    enteral: {
      pro: "Élabore un protocole de nutrition entérale pour un patient hospitalisé avec défaillance de l'alimentation orale : choix de la formule (standard, hyperprotéinée, spécifique), calcul du débit de démarrage progressif, objectifs à J3/J7, surveillance du syndrome de renutrition inappropriée et monitoring biologique.",
      vulga: "Explique à la famille d'un patient ce qu'est la nutrition entérale par sonde, pourquoi elle est mise en place et comment elle fonctionne.",
      simple: "En quoi consiste la nutrition par sonde et quand est-elle utilisée à l'hôpital ?",
      sci: "Propose un protocole de nutrition entérale selon les recommandations ESPEN : indications, contre-indications, choix de la formule, calcul de la vitesse de perfusion, surveillance du résidu gastrique, prévention du SRI (phosphore, magnésium, thiamine) et critères de passage en nutrition orale.",
    },
    anamnese: {
      pro: "Agis comme un diététicien hospitalier expert. Génère une grille d'anamnèse nutritionnelle structurée et complète, incluant les paramètres anthropométriques, les habitudes alimentaires, l'appétit, les symptômes digestifs et l'autonomie. Format professionnel.",
      vulga: "Génère une liste de questions simples pour mieux comprendre l'alimentation d'un patient hospitalisé. Utilise un langage accessible.",
      simple: "Donne-moi 8 questions simples à poser à un patient sur son alimentation à l'hôpital.",
      sci: "Propose une grille d'évaluation nutritionnelle validée selon les recommandations ESPEN, incluant les outils de dépistage (MNA, NRS-2002) adaptés au contexte hospitalier.",
    },
    explication: {
      pro: "Rédige une explication professionnelle à transmettre à l'équipe soignante concernant l'importance de l'enrichissement nutritionnel chez un patient hospitalisé dénutri.",
      vulga: "Explique simplement à un patient hospitalisé pourquoi il est important de bien manger pendant son séjour.",
      simple: "En 3 phrases, explique à un patient pourquoi bien manger à l'hôpital aide à guérir plus vite.",
      sci: "Décris les mécanismes physiopathologiques liant dénutrition hospitalière et morbi-mortalité, avec données épidémiologiques récentes.",
    },
    plan: {
      pro: "Conçois un plan alimentaire enrichi sur 3 jours pour un patient hospitalisé en situation de dénutrition modérée, avec objectifs caloriques et protéiques détaillés.",
      vulga: "Propose un menu de 3 jours facile à manger pour une personne qui a peu d'appétit à l'hôpital.",
      simple: "Donne un exemple de repas simple et nourrissant pour quelqu'un qui mange peu à l'hôpital.",
      sci: "Élabore un protocole nutritionnel hospitalier conforme aux recommandations ESPEN pour un patient dénutri, avec calcul des apports cibles selon Harris-Benedict.",
    },
  },
  geria: {
    enrichissement: {
      pro: "Propose 12 stratégies d'enrichissement alimentaire hyperprotéiné adaptées à une personne âgée institutionnalisée présentant une dénutrition protéino-énergétique et une dysphagie légère.",
      vulga: "Donne des idées simples pour ajouter des protéines dans les repas d'une personne âgée qui mange peu.",
      simple: "Cite 8 aliments à ajouter dans les repas d'une personne âgée pour qu'elle mange mieux.",
      sci: "Analyse les stratégies d'enrichissement nutritionnel en gériatrie selon les recommandations de la HAS, avec focus sur les textures modifiées et la sarcopénie.",
    },
    collation: {
      pro: "Génère 10 idées de collations hyperprotéinées et hypercaloriques adaptées à une personne âgée avec petit appétit, en tenant compte des textures et des préférences gustatives.",
      vulga: "Propose des petites collations savoureuses et nourrissantes pour une personne âgée qui a peu faim.",
      simple: "Donne 6 idées de petits encas faciles à manger pour un(e) résident(e) en maison de retraite.",
      sci: "Recommande des collations à haute densité nutritionnelle pour la prise en charge de la sarcopénie chez le sujet âgé.",
    },
  },
  diabeto: {
    explication: {
      pro: "Rédige une explication nutritionnelle complète sur la gestion glycémique par l'alimentation pour un patient DT2 en consultation de diététique.",
      vulga: "Explique simplement comment l'alimentation influence la glycémie chez un patient diabétique de type 2.",
      simple: "En quelques mots simples, explique l'index glycémique à un patient diabétique.",
      sci: "Détaille le rôle de l'index glycémique, de la charge glycémique et des fibres dans le contrôle métabolique du diabète de type 2, en citant les recommandations SFD/ADA.",
    },
    anamnese: {
      pro: "Génère une anamnèse nutritionnelle spécialisée pour un patient diabétique de type 2, incluant l'évaluation des apports glucidiques, l'activité physique, les habitudes alimentaires et le contexte socio-économique.",
      vulga: "Quelles questions poser à un patient diabétique pour comprendre son alimentation au quotidien ?",
      simple: "Liste 6 questions clés à poser à un diabétique sur son alimentation.",
      sci: "Propose un protocole d'évaluation diététique validé pour le diabète de type 2, intégrant les marqueurs biologiques et les outils de rappels alimentaires.",
    },
  },
  onco: {
    calcul: {
      pro: "Estime les besoins nutritionnels d'un patient oncologique sous chimiothérapie avec perte de poids : utilise une approche kcal/kg et g protéines/kg selon l'appréciation clinique du diététicien (ex. 30-40 kcal/kg, 1,2-1,5 g prot/kg selon cachexie et tolérance), ou toute autre méthode adaptée. Adapter selon le type de traitement et l'état nutritionnel.",
      vulga: "Comment estime-t-on les besoins en calories et en protéines d'une personne suivant un traitement contre le cancer, selon son poids et son état ?",
      simple: "Donne les besoins approximatifs en calories et en protéines pour quelqu'un sous chimiothérapie qui a perdu du poids.",
      sci: "Décris l'estimation des besoins nutritionnels en oncologie selon ESPEN 2021 : approche kcal/kg cliniquement estimée, besoins protéiques majorés, impact de la cachexie cancéreuse, méthodes équationnelles comme référence optionnelle, et adaptation selon stade et traitement.",
    },
    enteral: {
      pro: "Conçois un protocole de nutrition entérale pour un patient oncologique ne pouvant pas s'alimenter oralement suffisamment : indications, choix de la formule hyperprotéinée, calcul progressif des apports, surveillance biologique et coordination avec l'oncologie.",
      vulga: "Explique pourquoi et comment une nutrition par sonde peut être nécessaire pour un patient en traitement contre le cancer.",
      simple: "Quand met-on une sonde pour alimenter quelqu'un sous chimiothérapie et comment ça se passe ?",
      sci: "Décris le protocole de nutrition entérale en oncologie selon ESPEN 2021 : indications (apports oraux < 60 % des besoins > 10 jours), formules adaptées, débit progressif, surveillance du SRI, critères d'escalade vers nutrition parentérale.",
    },
    enrichissement: {
      pro: "Propose des stratégies nutritionnelles adaptées à un patient en oncologie présentant une anorexie chimio-induite et une perte de poids significative.",
      vulga: "Donne des conseils alimentaires pour aider une personne qui suit une chimio et n'a pas envie de manger.",
      simple: "Comment aider quelqu'un à manger pendant la chimio quand il n'a pas faim ?",
      sci: "Décris la prise en charge nutritionnelle du patient oncologique selon les guidelines ESPEN 2021, incluant le soutien nutritionnel oral, entéral et parentéral.",
    },
    plan: {
      pro: "Élabore un plan nutritionnel adapté à un patient en oncologie digestive, post-chirurgie, avec gestion des effets secondaires du traitement.",
      vulga: "Propose un menu adapté pour une personne qui vient d'avoir une opération du ventre suite à un cancer.",
      simple: "Donne des idées de repas doux et nourrissants après une opération du ventre.",
      sci: "Conçois un protocole de réalimentation post-opératoire en chirurgie oncologique digestive, selon les recommandations ERAS.",
    },
  },
  nephro: {
    collation: {
      pro: "Propose 10 idées de collations pauvres en potassium, phosphore et sodium, adaptées à un patient IRC stade 4 non dialysé.",
      vulga: "Donne des idées de petits encas que peut manger une personne avec les reins qui fonctionnent moins bien.",
      simple: "Cite 6 collations autorisées pour quelqu'un qui doit manger moins de potassium.",
      sci: "Recommande des collations conformes aux restrictions ioniques chez le patient en insuffisance rénale chronique stade 4 (K < 2g/j, P < 800mg/j, Na < 2g/j).",
    },
    plan: {
      pro: "Conçois un plan alimentaire pour un patient IRC stade 3-4, incluant les restrictions en potassium, phosphore, sodium et protéines.",
      vulga: "Explique à un patient avec une maladie des reins quels aliments il doit éviter et lesquels il peut manger.",
      simple: "Quels aliments un patient avec les reins malades doit-il éviter ?",
      sci: "Propose un schéma nutritionnel validé pour la MRC stade 3-4 selon les recommandations KDIGO, avec calcul des apports protéiques adaptés.",
    },
  },
  pedia: {
    explication: {
      pro: "Rédigez une fiche d'éducation nutritionnelle adaptée aux parents d'un enfant présentant un surpoids, en incluant les recommandations PNNS pédiatriques.",
      vulga: "Donne des conseils alimentaires simples pour les parents d'un enfant en surpoids.",
      simple: "En 5 conseils simples, aide les parents d'un enfant en surpoids à améliorer son alimentation.",
      sci: "Détaille la prise en charge diététique du surpoids pédiatrique selon les recommandations HAS, avec focus sur l'approche familiale et les facteurs de risque métaboliques.",
    },
    plan: {
      pro: "Élabore un plan alimentaire équilibré pour un enfant de 8-10 ans avec allergie aux protéines de lait de vache, couvrant tous les besoins nutritionnels.",
      vulga: "Propose un menu varié pour un enfant allergique au lait qui couvre quand même ses besoins.",
      simple: "Donne un exemple de repas sans lait et sans produits laitiers pour un enfant.",
      sci: "Propose un plan nutritionnel pour l'allergie aux protéines de lait de vache chez l'enfant, en conformité avec les recommandations ESPGHAN, incluant les substituts calciques.",
    },
  },
  tca: {
    calcul: {
      pro: "Estime prudemment les besoins nutritionnels initiaux pour un(e) patient(e) en début de réalimentation TCA : utilise une approche kcal/kg basée sur le poids actuel (non le poids cible), avec un objectif de départ conservateur estimé par le diététicien selon le contexte clinique, et un plan de progression sécurisée (+100 à 200 kcal/semaine maximum). Même approche pour les protéines (g/kg selon tolérance).",
      vulga: "Comment estime-t-on les besoins alimentaires d'une personne en début de rétablissement d'un trouble alimentaire, à partir de son poids actuel et de manière sécurisée ?",
      simple: "Pourquoi les besoins en calories sont-ils estimés prudemment au début d'un rétablissement d'un trouble alimentaire, et comment cette estimation évolue-t-elle ?",
      sci: "Décris l'estimation des apports nutritionnels initiaux en contexte TCA selon NICE/HAS : approche kcal/kg et g prot/kg basée sur le poids actuel, seuil de démarrage sécurisé, progression hebdomadaire validée cliniquement, surveillance biologique du SRI (phosphore, magnésium, potassium, glycémie), formules équationnelles en référence optionnelle (Schofield pédiatrique si enfant/ado).",
    },
    enteral: {
      pro: "Décris les critères d'indication et le protocole de nutrition entérale dans les TCA sévères (anorexie avec IMC < 14 ou refus alimentaire total) : choix de la voie (SNG), formule adaptée, débit de démarrage ultra-progressif, protocole strict de prévention du SRI, cadre thérapeutique et éthique, coordination psy-médecin-diété.",
      vulga: "Explique à une famille pourquoi une nutrition par sonde peut parfois être nécessaire dans les cas graves de troubles alimentaires, et comment elle est mise en place avec bienveillance.",
      simple: "Dans quels cas une sonde d'alimentation est-elle utilisée pour un(e) jeune souffrant d'un trouble alimentaire grave ?",
      sci: "Détaille le protocole de nutrition entérale en TCA sévère selon les recommandations : indications médicales strictes, débit initial (10-20 ml/h), supplémentation systématique en thiamine, phosphore, magnésium avant démarrage, surveillance biologique quotidienne, durée et critères de sevrage, encadrement éthique et psychologique.",
    },
    anamnese: {
      pro: "Agis comme un diététicien spécialisé en TCA, membre d'une équipe pluridisciplinaire. Génère une grille d'anamnèse nutritionnelle et psychologique adaptée aux troubles des conduites alimentaires (anorexie, boulimie, hyperphagie), incluant : historique alimentaire, comportements restrictifs ou compensatoires, relation à l'alimentation et au corps, contexte familial et soutien psychologique en cours.",
      vulga: "Quelles questions poser avec bienveillance à une personne souffrant d'un trouble alimentaire pour comprendre sa situation sans la brusquer ?",
      simple: "Donne 8 questions douces et respectueuses à poser lors d'un premier contact avec une personne souffrant d'un trouble alimentaire.",
      sci: "Propose un protocole d'évaluation diététique validé pour les TCA, intégrant les outils de dépistage (EDE-Q, SCOFF), l'évaluation du risque de syndrome de renutrition inappropriée (SRI) et la coordination avec les soignants psy.",
    },
    plan: {
      pro: "Élabore une stratégie de réalimentation progressive pour un(e) adolescent(e) pris(e) en charge pour anorexie restrictive en équipe pluridisciplinaire. Inclure : évaluation préalable, protocole de montée calorique graduelle (+100-200 kcal/semaine maximum), surveillance du syndrome de renutrition inappropriée (phosphore, magnésium, glycémie, bilan électrolytique), approche centrée sur le soin et non sur le poids, coordination avec psychologue et médecin.",
      vulga: "Comment présenter à une famille l'objectif d'une réalimentation progressive pour leur enfant souffrant d'un trouble alimentaire, en mettant en avant la sécurité et la bienveillance ?",
      simple: "Explique simplement pourquoi il faut réintroduire les aliments progressivement quand quelqu'un a eu un trouble alimentaire.",
      sci: "Décris le protocole de réalimentation en TCA selon les recommandations NICE/HAS : montée calorique sécurisée, surveillance et prévention du syndrome de renutrition inappropriée (SRI), critères d'hospitalisation, indicateurs biologiques à monitorer et rôle du diététicien dans l'équipe de soin.",
    },
    explication: {
      pro: "Rédige une note professionnelle à destination de l'équipe soignante décrivant les enjeux nutritionnels et médicaux d'une prise en charge TCA : risque de SRI, progression prudente des apports, approche non punitive et centrée sur l'alliance thérapeutique.",
      vulga: "Explique à un(e) adolescent(e) suivi(e) pour un trouble alimentaire pourquoi son corps a besoin d'être renourri doucement et en sécurité.",
      simple: "En 4 phrases bienveillantes, explique à une personne en rétablissement d'un TCA pourquoi les repas réguliers sont importants.",
      sci: "Détaille les mécanismes physiopathologiques du syndrome de renutrition inappropriée dans le contexte des TCA : déséquilibre électrolytique, risque cardiaque, surveillance biologique recommandée et protocoles de prévention.",
    },
  },
  prive: {
    anamnese: {
      pro: "Génère une anamnèse nutritionnelle complète pour une première consultation de diététique en cabinet privé, incluant motif de consultation, antécédents, mode de vie et objectifs.",
      vulga: "Quelles questions poser lors d'un premier rendez-vous diététique pour bien comprendre la situation du patient ?",
      simple: "Donne une liste simple de questions pour une première consultation chez le diététicien.",
      sci: "Propose un protocole standardisé de première consultation diététique en cabinet libéral, incluant les outils validés d'évaluation des apports et du statut nutritionnel.",
    },
    plan: {
      pro: "Conçois un plan alimentaire personnalisé pour une prise en charge de l'obésité en cabinet libéral, en tenant compte du contexte socio-économique et des préférences alimentaires.",
      vulga: "Aide-moi à proposer un rééquilibrage alimentaire réaliste et motivant pour une personne en surpoids.",
      simple: "Donne 5 changements alimentaires simples pour aider quelqu'un à perdre du poids doucement.",
      sci: "Propose un protocole de rééquilibrage alimentaire basé sur les preuves pour la prise en charge de l'obésité (IMC > 30) en consultation libérale.",
    },
  },
};

const ChevronDown = () => (
  <svg className="w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function PromptBuilder() {
  const [context, setContext] = useState("");
  const [objective, setObjective] = useState("");
  const [tone, setTone] = useState("pro");
  const [copied, setCopied] = useState(false);

  const getAvailableObjectives = () => {
    if (!context) return objectives;
    const tpl = promptTemplates[context];
    if (!tpl) return objectives;
    return objectives.filter((o) => tpl[o.value]);
  };

  const generatedPrompt =
    context && objective && tone && promptTemplates[context]?.[objective]?.[tone]
      ? promptTemplates[context][objective][tone]
      : null;

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setContext("");
    setObjective("");
    setTone("pro");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Générateur de prompts diététiques</h2>
        <p className="text-slate-500 mt-1 text-sm">Générez un prompt professionnel, 100 % sans données patients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* A - Contexte */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">A</span>
            <h3 className="font-semibold text-slate-800 text-sm">Contexte clinique</h3>
          </div>
          <div className="relative">
            <select
              value={context}
              onChange={(e) => { setContext(e.target.value); setObjective(""); }}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">-- Choisir --</option>
              {contexts.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none"><ChevronDown /></div>
          </div>
        </div>

        {/* B - Objectif */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">B</span>
            <h3 className="font-semibold text-slate-800 text-sm">Objectif</h3>
          </div>
          <div className="relative">
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              disabled={!context}
            >
              <option value="">-- Choisir --</option>
              {getAvailableObjectives().map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none"><ChevronDown /></div>
          </div>
        </div>

        {/* C - Ton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">C</span>
            <h3 className="font-semibold text-slate-800 text-sm">Ton</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`px-2 py-2 rounded-xl text-xs font-medium transition-all border ${
                  tone === t.value
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Prompt */}
      <div className={`rounded-2xl border-2 shadow-sm transition-all ${
        generatedPrompt ? "bg-white border-blue-200" : "bg-white border-dashed border-slate-200"
      }`}>
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${generatedPrompt ? "bg-blue-500" : "bg-slate-300"}`}></div>
            <h3 className="font-semibold text-slate-800">Prompt généré</h3>
            {generatedPrompt && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">✓ 0 donnée patient</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              title="Réinitialiser"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              disabled={!generatedPrompt}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                generatedPrompt
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        </div>
        <div className="p-6">
          {generatedPrompt ? (
            <p className="text-slate-800 leading-relaxed text-sm">{generatedPrompt}</p>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-400 text-sm">Sélectionnez un contexte, un objectif et un ton pour générer votre prompt</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
