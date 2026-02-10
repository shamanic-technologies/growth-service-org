import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { getOrCreateApiKey, createOrder, getOrdersByApiKey } from "@/lib/db";
import { getService } from "@/lib/services";
import { createCheckoutSession } from "@/lib/stripe";
import { sendAdminNotificationEmail } from "@/lib/email";
import type { ServiceId } from "@/lib/services";

const VALID_SERVICES: ServiceId[] = [
  "sales_leads",
  "sales_positive_replies",
  "pr_journalist_leads",
  "pr_publication_proposals",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, quantity, frequency, email } = body;

    // Validate service
    if (!service || !VALID_SERVICES.includes(service)) {
      return NextResponse.json(
        {
          error: `Invalid service. Must be one of: ${VALID_SERVICES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const serviceData = getService(service);
    if (!serviceData) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 400 }
      );
    }

    // Validate quantity
    const qty = Number(quantity);
    if (!qty || qty < 1 || !Number.isInteger(qty)) {
      return NextResponse.json(
        { error: "Quantity must be a positive integer" },
        { status: 400 }
      );
    }

    const amountCents = serviceData.unitPriceCents * qty;

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
      quantity: qty,
      frequency: frequency || "one_off",
      amountCents,
    });

    // Create Stripe checkout session
    const checkoutUrl = await createCheckoutSession({
      orderId: order.id,
      serviceId: service,
      serviceName: serviceData.name,
      quantity: qty,
      customerEmail: apiKeyRecord.email,
      amountCents,
    });

    // Send admin notification (don't block response)
    const amountLabel = `$${(amountCents / 100).toLocaleString()}`;
    sendAdminNotificationEmail(
      order.id,
      apiKeyRecord.email,
      serviceData.name,
      qty,
      amountLabel
    ).catch((err) => console.error("Admin notification error:", err));

    return NextResponse.json({
      order_id: order.id,
      checkout_url: checkoutUrl,
      amount_cents: amountCents,
      service,
      quantity: qty,
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
      quantity: o.quantity,
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
