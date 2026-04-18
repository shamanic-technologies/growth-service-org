import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Aboard - GrowthService",
  description: "Your subscription is confirmed. We'll get started on your AI Search visibility right away.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-semibold">You&apos;re all set!</h1>
        <p className="mt-3 text-gray-500">
          Your subscription is confirmed. We&apos;re already researching your brand
          and preparing journalist pitches.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Expect a journalist proposal within 30 days. We&apos;ll keep you posted via email.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
