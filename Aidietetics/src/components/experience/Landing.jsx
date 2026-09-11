import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import TypingText from "./TypingText";

export default function Landing({ onStart }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-stone-50">
      {/* Soft warm gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium tracking-wide mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          FOR DIETITIANS & HEALTHCARE PROFESSIONALS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold text-stone-800 tracking-tight leading-[1.05]"
        >
          AI DIETETICS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl text-stone-500 mt-6 font-light"
        >
          Why and how do we use it?
        </motion.p>

        {/* Animated prompt preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 mx-auto max-w-xl"
        >
          <div className="bg-white border border-stone-200 rounded-2xl p-5 text-left shadow-lg shadow-stone-200/50">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="font-mono text-sm text-stone-600 min-h-[3rem]">
              <span className="text-emerald-600">{"// "}</span>
              <TypingText
                text="Create a nutrition plan for a patient with type 2 diabetes..."
                speed={45}
                startDelay={800}
                showCursor={true}
              />
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-full font-semibold text-sm tracking-wide hover:bg-emerald-700 transition-all hover:scale-105 hover:shadow-xl group"
        >
          START EXPLORING
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 text-xs text-stone-400 tracking-wide"
        >
          AI × DIETETICS × PATIENT SAFETY
        </motion.p>
      </div>
    </div>
  );
}
