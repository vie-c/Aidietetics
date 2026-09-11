import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, ShieldAlert, Check, RefreshCw, Info } from "lucide-react";
import TypingText from "./TypingText";

const promptSegments = [
  { text: "I have a ", risk: null },
  { text: "67-year-old", risk: "age", label: "Age", type: "identifying", feedback: "Exact age can contribute to re-identification. Use an age range like '65–70 years' instead." },
  { text: " patient named ", risk: null },
  { text: "John Smith", risk: "name", label: "Name", type: "identifying", feedback: "Directly identifies the patient. The AI never needs a name. Remove it entirely." },
  { text: ", born on ", risk: null },
  { text: "14/03/1959", risk: "dob", label: "Date of Birth", type: "identifying", feedback: "Exact date of birth combined with other details can re-identify a patient. Use an approximate age range." },
  { text: ". He lives at ", risk: null },
  { text: "42 Oak Street, Springfield", risk: "address", label: "Address", type: "identifying", feedback: "Directly identifies and locates the patient. Completely irrelevant to any AI nutrition task." },
  { text: ". He has ", risk: null },
  { text: "type 2 diabetes, chronic kidney disease and hypertension", risk: "diagnosis", label: "Health Information", type: "health", feedback: "This is health data under GDPR Article 9. It may be relevant to the task, but must be shared without any identifying details." },
  { text: ". He takes ", risk: null },
  { text: "metformin and lisinopril", risk: "medication", label: "Medication", type: "health", feedback: "Medication details are health data. Consider whether the AI needs specific drug names or if the condition is enough." },
  { text: ". His recent blood results are ", risk: null },
  { text: "HbA1c 8.5% and eGFR 22", risk: "labs", label: "Laboratory Information", type: "health", feedback: "Lab values are health data. Relevant for clinical tasks, but must be anonymised — no patient identifiers alongside them." },
  { text: ". Can you create a personalised nutrition plan for him?", risk: null },
];

const totalRisks = promptSegments.filter((s) => s.risk).length;

const saferPrompt = "I have a patient aged 65–70 with type 2 diabetes (HbA1c 8.5%), chronic kidney disease (eGFR 22) and hypertension. Can you create a personalised nutrition plan following current clinical guidelines, structured as a 5-day table with meals, portions, and a brief rationale for each choice?";

export default function SpotRisk({ onNext }) {
  const [phase, setPhase] = useState(0); // 0: typing, 1: spotting, 2: results, 3: safer
  const [found, setFound] = useState([]);
  const [typingDone, setTypingDone] = useState(false);

  const handleSegmentClick = (i) => {
    const seg = promptSegments[i];
    if (!seg.risk || found.includes(i)) return;
    setFound((prev) => [...prev, i]);
  };

  const allFound = found.length === totalRisks;

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-2"
        >
          SPOT THE RISK
        </motion.h2>
        <p className="text-stone-500 text-center mb-12 text-sm">Would you send this prompt to an AI tool?</p>

        {/* Phase 0-1: Typing + Spotting */}
        {(phase === 0 || phase === 1) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg shadow-stone-200/50 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="text-xs text-stone-500 ml-2">AI Chat Interface</span>
              </div>
              <div className="font-mono text-sm leading-relaxed">
                {phase === 0 && !typingDone ? (
                  <TypingText
                    text={promptSegments.map((s) => s.text).join("")}
                    speed={35}
                    onComplete={() => {
                      setTypingDone(true);
                      setPhase(1);
                    }}
                  />
                ) : (
                  <div className="flex flex-wrap gap-y-1">
                    {promptSegments.map((seg, i) => {
                      const isFound = found.includes(i);
                      const isRisk = seg.risk;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSegmentClick(i)}
                          disabled={!isRisk || isFound || phase === 0}
                          className={`transition-all rounded px-1 ${
                            isFound
                              ? seg.type === "identifying"
                                ? "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
                                : "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                              : isRisk && phase === 1
                              ? "hover:bg-stone-100 cursor-pointer rounded"
                              : "text-stone-600"
                          }`}
                        >
                          {seg.text}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {phase === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-rose-500" />
                    CAN YOU SPOT THE RISKS? Click on identifying or sensitive information.
                  </p>
                  <span className="text-sm font-bold text-stone-900">{found.length}/{totalRisks}</span>
                </div>

                {/* Found items feedback */}
                <div className="space-y-2 mb-6">
                  <AnimatePresence>
                    {found.map((idx) => {
                      const seg = promptSegments[idx];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          className={`flex items-start gap-3 p-3 rounded-xl border ${
                            seg.type === "identifying" ? "bg-rose-50 border-rose-200" : "bg-amber-50 border-amber-200"
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            seg.type === "identifying" ? "bg-rose-100" : "bg-amber-100"
                          }`}>
                            <ShieldAlert className={`w-4 h-4 ${seg.type === "identifying" ? "text-rose-500" : "text-amber-600"}`} />
                          </div>
                          <div>
                            <span className={`text-xs font-bold uppercase tracking-wide ${
                              seg.type === "identifying" ? "text-rose-600" : "text-amber-600"
                            }`}>{seg.label}</span>
                            <p className="text-sm text-stone-700 mt-0.5">{seg.feedback}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {allFound && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-4">
                      <p className="text-lg font-semibold text-emerald-700">
                        You identified {totalRisks} potential risks.
                      </p>
                      <p className="text-sm text-stone-600 mt-1">
                        Every piece of identifying or sensitive information has been spotted. Now let's make this prompt safer.
                      </p>
                    </div>
                    <button
                      onClick={() => setPhase(3)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all group"
                    >
                      Make it safer
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {!allFound && found.length > 0 && (
                  <p className="text-xs text-stone-400 text-center">Keep clicking — there are {totalRisks - found.length} more risks to find.</p>
                )}
                {found.length === 0 && (
                  <p className="text-xs text-stone-400 text-center">Click directly on parts of the prompt that look risky.</p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 3: Now make it safer */}
        {phase === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-2">NOW MAKE IT SAFER</h3>
            <p className="text-stone-500 text-center mb-8 text-sm">Same task. Less unnecessary data.</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">Original Prompt</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {promptSegments.map((s) => s.text).join("")}
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Safer Version</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{saferPrompt}</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-2">What changed?</h4>
                  <ul className="space-y-1.5 text-sm text-stone-600">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Name, date of birth, and address removed entirely.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Exact age replaced with an age range.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Medication names removed — the conditions are sufficient.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Lab values kept (relevant) but without any patient identifiers.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Output format specified for a usable result.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <p className="text-stone-800 text-lg font-semibold max-w-2xl mx-auto leading-snug">
                Safe AI use is not about avoiding AI. It is about understanding what information is necessary — and protecting what isn't.
              </p>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 text-white rounded-full text-sm font-semibold hover:bg-rose-700 transition-all group"
              >
                Practice
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
