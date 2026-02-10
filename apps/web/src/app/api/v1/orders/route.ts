import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrdersByEmail } from "@/lib/db";
import { getService } from "@/lib/services";
import { createCheckoutSession } from "@/lib/stripe";
import { sendAdminNotificationEmail, sendWelcomeEmail } from "@/lib/email";
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
    const { service, budget_usd, frequency, email, brand_url, description } =
      body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

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

    // Validate budget and compute quantity
    const budgetUsd = Number(budget_usd);
    if (!budgetUsd || budgetUsd < 1) {
      return NextResponse.json(
        { error: "budget_usd must be a positive number" },
        { status: 400 }
      );
    }

    const unitPriceDollars = serviceData.unitPriceCents / 100;
    const qty = Math.floor(budgetUsd / unitPriceDollars);
    if (qty < 1) {
      return NextResponse.json(
        { error: `Minimum budget is $${unitPriceDollars}` },
        { status: 400 }
      );
    }

    const amountCents = qty * serviceData.unitPriceCents;

    // Create order
    const order = await createOrder({
      email,
      service,
      quantity: qty,
      frequency: frequency || "one_off",
      amountCents,
      budgetUsd,
      brandUrl: brand_url,
      description,
    });

    // Create Stripe checkout session
    const checkoutUrl = await createCheckoutSession({
      orderId: order.id,
      serviceId: service,
      serviceName: serviceData.name,
      quantity: qty,
      customerEmail: email,
      amountCents,
      frequency: frequency || "one_off",
      budgetUsd,
      brandUrl: brand_url,
      description,
    });

    // Send welcome email (fire-and-forget, ok if duplicate)
    sendWelcomeEmail(email).catch((err) =>
      console.error("Welcome email error:", err)
    );

    // Send admin notification (must await on Vercel serverless)
    const amountLabel = `$${(amountCents / 100).toLocaleString()}`;
    await sendAdminNotificationEmail(
      order.id,
      email,
      serviceData.name,
      qty,
      amountLabel,
      frequency || "one_off",
      budgetUsd
    ).catch((err) => console.error("Admin notification error:", err));

    return NextResponse.json({
      order_id: order.id,
      checkout_url: checkoutUrl,
      quantity: qty,
      amount_cents: amountCents,
      budget_usd: budgetUsd,
      service,
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
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      { error: "email query param required" },
      { status: 400 }
    );
  }

  const orders = await getOrdersByEmail(email);
  return NextResponse.json({
    orders: orders.map((o) => ({
      id: o.id,
      service: o.service,
      quantity: o.quantity,
      frequency: o.frequency,
      status: o.status,
      amount_cents: o.amountCents,
      budget_usd: o.budgetUsd,
      brand_url: o.brandUrl,
      created_at: o.createdAt,
      paid_at: o.paidAt,
      completed_at: o.completedAt,
    })),
  });
}
