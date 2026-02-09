import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - GrowthService Docs",
  description:
    "How to authenticate with the GrowthService API. Get your API key with a single POST request — no signup required.",
};

export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Authentication
      </h1>
      <p className="mt-4 text-gray-500">
        All API requests (except{" "}
        <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
          GET /services
        </code>
        ) require authentication via an API key.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Get your API key</h2>
        <p className="mt-3 text-sm text-gray-600">
          Request an API key with a single POST request. No signup, no
          dashboard — the key is sent directly to your email.
        </p>
        <pre className="mt-4 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl -X POST https://growthservice.org/api/v1/auth/request-key \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com"}'`}
        </pre>
        <div className="mt-3 text-sm text-gray-500">
          Response:
        </div>
        <pre className="mt-2 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{ "message": "API key sent to your email." }`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          Check your inbox for an email containing your API key (format:{" "}
          <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
            gsk_...
          </code>
          ). One key per email address — requesting again sends the same key.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Using your API key</h2>
        <p className="mt-3 text-sm text-gray-600">
          Include your API key in the{" "}
          <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded font-mono">
            Authorization
          </code>{" "}
          header as a Bearer token:
        </p>
        <pre className="mt-4 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`Authorization: Bearer gsk_YOUR_API_KEY`}
        </pre>

        <div className="mt-6 border border-gray-100 rounded-xl p-4">
          <h3 className="font-medium text-sm">Example: authenticated request</h3>
          <pre className="mt-3 bg-gray-50 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-pre">
{`curl https://growthservice.org/api/v1/orders \\
  -H "Authorization: Bearer gsk_abc123def456"`}
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
                <td className="py-2 pr-4 font-mono text-xs">401</td>
                <td className="py-2">Missing or invalid API key</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-mono text-xs">403</td>
                <td className="py-2">API key doesn&apos;t have access to this resource</td>
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
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Order creation</td>
                <td className="py-2">10 orders / hour</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Auth key requests</td>
                <td className="py-2">5 requests / hour per email</td>
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
