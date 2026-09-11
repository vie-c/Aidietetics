import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Info, RefreshCw } from "lucide-react";

const scenarios = [
  {
    id: 1,
    title: "Summarising a consultation",
    icon: "📋",
    situation: "A dietitian wants to use AI to summarise the key points of a patient consultation they just completed. They plan to paste their full consultation notes into the AI tool.",
    question: "What should the dietitian do before sending the notes to the AI?",
    options: [
      {
        text: "Paste the full notes as-is — the AI needs all the context.",
        correct: false,
        feedback: "The consultation notes likely contain the patient's name, date of birth, and other identifiers. These should never be sent to a general-purpose AI tool.",
      },
      {
        text: "Remove the patient's name and identifiers, then paste the clinical content.",
        correct: false,
        feedback: "Closer, but even anonymised consultation notes may contain enough detail to re-identify a patient, especially with rare conditions or specific circumstances.",
      },
      {
        text: "Summarise the clinical situation yourself without patient details, and ask the AI to help structure the summary.",
        correct: true,
        feedback: "Correct. You control what information leaves your practice. Describe the clinical picture in general terms and let the AI help with structure and formatting.",
      },
    ],
    takeaway: "You don't need to send patient data to get useful help. Describe the clinical situation in general terms and let the AI assist with structure, language, and formatting.",
  },
  {
    id: 2,
    title: "Patient education material",
    icon: "📖",
    situation: "A dietitian wants to create an educational handout about the glycaemic index for a patient with type 2 diabetes. The patient has a low literacy level.",
    question: "How should the dietitian use AI for this task?",
    options: [
      {
        text: "Include the patient's name and diagnosis so the AI can personalise the handout.",
        correct: false,
        feedback: "The AI does not need the patient's name or specific diagnosis to create a general educational handout about the glycaemic index.",
      },
      {
        text: "Ask the AI to explain the glycaemic index in simple terms for a patient with low health literacy. No patient details needed.",
        correct: true,
        feedback: "Correct. This task does not require any patient information at all. You can specify the literacy level and topic without sharing any personal data.",
      },
      {
        text: "Send the patient's lab results so the AI can tailor the explanation to their values.",
        correct: false,
        feedback: "Lab results are health data under GDPR Article 9. They are not needed for a general educational handout about the glycaemic index.",
      },
    ],
    takeaway: "Many AI tasks need zero patient data. Education materials, brainstorming, and general information can be generated without any personal information.",
  },
  {
    id: 3,
    title: "Brainstorming meal ideas",
    icon: "💡",
    situation: "A dietitian wants to brainstorm high-protein snack ideas for an elderly patient with a small appetite and mild dysphagia. The patient is in a care home.",
    question: "Which prompt is the safest approach?",
    options: [
      {
        text: "\"Mrs. Dubois in room 14 at Sunnyvale Care Home has dysphagia. Give me snack ideas.\"",
        correct: false,
        feedback: "This prompt contains the patient's name and the specific care home — both directly identifying information that should never be sent to an AI tool.",
      },
      {
        text: "\"My patient in a care home has dysphagia. Suggest high-protein snacks with modified textures.\"",
        correct: false,
        feedback: "Better, but 'my patient' is unnecessary. The AI can help with this question as a general clinical query.",
      },
      {
        text: "\"Suggest high-protein snack ideas for an elderly person with mild dysphagia requiring modified textures.\"",
        correct: true,
        feedback: "Correct. This is a general clinical question that does not require any patient-specific information. The AI can provide useful ideas based on the clinical picture alone.",
      },
    ],
    takeaway: "Brainstorming and idea generation rarely need patient-specific data. Frame the question as a general clinical query.",
  },
  {
    id: 4,
    title: "Complex clinical situation",
    icon: "🏥",
    situation: "A dietitian is managing a complex case: a patient with type 2 diabetes, chronic kidney disease stage 3, and recent weight loss. They want AI support to structure a nutrition plan.",
    question: "What is the safest and most effective approach?",
    options: [
      {
        text: "Send the full patient record including name, diagnosis, medications, and lab values for a comprehensive plan.",
        correct: false,
        feedback: "The patient's name and identifiers are never needed. Even lab values should be shared without any identifying information.",
      },
      {
        text: "Describe the clinical situation generically: 'Adult with T2DM, CKD stage 3, recent weight loss. HbA1c 8.5%, eGFR 35. Suggest a nutrition plan following current guidelines.'",
        correct: true,
        feedback: "Correct. You provide the relevant clinical parameters without any identifying information. The AI can generate a useful plan based on the clinical picture.",
      },
      {
        text: "Avoid using AI entirely for complex cases — it is too risky.",
        correct: false,
        feedback: "AI can be a useful tool for complex cases if used responsibly. The key is providing relevant clinical information without identifiers and always verifying the output with your professional judgement.",
      },
    ],
    takeaway: "Complex cases can benefit from AI support. Provide the clinical picture without identifiers, always verify the output, and keep your professional judgement in the loop.",
  },
];

export default function Practice({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState([]);

  const scenario = scenarios[current];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (scenario.options[idx].correct) {
      setCompleted((prev) => [...new Set([...prev, current])]);
    }
  };

  const handleNext = () => {
    if (current < scenarios.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      onNext();
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setCompleted([]);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-2"
        >
          PRACTICE
        </motion.h2>
        <p className="text-stone-500 text-center mb-3 text-sm">Now it's your turn.</p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {scenarios.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i === current ? "bg-emerald-600 text-white" : completed.includes(i) ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-400"
              }`}>
                {completed.includes(i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < scenarios.length - 1 && <div className={`w-8 h-0.5 ${completed.includes(i) ? "bg-emerald-300" : "bg-stone-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Scenario header */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{scenario.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Scenario {String(current + 1).padStart(2, "0")}</span>
                  <h3 className="font-bold text-stone-900">{scenario.title}</h3>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{scenario.situation}</p>
            </div>

            {/* Question */}
            <p className="text-sm font-semibold text-stone-700 mb-4">{scenario.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {scenario.options.map((opt, i) => {
                const isSelected = selected === i;
                const showResult = answered && isSelected;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      showResult
                        ? opt.correct
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-rose-300 bg-rose-50"
                        : answered
                        ? "border-stone-100 bg-white opacity-60"
                        : "border-stone-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        showResult
                          ? opt.correct ? "bg-emerald-500" : "bg-rose-500"
                          : "bg-stone-100"
                      }`}>
                        {showResult && (opt.correct ? <Check className="w-3.5 h-3.5 text-white" /> : <X className="w-3.5 h-3.5 text-white" />)}
                      </div>
                      <span className="text-sm text-stone-700 leading-relaxed">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-5 border-2 mb-6 ${
                    scenario.options[selected].correct ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      scenario.options[selected].correct ? "bg-emerald-100" : "bg-rose-100"
                    }`}>
                      {scenario.options[selected].correct ? <Check className="w-4 h-4 text-emerald-600" /> : <Info className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${scenario.options[selected].correct ? "text-emerald-700" : "text-rose-700"}`}>
                        {scenario.options[selected].correct ? "Well done." : "Let's think about this."}
                      </p>
                      <p className="text-sm text-stone-700 leading-relaxed mb-3">{scenario.options[selected].feedback}</p>
                      <div className="bg-white/60 rounded-xl p-3 border border-stone-200">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Key takeaway</p>
                        <p className="text-sm text-stone-700 leading-relaxed">{scenario.takeaway}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all group"
                >
                  {current < scenarios.length - 1 ? "Next scenario" : "View prompt bank"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {current === scenarios.length - 1 && answered && (
          <div className="text-center mt-6">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restart practice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
