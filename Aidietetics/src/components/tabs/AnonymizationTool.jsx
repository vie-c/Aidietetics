import React, { useState } from "react";
import { Check, Lock, Unlock } from "lucide-react";

const examples = [
  {
    bad: "Femme 82 ans CHU Brugmann, cancer du pancréas",
    good: "Femme 80+ ans, cancer du pancréas, dénutrition sévère",
  },
  {
    bad: "Patient Mr X, diabétique, Charleroi",
    good: "Homme 50-60 ans, diabète de type 2",
  },
  {
    bad: "Mme Dupont, 67 ans, IRC stade 3, Liège",
    good: "Femme 65-70 ans, insuffisance rénale chronique stade 3",
  },
  {
    bad: "Enfant Lucas, 8 ans, allergie arachides, école St-Michel",
    good: "Enfant 8 ans, allergie aux arachides",
  },
  {
    bad: "M. Bernard, dossier 4821, gastrectomie totale 12/03/2024",
    good: "Homme 60+ ans, post-gastrectomie totale récente",
  },
];

const checklistItems = [
  { key: "age", label: "Âge arrondi (par décennie ou tranche)" },
  { key: "lieu", label: "Lieu supprimé (hôpital, ville, école...)" },
  { key: "date", label: "Date supprimée ou floue (\"récente\", \"passée\")" },
  { key: "nom", label: "Nom / prénom supprimé" },
  { key: "patho", label: "Maladie rare généralisée" },
];

export default function AnonymizationTool() {
  const [checked, setChecked] = useState({});
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const score = Object.values(checked).filter(Boolean).length;
  const allChecked = score === checklistItems.length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Anonymisation intelligente</h2>
        <p className="text-slate-500 mt-1 text-sm">Transformez vos prompts pour les rendre conformes RGPD avant envoi à l'IA</p>
      </div>

      {/* Before / After Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <h3 className="font-semibold text-slate-800">Exemples : Avant → Après anonymisation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">
                  <span className="flex items-center gap-1.5"><Unlock className="w-3.5 h-3.5 text-red-400" /> Mauvais prompt</span>
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">
                  <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-500" /> Prompt anonymisé ✓</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {examples.map((ex, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 align-top">
                    <span className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg inline-block leading-relaxed border border-red-100">
                      {ex.bad}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="text-sm text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg inline-block leading-relaxed border border-emerald-100">
                      {ex.good}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Checklist d'anonymisation</h3>
          <p className="text-xs text-slate-400 mb-4">Cochez chaque étape réalisée</p>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                  checked[item.key] ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-150 hover:border-slate-200"
                }`}
                onClick={() => toggle(item.key)}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checked[item.key] ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"
                }`}>
                  {checked[item.key] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm text-slate-700">{item.label}</span>
              </label>
            ))}
          </div>

          {/* Score */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Score d'anonymisation</span>
              <span className="text-sm font-bold text-slate-700">{score}/{checklistItems.length}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  score === checklistItems.length ? "bg-emerald-500" : score >= 3 ? "bg-amber-500" : "bg-red-400"
                }`}
                style={{ width: `${(score / checklistItems.length) * 100}%` }}
              />
            </div>
            {allChecked && (
              <div className="mt-3 flex items-center gap-2 bg-emerald-100 rounded-xl px-4 py-3">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">✅ Prompt sécurisé — prêt à utiliser</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
