import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, PenLine, Brain, Lock, FileText, Eye, Check, ArrowRight } from "lucide-react";

const principles = [
  {
    num: "01",
    icon: Shield,
    title: "PROTECT",
    subtitle: "Understand what needs to be protected.",
    color: "green",
    items: [
      { icon: Lock, label: "GDPR" },
      { icon: Eye, label: "Privacy" },
      { icon: Shield, label: "Confidentiality" },
      { icon: FileText, label: "Patient data" },
    ],
  },
  {
    num: "02",
    icon: PenLine,
    title: "BUILD",
    subtitle: "Learn how to communicate with AI effectively and safely.",
    color: "green",
    items: [
      { icon: FileText, label: "Prompt structure" },
      { icon: Check, label: "Relevant information" },
      { icon: Eye, label: "Unnecessary information" },
      { icon: PenLine, label: "Safe formulation" },
    ],
  },
  {
    num: "03",
    icon: Brain,
    title: "THINK",
    subtitle: "Keep professional judgement in the loop.",
    color: "green",
    items: [
      { icon: Check, label: "Verify" },
      { icon: Eye, label: "Question" },
      { icon: Brain, label: "Evaluate" },
      { icon: Shield, label: "Decide" },
    ],
  },
];

const colorStyles = {
  green: { bg: "bg-[#93C572]", text: "text-[#93C572]", border: "border-[#93C572]", ring: "ring-[#93C572]", dot: "bg-[#93C572]"},
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", ring: "ring-amber-500", dot: "bg-amber-500" },
  teal: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", ring: "ring-emerald-500", dot: "bg-emerald-500" },
};

export default function HowSection({ onNext }) {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-2"
        >
          HOW CAN WE USE AI SAFELY?
        </motion.h2>
        <p className="text-stone-500 text-center mb-12 text-sm">Three principles to guide your practice.</p>

        {/* Principle selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {principles.map((p, i) => {
            const c = colorStyles[p.color];
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 text-left p-5 rounded-2xl border-2 transition-all ${
                  active === i
                    ? `${c.border} ${c.bg} shadow-md`
                    : "border-stone-100 bg-white hover:border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-2xl font-bold ${active === i ? c.text : "text-stone-300"}`}>{p.num}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${active === i ? c.bg : "bg-stone-50"}`}>
                    <p.icon className={`w-5 h-5 ${active === i ? c.text : "text-stone-400"}`} />
                  </div>
                </div>
                <h3 className={`font-bold text-lg ${active === i ? "text-stone-900" : "text-stone-400"}`}>{p.title}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{p.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active principle detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles[active].items.map((item, i) => {
              const c = colorStyles[principles[active].color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-2 p-4"
                >
                  <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <span className="text-sm font-medium text-stone-700">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-700 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition-all group"
          >
            Explore GDPR
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
