import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engaged Sales Leads - GrowthService Docs",
  description:
    "Get prospects who visited your website after receiving outreach on your behalf. Starting at $8 for 1 lead guaranteed.",
};

export default function SalesEngagedLeadsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Engaged Sales Leads
      </h1>
      <p className="mt-4 text-gray-500">
        Prospects who visited your website after receiving outreach on your
        behalf.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>You provide your brand URL and a short description of your ideal customer.</li>
          <li>Our AI identifies prospects, crafts personalized outreach, and contacts them.</li>
          <li>We track website visits — each visitor counts as an engaged lead.</li>
          <li>You get a guaranteed number of engaged prospects.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Pricing</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <TierCard tier="Starter" quantity="1 engaged lead guaranteed" price="$8" />
          <TierCard tier="Growth" quantity="10 engaged leads guaranteed" price="$80" />
          <TierCard tier="Scale" quantity="100 engaged leads guaranteed" price="$800" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">API usage</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@company.com",
    "service": "sales_engaged_leads",
    "budget_usd": 80,
    "brand_url": "https://yourbrand.com",
    "description": "B2B SaaS targeting CTOs at mid-market companies"
  }'`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Guarantee</h2>
        <p className="mt-3 text-sm text-gray-600">
          If we don&apos;t deliver the guaranteed number of engaged leads within 90
          days, you get a full refund minus a 25% deductible (which covers
          outreach infrastructure costs).{" "}
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
