"use client";

import { useState } from "react";
import type { ServiceId, TierId, Frequency } from "@/lib/services";
import { getService, getServiceTier, getServiceFrequencies } from "@/lib/services";

type Step = "email" | "details";

export function CheckoutModal({
  serviceId,
  tierId,
  onClose,
}: {
  serviceId: ServiceId;
  tierId: TierId;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("one_off");
  const [brandUrl, setBrandUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const service = getService(serviceId);
  const tier = getServiceTier(serviceId, tierId);
  const frequencies = getServiceFrequencies(serviceId);

  if (!service || !tier) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("details");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
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
          tier: tierId,
          frequency,
          brand_url: brandUrl || undefined,
          description: description || undefined,
        }),
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

  const frequencyLabel =
    frequency === "one_off"
      ? ""
      : ` / ${frequencies.find((f) => f.value === frequency)?.label.toLowerCase()}`;

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
            <div className="font-semibold">
              {tier.quantityLabel} &middot; {tier.priceLabel}
              {frequencyLabel}
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

        {/* Steps indicator */}
        <div className="px-6 pt-4 flex gap-2">
          {(["email", "details"] as const).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                i <= ["email", "details"].indexOf(step)
                  ? "bg-gray-900"
                  : "bg-gray-100"
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
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Continue
              </button>
            </form>
          )}

          {step === "details" && (
            <form onSubmit={handleDetailsSubmit}>
              {/* Frequency */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
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

              {/* Brand details */}
              <p className="text-sm text-gray-500 mb-4">
                Tell us about your brand (optional — you can add this later).
              </p>

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
                What do you want? (1-2 lines)
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
                {loading
                  ? "Redirecting to payment..."
                  : `Pay ${tier.priceLabel}${frequencyLabel}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
