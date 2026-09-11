import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function FinalScreen({ onRestart }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-amber-200/30 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 mb-8"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold text-stone-800 tracking-tight leading-tight"
        >
          USE AI.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl font-bold text-emerald-600 tracking-tight leading-tight"
        >
          THINK FIRST.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-stone-500 mt-8 leading-relaxed max-w-lg mx-auto"
        >
          AI can support your practice.
          <br />
          Your professional judgement remains essential.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 space-y-3"
        >
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {[
              "I know what to protect",
              "I understand why it matters",
              "I can build a better prompt",
              "I can recognise risks",
              "I have practical prompts",
            ].map((item, i) => (
              <span
                key={i}
                className="text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={onRestart}
          className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Start again
        </motion.button>
      </div>
    </div>
  );
}
