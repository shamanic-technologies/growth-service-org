"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import { getEndOfUTCDay, formatCountdown } from "./urgency-banner";

type Step = "info" | "checkout";

export function CheckoutModal({
  onClose,
  discount,
  initialEmail,
}: {
  onClose: () => void;
  discount?: boolean;
  initialEmail?: string;
}) {
  const [step, setStep] = useState<Step>("info");
  const [email, setEmail] = useState(initialEmail || "");
  const [brandUrl, setBrandUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [includeTracking, setIncludeTracking] = useState(true);

  useEffect(() => {
    posthog.capture("modal_opened", { discount: !!discount });
    if (!initialEmail) {
      const saved = localStorage.getItem("gs_email");
      if (saved) setEmail(saved);
    }
    const savedUrl = localStorage.getItem("gs_brand_url");
    if (savedUrl) setBrandUrl(savedUrl);
  }, [initialEmail, discount]);

  // Countdown timer for discount modal
  useEffect(() => {
    if (!discount) return;

    const endOfDay = getEndOfUTCDay();

    const tick = () => {
      const remaining = endOfDay - Date.now();
      setTimeLeft(remaining > 0 ? formatCountdown(remaining) : "00:00:00");
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [discount]);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    localStorage.setItem("gs_email", email);
    if (brandUrl) localStorage.setItem("gs_brand_url", brandUrl);

    try {
      await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, brand_url: brandUrl }),
      });
    } catch {
      // Non-blocking
    }

    posthog.capture("lead_submitted", { email, brand_url: brandUrl, discount: !!discount });
    posthog.identify(email, { email, brand_url: brandUrl });
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
        body: JSON.stringify({
          email,
          brand_url: brandUrl,
          discount: !!discount,
          include_tracking: includeTracking,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      posthog.capture("checkout_started", {
        email,
        brand_url: brandUrl,
        discount: !!discount,
        include_tracking: includeTracking,
        total_cents: todayTotal * 100,
      });
      window.location.href = data.checkout_url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const basePrice = discount ? 250 : 350;
  const trackingPrice = 79;
  const todayTotal = basePrice + (includeTracking ? trackingPrice : 0);
  const monthlyTotal = 350 + (includeTracking ? trackingPrice : 0);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">AI Search Visibility</div>
            <div className="font-semibold">
              {discount ? (
                <>
                  <span className="line-through text-gray-400 mr-1">$350</span>
                  $250/first month &middot; then $350/mo
                </>
              ) : (
                <>$350/month &middot; Cancel anytime</>
              )}
            </div>
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
          {discount && (
            <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 text-sm rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">$100 OFF</span>
                  <span>First month at $250</span>
                </div>
                <span className="font-mono text-xs bg-amber-200/50 px-2 py-1 rounded-md tabular-nums">
                  {timeLeft}
                </span>
              </div>
              <div className="text-xs text-amber-600 mt-1">Then $350/mo. Cancel anytime.</div>
            </div>
          )}

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
                {discount && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">Coupon</span>
                    <span className="font-medium text-amber-600">LAUNCH100 ($100 off first month)</span>
                  </div>
                )}

                {/* AI Visibility Score Tracking add-on */}
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includeTracking}
                      onChange={(e) => {
                        setIncludeTracking(e.target.checked);
                        posthog.capture("tracking_addon_toggled", { checked: e.target.checked });
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium group-hover:text-gray-900">
                          AI Visibility Score Tracking (weekly)
                        </span>
                        <span className="text-sm font-medium">$79/mo</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Weekly report tracking your brand&apos;s visibility across ChatGPT, Perplexity &amp; Google AI
                      </p>
                    </div>
                  </label>
                </div>

                <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
                  <span className="font-medium">Today</span>
                  <span className="text-xl font-bold">
                    {discount ? (
                      <>
                        <span className="line-through text-gray-400 text-sm mr-1">
                          ${350 + (includeTracking ? trackingPrice : 0)}
                        </span>
                        ${todayTotal}
                      </>
                    ) : (
                      `$${todayTotal}`
                    )}
                    <span className="text-sm text-gray-400 font-normal">/mo</span>
                  </span>
                </div>
                {discount && (
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    Then ${monthlyTotal}/mo starting next month
                  </div>
                )}
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
                {loading
                  ? "Redirecting to payment..."
                  : `Subscribe — $${todayTotal}/mo`}
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
