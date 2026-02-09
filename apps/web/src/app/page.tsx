import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

const faqItems = [
  {
    q: "What is the money-back guarantee?",
    a: "If we don't deliver the guaranteed number of results within 90 days, you get a refund minus a 25% deductible (which covers our infrastructure costs). We use conservative estimates so refunds are rare.",
  },
  {
    q: "How does pricing work?",
    a: "You pay upfront for a guaranteed number of results. Pick a service (PR or Sales), pick a tier (Starter, Growth, Scale), and pay. We deliver or refund.",
  },
  {
    q: "What counts as a 'lead'?",
    a: "A lead is someone who opened your website, viewed your press kit, or replied with questions/interest. We track engagement through our outreach platform.",
  },
  {
    q: "Can I use this programmatically?",
    a: "Yes. Get an API key via POST /api/v1/auth/request-key, then create orders via the REST API. We also have an MCP server for AI assistants.",
  },
  {
    q: "What is MCP Factory?",
    a: "MCP Factory is the open-source engine that powers GrowthService. You can use it directly (BYOK (Bring Your Own Keys), no markups, no guarantees) or use GrowthService for the managed, guaranteed experience.",
  },
  {
    q: "How fast do I get results?",
    a: "Campaigns start instantly after payment. You'll see first results within days, not weeks. Full delivery depends on the tier size. Journalists take more time to answer than sales leads.",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />

        {/* Services overview */}
        <section id="services" className="py-16 md:py-20 px-4 md:px-6 border-t border-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              What We Do
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              AI-powered outreach that delivers guaranteed results. Two
              verticals, four products.
            </p>

            <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  PR
                </div>
                <h3 className="mt-2 text-lg font-semibold">Press Outreach</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  AI pitches journalists at scale. Get journalist leads
                  (clicks/opens) or publication proposals (positive replies).
                </p>
              </div>
              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Sales
                </div>
                <h3 className="mt-2 text-lg font-semibold">Cold Email Outreach</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  AI finds and emails your ideal prospects. Get sales leads
                  (clicks/opens) or positive replies (qualified interest).
                </p>
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              How It Works
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Buy",
                  desc: "Pick a service, pick a tier, pay.",
                },
                {
                  step: "2",
                  title: "Brief Us",
                  desc: "Share your brand URL and a 1-2 line description. That's it.",
                },
                {
                  step: "3",
                  title: "Get Results",
                  desc: "We deliver guaranteed outcomes or your money back.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto text-sm font-semibold">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Ways to Buy */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-gray-50/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Three Ways to Buy
            </h2>
            <p className="mt-4 text-gray-500">
              Use whichever fits your workflow.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-2xl">🌐</div>
                <h3 className="mt-3 font-semibold">Website</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Click Buy on any pricing card above. Easiest way to start.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-2xl">⚡</div>
                <h3 className="mt-3 font-semibold">REST API</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Programmatic access. Get an API key, create orders, track results.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-2xl">🤖</div>
                <h3 className="mt-3 font-semibold">MCP Server</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Use from Claude, ChatGPT, or any MCP-compatible AI assistant.
                </p>
              </div>
            </div>

            {/* API preview */}
            <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
              <pre className="bg-gray-900 text-gray-100 rounded-2xl p-4 md:p-6 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
<span className="text-gray-500"># Get your API key</span>{"\n"}curl -X POST growthservice.org/api/v1/auth/request-key \{"\n"}{"  "}{`-d '{"email":"you@co.com"}'`}{"\n"}{"\n"}<span className="text-gray-500"># Create an order</span>{"\n"}curl -X POST growthservice.org/api/v1/orders \{"\n"}{"  "}-H &quot;Authorization: Bearer gsk_...&quot; \{"\n"}{"  "}{`-d '{"service":"sales_leads","tier":"growth"}'`}
              </pre>
              <pre className="bg-gray-900 text-gray-100 rounded-2xl p-4 md:p-6 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
<span className="text-gray-500">// Claude Desktop config</span>{"\n"}{`{
  "mcpServers": {
    "growthservice": {
      "command": "npx",
      "args": [
        "@growthservice/mcp-server"
      ],
      "env": {
        "GROWTHSERVICE_API_KEY": "gsk_..."
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
              FAQ
            </h2>
            <div className="mt-12 space-y-6">
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
        <section className="py-16 md:py-20 px-4 md:px-6 bg-gray-900 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Ready to grow?
            </h2>
            <p className="mt-4 text-gray-400">
              Guaranteed results or your money back. Start in under 2 minutes.
            </p>
            <a
              href="#pricing"
              className="inline-block mt-8 bg-white text-gray-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              See Pricing
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
