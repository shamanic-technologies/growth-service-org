import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - GrowthService Docs",
  description:
    "How to authenticate with the GrowthService API. Email-based auth — no signup, no API keys.",
};

export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Authentication
      </h1>
      <p className="mt-4 text-gray-500">
        GrowthService uses email-based authentication. Include your email in
        the request body (POST) or as a query parameter (GET). No API keys,
        no signup.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-3 text-sm text-gray-600">
          Pass your email address with every request. For POST requests, include
          it in the JSON body. For GET requests, use the{" "}
          <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
            email
          </code>{" "}
          query parameter.
        </p>

        <div className="mt-6 border border-gray-100 rounded-xl p-4">
          <h3 className="font-medium text-sm">Example: create an order</h3>
          <pre className="mt-3 bg-gray-50 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@company.com",
    "service": "sales_engaged_leads",
    "budget_usd": 80
  }'`}
          </pre>
        </div>

        <div className="mt-4 border border-gray-100 rounded-xl p-4">
          <h3 className="font-medium text-sm">Example: list your orders</h3>
          <pre className="mt-3 bg-gray-50 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl "https://growthservice.org/api/v1/orders?email=you@company.com"`}
          </pre>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Errors</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-medium text-gray-900">Status</th>
                <th className="py-2 pr-4 font-medium text-gray-900">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">400</td>
                <td className="py-2">Missing email</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">403</td>
                <td className="py-2">Email doesn&apos;t match the order</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Rate limits</h2>
        <p className="mt-3 text-sm text-gray-600">
          API requests are rate-limited to prevent abuse:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-medium text-gray-900">Endpoint</th>
                <th className="py-2 font-medium text-gray-900">Limit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">General API</td>
                <td className="py-2">100 requests / minute</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Order creation</td>
                <td className="py-2">10 orders / hour</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Rate-limited requests return HTTP 429. Retry after the{" "}
          <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
            Retry-After
          </code>{" "}
          header value (in seconds).
        </p>
      </section>
    </div>
  );
}
