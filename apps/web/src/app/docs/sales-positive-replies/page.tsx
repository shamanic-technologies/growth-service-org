import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Sales Leads - GrowthService Docs",
  description:
    "Get qualified prospects who expressed genuine interest in your product. Starting at $32 for 1 reply guaranteed.",
};

export default function SalesPositiveRepliesPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Hot Sales Leads
      </h1>
      <p className="mt-4 text-gray-500">
        Qualified prospects who expressed genuine interest in your product or
        service.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>You provide your brand URL and a description of what you sell.</li>
          <li>Our AI identifies ideal prospects and sends personalized outreach.</li>
          <li>We follow up and nurture conversations.</li>
          <li>A positive reply = a prospect who expressed interest, asked for a demo, or wants to learn more.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Pricing</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <TierCard tier="Starter" quantity="1 reply guaranteed" price="$32" />
          <TierCard tier="Growth" quantity="10 replies guaranteed" price="$320" />
          <TierCard tier="Scale" quantity="100 replies guaranteed" price="$3,200" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">API usage</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "sales_positive_replies",
    "quantity": 10,
    "brand_url": "https://yourbrand.com",
    "description": "AI tool for sales teams, targeting VP Sales"
  }'`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Guarantee</h2>
        <p className="mt-3 text-sm text-gray-600">
          If we don&apos;t deliver the guaranteed number of positive replies
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
