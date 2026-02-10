import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quickstart - GrowthService Docs",
  description:
    "Get started with GrowthService in under 2 minutes. Get your API key and create your first order.",
};

export default function QuickstartPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Quickstart
      </h1>
      <p className="mt-4 text-gray-500">
        Get your API key and create your first order in under 2 minutes.
      </p>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            1. Get your API key
          </h2>
          <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
{`curl -X POST https://growthservice.org/api/v1/auth/request-key \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com"}'

# Check your email for the API key (gsk_...)`}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            2. Browse services
          </h2>
          <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
{`curl https://growthservice.org/api/v1/services`}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            3. Create an order
          </h2>
          <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "sales_leads",
    "quantity": 10,
    "brand_url": "https://yourbrand.com",
    "description": "B2B SaaS targeting CTOs"
  }'

# Returns { order_id, checkout_url }
# Open checkout_url to pay via Stripe`}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            4. Check order status
          </h2>
          <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
{`curl https://growthservice.org/api/v1/orders/ord_YOUR_ORDER \\
  -H "Authorization: Bearer gsk_YOUR_KEY"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
