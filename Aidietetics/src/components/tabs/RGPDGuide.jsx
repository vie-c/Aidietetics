import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, FileText, Users, Lock, Eye, Trash2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const articles = [
  {
    id: "art9",
    icon: "⚖️",
    color: "red",
    title: "Article 9 — Données de santé",
    badge: "Catégorie spéciale",
    summary: "Les données de santé sont des données sensibles nécessitant une protection renforcée. Leur traitement est en principe interdit, sauf exceptions.",
    content: [
      {
        subtitle: "Qu'est-ce qu'une donnée de santé ?",
        text: "Toute information relative à l'état de santé physique ou mentale d'une personne : diagnostic, pathologie, traitement, résultats d'analyses, dossier médical, poids, taille dans un contexte médical, allergies, handicap.",
      },
      {
        subtitle: "Exceptions autorisant le traitement",
        list: [
          "Consentement explicite de la personne concernée",
          "Nécessité pour des soins médicaux ou la prise en charge du patient",
          "Intérêt public dans le domaine de la santé publique",
          "Finalités de recherche scientifique ou statistique",
          "Obligations légales ou exercice d'une mission d'intérêt public",
        ],
      },
      {
        subtitle: "Application diététique",
        text: "Un dossier patient diététique contient des données de santé au sens de l'article 9. Il ne peut en aucun cas être transmis à un outil IA grand public sans anonymisation préalable.",
      },
    ],
  },
  {
    id: "bases",
    icon: "📋",
    color: "blue",
    title: "Bases légales du traitement",
    badge: "Art. 6 RGPD",
    summary: "Tout traitement de données personnelles doit reposer sur une base légale. En santé, plusieurs bases peuvent s'appliquer selon le contexte.",
    content: [
      {
        subtitle: "Les 6 bases légales (Art. 6)",
        list: [
          "Consentement — la personne a donné son accord explicite",
          "Contrat — nécessaire à l'exécution d'un contrat avec la personne",
          "Obligation légale — imposé par la loi",
          "Sauvegarde des intérêts vitaux — urgence médicale",
          "Mission d'intérêt public — soins dans un établissement public",
          "Intérêts légitimes — uniquement hors données sensibles",
        ],
      },
      {
        subtitle: "En pratique pour le diététicien",
        text: "La base légale principale est la prise en charge médicale (Art. 6.1.c ou d + Art. 9.2.h). Le consentement du patient est requis pour tout usage au-delà du soin direct, notamment pour la formation ou la recherche.",
      },
    ],
  },
  {
    id: "droits",
    icon: "👤",
    color: "violet",
    title: "Droits des patients",
    badge: "Art. 12–22 RGPD",
    summary: "Chaque patient bénéficie de droits étendus sur ses données personnelles, que le professionnel de santé doit respecter et faciliter.",
    content: [
      {
        subtitle: "Droits fondamentaux",
        list: [
          "Droit d'accès — consulter les données détenues (Art. 15)",
          "Droit de rectification — corriger des données inexactes (Art. 16)",
          "Droit à l'effacement — \"droit à l'oubli\" sous conditions (Art. 17)",
          "Droit à la limitation — restreindre temporairement le traitement (Art. 18)",
          "Droit à la portabilité — recevoir ses données dans un format lisible (Art. 20)",
          "Droit d'opposition — s'opposer au traitement (Art. 21)",
          "Droit à l'information — être informé de l'usage de ses données (Art. 13-14)",
        ],
      },
      {
        subtitle: "Délais de réponse obligatoires",
        text: "Le responsable du traitement doit répondre à toute demande dans un délai d'1 mois (extensible à 3 mois pour les demandes complexes). En cas de refus, la motivation doit être communiquée.",
      },
    ],
  },
  {
    id: "ia",
    icon: "🤖",
    color: "amber",
    title: "IA & Données de santé — Règles clés",
    badge: "Usage IA",
    summary: "L'utilisation d'outils IA (ChatGPT, Gemini, Copilot...) avec des données patients pose des risques RGPD spécifiques que tout professionnel doit connaître.",
    content: [
      {
        subtitle: "Pourquoi l'IA pose problème",
        list: [
          "Les données envoyées peuvent être utilisées pour entraîner les modèles",
          "Les serveurs sont souvent situés hors UE (transfert international de données)",
          "Aucune garantie de confidentialité des échanges dans les versions grand public",
          "Pas de contrat de sous-traitance (DPA) avec les outils gratuits",
          "Risque de ré-identification à partir de données partielles",
        ],
      },
      {
        subtitle: "Outils IA autorisés en santé",
        list: [
          "Outils certifiés HDS (Hébergeur de Données de Santé) en France/Belgique",
          "Solutions avec DPA (Data Processing Agreement) signé",
          "Déploiements locaux ou on-premise sans envoi vers serveurs externes",
          "Outils ayant obtenu le marquage CE dispositif médical si applicable",
        ],
      },
      {
        subtitle: "Règle d'or",
        text: "Si vous ne pouvez pas signer un contrat de traitement de données avec l'outil IA, n'envoyez JAMAIS de données identifiables. L'anonymisation n'est pas optionnelle — c'est une obligation légale.",
      },
    ],
  },
  {
    id: "dpo",
    icon: "🏛️",
    color: "emerald",
    title: "Obligations institutionnelles",
    badge: "Hôpitaux & Cliniques",
    summary: "Les établissements de santé ont des obligations spécifiques en matière de RGPD, au-delà des pratiques individuelles des soignants.",
    content: [
      {
        subtitle: "Obligations des établissements",
        list: [
          "Désignation d'un DPO (Délégué à la Protection des Données) obligatoire",
          "Tenue d'un registre des activités de traitement (Art. 30)",
          "Analyse d'impact (DPIA) pour les traitements à risque élevé",
          "Notification des violations de données à l'autorité (72h) — Art. 33",
          "Formation régulière du personnel sur la protection des données",
          "Hébergement des données de santé sur serveurs certifiés HDS",
        ],
      },
      {
        subtitle: "Responsabilité du soignant",
        text: "Même si l'établissement est responsable de traitement, chaque professionnel de santé engage sa responsabilité personnelle en cas de violation intentionnelle ou par négligence des règles RGPD.",
      },
    ],
  },
  {
    id: "sanctions",
    icon: "⚠️",
    color: "rose",
    title: "Sanctions & Risques",
    badge: "Non-conformité",
    summary: "Les violations du RGPD peuvent entraîner des sanctions administratives lourdes, ainsi que des poursuites civiles et pénales.",
    content: [
      {
        subtitle: "Sanctions administratives (CNIL / APD)",
        list: [
          "Avertissement ou mise en demeure",
          "Amendes jusqu'à 20 millions € ou 4 % du CA mondial",
          "Interdiction temporaire de traitement",
          "Publication des décisions (effet réputationnel)",
        ],
      },
      {
        subtitle: "Sanctions pénales (Code pénal belge/français)",
        list: [
          "Divulgation de données médicales : jusqu'à 1 an de prison + amende",
          "Accès frauduleux à un système informatique médical : 2 ans",
          "Violation du secret professionnel : sanctions disciplinaires ordinales",
        ],
      },
      {
        subtitle: "Cas concrets d'amendes en santé",
        list: [
          "Hôpital portugais : 400 000 € pour accès non autorisé aux dossiers patients",
          "Clinique roumaine : 150 000 € pour défaut de sécurisation",
          "Pharmacie française : 250 000 € pour données partagées sans base légale",
        ],
      },
    ],
  },
];

