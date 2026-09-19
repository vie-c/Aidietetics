import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Landing from "@/components/experience/Landing";
import WhySection from "@/components/experience/WhySection";
import HowSection from "@/components/experience/HowSection";
import GdprSection from "@/components/experience/GdprSection";
import BuildSection from "@/components/experience/BuildSection";
import SpotRisk from "@/components/experience/SpotRisk";
import Practice from "@/components/experience/Practice";
import PromptBankNew from "@/components/experience/PromptBankNew";
import FinalScreen from "@/components/experience/FinalScreen";

const steps = [
  { id: 0, label: "Start", short: "Start" },
  { id: 1, label: "WHY", short: "01" },
  { id: 2, label: "HOW", short: "02" },
  { id: 3, label: "GDPR", short: "03" },
  { id: 4, label: "BUILD", short: "04" },
  { id: 5, label: "SPOT", short: "05" },
  { id: 6, label: "PRACTICE", short: "06" },
  { id: 7, label: "PROMPT BANK", short: "07" },
  { id: 8, label: "End", short: "End" },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const goTo = (step) => {
    setCurrentStep(step);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (currentStep) {
      case 0: return <Landing onStart={() => goTo(1)} />;
      case 1: return <WhySection onNext={() => goTo(2)} />;
      case 2: return <HowSection onNext={() => goTo(3)} />;
      case 3: return <GdprSection onNext={() => goTo(4)} />;
      case 4: return <BuildSection onNext={() => goTo(5)} />;
      case 5: return <SpotRisk onNext={() => goTo(6)} />;
      case 6: return <Practice onNext={() => goTo(7)} />;
      case 7: return <PromptBankNew onNext={() => goTo(8)} />;
      case 8: return <FinalScreen onRestart={() => goTo(0)} />;
      default: return <Landing onStart={() => goTo(1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => goTo(0)} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍪</span>
            </div>
            <span className="font-semibold text-sm text-stone-900 hidden sm:inline">AI in Dietetics</span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {steps.slice(1, 8).map((step, i) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => goTo(step.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-700 text-white"
                      : isPast
                      ? "text-stone-400 hover:text-stone-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  <span className="text-stone-300 mr-1">{step.short}</span>
                  {step.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100"
          >
            {mobileNavOpen ? <X className="w-5 h-5 text-stone-600" /> : <Menu className="w-5 h-5 text-stone-600" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-stone-100"
            >
              <div className="px-4 py-3 space-y-1">
                {steps.slice(1, 8).map((step) => {
                  const isActive = currentStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => goTo(step.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive ? "bg-emerald-700 text-white" : "text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      <span className={`text-xs font-bold ${isActive ? "text-stone-400" : "text-stone-300"}`}>{step.short}</span>
                      {step.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="h-0.5 bg-stone-100">
          <motion.div
            className="h-full bg-emerald-500"
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </header>

      {/* Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
