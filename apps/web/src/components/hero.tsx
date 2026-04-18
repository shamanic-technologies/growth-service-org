"use client";

import { AISearchLogos } from "./ai-logos";

function currentMonth() {
  return new Date().toLocaleString("en", { month: "long" });
}

export function Hero() {
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-white to-white -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          100% money-back guarantee
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
          Get Recommended by
          <br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            AI Search Engines
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Boost your visibility on ChatGPT, Google AI Overview, Perplexity, and more.
          One organic press article per month. $350/mo. Cancel anytime.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#pricing"
            className="bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-900/10"
          >
            Join {currentMonth()} cohort (1 seat remaining)
          </a>
          <a
            href="#how-it-works"
            className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-full text-sm font-medium hover:border-gray-300 transition"
          >
            How It Works
          </a>
        </div>

        {/* AI Search Logos */}
        <div className="mt-14">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">
            Get mentioned on
          </p>
          <AISearchLogos size="md" />
        </div>
      </div>
    </section>
  );
}
