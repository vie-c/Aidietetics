import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Stethoscope, Pill, FlaskConical, MapPin, Utensils, ArrowRight, Info, ShieldAlert } from "lucide-react";

const patientFields = [
  { key: "name", icon: User, label: "Name", value: "John Smith", type: "identifying", explanation: "Directly identifies the patient. Never needed for an AI task — the AI does not need to know who the person is.", necessary: false },
  { key: "dob", icon: Calendar, label: "Date of Birth", value: "14/03/1959", type: "identifying", explanation: "Combined with other details, this can re-identify a patient. Use an approximate age range instead.", necessary: false },
  { key: "address", icon: MapPin, label: "Address", value: "42 Oak Street, Springfield", type: "identifying", explanation: "Directly identifies and locates the patient. Completely irrelevant to any AI nutrition task.", necessary: false },
  { key: "diagnosis", icon: Stethoscope, label: "Diagnosis", value: "Type 2 diabetes, CKD stage 3", type: "health", explanation: "Health data is specially protected under GDPR Article 9. This may be relevant to the AI task, but should be generalised if possible.", necessary: true },
  { key: "medication", icon: Pill, label: "Medication", value: "Metformin, Lisinopril", type: "health", explanation: "Health data. May be relevant depending on the task, but consider whether the AI truly needs specific drug names.", necessary: "maybe" },
  { key: "labs", icon: FlaskConical, label: "Laboratory Values", value: "HbA1c 8.5%, eGFR 22", type: "health", explanation: "Health data. Relevant for clinical nutrition tasks, but remove any patient identifiers before sending.", necessary: true },
  { key: "diet", icon: Utensils, label: "Dietary Information", value: "Low intake, skips breakfast", type: "health", explanation: "Health-related data. Often the core of what the AI needs — but share it without identifying details.", necessary: true },
];

const dataTypes = [
  { title: "What is personal data?", body: "Any information relating to an identified or identifiable person: name, address, date of birth, photos, identification numbers. Under GDPR, this data must be processed lawfully and protected." },
  { title: "What is health data?", body: "A special category under GDPR Article 9: diagnoses, medications, lab results, dietary information related to a condition, treatment history. Health data requires explicit consent or a specific legal basis for processing." },
  { title: "Why does this matter?", body: "Healthcare professionals have legal and professional responsibilities concerning patient privacy. Protecting patient data is not only a legal requirement — it is part of professional responsibility." },
];

export default function GdprSection({ onNext }) {
  const [selectedField, setSelectedField] = useState(null);
  const [activeBlock, setActiveBlock] = useState(0);

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-2"
        >
          GDPR
        </motion.h2>
        <p className="text-stone-500 text-center mb-12 text-sm max-w-xl mx-auto">
          Before using AI with patient-related information, understand what you are protecting.
        </p>

        {/* Learning blocks */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {dataTypes.map((block, i) => (
            <button
              key={i}
              onClick={() => setActiveBlock(i)}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                activeBlock === i ? "border-[#93C572] bg-[#F1F7EB] shadow-sm" : "border-stone-100 bg-white hover:border-stone-200"
              }`}
            >
              <h3 className="font-semibold text-sm text-stone-900 mb-1">{block.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{block.body}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeBlock}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#F1F7EB] border border-[#C5DDAF] rounded-2xl p-6 mb-10"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#93C572] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">{dataTypes[activeBlock].title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{dataTypes[activeBlock].body}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive patient record */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-emerald-800 px-6 py-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-300" />
            <h3 className="text-white font-semibold text-sm">Interactive Patient Record</h3>
            <span className="text-xs text-emerald-200 ml-auto">Click each field to explore</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Record fields */}
            <div className="p-6 border-r border-stone-100">
              <div className="space-y-2">
                {patientFields.map((field, i) => {
                  const isSelected = selectedField === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedField(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? field.type === "identifying"
                            ? "border-rose-300 bg-rose-50"
                            : "border-amber-300 bg-amber-50"
                          : "border-stone-100 hover:border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        field.type === "identifying" ? "bg-rose-100" : "bg-amber-100"
                      }`}>
                        <field.icon className={`w-4 h-4 ${field.type === "identifying" ? "text-rose-500" : "text-amber-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">{field.label}</span>
                          {field.type === "identifying" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600 font-medium">IDENTIFYING</span>
                          )}
                          {field.type === "health" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600 font-medium">HEALTH DATA</span>
                          )}
                        </div>
                        <p className="text-sm text-stone-700 truncate font-mono">{field.value}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div className="p-6 bg-stone-50 min-h-[300px]">
              <AnimatePresence mode="wait">
                {selectedField !== null ? (
                  <motion.div
                    key={selectedField}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">What is this?</p>
                        <p className="text-sm text-stone-700">
                          <strong>{patientFields[selectedField].label}</strong>: {patientFields[selectedField].value}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Why could it matter?</p>
                        <p className="text-sm text-stone-600 leading-relaxed">{patientFields[selectedField].explanation}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Would this be necessary for the AI task?</p>
                        {patientFields[selectedField].necessary === false ? (
                          <div className="flex items-center gap-2 text-sm text-rose-600 font-medium bg-rose-50 px-3 py-2 rounded-lg">
                            <ShieldAlert className="w-4 h-4" /> No — remove it before sending.
                          </div>
                        ) : patientFields[selectedField].necessary === "maybe" ? (
                          <div className="flex items-center gap-2 text-sm text-amber-600 font-medium bg-amber-50 px-3 py-2 rounded-lg">
                            <Info className="w-4 h-4" /> Maybe — only if directly relevant.
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg">
                            <Info className="w-4 h-4" /> Possibly — but anonymise first.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                      <Info className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-sm text-stone-400">Click on any field to see what it reveals</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <p className="text-stone-800 text-lg font-semibold max-w-2xl mx-auto leading-snug">
            Protecting patient data is not only a legal requirement. It is part of professional responsibility.
          </p>
          <p className="text-stone-500 text-xs mt-3">This is an educational tool and does not constitute legal advice. Consult your DPO for specific situations.</p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#93C572] text-white rounded-full text-sm font-semibold hover:bg-[#7FB05E] transition-all group"
          >
            Build a prompt
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
