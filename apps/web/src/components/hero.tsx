"use client";

import { useState } from "react";
import { AISearchLogos } from "./ai-logos";

export function Hero({ onApply }: { onApply?: (email: string) => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply?.(email);
  };

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          100% money-back guarantee
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
          Get Recommended by
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            AI Search Engines
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Boost your visibility on ChatGPT, Google AI Overview, Perplexity, and more.
          One organic press article per month. $350/mo. Cancel anytime.
        </p>

        {/* Email + Apply CTA */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full sm:flex-1 border border-gray-200 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-900/10 shrink-0"
          >
            Apply Now
          </button>
        </form>

        <div className="mt-3 flex justify-center gap-4">
          <a
            href="#how-it-works"
            className="text-sm text-gray-500 hover:text-gray-700 transition underline underline-offset-2"
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
