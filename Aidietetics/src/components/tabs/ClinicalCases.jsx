import React, { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Eye } from "lucide-react";

const cases = [
  {
    id: 1,
    title: "Diabète de type 2",
    icon: "🍎",
    color: "amber",
    situation: "Homme 55-60 ans, DT2 depuis 8 ans, HbA1c à 8,5 %, surpoids (IMC 29). Consultation de diététique en ambulatoire.",
    badPrompt: "Patient M. Leroy, 58 ans, diabétique depuis 2016, traité par Metformine 1g x2/j, habite Namur. Donne-moi un régime.",
    goodPrompt: "Homme 55-60 ans, diabète de type 2 non équilibré (HbA1c > 8 %), surpoids modéré. Propose un plan alimentaire à faible index glycémique pour améliorer l'équilibre glycémique, adapté à une consultation diététique ambulatoire.",
    aiResponse: "Plan alimentaire structuré sur 7 jours, riche en fibres, légumineuses, IG bas. Collation protéinée l'après-midi. Élimination des sucres rapides et boissons sucrées. Fractionnement en 3 repas + 1 collation.",
    critique: [
      "L'IA ne mentionne pas les besoins caloriques calculés selon le poids",
      "Pas de référence aux recommandations SFD/ADA 2023",
      "Absence de prise en compte de l'activité physique",
      "Aucune mention de la nécessité de surveillance glycémique post-prandiale",
    ],
    finalPrompt: "Homme 55-60 ans, DT2 non équilibré (HbA1c ~8,5 %), surpoids (IMC 28-30), sédentaire. Conçois un plan alimentaire structuré sur 5 jours selon les recommandations SFD : IG bas, 45-50 % glucides, 1,2 g protéines/kg, réduction des AGS. Inclure calcul calorique estimé (Harris-Benedict + facteur activité), conseils de fractionnement et surveillance glycémique. Réponse structurée, applicable en consultation libérale.",
  },
  {
    id: 2,
    title: "Dénutrition gériatrique",
    icon: "👴",
    color: "blue",
    situation: "Femme 84 ans, résidente en EHPAD, perte de poids de 5 % en 1 mois, appétit très diminué, dysphagie légère. MNA : 17/30.",
    badPrompt: "Mme Dubois chambre 14 EHPAD Les Lilas, poids 48kg perdu 2,5kg, avale mal. Que faire ?",
    goodPrompt: "Femme 80+ ans en institution, dénutrition avérée (perte > 5 % en 1 mois), petit appétit, dysphagie légère. Propose des stratégies d'enrichissement alimentaire et d'adaptation des textures selon les recommandations HAS.",
    aiResponse: "Enrichissement avec fromage fondu, poudre de lait, crème fraîche. Textures hachées ou mixées. Fractionnement en 6 prises/jour. Compléments nutritionnels oraux (CNO) 2x/j entre les repas. Surveillance du poids hebdomadaire.",
    critique: [
      "Pas de calcul des besoins (30-35 kcal/kg/j recommandés chez la personne âgée dénutrie)",
      "L'IA ne précise pas les textures IDDSI (classification internationale)",
      "Absence de mention du risque de fausse route avec certaines textures",
      "CNO proposés sans préciser le type (hyperprotéiné vs standard)",
      "Pas d'évaluation de la cause sous-jacente de la dénutrition",
    ],
    finalPrompt: "Femme 80+ ans, EHPAD, dénutrition avérée (MNA < 17, perte > 5 % /mois), dysphagie légère (IDDSI 4-5 requis). Propose : 1) calcul des besoins cibles (35 kcal/kg, 1,5g protéines/kg), 2) enrichissements adaptés aux textures modifiées, 3) plan de fractionnement sur la journée, 4) critères de prescription de CNO hyperprotéinés, 5) indicateurs de suivi hebdomadaire. Baser sur recommandations HAS et SFNEP.",
  },
  {
    id: 3,
    title: "Oncologie — anorexie chimio",
    icon: "🎗️",
    color: "rose",
    situation: "Femme 60-65 ans, cancer du sein métastatique, sous chimiothérapie (taxanes). Perte de 4 kg en 6 semaines. Nausées, dysgueusie, fatigue intense.",
    badPrompt: "Patiente Mme Martin, cancer sein, chimio depuis janvier à l'Institut Bordet, perd du poids. Comment l'aider à manger ?",
    goodPrompt: "Femme 60-65 ans, cancer du sein sous chimiothérapie, anorexie et nausées chimio-induites, perte de 4 kg en 6 semaines, dysgueusie. Propose des stratégies nutritionnelles pratiques pour maintenir les apports caloriques et protéiques pendant le traitement.",
    aiResponse: "Fractionner les repas en 6-8 petites prises. Favoriser les aliments froids (moins odorants). Éviter les aliments à odeurs fortes. Privilégier protéines maigres : œufs durs froids, yaourt, fromage blanc. Boire entre les repas, pas pendant. Gingembre pour nausées.",
    critique: [
      "Pas de calcul des objectifs nutritionnels (35-40 kcal/kg chez patient oncologique)",
      "Absence de mention du soutien nutritionnel médical (CNO ou nutrition artificielle si < 60 % des besoins)",
      "Dysgueusie non abordée en détail (ustensiles plastique, aliments moins métalliques)",
      "Pas de référence aux guidelines ESPEN oncologie 2021",
      "L'IA ne signale pas quand orienter vers nutrition entérale",
    ],
    finalPrompt: "Femme 60-65 ans, cancer sein métastatique, chimiothérapie en cours, anorexie + nausées + dysgueusie, perte > 5 % du poids en 6 semaines. Propose une prise en charge nutritionnelle graduée selon ESPEN 2021 : 1) calcul des besoins cibles, 2) adaptations pratiques (texture, température, fréquence), 3) gestion de la dysgueusie, 4) critères d'escalade vers CNO puis nutrition entérale, 5) suivi et indicateurs de réévaluation. Format structuré pour équipe soignante.",
  },
  {
    id: 4,
    title: "Obésité — rééquilibrage",
    icon: "⚖️",
    color: "violet",
    situation: "Homme 40-45 ans, obésité classe II (IMC 37), sédentaire, hypercholestérolémie, hypertension traitée. Demande de prise en charge diététique pour perte de poids.",
    badPrompt: "Patient Pierre, 42 ans, 104 kg, 168 cm, hypercholestérolémie, tension artérielle traitée, bureau à Bruxelles. Régime ?",
    goodPrompt: "Homme 40-45 ans, obésité sévère (IMC ~37), sédentaire, dyslipidémie, HTA contrôlée. Propose une stratégie de rééquilibrage alimentaire durable pour une perte de poids progressive, intégrant les recommandations HAS sur l'obésité.",
    aiResponse: "Réduction de 500 kcal/jour par rapport aux apports habituels. Régime méditerranéen adapté. Augmentation des légumes et fibres. Réduction des graisses saturées et du sel (HTA). Activité physique progressive recommandée. Pas de régime restrictif sévère.",
    critique: [
      "L'IA propose une approche générique sans calcul des besoins réels",
      "Pas de mention du risque de reprise de poids si approche uniquement restrictive",
      "Absence d'évaluation des comorbidités sur le plan nutritionnel",
      "Aucune référence à l'approche motivationnelle ou à l'entretien motivationnel",
      "L'IA ne distingue pas court terme (motivation) et long terme (maintien)",
    ],
    finalPrompt: "Homme 40-45 ans, obésité classe II (IMC ~37), sédentaire, dyslipidémie, HTA traitée. Conçois une stratégie nutritionnelle selon recommandations HAS 2023 pour l'obésité : 1) calcul des apports actuels estimés et déficit cible raisonnable (-15-20 %), 2) plan alimentaire de type méditerranéen adapté aux comorbidités (sel < 5g/j, AGS < 10 %), 3) conseils de rééquilibrage comportemental (satié, plaisir), 4) objectifs de perte pondérale réalistes (0,5-1 kg/sem), 5) indicateurs de suivi. Approche globale, pas uniquement restrictive.",
  },
  {
    id: 5,
    title: "Insuffisance Rénale Chronique",
    icon: "💧",
    color: "indigo",
    situation: "Femme 70-75 ans, IRC stade 4 (DFG 22 ml/min), hyperkaliémie légère (5,3 mmol/L), protéinurie. Non dialysée. Prise en charge diététique préventive.",
    badPrompt: "Patiente Mme Renard, 72 ans, DFG 22, dossier rénal n°0842 hôpital Saint-Pierre. Régime potassium et protéines ?",
    goodPrompt: "Femme 70-75 ans, IRC stade 4 (DFG ~22 ml/min), hyperkaliémie modérée, non dialysée. Propose un cadre nutritionnel adapté avec restrictions en potassium, phosphore, sodium et ajustement protéique, selon les guidelines KDIGO.",
    aiResponse: "Limiter potassium : éviter banane, pomme de terre, légumineuses, chocolat. Limiter phosphore : éviter sodas, charcuterie, fromages fondus. Sel < 5g/j. Protéines : 0,8g/kg/j. Apports caloriques suffisants pour éviter le catabolisme.",
    critique: [
      "Pas de calcul individualisé des apports protéiques selon le poids réel",
      "L'IA liste des interdits sans proposer d'alternatives adaptées",
      "Absence de mention des techniques de lessivage des végétaux pour réduire le potassium",
      "Phosphore : pas de distinction entre phosphore organique (moins biodisponible) et additifs phosphatés",
      "Aucune mention du rapport protéines/énergie pour éviter la malnutrition",
    ],
    finalPrompt: "Femme 70-75 ans, IRC stade 4 (DFG ~22 ml/min), hyperkaliémie légère, non dialysée. Élabore un plan nutritionnel selon KDIGO : 1) cible protéique (0,6-0,8 g/kg/j selon progression), 2) potassium < 2 g/j avec techniques de lessivage et alternatives alimentaires, 3) phosphore < 800 mg/j avec distinction organiques/additifs, 4) sodium < 5 g/j, 5) apports caloriques suffisants (30-35 kcal/kg) pour prévenir la dénutrition. Inclure liste d'aliments autorisés et à limiter, pas uniquement les interdits.",
  },
  {
    id: 6,
    title: "TCA — Approche nutritionnelle",
    icon: "🌱",
    color: "teal",
    situation: "Adolescente 16-17 ans suivie en unité TCA, restriction alimentaire sévère, IMC 15,5. Phase de réalimentation encadrée par équipe pluridisciplinaire.",
    badPrompt: "Jeune fille anorexique 16 ans, 42 kg, 165 cm, refus de manger. Comment la faire manger ?",
    goodPrompt: "Adolescente 16-17 ans, restriction alimentaire sévère (IMC < 16), prise en charge TCA en équipe pluridisciplinaire. Propose les grandes lignes de l'approche nutritionnelle de réalimentation progressive selon les recommandations, sans objectifs caloriques brusques.",
    aiResponse: "Réintroduction progressive des aliments. Commencer par 1200-1500 kcal/j. Augmentation de 100-200 kcal/semaine. Repas en contexte thérapeutique encadré. Éviter les aliments phobiques en début de prise en charge. Surveillance électrolytes (risque de syndrome de renutrition).",
    critique: [
      "Proposer 1200 kcal comme point de départ peut être insuffisant ou inadapté sans évaluation préalable",
      "L'IA ne mentionne pas le syndrome de renutrition inappropriée (SRI) de manière suffisamment détaillée",
      "Absence de mention du rôle central de l'alliance thérapeutique",
      "Aucune référence à la supervision médicale obligatoire pour les cas sévères",
      "Pas de distinction entre prise en charge ambulatoire et hospitalière",
    ],
    finalPrompt: "Adolescente 16-17 ans, TCA restrictif (IMC < 16), phase de réalimentation en unité spécialisée. Décris l'approche nutritionnelle recommandée selon les guidelines NICE/HAS : 1) évaluation préalable avant tout objectif calorique, 2) protocole de réalimentation progressive et surveillance du syndrome de renutrition inappropriée (phosphore, magnésium, glycémie), 3) stratégie d'élargissement alimentaire progressive, 4) place de la diététique dans l'équipe pluridisciplinaire, 5) critères d'alerte nécessitant hospitalisation. Approche bienveillante, centrée sur le soin.",
  },
  {
    id: 7,
    title: "Cirrhose hépatique",
    icon: "🫀",
    color: "orange",
    situation: "Homme 55-60 ans, cirrhose hépatique Child-Pugh B, ascite modérée, sarcopénie documentée. Appétit diminué. Pas d'encéphalopathie active.",
    badPrompt: "Patient M. Gilles, cirrhose foie, ventre gonflé, mange peu, hôpital Saint-Luc. Régime ?",
    goodPrompt: "Homme 55-60 ans, cirrhose Child-Pugh B avec ascite, sarcopénie, appétit réduit, sans encéphalopathie active. Propose une stratégie nutritionnelle adaptée en tenant compte des contraintes hépatiques, de l'abstinence alcoolique totale et de la dénutrition.",
    aiResponse: "Régime pauvre en sel pour l'ascite. Limiter les protéines pour éviter l'encéphalopathie. Petit-déjeuner protéiné. Collation nocturne recommandée. Éviter l'alcool. Supplémentation en vitamines liposolubles.",
    critique: [
      "Restriction protéique déconseillée sauf encéphalopathie active : la sarcopénie aggrave le pronostic",
      "L'IA ne mentionne pas les apports caloriques cibles (35-40 kcal/kg/j recommandés en cirrhose)",
      "Pas de mention de la collation nocturne tardive (LES recommandée pour éviter le jeûne)",
      "L'abstinence alcoolique totale n'est pas suffisamment mise en avant comme priorité absolue",
      "Absence de référence aux recommandations ESPEN cirrhose 2019",
    ],
    finalPrompt: "Homme 55-60 ans, cirrhose Child-Pugh B, ascite, sarcopénie, sans encéphalopathie. Élabore un plan nutritionnel selon ESPEN 2019 : 1) abstinence alcoolique totale et définitive — priorité absolue de la prise en charge, 2) apports caloriques cibles (35-40 kcal/kg/j, poids sec), 3) protéines non restreintes (1,2-1,5 g/kg/j) sauf encéphalopathie réfractaire, 4) fractionnement en 4-6 prises incluant collation nocturne tardive riche en glucides complexes, 5) supplémentation en vitamines liposolubles (A, D, E, K) et zinc. Mentionner les signes d'alerte justifiant une réévaluation médicale urgente.",
  },
  {
    id: 8,
    title: "Phénylcétonurie — enfant",
    icon: "🧬",
    color: "emerald",
    situation: "Enfant 7-8 ans, phénylcétonurie classique (PKU) diagnostiquée à la naissance, traité par régime hypoprotéiné strict depuis la naissance. Taux de phénylalanine récemment élevé (> 600 µmol/L). Croissance normale.",
    badPrompt: "Petit Thomas, 8 ans, PKU, hôpital universitaire. Taux de phénylalanine trop haut. Que lui donner ?",
    goodPrompt: "Enfant 7-8 ans, phénylcétonurie classique, régime hypoprotéiné strict depuis la naissance, phénylalanine récemment > 600 µmol/L. Propose des pistes pour optimiser le régime et améliorer l'adhésion, sans données nominatives.",
    aiResponse: "Éviter viande, poisson, œufs, lait, légumineuses. Utiliser substituts protéiques sans phénylalanine. Aliments spéciaux PKU (pâtes, pain, substituts). Surveiller la phénylalanine régulièrement. Enrichir en tyrosine.",
    critique: [
      "Pas de calcul de la tolérance individuelle en phénylalanine (mg/j selon l'âge et le type de PKU)",
      "Absence de distinction entre les aliments 'libres' (< 50 mg Phe/100g) et les aliments à limiter",
      "L'IA ne mentionne pas l'importance des substituts protéiques pour couvrir les besoins en AAE",
      "Pas de mention du suivi neuropsychologique lié à l'équilibre métabolique",
      "Aucune référence aux recommandations européennes PKU (ESPKU/ACMG)",
    ],
    finalPrompt: "Enfant 7-8 ans, PKU classique, phénylalanine > 600 µmol/L malgré régime. Propose une stratégie d'optimisation selon recommandations ESPKU : 1) réévaluation de la tolérance journalière en Phe (mg/j selon poids et stade de la maladie), 2) classification pratique des aliments (libres / à peser / interdits), 3) optimisation de la compliance au substitut protéique (timing, palatabilité), 4) apports caloriques et micronutritionnels suffisants pour la croissance (Ca, vitamine D, B12, fer), 5) stratégies d'amélioration de l'adhésion chez l'enfant scolarisé. Approche familiale et multidisciplinaire.",
  },
  {
    id: 9,
    title: "Diabète de type 1",
    icon: "💉",
    color: "sky",
    situation: "Adolescent 14-15 ans, diabète de type 1 depuis 3 ans, sous pompe à insuline. Glycémie variable, hypoglycémies fréquentes à l'effort. Pratique du sport 3x/semaine.",
    badPrompt: "Ado Lucas, 15 ans, DT1 depuis 2021, pompe insuline, fait du foot 3 fois par semaine, souvent en hypo après match. Que faire ?",
    goodPrompt: "Adolescent 14-15 ans, diabète de type 1 sous pompe à insuline, hypoglycémies récurrentes à l'effort physique intense, actif sportif 3x/semaine. Propose des recommandations nutritionnelles pour gérer la glycémie péri-effort.",
    aiResponse: "Manger des glucides avant l'effort. Emporter du sucre pendant le sport. Réduire l'insuline basale avant l'activité. Surveiller la glycémie avant, pendant et après. Collation après l'effort pour éviter l'hypoglycémie nocturne.",
    critique: [
      "Pas de quantification des glucides péri-effort (g de glucides selon durée et intensité de l'activité)",
      "L'IA ne distingue pas les sports d'endurance et les sports anaérobies (réponse glycémique différente)",
      "Absence de mention de l'hypoglycémie retardée nocturne post-effort et sa gestion spécifique",
      "Pas de référence à l'index glycémique des glucides de correction",
      "Aucune mention du rôle du glucagon d'urgence ni des seuils de sécurité avant activité",
    ],
    finalPrompt: "Adolescent 14-15 ans, DT1 sous pompe, hypoglycémies péri-effort récurrentes, sport 3x/semaine (foot : anaérobie/aérobie mixte). Propose une stratégie nutritionnelle péri-sportive selon recommandations ISPAD/ADA : 1) glycémie cible avant effort (> 7 mmol/L) et conduite à tenir si < 5 mmol/L, 2) apports glucidiques péri-effort adaptés (g/h selon intensité), 3) gestion du risque d'hypoglycémie nocturne post-effort (collation HS adaptée), 4) types de glucides recommandés (IG adapté selon phase), 5) adaptation du débit basal de la pompe en contexte sportif. Approche pratique pour l'adolescent et sa famille.",
  },
];

