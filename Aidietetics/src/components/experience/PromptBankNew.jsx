import React, { useState } from "react";
import { Copy, CheckCheck, Search, ChevronDown, ChevronUp, Lightbulb, ShieldCheck } from "lucide-react";

const promptCategories = [
  {
    category: "Administrative Tasks",
    color: "blue",
    items: [
      {
        title: "Consultation Summary Structure",
        prompt: "Structure the following consultation notes into a clear professional summary: clinical context, nutritional assessment, goals, and action plan. Use concise bullet points. Do not include any patient identifiers.",
        adapt: "Replace with your general clinical context (no names, no dates of birth). Specify the format your institution prefers.",
        safety: "Never paste raw consultation notes with patient names or identifiers. Describe the clinical situation in general terms.",
        structure: { context: "General clinical setting (e.g. outpatient dietetics)", task: "Structure consultation notes into a summary", instructions: "Use bullet points, professional tone, no identifiers", output: "Structured summary: context, assessment, goals, action plan" },
      },
      {
        title: "Referral Letter Draft",
        prompt: "Draft a professional referral letter to a physician summarising the nutritional assessment and recommendations for a patient with [general clinical situation]. Use a formal tone and include: reason for referral, nutritional assessment, and proposed plan.",
        adapt: "Describe the clinical situation generically. Fill in specific clinical details yourself after generating the draft.",
        safety: "Do not include patient names, dates of birth, or identifying details in the AI prompt. Add these manually to the final document.",
        structure: { context: "Professional communication between healthcare providers", task: "Draft a referral letter", instructions: "Formal tone, include reason, assessment, and plan", output: "Formatted referral letter" },
      },
    ],
  },
  {
    category: "Patient Communication",
    color: "violet",
    items: [
      {
        title: "Motivational Interviewing Questions",
        prompt: "Generate 10 open-ended motivational interviewing questions for a patient starting a dietary change. Focus on exploring motivation, confidence, and barriers. Use a supportive, non-judgmental tone.",
        adapt: "Specify the dietary change (e.g. reducing sugar, increasing fibre) and the patient's general context.",
        safety: "No patient information needed. This is a general communication technique prompt.",
        structure: { context: "Patient consultation about dietary behaviour change", task: "Generate motivational interviewing questions", instructions: "Open-ended, supportive, non-judgmental", output: "10 questions ready to use in consultation" },
      },
      {
        title: "Follow-up Message Template",
        prompt: "Write a warm, professional follow-up message template for a patient after their first dietetic consultation. Include: encouragement, a reminder of one key goal, and an open invitation to ask questions. Keep it under 100 words.",
        adapt: "Adjust the tone for your patient population. Add the specific goal manually after generating.",
        safety: "The template should be generic. Add patient-specific details yourself before sending.",
        structure: { context: "Post-consultation patient communication", task: "Create a follow-up message template", instructions: "Warm, professional, under 100 words", output: "Reusable message template" },
      },
    ],
  },
  {
    category: "Patient Education",
    color: "emerald",
    items: [
      {
        title: "Glycaemic Index Explained Simply",
        prompt: "Explain the glycaemic index in simple terms for a patient with type 2 diabetes who has low health literacy. Use everyday food examples. Maximum 150 words. Avoid medical jargon.",
        adapt: "Adjust the reading level and food examples for your patient's cultural background.",
        safety: "No patient information needed. This is a general education prompt.",
        structure: { context: "Patient with type 2 diabetes, low health literacy", task: "Explain glycaemic index simply", instructions: "Everyday examples, no jargon, max 150 words", output: "Patient-friendly explanation" },
      },
      {
        title: "Balanced Plate Method",
        prompt: "Describe the balanced plate method for a patient with type 2 diabetes. Use simple visual proportions and concrete meal examples. Write as if speaking directly to the patient.",
        adapt: "Customise the meal examples for the patient's cultural food preferences.",
        safety: "No patient data required. Frame as general dietary guidance.",
        structure: { context: "Patient education for type 2 diabetes", task: "Explain the balanced plate method", instructions: "Visual proportions, concrete examples, direct address", output: "Practical patient-facing guide" },
      },
      {
        title: "Reading Nutrition Labels",
        prompt: "Explain to a patient how to read nutrition labels on food products. Focus on sugars, saturated fats, salt, and fibre. Use accessible language and give examples of what to look for and what to limit.",
        adapt: "Tailor to the patient's specific dietary goals (e.g. low sodium, low sugar).",
        safety: "No patient information needed.",
        structure: { context: "Patient education on food labels", task: "Explain how to read nutrition labels", instructions: "Focus on sugars, fats, salt, fibre; accessible language", output: "Practical guide with examples" },
      },
      {
        title: "Hydration for Older Adults",
        prompt: "Create a simple educational message about the importance of hydration for an older adult. Give practical tips to increase fluid intake throughout the day. Keep it encouraging and easy to follow.",
        adapt: "Adjust for setting (home, care home, hospital) and any specific restrictions.",
        safety: "No patient data needed. General health education prompt.",
        structure: { context: "Older adult hydration education", task: "Create hydration tips", instructions: "Simple, encouraging, practical", output: "Short educational message" },
      },
    ],
  },
  {
    category: "Brainstorming",
    color: "amber",
    items: [
      {
        title: "High-Protein Snack Ideas",
        prompt: "Suggest 10 high-protein snack ideas for an older adult with a small appetite and mild dysphagia requiring modified textures. Prioritise common, accessible foods. Note the approximate protein content of each.",
        adapt: "Specify texture level (IDDSI), cultural preferences, and any allergies.",
        safety: "No patient identifiers. Describe the clinical picture in general terms.",
        structure: { context: "Older adult, small appetite, modified textures", task: "Generate snack ideas", instructions: "10 ideas, common foods, note protein content", output: "List with protein estimates" },
      },
      {
        title: "Low-Potassium Snacks",
        prompt: "Suggest 8 snack ideas with less than 200mg potassium per portion, suitable for a patient with chronic kidney disease stage 4 (non-dialysis). Include approximate potassium content for each.",
        adapt: "Adjust for sodium and phosphorus restrictions as needed.",
        safety: "No patient data. General clinical query.",
        structure: { context: "CKD stage 4, non-dialysis", task: "Generate low-potassium snack ideas", instructions: "Under 200mg K per portion, note content", output: "8 snacks with potassium values" },
      },
      {
        title: "Vegetarian Protein Sources",
        prompt: "List 15 plant-based protein sources for a vegetarian adult, with approximate protein content per 100g. Organise by food category (legumes, grains, nuts, soy products, vegetables).",
        adapt: "Filter for allergies or specific dietary restrictions.",
        safety: "No patient information needed.",
        structure: { context: "Vegetarian nutrition planning", task: "List plant-based protein sources", instructions: "15 sources, per 100g, organised by category", output: "Reference table" },
      },
    ],
  },
  {
    category: "Meal Planning",
    color: "teal",
    items: [
      {
        title: "5-Day Diabetes Meal Plan",
        prompt: "Create a 5-day meal plan for an adult with type 2 diabetes, focusing on a low glycaemic index, high fibre content. Include breakfast, lunch, dinner, and an optional snack. Follow current diabetes guidelines (45–50% carbohydrates, 1.2g protein/kg).",
        adapt: "Specify cultural food preferences, allergies, and calorie targets.",
        safety: "No patient identifiers. Describe the clinical picture generically.",
        structure: { context: "Adult with type 2 diabetes", task: "Create a 5-day meal plan", instructions: "Low GI, high fibre, follow guidelines", output: "5-day structured meal plan" },
      },
      {
        title: "Dairy-Free Menu for a Child",
        prompt: "Design a 3-day meal plan without cow's milk protein for a child aged 8–10, covering calcium needs with appropriate alternatives. Include breakfast, lunch, snack, and dinner.",
        adapt: "Adjust for the child's preferences and any additional allergies.",
        safety: "No patient data. General paediatric nutrition prompt.",
        structure: { context: "Child with cow's milk protein allergy", task: "Create a 3-day dairy-free menu", instructions: "Cover calcium needs, age 8–10", output: "3-day structured menu" },
      },
      {
        title: "Texture-Modified Enriched Meals",
        prompt: "Suggest enriched meal ideas (high protein, high calorie) for an older adult requiring pureed or minced textures. Note the nutritional density of each suggestion. Prioritise everyday ingredients.",
        adapt: "Specify IDDSI texture level and any swallowing precautions.",
        safety: "No patient identifiers. General clinical query.",
        structure: { context: "Older adult, texture-modified diet", task: "Generate enriched meal ideas", instructions: "High protein/calorie, pureed or minced, everyday ingredients", output: "Meal ideas with nutritional notes" },
      },
    ],
  },
  {
    category: "Literature & Information",
    color: "indigo",
    items: [
      {
        title: "Summarise a Guideline",
        prompt: "Summarise the key nutritional recommendations from [guideline name] for [clinical condition]. Focus on practical, actionable points for a dietitian. Use bullet points and cite the source.",
        adapt: "Paste the guideline text or provide the document. Specify which aspects are most relevant.",
        safety: "Do not paste copyrighted full texts. Summarise key points yourself or use publicly available summaries.",
        structure: { context: "Clinical guideline review", task: "Summarise key recommendations", instructions: "Practical points, bullet format, cite source", output: "Concise summary for practice" },
      },
      {
        title: "Compare Nutrition Frameworks",
        prompt: "Compare the nutritional recommendations of [framework A] and [framework B] for [condition]. Highlight key differences, similarities, and practical implications for dietetic practice.",
        adapt: "Specify the frameworks and condition you want compared.",
        safety: "No patient data needed. Academic/clinical query.",
        structure: { context: "Comparing clinical frameworks", task: "Compare two frameworks", instructions: "Highlight differences, similarities, practical implications", output: "Comparison summary" },
      },
    ],
  },
  {
    category: "Clinical Support",
    color: "rose",
    items: [
      {
        title: "Nutritional Needs Estimation",
        prompt: "Estimate the nutritional needs for an adult with [general clinical situation]. Use a kcal/kg and g protein/kg approach based on clinical assessment (e.g. 25–35 kcal/kg, 1.2–1.5g protein/kg depending on context). Include macronutrient distribution and daily intake targets.",
        adapt: "Specify the clinical context, weight range, and metabolic stress factors.",
        safety: "No patient identifiers. Use an approximate weight range, not the patient's exact weight with their name.",
        structure: { context: "Adult, general clinical situation", task: "Estimate nutritional needs", instructions: "kcal/kg and g protein/kg approach, include macronutrient split", output: "Estimated daily targets" },
      },
      {
        title: "Anamnesis Question Set",
        prompt: "Generate a structured nutritional anamnesis question set for a patient with [condition] in [setting]. Include: dietary habits, meal frequency, symptom assessment, activity level, and quality of life impact.",
        adapt: "Tailor to the specific condition and consultation setting.",
        safety: "No patient data. This generates a template you will use in consultation.",
        structure: { context: "Clinical consultation for specific condition", task: "Generate anamnesis questions", instructions: "Structured, comprehensive, condition-specific", output: "Question template for consultation" },
      },
      {
        title: "Nutrition Intake Assessment",
        prompt: "Based on a 24-hour dietary recall described below [insert general recall without patient details], estimate the approximate caloric and protein intake and compare it to estimated needs (in kcal/kg and g protein/kg for the clinical context). Identify gaps and suggest targeted, progressive adjustments.",
        adapt: "Describe the recall in general terms. Specify the clinical context and target ranges.",
        safety: "Remove all patient identifiers from the recall. Describe foods and amounts only.",
        structure: { context: "Dietary recall assessment", task: "Estimate intake and compare to needs", instructions: "Identify gaps, suggest progressive adjustments", output: "Intake estimate with recommendations" },
      },
      {
        title: "Enteral Nutrition Protocol",
        prompt: "Outline an enteral nutrition protocol for an adult patient who cannot meet needs orally: formula selection (standard, high-protein, condition-specific), progressive rate escalation, refeeding syndrome monitoring, and biochemical surveillance. Follow ESPEN guidelines.",
        adapt: "Specify the clinical context (e.g. post-surgery, oncology, critical care).",
        safety: "No patient identifiers. General protocol query.",
        structure: { context: "Adult requiring enteral nutrition", task: "Outline a protocol", instructions: "Formula selection, rate escalation, monitoring, ESPEN guidelines", output: "Structured protocol" },
      },
    ],
  },
  {
    category: "Other Professional Tasks",
    color: "slate",
    items: [
      {
        title: "Case Study Structure",
        prompt: "Help me structure a clinical case study for a professional presentation. Include: patient presentation (anonymised), nutritional assessment, intervention, outcome, and lessons learned. Suggest a clear format.",
        adapt: "Provide the anonymised clinical details you want to include.",
        safety: "Ensure all patient identifiers are removed before using the prompt. Use 'a patient aged X–Y' instead of names or exact dates.",
        structure: { context: "Professional case study preparation", task: "Structure a case study", instructions: "Anonymised, include presentation through lessons learned", output: "Case study template" },
      },
      {
        title: "Training Material Outline",
        prompt: "Create an outline for a 1-hour training session on [nutrition topic] for [audience]. Include learning objectives, key content sections, interactive activities, and assessment questions.",
        adapt: "Specify the topic, audience level, and any constraints.",
        safety: "No patient data needed. Educational planning prompt.",
        structure: { context: "Professional training development", task: "Create a training outline", instructions: "1 hour, include objectives, content, activities, assessment", output: "Structured training outline" },
      },
    ],
  },
];

