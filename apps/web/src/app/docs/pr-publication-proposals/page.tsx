import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Publication Proposals - GrowthService Docs",
  description:
    "Get positive replies from journalists ready to publish about your brand. Starting at $600 for 1 proposal guaranteed.",
};

export default function PrPublicationProposalsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        PR Publication Proposals
      </h1>
      <p className="mt-4 text-gray-500">
        Positive replies from journalists ready to publish about your brand.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>You provide your brand URL and a short description.</li>
          <li>Our AI identifies and pitches relevant journalists at scale.</li>
          <li>We follow up and nurture conversations until we get positive replies.</li>
          <li>A proposal = a journalist who confirmed interest in writing about you.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Pricing</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <TierCard tier="Starter" quantity="1 proposal guaranteed" price="$600" />
          <TierCard tier="Growth" quantity="5 proposals guaranteed" price="$3,000" />
          <TierCard tier="Scale" quantity="10 proposals guaranteed" price="$6,000" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">API usage</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "pr_publication_proposals",
    "tier": "starter",
    "brand_url": "https://yourbrand.com",
    "description": "Looking for tech press coverage"
  }'`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Guarantee</h2>
        <p className="mt-3 text-sm text-gray-600">
          If we don&apos;t deliver the guaranteed number of publication proposals
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
