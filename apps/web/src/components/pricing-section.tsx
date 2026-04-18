"use client";

import { useState } from "react";
import { AISearchLogos } from "./ai-logos";

export function PricingSection({ onApply }: { onApply?: (email: string) => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply?.(email);
  };

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Simple pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            One plan. One price. Real results.
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            No tiers, no hidden fees. Just guaranteed AI Search visibility.
          </p>
        </div>

        {/* Single pricing card */}
        <div className="max-w-lg mx-auto bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Top badge */}
          <div className="bg-gray-900 text-white text-center py-2 text-sm font-medium">
            100% Money-Back Guarantee
          </div>

          <div className="p-8">
            {/* Price */}
            <div className="text-center">
              <div className="text-5xl font-bold">
                $350
                <span className="text-lg text-gray-400 font-normal">/mo</span>
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                Cancel anytime. No commitment.
              </p>
            </div>

            {/* What's included */}
            <div className="mt-8 space-y-3">
              {[
                "1 organic press article per month in a DR50+ publication",
                "Do-follow backlink to your website",
                "Increased AI Search visibility across ChatGPT, Google AI, Perplexity",
                "Journalist proposal within 30 days or full refund",
                "We handle everything — research, pitching, coordination",
                "Brief 15-min interview or Q&A (your only involvement)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA with email */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-900/10"
              >
                Apply Now
              </button>
            </form>

            <p className="mt-3 text-xs text-gray-400 text-center">
              Secure payment via Stripe
            </p>

            {/* AI logos */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <AISearchLogos size="sm" />
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold mb-8">
            Compare Your Options
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium text-gray-500" />
                  <th className="py-3 px-4 font-medium text-gray-400">PR Junior</th>
                  <th className="py-3 px-4 font-medium text-gray-400">PR Agency</th>
                  <th className="py-3 px-4 font-medium text-gray-400">Blog SEO tools</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 bg-emerald-50/50 rounded-t-lg">GrowthService</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Cost</td>
                  <td className="py-3 px-4 text-center">$4,000/mo</td>
                  <td className="py-3 px-4 text-center">$10,000/mo</td>
                  <td className="py-3 px-4 text-center">$99/mo</td>
                  <td className="py-3 px-4 text-center font-semibold bg-emerald-50/50">$350/mo</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Commitment</td>
                  <td className="py-3 px-4 text-center">Employment</td>
                  <td className="py-3 px-4 text-center">6-month retainer</td>
                  <td className="py-3 px-4 text-center">Monthly</td>
                  <td className="py-3 px-4 text-center font-semibold bg-emerald-50/50">None</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Guarantee</td>
                  <td className="py-3 px-4 text-center">None</td>
                  <td className="py-3 px-4 text-center">None</td>
                  <td className="py-3 px-4 text-center">None</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600 bg-emerald-50/50">100% refund</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Content type</td>
                  <td className="py-3 px-4 text-center">Varies</td>
                  <td className="py-3 px-4 text-center">Advertorials</td>
                  <td className="py-3 px-4 text-center">Blog posts</td>
                  <td className="py-3 px-4 text-center font-semibold bg-emerald-50/50">Organic press</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">AI Search impact</td>
                  <td className="py-3 px-4 text-center">Low</td>
                  <td className="py-3 px-4 text-center">Medium</td>
                  <td className="py-3 px-4 text-center">Low</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600 bg-emerald-50/50">High</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-gray-700">Your effort</td>
                  <td className="py-3 px-4 text-center">Daily mgmt</td>
                  <td className="py-3 px-4 text-center">Weekly calls</td>
                  <td className="py-3 px-4 text-center">Setup + review</td>
                  <td className="py-3 px-4 text-center font-semibold bg-emerald-50/50 rounded-b-lg">15 min/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
