import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { getOrCreateApiKey, createOrder, getOrdersByApiKey } from "@/lib/db";
import { getServiceTier } from "@/lib/services";
import { createCheckoutSession } from "@/lib/stripe";
import type { ServiceId, TierId } from "@/lib/services";

const VALID_SERVICES: ServiceId[] = [
  "pr_journalist_leads",
  "pr_publication_proposals",
  "sales_leads",
  "sales_positive_replies",
];
const VALID_TIERS: TierId[] = ["starter", "growth", "scale"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, tier, frequency, brand_url, description, email } = body;

    // Validate service and tier
    if (!service || !VALID_SERVICES.includes(service)) {
      return NextResponse.json(
        {
          error: `Invalid service. Must be one of: ${VALID_SERVICES.join(", ")}`,
        },
        { status: 400 }
      );
    }
    if (!tier || !VALID_TIERS.includes(tier)) {
      return NextResponse.json(
        { error: `Invalid tier. Must be one of: ${VALID_TIERS.join(", ")}` },
        { status: 400 }
      );
    }

    const serviceTier = getServiceTier(service, tier);
    if (!serviceTier) {
      return NextResponse.json(
        { error: "Service tier not found" },
        { status: 400 }
      );
    }

    // Auth: either Bearer token or email in body (for landing page flow)
    let apiKeyRecord = await authenticateRequest(req);
    if (!apiKeyRecord && email) {
      apiKeyRecord = await getOrCreateApiKey(email);
    }
    if (!apiKeyRecord) {
      return NextResponse.json(
        {
          error:
            "Authentication required. Provide Authorization: Bearer <key> header or email in body.",
        },
        { status: 401 }
      );
    }

    // Create order
    const order = await createOrder({
      apiKeyId: apiKeyRecord.id,
      email: apiKeyRecord.email,
      service,
      tier,
      frequency: frequency || "one_off",
      amountCents: serviceTier.priceCents,
      brandUrl: brand_url,
      description,
    });

    // Create Stripe checkout session
    const checkoutUrl = await createCheckoutSession({
      orderId: order.id,
      serviceId: service,
      tierId: tier,
      customerEmail: apiKeyRecord.email,
      amountCents: serviceTier.priceCents,
    });

    return NextResponse.json({
      order_id: order.id,
      checkout_url: checkoutUrl,
      amount_cents: serviceTier.priceCents,
      service,
      tier,
    });
  } catch (e) {
    console.error("Order creation error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const apiKeyRecord = await authenticateRequest(req);
  if (!apiKeyRecord) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrdersByApiKey(apiKeyRecord.id);
  return NextResponse.json({
    orders: orders.map((o) => ({
      id: o.id,
      service: o.service,
      tier: o.tier,
      frequency: o.frequency,
      status: o.status,
      amount_cents: o.amountCents,
      brand_url: o.brandUrl,
      created_at: o.createdAt,
      paid_at: o.paidAt,
      completed_at: o.completedAt,
    })),
  });
}
