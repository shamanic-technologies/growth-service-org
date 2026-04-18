"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { AISearchLogos, PublicationLogos } from "@/components/ai-logos";
import {
  AIVisibilityChart,
  DomainRatingChart,
  BeforeAfterComparison,
  ChatGPTMentionMockup,
  GoogleAIOverviewMockup,
} from "@/components/mockup-charts";
import { UrgencyBanner } from "@/components/urgency-banner";
import { CheckoutModal } from "@/components/checkout-modal";

function currentMonth() {
  return new Date().toLocaleString("en", { month: "long" });
}

const faqItems = [
  {
    q: "How does this improve my AI Search visibility?",
    a: "AI search engines like ChatGPT and Google AI Overview prioritize sources from high-authority publications. When a DR50+ outlet publishes an organic article about your brand, AI models pick it up and start recommending you. 27% of ChatGPT sources come from organic press coverage.",
  },
  {
    q: "What is the money-back guarantee?",
    a: "If we don't deliver a journalist proposal from a DR50+ publication within 30 days, you get a full refund. No questions asked.",
  },
  {
    q: "What will I need to do?",
    a: "Minimal involvement. We handle the research, journalist outreach, and coordination. When a journalist engages, you'll do a brief 15-minute interview or answer a written Q&A. That's it.",
  },
  {
    q: "What kind of articles are these?",
    a: "These are organic press articles written by real journalists at real publications. The journalist covers your brand because the story is relevant to their audience — not because anyone paid them. This editorial independence is exactly why AI search engines trust and cite these sources.",
  },
  {
    q: "How fast will I see results?",
    a: "You'll receive a journalist proposal within 30 days. The article publication timeline depends on the journalist's editorial calendar. AI search visibility typically improves within weeks of publication as models index the new coverage.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No commitment, no retainer. Cancel your subscription whenever you want.",
  },
  {
    q: "What publications do your journalists write for?",
    a: "Our network includes journalists from Forbes, TechCrunch, Reuters, Wired, VentureBeat, Business Insider, and hundreds of other DR50+ publications across 160 countries.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  const [discountModal, setDiscountModal] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <UrgencyBanner onClaim={() => setDiscountModal(true)} />
      <main>
        <Hero />

        {/* Stats bar */}
        <section className="py-8 px-4 md:px-6 border-y border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "27%", label: "of ChatGPT sources are organic press", highlight: true },
              { value: "DR 50+", label: "Guaranteed publication authority" },
              { value: "1.7M", label: "Journalists in our network" },
              { value: "160", label: "Countries covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-2xl md:text-3xl font-bold ${stat.highlight ? "text-emerald-600" : "text-gray-900"}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                The problem
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                AI is replacing Google.
                <br />
                <span className="text-gray-400">If AI doesn&apos;t mention you, you don&apos;t exist.</span>
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                When people ask ChatGPT, Perplexity, or Google AI for recommendations,
                these models cite high-authority press coverage. Not ads. Not blog posts. Real editorial content.
              </p>
            </div>

            <BeforeAfterComparison />
          </div>
        </section>

        {/* Why organic press */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-3">
                Why organic press
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                27% of ChatGPT Sources Come
                <br />
                From Organic Press
              </h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm">
                Source: Analysis of 1,000,000+ links from AI responses (Generative Pulse 2025).
                This percentage goes up to 49% when asking for recent information.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-400">95%</div>
                <div className="text-sm text-gray-400 mt-2">of links cited by AI are from <span className="text-white font-medium">non-paid</span> media coverage</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-400">DR 70+</div>
                <div className="text-sm text-gray-400 mt-2"><span className="text-white font-medium">High-authority outlets</span> like Reuters & Forbes are prioritized by AI</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-400">&lt; 12mo</div>
                <div className="text-sm text-gray-400 mt-2">AI prioritizes content published <span className="text-white font-medium">within the last year</span></div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Journalists from these publications covered our clients
              </div>
              <div className="opacity-80">
                <PublicationLogos />
              </div>
            </div>
          </div>
        </section>

        {/* Results / Charts */}
        <section id="results" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Proven results
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Watch Your AI Visibility Grow
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                Organic press coverage compounds over time. Each article strengthens your authority
                and increases your chances of being recommended by AI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <AIVisibilityChart />
              <DomainRatingChart />
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <ChatGPTMentionMockup />
              <GoogleAIOverviewMockup />
            </div>

            <div className="mt-12">
              <AISearchLogos size="lg" />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                How it works
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                3 Steps. 15 Minutes of Your Time.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Share Your URL",
                  desc: "Subscribe and share your website URL. We research your brand, industry, and competitors to craft compelling press angles.",
                  detail: "2 min",
                },
                {
                  step: "02",
                  title: "We Pitch Journalists",
                  desc: "We identify journalists already covering your industry and send personalized pitches. Targeted outreach, not mass emails.",
                  detail: "We handle it",
                },
                {
                  step: "03",
                  title: "Do a Quick Interview",
                  desc: "A journalist from a DR50+ publication engages — for an interview, Q&A, or op-ed. You spend 15 minutes. AI starts recommending you.",
                  detail: "15 min",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-5xl font-bold text-gray-100">{item.step}</div>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-3 inline-block text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="#pricing"
                className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Join {currentMonth()} cohort (1 seat remaining)
              </a>
            </div>
          </div>
        </section>

        <PricingSection />

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Questions & Answers
              </h2>
            </div>
            <div className="space-y-6">
              {faqItems.map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Get Recommended by AI.
              <br />
              <span className="text-emerald-400">$350/mo. Guaranteed.</span>
            </h2>
            <p className="mt-4 text-gray-400">
              One organic press article per month in a DR50+ publication.
              100% money-back guarantee if we don&apos;t deliver.
            </p>
            <a
              href="#pricing"
              className="inline-block mt-8 bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              Join {currentMonth()} cohort (1 seat remaining)
            </a>
            <div className="mt-8">
              <AISearchLogos size="sm" />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {discountModal && (
        <CheckoutModal
          onClose={() => setDiscountModal(false)}
          discount
        />
      )}
    </>
  );
}