const colorMap = {
  red: { badge: "bg-red-100 text-red-700 border-red-200", header: "border-l-red-500", icon: "bg-red-100 text-red-600", dot: "bg-red-500" },
  blue: { badge: "bg-blue-100 text-blue-700 border-blue-200", header: "border-l-blue-500", icon: "bg-blue-100 text-blue-600", dot: "bg-blue-500" },
  violet: { badge: "bg-violet-100 text-violet-700 border-violet-200", header: "border-l-violet-500", icon: "bg-violet-100 text-violet-600", dot: "bg-violet-500" },
  amber: { badge: "bg-amber-100 text-amber-700 border-amber-200", header: "border-l-amber-500", icon: "bg-amber-100 text-amber-600", dot: "bg-amber-500" },
  emerald: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", header: "border-l-emerald-500", icon: "bg-emerald-100 text-emerald-600", dot: "bg-emerald-500" },
  rose: { badge: "bg-rose-100 text-rose-700 border-rose-200", header: "border-l-rose-500", icon: "bg-rose-100 text-rose-600", dot: "bg-rose-500" },
};

function ArticleCard({ article }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[article.color];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden border-l-4 ${c.header}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${c.icon}`}>
            {article.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-900 text-sm">{article.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${c.badge}`}>{article.badge}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-xl">{article.summary}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-6 py-5 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-3">{article.summary}</p>
          {article.content.map((block, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-slate-800 mb-2">{block.subtitle}</h4>
              {block.text && (
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl px-4 py-3">{block.text}</p>
              )}
              {block.list && (
                <ul className="space-y-1.5">
                  {block.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.dot}`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const quickRules = [
  { icon: <Lock className="w-4 h-4" />, color: "bg-red-100 text-red-600", text: "Ne jamais envoyer nom, prénom ou numéro de dossier à un outil IA" },
  { icon: <Eye className="w-4 h-4" />, color: "bg-amber-100 text-amber-600", text: "Anonymiser systématiquement avant toute requête IA" },
  { icon: <FileText className="w-4 h-4" />, color: "bg-blue-100 text-blue-600", text: "Vérifier que l'outil IA dispose d'un DPA signé" },
  { icon: <Users className="w-4 h-4" />, color: "bg-violet-100 text-violet-600", text: "Informer le patient si ses données servent à autre chose que son soin" },
  { icon: <Trash2 className="w-4 h-4" />, color: "bg-emerald-100 text-emerald-600", text: "Limiter la conservation des données au strict nécessaire" },
  { icon: <ShieldCheck className="w-4 h-4" />, color: "bg-slate-100 text-slate-600", text: "En cas de doute, consulter le DPO de l'établissement" },
];

export default function RGPDGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Guide RGPD — Données de santé & IA</h2>
        <p className="text-slate-500 mt-1 text-sm">Bases légales, droits des patients, obligations et risques pour les professionnels de santé</p>
      </div>

      {/* Quick rules */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800">6 règles d'or RGPD en pratique</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickRules.map((rule, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${rule.color}`}>
                {rule.icon}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Amende max", value: "20M €", sub: "ou 4% CA mondial", color: "text-red-600" },
          { label: "Délai réponse", value: "1 mois", sub: "aux demandes patients", color: "text-blue-600" },
          { label: "Notification violation", value: "72h", sub: "pour alerter l'autorité", color: "text-amber-600" },
          { label: "Données santé", value: "Art. 9", sub: "catégorie spéciale RGPD", color: "text-violet-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Articles */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Fiches détaillées — cliquez pour développer</h3>
        <div className="space-y-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">Avertissement</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ce guide est à visée pédagogique et ne constitue pas un avis juridique.
              En cas de doute sur une situation spécifique, consultez le DPO de votre établissement
              ou l'Autorité de Protection des Données (APD en Belgique, CNIL en France).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