const colorMap = {
  blue: { dot: "bg-blue-500", badge: "bg-blue-100 text-blue-700", border: "border-blue-100" },
  violet: { dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700", border: "border-violet-100" },
  emerald: { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-100" },
  amber: { dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700", border: "border-amber-100" },
  teal: { dot: "bg-teal-500", badge: "bg-teal-100 text-teal-700", border: "border-teal-100" },
  indigo: { dot: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700", border: "border-indigo-100" },
  rose: { dot: "bg-rose-500", badge: "bg-rose-100 text-rose-700", border: "border-rose-100" },
  slate: { dot: "bg-stone-500", badge: "bg-stone-100 text-stone-700", border: "border-stone-100" },
};

function PromptCard({ item, color }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[color];

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl border ${c.border} bg-white p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="text-sm font-semibold text-stone-800">{item.title}</h4>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-lg bg-stone-50 border border-stone-200 hover:shadow-sm transition-all"
          title="Copy prompt"
        >
          {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-stone-500" />}
        </button>
      </div>

      {/* Prompt text */}
      <div className="bg-stone-50 rounded-xl p-3 mb-3">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Prompt</p>
        <p className="text-sm text-stone-700 leading-relaxed">{item.prompt}</p>
      </div>

      {/* How to adapt */}
      <div className="flex items-start gap-2 mb-2">
        <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">How to adapt it</span>
          <p className="text-xs text-stone-600 leading-relaxed mt-0.5">{item.adapt}</p>
        </div>
      </div>

      {/* Safety reminder */}
      <div className="flex items-start gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Safety reminder</span>
          <p className="text-xs text-stone-600 leading-relaxed mt-0.5">{item.safety}</p>
        </div>
      </div>

      {/* Understand this prompt */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-50 rounded-lg px-3 py-2 transition-all"
      >
        <span>Understand this prompt</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {[
            { label: "Context", value: item.structure.context },
            { label: "Task", value: item.structure.task },
            { label: "Instructions", value: item.structure.instructions },
            { label: "Output", value: item.structure.output },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={`font-bold ${c.badge} px-2 py-0.5 rounded-full flex-shrink-0`}>{s.label}</span>
              <span className="text-stone-600 leading-relaxed">{s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PromptBankNew({ onNext }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...promptCategories.map((p) => p.category)];

  const filtered = promptCategories
    .filter((group) => activeCategory === "All" || group.category === activeCategory)
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          search === "" ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.prompt.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const totalPrompts = promptCategories.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2 text-center">PROMPT BANK</h2>
        <p className="text-stone-500 text-center mb-8 text-sm">Ready-to-adapt prompts for dietitians.</p>

        <div className="text-center mb-8">
          <span className="text-xs text-stone-400">{totalPrompts} prompts · 8 categories · all anonymised</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400 shadow-sm"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prompt groups */}
        <div className="space-y-8">
          {filtered.map((group) => {
            const c = colorMap[group.color];
            return (
              <div key={group.category}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <h3 className="font-semibold text-stone-700 text-sm">{group.category}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{group.items.length}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.items.map((item, idx) => (
                    <PromptCard key={idx} item={item} color={group.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-700 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition-all group"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
