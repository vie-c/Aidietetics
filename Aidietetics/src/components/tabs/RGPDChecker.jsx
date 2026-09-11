import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, ChevronDown } from "lucide-react";

const requestTypes = [
  "Administratif",
  "Éducation patient",
  "Calcul nutritionnel",
  "Analyse dossier patient",
  "Création menu",
  "Autre",
];

const sensitiveFields = [
  { key: "nom", label: "Nom / Prénom", type: "identifiable" },
  { key: "ddn", label: "Date de naissance", type: "identifiable" },
  { key: "hopital", label: "Hôpital / Ville", type: "modifiable" },
  { key: "patho", label: "Pathologie rare", type: "identifiable" },
  { key: "dossier", label: "Numéro de dossier", type: "identifiable" },
  { key: "photo", label: "Photo / Document médical", type: "identifiable" },
];

export default function RGPDChecker() {
  const [requestType, setRequestType] = useState("");
  const [data, setData] = useState({});

  const toggle = (key) => setData((prev) => ({ ...prev, [key]: !prev[key] }));

  const checkedFields = sensitiveFields.filter((f) => data[f.key]);
  const identifiable = checkedFields.filter((f) => f.type === "identifiable");
  const modifiable = checkedFields.filter((f) => f.type === "modifiable");

  let verdict = null;
  if (requestType) {
    if (checkedFields.length === 0) verdict = "green";
    else if (identifiable.length === 0 && modifiable.length > 0) verdict = "orange";
    else if (identifiable.length > 0) verdict = "red";
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Puis-je utiliser l'IA ?</h2>
        <p className="text-slate-500 mt-1 text-sm">Vérification rapide RGPD avant d'envoyer une requête à un outil IA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section A */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">A</span>
            <h3 className="font-semibold text-slate-800">Type de demande</h3>
          </div>
          <div className="relative">
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">-- Choisir un type --</option>
              {requestTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Section B */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">B</span>
            <h3 className="font-semibold text-slate-800">Données sensibles présentes ?</h3>
          </div>
          <div className="space-y-2.5">
            {sensitiveFields.map((field) => (
              <label
                key={field.key}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  data[field.key]
                    ? field.type === "identifiable"
                      ? "bg-red-50 border-red-200"
                      : "bg-orange-50 border-orange-200"
                    : "bg-slate-50 border-slate-150 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      data[field.key]
                        ? field.type === "identifiable"
                          ? "bg-red-500 border-red-500"
                          : "bg-orange-500 border-orange-500"
                        : "bg-white border-slate-300"
                    }`}
                    onClick={() => toggle(field.key)}
                  >
                    {data[field.key] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{field.label}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  field.type === "identifiable" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                }`}>
                  {field.type === "identifiable" ? "Identifiable" : "Modifiable"}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section C — Verdict */}
      {verdict && (
        <div className={`rounded-2xl p-6 border-2 shadow-sm transition-all ${
          verdict === "green"
            ? "bg-emerald-50 border-emerald-200"
            : verdict === "orange"
            ? "bg-amber-50 border-amber-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              verdict === "green" ? "bg-emerald-500" : verdict === "orange" ? "bg-amber-500" : "bg-red-500"
            }`}>
              {verdict === "green" && <ShieldCheck className="w-6 h-6 text-white" />}
              {verdict === "orange" && <ShieldAlert className="w-6 h-6 text-white" />}
              {verdict === "red" && <ShieldX className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-lg font-bold ${
                  verdict === "green" ? "text-emerald-700" : verdict === "orange" ? "text-amber-700" : "text-red-700"
                }`}>
                  {verdict === "green" && "✅ Utilisation IA autorisée"}
                  {verdict === "orange" && "⚠️ Anonymisation requise"}
                  {verdict === "red" && "🚫 Ne pas utiliser l'IA"}
                </span>
              </div>
              <p className={`text-sm font-medium mb-3 ${
                verdict === "green" ? "text-emerald-600" : verdict === "orange" ? "text-amber-600" : "text-red-600"
              }`}>
                {verdict === "green" && `Aucune donnée personnelle détectée pour une demande "${requestType}". Vous pouvez utiliser l'IA sans restrictions RGPD.`}
                {verdict === "orange" && `Données modifiables détectées. Anonymisez avant d'envoyer à l'IA.`}
                {verdict === "red" && `Données directement identifiables présentes. Cette requête ne doit pas être envoyée à un outil IA.`}
              </p>
              {(verdict === "orange" || verdict === "red") && (
                <div className={`rounded-xl p-4 ${verdict === "orange" ? "bg-amber-100" : "bg-red-100"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${verdict === "orange" ? "text-amber-700" : "text-red-700"}`}>
                    💡 Message de correction suggéré
                  </p>
                  <p className={`text-sm ${verdict === "orange" ? "text-amber-800" : "text-red-800"}`}>
                    Reformule avec un <strong>âge approximatif</strong>, <strong>sans lieu ni nom</strong>.
                    {identifiable.some(f => f.key === "patho") && " Généralise la pathologie si rare."}
                    {identifiable.some(f => f.key === "dossier") && " Supprime tout numéro de dossier."}
                    {identifiable.some(f => f.key === "photo") && " Ne joint aucun document ou image."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!verdict && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">Sélectionnez un type de demande pour obtenir votre verdict RGPD</p>
        </div>
      )}
    </div>
  );
}
