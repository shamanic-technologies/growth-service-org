import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { createOrder } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, brand_url, discount, include_tracking } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Always create the subscription at $350/mo — discount is applied via Stripe coupon
    const order = await createOrder({
      email,
      service: "ai_search_visibility",
      quantity: 1,
      frequency: "monthly",
      amountCents: 35000,
      budgetUsd: 350,
      brandUrl: brand_url,
    });

    const checkoutUrl = await createCheckoutSession({
      orderId: order.id,
      serviceId: "pr_hot_leads",
      serviceName: "AI Search Visibility — Monthly",
      quantity: 1,
      customerEmail: email,
      amountCents: 35000,
      frequency: "monthly",
      brandUrl: brand_url,
      discount: !!discount,
      includeTracking: !!include_tracking,
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
