import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference - GrowthService Docs",
  description:
    "Full REST API reference for GrowthService. Create orders, check status, list services. Base URL: https://growthservice.org/api/v1",
};

export default function ApiReferencePage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        API Reference
      </h1>
      <p className="mt-4 text-gray-500">
        Base URL:{" "}
        <code className="bg-gray-50 px-2 py-0.5 rounded text-xs font-mono">
          https://growthservice.org/api/v1
        </code>
      </p>

      {/* Endpoints overview table */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">All endpoints</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-medium text-gray-900">Method</th>
                <th className="py-2 pr-4 font-medium text-gray-900">Path</th>
                <th className="py-2 pr-4 font-medium text-gray-900">Description</th>
                <th className="py-2 font-medium text-gray-900">Auth</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4"><MethodBadge method="POST" /></td>
                <td className="py-2 pr-4 font-mono text-xs">/auth/request-key</td>
                <td className="py-2 pr-4">Request an API key</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4"><MethodBadge method="GET" /></td>
                <td className="py-2 pr-4 font-mono text-xs">/services</td>
                <td className="py-2 pr-4">List all services with pricing</td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4"><MethodBadge method="POST" /></td>
                <td className="py-2 pr-4 font-mono text-xs">/orders</td>
                <td className="py-2 pr-4">Create an order</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4"><MethodBadge method="GET" /></td>
                <td className="py-2 pr-4 font-mono text-xs">/orders/:id</td>
                <td className="py-2 pr-4">Get order details</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4"><MethodBadge method="GET" /></td>
                <td className="py-2 pr-4 font-mono text-xs">/orders</td>
                <td className="py-2 pr-4">List all your orders</td>
                <td className="py-2">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* POST /auth/request-key */}
      <section className="mt-14" id="auth-request-key">
        <EndpointHeader method="POST" path="/auth/request-key" auth={false} />
        <p className="mt-3 text-sm text-gray-600">
          Request an API key. The key is sent to your email — no signup
          required. If you already have a key, the same key is re-sent.
        </p>

        <ParamsTable
          params={[
            {
              name: "email",
              type: "string",
              required: true,
              description: "Your email address",
            },
          ]}
        />

        <h4 className="mt-6 text-sm font-medium text-gray-900">Request</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/auth/request-key \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com"}'`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Response</h4>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "message": "API key sent to your email."
}`}
        </pre>
      </section>

      {/* GET /services */}
      <section className="mt-14" id="services">
        <EndpointHeader method="GET" path="/services" auth={false} />
        <p className="mt-3 text-sm text-gray-600">
          List all available services with tiers and pricing. Public endpoint —
          no authentication required.
        </p>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Request</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl https://growthservice.org/api/v1/services`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Response</h4>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "services": [
    {
      "id": "sales_leads",
      "name": "Sales Leads",
      "description": "Prospects who opened your website or replied...",
      "unit": "leads",
      "tiers": [
        {
          "tier": "starter",
          "label": "Starter",
          "quantity": 5,
          "quantityLabel": "5 leads guaranteed",
          "priceCents": 4000,
          "priceLabel": "$40"
        },
        {
          "tier": "growth",
          "label": "Growth",
          "quantity": 50,
          "quantityLabel": "50 leads guaranteed",
          "priceCents": 40000,
          "priceLabel": "$400"
        },
        {
          "tier": "scale",
          "label": "Scale",
          "quantity": 500,
          "quantityLabel": "500 leads guaranteed",
          "priceCents": 400000,
          "priceLabel": "$4,000"
        }
      ]
    },
    ...
  ]
}`}
        </pre>
      </section>

      {/* POST /orders */}
      <section className="mt-14" id="create-order">
        <EndpointHeader method="POST" path="/orders" auth={true} />
        <p className="mt-3 text-sm text-gray-600">
          Create an order for a service. Returns a Stripe checkout URL.
          Redirect the user to pay — the order is fulfilled automatically after
          payment.
        </p>

        <ParamsTable
          params={[
            {
              name: "service",
              type: "string",
              required: true,
              description:
                "Service ID: pr_journalist_leads, pr_publication_proposals, sales_leads, or sales_positive_replies",
            },
            {
              name: "quantity",
              type: "number",
              required: true,
              description: "Number of results to deliver",
            },
            {
              name: "brand_url",
              type: "string",
              required: false,
              description: "Your brand website URL",
            },
            {
              name: "description",
              type: "string",
              required: false,
              description:
                "Brief description of your brand and what you want (1-2 lines)",
            },
          ]}
        />

        <h4 className="mt-6 text-sm font-medium text-gray-900">Request</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "sales_leads",
    "quantity": 10,
    "brand_url": "https://yourbrand.com",
    "description": "B2B SaaS targeting CTOs at mid-market companies"
  }'`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Response</h4>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "order_id": "ord_a1b2c3d4e5",
  "checkout_url": "https://checkout.stripe.com/c/pay/cs_live_..."
}`}
        </pre>

        <div className="mt-4 bg-blue-50 text-blue-800 text-sm rounded-xl p-4">
          Open the <code className="text-xs font-mono">checkout_url</code> in a
          browser to complete payment via Stripe. After payment, the order
          status updates to <code className="text-xs font-mono">paid</code> and
          fulfillment starts automatically.
        </div>
      </section>

      {/* GET /orders/:id */}
      <section className="mt-14" id="get-order">
        <EndpointHeader method="GET" path="/orders/:id" auth={true} />
        <p className="mt-3 text-sm text-gray-600">
          Get details and status for a specific order.
        </p>

        <ParamsTable
          params={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "Order ID (in URL path)",
            },
          ]}
        />

        <h4 className="mt-6 text-sm font-medium text-gray-900">Request</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl https://growthservice.org/api/v1/orders/ord_a1b2c3d4e5 \\
  -H "Authorization: Bearer gsk_YOUR_KEY"`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Response</h4>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "id": "ord_a1b2c3d4e5",
  "service": "sales_leads",
  "quantity": 10,
  "status": "paid",
  "amount_cents": 40000,
  "brand_url": "https://yourbrand.com",
  "description": "B2B SaaS targeting CTOs",
  "created_at": "2026-02-09T12:00:00.000Z",
  "paid_at": "2026-02-09T12:05:00.000Z"
}`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">
          Order statuses
        </h4>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-medium text-gray-900">Status</th>
                <th className="py-2 font-medium text-gray-900">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  <code className="text-xs font-mono bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded">
                    pending
                  </code>
                </td>
                <td className="py-2">Order created, awaiting payment</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  <code className="text-xs font-mono bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                    paid
                  </code>
                </td>
                <td className="py-2">Payment received, fulfillment started</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  <code className="text-xs font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                    fulfilled
                  </code>
                </td>
                <td className="py-2">All guaranteed results delivered</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  <code className="text-xs font-mono bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
                    refunded
                  </code>
                </td>
                <td className="py-2">
                  Order refunded per{" "}
                  <a href="/terms" className="underline">
                    guarantee terms
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* GET /orders */}
      <section className="mt-14" id="list-orders">
        <EndpointHeader method="GET" path="/orders" auth={true} />
        <p className="mt-3 text-sm text-gray-600">
          List all orders associated with your API key.
        </p>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Request</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_YOUR_KEY"`}
        </pre>

        <h4 className="mt-6 text-sm font-medium text-gray-900">Response</h4>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "orders": [
    {
      "id": "ord_a1b2c3d4e5",
      "service": "sales_leads",
      "quantity": 10,
      "status": "paid",
      "amount_cents": 40000,
      "created_at": "2026-02-09T12:00:00.000Z"
    }
  ]
}`}
        </pre>
      </section>

      {/* Errors */}
      <section className="mt-14" id="errors">
        <h2 className="text-xl font-semibold">Error responses</h2>
        <p className="mt-3 text-sm text-gray-600">
          All errors return a JSON object with an{" "}
          <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
            error
          </code>{" "}
          field:
        </p>
        <pre className="mt-4 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "error": "Missing required field: service"
}`}
        </pre>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-medium text-gray-900">Code</th>
                <th className="py-2 font-medium text-gray-900">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">400</td>
                <td className="py-2">Bad request — check params</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">401</td>
                <td className="py-2">Missing or invalid API key</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">404</td>
                <td className="py-2">Order not found</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">429</td>
                <td className="py-2">Rate limited — slow down</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">500</td>
                <td className="py-2">Server error — try again</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function EndpointHeader({
  method,
  path,
  auth,
}: {
  method: string;
  path: string;
  auth: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-gray-100">
      <MethodBadge method={method} />
      <code className="text-sm md:text-base font-mono font-semibold break-all">
        {path}
      </code>
      {auth ? (
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto shrink-0">
          Auth required
        </span>
      ) : (
        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full ml-auto shrink-0">
          Public
        </span>
      )}
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded shrink-0 ${
        method === "GET"
          ? "bg-green-50 text-green-700"
          : "bg-blue-50 text-blue-700"
      }`}
    >
      {method}
    </span>
  );
}

function ParamsTable({
  params,
}: {
  params: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
}) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900">Parameters</h4>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 pr-4 font-medium text-gray-900">Name</th>
              <th className="py-2 pr-4 font-medium text-gray-900">Type</th>
              <th className="py-2 pr-4 font-medium text-gray-900">Required</th>
              <th className="py-2 font-medium text-gray-900">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {params.map((p) => (
              <tr key={p.name} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">{p.name}</td>
                <td className="py-2 pr-4 font-mono text-xs">{p.type}</td>
                <td className="py-2 pr-4">
                  {p.required ? (
                    <span className="text-xs text-red-600 font-medium">
                      Required
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Optional</span>
                  )}
                </td>
                <td className="py-2">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
