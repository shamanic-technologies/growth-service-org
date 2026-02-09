import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Journalist Leads - GrowthService Docs",
  description:
    "Get journalists who opened your website, press kit, or replied with interest. Starting at $40 for 2 leads guaranteed.",
};

export default function PrJournalistLeadsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        PR Journalist Leads
      </h1>
      <p className="mt-4 text-gray-500">
        Journalists who opened your website, press kit, or replied with interest
        to your press outreach.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>You provide your brand URL and a short description.</li>
          <li>Our AI crafts personalized pitches and sends them to relevant journalists.</li>
          <li>We track opens, clicks, and replies — each counts as a lead.</li>
          <li>You get a guaranteed number of engaged journalists.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Pricing</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <TierCard tier="Starter" quantity="2 leads guaranteed" price="$40" />
          <TierCard tier="Growth" quantity="20 leads guaranteed" price="$400" />
          <TierCard tier="Scale" quantity="200 leads guaranteed" price="$4,000" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">API usage</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "pr_journalist_leads",
    "tier": "growth",
    "brand_url": "https://yourbrand.com",
    "description": "Series A announcement for our AI startup"
  }'`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Guarantee</h2>
        <p className="mt-3 text-sm text-gray-600">
          If we don&apos;t deliver the guaranteed number of journalist leads
          within 90 days, you get a full refund minus a 25% deductible (which
          covers outreach infrastructure costs).{" "}
          <a href="/terms" className="underline hover:text-gray-900">
            See full terms
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function TierCard({ tier, quantity, price }: { tier: string; quantity: string; price: string }) {
  return (
    <div className="border border-gray-100 rounded-xl p-5 text-center">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{tier}</div>
      <div className="mt-2 text-sm font-medium text-gray-700">{quantity}</div>
      <div className="mt-1 text-xl font-semibold">{price}</div>
    </div>
  );
}
