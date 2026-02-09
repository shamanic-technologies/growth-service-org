import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Confirmed - GrowthService",
  description: "Your GrowthService order has been confirmed. Check your email for your API key and order details.",
  robots: { index: false, follow: false },
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Payment Confirmed</h1>
        <p className="mt-3 text-gray-500">
          Your order is being processed. Check your email for your API key and
          order confirmation.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Your campaign starts instantly. First results within days.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/"
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to Home
          </a>
          <a
            href="/docs"
            className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:border-gray-300 transition"
          >
            View Docs
          </a>
        </div>
      </div>
    </div>
  );
}
