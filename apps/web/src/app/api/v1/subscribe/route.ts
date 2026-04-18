import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { createOrder } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, brand_url, discount } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const amountCents = discount ? 17500 : 35000;
    const budgetUsd = discount ? 175 : 350;
    const serviceName = discount
      ? "AI Search Visibility — First Month (50% off)"
      : "AI Search Visibility — Monthly";

    // Create order record
    const order = await createOrder({
      email,
      service: "ai_search_visibility",
      quantity: 1,
      frequency: "monthly",
      amountCents,
      budgetUsd,
      brandUrl: brand_url,
    });

    // Create Stripe checkout session
    const checkoutUrl = await createCheckoutSession({
      orderId: order.id,
      serviceId: "pr_hot_leads",
      serviceName,
      quantity: 1,
      customerEmail: email,
      amountCents,
      frequency: "monthly",
      brandUrl: brand_url,
    });

    return NextResponse.json({
      order_id: order.id,
      checkout_url: checkoutUrl,
    });
  } catch (e) {
    console.error("[growthservice] Subscribe error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
