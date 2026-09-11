import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Lightbulb, MessageSquare, BookOpen, ClipboardList, Users,
  ShieldAlert, Lock, Eye, AlertTriangle, Brain, ArrowRight,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const aiBenefits = [
  { icon: ClipboardList, title: "Administrative Support", desc: "Drafting reports, structuring consultation notes, organising patient documentation." },
  { icon: FileText, title: "Cognitive and writing support", desc: "Support for thinking, structuring, and refining ideas and writing." },
  { icon: Lightbulb, title: "Content creation", desc: "Generating meal ideas, enrichment strategies, and creative nutrition approaches." },
  { icon: MessageSquare, title:"Communication", desc: "Writing professional emails, referral letters, and team communications." },
  { icon: BookOpen, title: "Patient Education", desc: "Creating accessible educational materials tailored to different literacy levels." },
  { icon: Users, title: "Literature research", desc: "Finding, exploring, and synthesizing relevant scientific literature." },
];

const risks = [
  { icon: Lock, title: "Privacy", desc: "Patient information may be exposed to third-party servers." },
  { icon: Eye, title: "Confidentiality", desc: "Data sent to AI tools may be stored, logged, or reused." },
  { icon: ShieldAlert, title: "Health Data", desc: "Health information is specially protected under GDPR Article 9." },
  { icon: AlertTriangle, title: "Inaccurate Information", desc: "AI can generate plausible but incorrect content." },
  { icon: Brain, title: "Hallucinations", desc: "AI may fabricate references, dosages, or clinical recommendations." },
  { icon: AlertTriangle, title: "Over-Reliance", desc: "Delegating professional judgement to an AI tool." },
];

export default function WhySection({ onNext }) {
  const [phase, setPhase] = useState(0);

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Phase 0: Statistical hook */}
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center min-h-[70vh]"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold text-stone-900 mb-16"
            >
              WHY DOES THIS MATTER?
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-16 w-full max-w-3xl">
              {/* AI Adoption */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">AI Adoption</p>
                <div className="text-6xl sm:text-7xl font-bold text-emerald-600">
                  <AnimatedCounter target={91.6} decimals={1} suffix="%" />
                </div>
                <p className="text-sm text-stone-500 mt-3 max-w-xs mx-auto">
                  of dietitians use generative AI in their practice
                </p>
              </motion.div>

              {/* Security Practices — editable placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Security Practices</p>
                <div className="text-6xl sm:text-7xl font-bold text-rose-500">
                  <AnimatedCounter target={15.7} decimals={1} suffix="%" startDelay={400} />
                </div>
                <p className="text-sm text-stone-500 mt-3 max-w-xs mx-auto">
                  apply security measures when using generative AI
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-16"
            >
              <div className="h-px w-32 bg-stone-200 mx-auto mb-8" />
              <p className="text-2xl sm:text-3xl font-semibold text-stone-900 max-w-2xl mx-auto leading-snug">
                AI adoption is moving faster than safe practices.
              </p>
              <button
                onClick={() => setPhase(1)}
                className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-full text-sm font-medium hover:bg-emerald-800 transition-all group"
              >
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 1: AI can be useful */}
        {phase === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2 text-center">AI CAN BE USEFUL</h2>
            <p className="text-stone-500 text-center mb-10 text-sm">Dietitians are using AI because it genuinely helps with real professional tasks.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiBenefits.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setPhase(2)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-full text-sm font-medium hover:bg-emerald-800 transition-all group"
              >
                But...
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase 2: But there are risks */}
        {phase === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-rose-500 mb-2 text-center">BUT...</h2>
            <p className="text-stone-500 text-center mb-10 text-sm">Using AI responsibly requires new skills.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {risks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-rose-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-xl sm:text-2xl font-semibold text-stone-900 max-w-2xl mx-auto leading-snug mb-8">
                AI can be useful. But using it responsibly requires new skills.
              </p>
              <div className="h-px w-16 bg-stone-200 mx-auto mb-8" />
              <p className="text-2xl sm:text-3xl font-bold text-stone-900 max-w-2xl mx-auto leading-snug">
                So, how can we use AI safely in our practice?
              </p>
              <button
                onClick={onNext}
                className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all group"
              >
                Find out how
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
