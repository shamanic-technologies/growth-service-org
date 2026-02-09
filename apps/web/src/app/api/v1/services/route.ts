import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/services";

export async function GET() {
  const services = SERVICES.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    unit: s.unit,
    tiers: s.tiers.map((t) => ({
      tier: t.tier,
      label: t.label,
      quantity: t.quantity,
      quantity_label: t.quantityLabel,
      price_cents: t.priceCents,
      price_label: t.priceLabel,
    })),
  }));

  return NextResponse.json({ services });
}
