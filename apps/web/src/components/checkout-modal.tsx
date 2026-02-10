"use client";

import { useState, useEffect } from "react";
import type { ServiceId, Frequency } from "@/lib/services";
import { getService, getServiceFrequencies } from "@/lib/services";

type Step = "email" | "configure" | "details" | "done";

export function CheckoutModal({
  serviceId,
  initialBudget,
  orderId: initialOrderId,
  initialStep,
  onClose,
}: {
  serviceId: ServiceId;
  initialBudget: number;
  orderId?: string;
  initialStep?: Step;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(initialStep || "email");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("one_off");
  const [budget, setBudget] = useState(initialBudget);
  const [brandUrl, setBrandUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(initialOrderId || "");

  const service = getService(serviceId);
  const frequencies = getServiceFrequencies(serviceId);

  // Pre-fill email from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gs_email");
    if (saved) setEmail(saved);
  }, []);

  if (!service) return null;

  const unitPriceDollars = service.unitPriceCents / 100;
  const qty = Math.floor(budget / unitPriceDollars);
  const totalCents = qty * service.unitPriceCents;
  const totalLabel = `$${(totalCents / 100).toLocaleString()}`;
  const unitLabel = `$${unitPriceDollars.toLocaleString()}`;
  const canCheckout = qty >= 1;

  const frequencyLabel =
    frequency === "one_off"
      ? ""
      : ` / ${frequencies.find((f) => f.value === frequency)?.label.toLowerCase()}`;

  const steps: Step[] = ["email", "configure", "details"];
  const stepIndex = steps.indexOf(step);

  const handleBudgetChange = (value: number) => {
    if (value < 0) value = 0;
    setBudget(value);
  };

  const handleIncrement = () => {
    // Snap to next multiple of unitPrice
    const nextQty = Math.floor(budget / unitPriceDollars) + 1;
    setBudget(nextQty * unitPriceDollars);
  };

  const handleDecrement = () => {
    const currentQty = Math.floor(budget / unitPriceDollars);
    if (currentQty <= 1) {
      setBudget(unitPriceDollars);
    } else {
      setBudget((currentQty - 1) * unitPriceDollars);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    localStorage.setItem("gs_email", email);

    try {
      await fetch("/api/v1/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-blocking — continue even if welcome email fails
    }

    setLoading(false);
    setStep("configure");
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          service: serviceId,
          budget_usd: budget,
          frequency,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      setOrderId(data.order_id);
      window.location.href = data.checkout_url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const savedEmail = localStorage.getItem("gs_email") || email;
      const res = await fetch(`/api/v1/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: savedEmail,
          brand_url: brandUrl || undefined,
          description: description || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      setStep("done");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
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
            <div className="text-sm text-gray-500">{service.name}</div>
            {step !== "email" && canCheckout && (
              <div className="font-semibold">
                {qty} {service.unit} &middot; {totalLabel}
                {frequencyLabel}
              </div>
            )}
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

        {/* Steps indicator */}
        <div className="px-6 pt-4 flex gap-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                i <= stepIndex ? "bg-gray-900" : "bg-gray-100"
              }`}
            />
          ))}
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit}>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Continue"}
              </button>
            </form>
          )}

          {/* Step 2: Frequency + Budget */}
          {step === "configure" && (
            <form onSubmit={handleCheckout}>
              {/* Frequency */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {frequencies.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFrequency(f.value)}
                    className={`px-3 py-2 text-sm rounded-lg border transition ${
                      frequency === f.value
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Budget */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <div className="flex items-center gap-3 mb-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-lg hover:border-gray-300 transition"
                >
                  -
                </button>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={budget}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v)) handleBudgetChange(v);
                    }}
                    className="w-full text-center border border-gray-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-lg hover:border-gray-300 transition"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                {unitLabel} per {service.unit.replace(/s$/, "")}
                {canCheckout && ` · ${qty} ${service.unit}`}
              </p>

              {/* Total */}
              <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-semibold">
                  {canCheckout ? totalLabel : `Minimum ${unitLabel}`}
                  {canCheckout && frequencyLabel}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || !canCheckout}
                className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading
                  ? "Redirecting to payment..."
                  : canCheckout
                    ? `Checkout ${totalLabel}`
                    : `Minimum ${unitLabel}`}
              </button>
            </form>
          )}

          {/* Step 3: Brand Details (post-checkout) */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit}>
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">
                Payment confirmed! Tell us about your brand to get started.
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand URL
              </label>
              <input
                type="url"
                value={brandUrl}
                onChange={(e) => setBrandUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Campaign brief (1-2 lines)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Get press coverage for our Series A announcement"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Complete Order"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full mt-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                Skip for now
              </button>
            </form>
          )}

          {/* Done */}
          {step === "done" && (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                You&apos;re all set!
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your campaign starts instantly. Check your email for confirmation.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
