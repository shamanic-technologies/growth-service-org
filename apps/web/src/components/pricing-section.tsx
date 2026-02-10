"use client";

import { SERVICES } from "@/lib/services";
import type { ServiceId } from "@/lib/services";
import { useState } from "react";
import { CheckoutModal } from "./checkout-modal";

export function PricingSection({
  orderCompleteId,
  orderCompleteService,
}: {
  orderCompleteId?: string;
  orderCompleteService?: ServiceId;
}) {
  const [selected, setSelected] = useState<{
    serviceId: ServiceId;
    quantity: number;
    orderId?: string;
    initialStep?: "email" | "configure" | "details" | "done";
  } | null>(
    orderCompleteId && orderCompleteService
      ? {
          serviceId: orderCompleteService,
          quantity: 1,
          orderId: orderCompleteId,
          initialStep: "details",
        }
      : null
  );

  return (
    <section id="pricing" className="py-16 md:py-20 px-4 md:px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Transparent Pricing
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Pay per result. Money-back guarantee with 25% deductible on all
            services. Built on open-source{" "}
            <a
              href="https://mcpfactory.org"
              className="underline hover:text-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              MCP Factory
            </a>
            .
          </p>
        </div>

        <div className="space-y-16">
          {/* Sales Services */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
              Sales Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.filter((s) => s.id.startsWith("sales_")).map(
                (service) => (
                  <ServiceCard
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    tiers={service.tiers.map((t) => ({
                      label: t.label,
                      quantity: t.quantityLabel,
                      price: t.priceLabel,
                      onClick: () =>
                        setSelected({
                          serviceId: service.id,
                          quantity: t.quantity,
                        }),
                    }))}
                  />
                )
              )}
            </div>
          </div>

          {/* PR Services */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
              PR Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.filter((s) => s.id.startsWith("pr_")).map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  description={service.description}
                  tiers={service.tiers.map((t) => ({
                    label: t.label,
                    quantity: t.quantityLabel,
                    price: t.priceLabel,
                    onClick: () =>
                      setSelected({
                        serviceId: service.id,
                        quantity: t.quantity,
                      }),
                  }))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Built on open-source */}
        <p className="mt-12 text-center text-sm text-gray-400">
          Built on open-source{" "}
          <a
            href="https://mcpfactory.org"
            className="hover:underline hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP Factory
          </a>
          . All services include money-back guarantee.
        </p>
      </div>

      {selected && (
        <CheckoutModal
          serviceId={selected.serviceId}
          initialQuantity={selected.quantity}
          orderId={selected.orderId}
          initialStep={selected.initialStep}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function ServiceCard({
  name,
  description,
  tiers,
}: {
  name: string;
  description: string;
  tiers: { label: string; quantity: string; price: string; onClick: () => void }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <button
            key={tier.label}
            onClick={tier.onClick}
            className="group border border-gray-100 rounded-xl p-4 text-center hover:border-gray-900 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {tier.label}
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
              {tier.quantity}
            </div>
            <div className="mt-1 text-xl font-semibold">{tier.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
