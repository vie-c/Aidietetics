import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Target, ListChecks, FileText, Info, Check } from "lucide-react";

const components = [
  {
    key: "context",
    icon: Layers,
    label: "CONTEXT",
    question: "What does the AI need to know?",
    color: "blue",
    example: "Adult with type 2 diabetes, HbA1c above target, overweight, sedentary lifestyle.",
    desc: "Provide the clinical picture — without any identifying information.",
  },
  {
    key: "task",
    icon: Target,
    label: "TASK",
    question: "What do you want the AI to do?",
    color: "amber",
    example: "Create a structured meal plan for 5 days with a low glycaemic index.",
    desc: "Be specific about what you want the AI to produce.",
  },
  {
    key: "instructions",
    icon: ListChecks,
    label: "INSTRUCTIONS",
    question: "How should it approach the task?",
    color: "violet",
    example: "Follow SFD guidelines. 45–50% carbohydrates, 1.2g protein/kg. Include practical advice.",
    desc: "Guide the AI on method, references, and constraints.",
  },
  {
    key: "output",
    icon: FileText,
    label: "OUTPUT",
    question: "What should the answer look like?",
    color: "teal",
    example: "Structured table: day, meals, portions. Add a brief rationale for each choice.",
    desc: "Specify the format so the result is immediately usable.",
  },
];

const colorStyles = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", dot: "bg-blue-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", dot: "bg-violet-500" },
  teal: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
};

export default function BuildSection({ onNext }) {
  const [added, setAdded] = useState([]);
  const [activeComp, setActiveComp] = useState(null);

  const toggle = (key) => {
    setAdded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const allAdded = added.length === components.length;

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-2"
        >
          BUILDING THE PROMPT
        </motion.h2>
        <p className="text-stone-500 text-center mb-12 text-sm">A good prompt is more than a question.</p>

        {/* Component cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {components.map((comp, i) => {
            const c = colorStyles[comp.color];
            const isAdded = added.includes(comp.key);
            const isActive = activeComp === comp.key;
            return (
              <motion.button
                key={comp.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setActiveComp(comp.key);
                  if (!isAdded) toggle(comp.key);
                }}
                className={`text-left p-5 rounded-2xl border-2 transition-all ${
                  isActive ? `${c.border} ${c.bg} shadow-md` : isAdded ? "border-stone-200 bg-white" : "border-stone-100 bg-white hover:border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAdded ? c.bg : "bg-stone-50"}`}>
                    <comp.icon className={`w-5 h-5 ${isAdded ? c.text : "text-stone-400"}`} />
                  </div>
                  {isAdded && (
                    <div className={`w-5 h-5 rounded-full ${c.dot} flex items-center justify-center`}>
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-sm text-stone-900">{comp.label}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{comp.question}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Active component detail */}
        <AnimatePresence mode="wait">
          {activeComp && (
            <motion.div
              key={activeComp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm"
            >
              {(() => {
                const comp = components.find((c) => c.key === activeComp);
                const c = colorStyles[comp.color];
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <comp.icon className={`w-5 h-5 ${c.text}`} />
                      <h3 className="font-bold text-stone-900">{comp.label}</h3>
                      <span className="text-xs text-stone-400">— {comp.question}</span>
                    </div>
                    <p className="text-sm text-stone-600 mb-3">{comp.desc}</p>
                    <div className={`${c.bg} rounded-xl p-4 border ${c.border}`}>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Example</p>
                      <p className="text-sm text-stone-700 leading-relaxed">{comp.example}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assembled prompt preview */}
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-lg shadow-emerald-100/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h3 className="text-stone-800 font-semibold text-sm">Assembled Prompt</h3>
            <span className="text-xs text-stone-400 ml-auto">{added.length}/4 components</span>
          </div>
          <div className="space-y-2 min-h-[120px]">
            {added.length === 0 && (
              <p className="text-stone-500 text-sm text-center py-8">Click on a component above to start building your prompt.</p>
            )}
            {added.map((key) => {
              const comp = components.find((c) => c.key === key);
              const c = colorStyles[comp.color];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <span className={`text-xs font-bold ${c.text} mt-0.5 w-20 flex-shrink-0`}>{comp.label}:</span>
                  <span className="text-sm text-stone-600 leading-relaxed">{comp.example}</span>
                </motion.div>
              );
            })}
          </div>
          {allAdded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-stone-100"
            >
              <p className="text-xs text-emerald-600 font-medium">✓ Complete prompt assembled — no patient identifiers included.</p>
            </motion.div>
          )}
        </div>

        {/* Key principle */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm mb-1">MORE INFORMATION ≠ A BETTER PROMPT</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Provide <strong>relevant information</strong>, not everything you know about a patient.
                The AI does not need names, addresses, or dates of birth. It needs the clinical picture.
                This connects directly to what you learned in the GDPR section.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 text-white rounded-full text-sm font-semibold hover:bg-amber-700 transition-all group"
          >
            Spot the risk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
