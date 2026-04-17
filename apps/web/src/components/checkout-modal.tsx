"use client";

import { useState, useEffect } from "react";

type Step = "info" | "checkout";

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("info");
  const [email, setEmail] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gs_email");
    if (saved) setEmail(saved);
    const savedUrl = localStorage.getItem("gs_brand_url");
    if (savedUrl) setBrandUrl(savedUrl);
  }, []);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    localStorage.setItem("gs_email", email);
    if (brandUrl) localStorage.setItem("gs_brand_url", brandUrl);

    try {
      // Capture lead + send notification
      await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, brand_url: brandUrl }),
      });
    } catch {
      // Non-blocking — continue even if lead capture fails
    }

    setLoading(false);
    setStep("checkout");
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, brand_url: brandUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      window.location.href = data.checkout_url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">AI Search Visibility</div>
            <div className="font-semibold">$350/month &middot; Cancel anytime</div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Email + Brand URL */}
          {step === "info" && (
            <form onSubmit={handleInfoSubmit}>
              <p className="text-sm text-gray-500 mb-4">
                Tell us about your brand. We&apos;ll take it from here.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Your website
              </label>
              <input
                type="url"
                required
                value={brandUrl}
                onChange={(e) => setBrandUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "..." : "Continue to Payment"}
              </button>

              <p className="mt-3 text-xs text-gray-400 text-center">
                100% money-back guarantee. Cancel anytime.
              </p>
            </form>
          )}

          {/* Step 2: Confirm + redirect to Stripe */}
          {step === "checkout" && (
            <div>
              <div className="mb-5 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">AI Search Visibility</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Frequency</span>
                  <span className="font-medium">Monthly</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Includes</span>
                  <span className="font-medium">1 organic press article</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Guarantee</span>
                  <span className="font-medium text-emerald-600">100% money-back</span>
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">$350<span className="text-sm text-gray-400 font-normal">/mo</span></span>
                </div>
              </div>

              <div className="mb-4 text-xs text-gray-400 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{email}</span>
                  <button
                    onClick={() => setStep("info")}
                    className="text-gray-400 hover:text-gray-600 underline"
                  >
                    edit
                  </button>
                </div>
                <div className="text-gray-500">{brandUrl}</div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Redirecting to payment..." : "Subscribe — $350/mo"}
              </button>

              <p className="mt-3 text-xs text-gray-400 text-center">
                Secure payment via Stripe. Cancel anytime.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