const colorMap = {
  amber: { badge: "bg-amber-100 text-amber-700 border-amber-200", header: "bg-amber-50 border-amber-200", dot: "bg-amber-500" },
  blue: { badge: "bg-blue-100 text-blue-700 border-blue-200", header: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  rose: { badge: "bg-rose-100 text-rose-700 border-rose-200", header: "bg-rose-50 border-rose-200", dot: "bg-rose-500" },
  violet: { badge: "bg-violet-100 text-violet-700 border-violet-200", header: "bg-violet-50 border-violet-200", dot: "bg-violet-500" },
  indigo: { badge: "bg-indigo-100 text-indigo-700 border-indigo-200", header: "bg-indigo-50 border-indigo-200", dot: "bg-indigo-500" },
  teal: { badge: "bg-teal-100 text-teal-700 border-teal-200", header: "bg-teal-50 border-teal-200", dot: "bg-teal-500" },
  orange: { badge: "bg-orange-100 text-orange-700 border-orange-200", header: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
  emerald: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", header: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  sky: { badge: "bg-sky-100 text-sky-700 border-sky-200", header: "bg-sky-50 border-sky-200", dot: "bg-sky-500" },
};

function CaseCard({ cas }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[cas.color];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cas.icon}</span>
          <div>
            <h3 className="font-semibold text-slate-900">{cas.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cas.situation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-medium border ${c.badge}`}>
            {open ? "Fermer" : "Voir l'analyse"}
          </span>
          {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          {/* Table */}
          <div className="grid grid-cols-1 divide-y divide-slate-100">
            {/* Situation */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Situation clinique</span>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-slate-700 bg-slate-50 rounded-xl px-4 py-3 leading-relaxed">{cas.situation}</p>
              </div>
            </div>

            {/* Bad Prompt */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wide flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Mauvais prompt
                </span>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3 leading-relaxed border border-red-100">{cas.badPrompt}</p>
              </div>
            </div>

            {/* Good Prompt */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Prompt anonymisé
                </span>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-3 leading-relaxed border border-emerald-100">{cas.goodPrompt}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Réponse IA brute
                </span>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-blue-900 bg-blue-50 rounded-xl px-4 py-3 leading-relaxed border border-blue-100">{cas.aiResponse}</p>
              </div>
            </div>

            {/* Critique */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Critique diététique
                </span>
              </div>
              <div className="md:col-span-3">
                <ul className="space-y-2">
                  {cas.critique.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 rounded-xl px-4 py-2.5 border border-amber-100">
                      <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Final Prompt */}
            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-4 gap-3 items-start bg-slate-50">
              <div className="md:col-span-1">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  ✨ Version finale pro
                </span>
              </div>
              <div className="md:col-span-3">
                <div className="bg-white rounded-xl px-4 py-4 border-2 border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-800 leading-relaxed">{cas.finalPrompt}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(cas.finalPrompt)}
                    className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    Copier ce prompt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClinicalCases() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Cas cliniques — Analyse complète</h2>
        <p className="text-slate-500 mt-1 text-sm">Pour chaque cas : situation · mauvais prompt · version anonymisée · réponse IA · critique · version finale</p>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900">{cases.length}</div>
          <div className="text-xs text-slate-500 mt-0.5">Cas cliniques</div>
        </div>
        <div className="text-center border-x border-slate-100">
          <div className="text-2xl font-bold text-red-500">9</div>
          <div className="text-xs text-slate-500 mt-0.5">Spécialités</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-500">30+</div>
          <div className="text-xs text-slate-500 mt-0.5">Points critiques</div>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((cas) => (
          <CaseCard key={cas.id} cas={cas} />
        ))}
      </div>
    </div>
  );
}
