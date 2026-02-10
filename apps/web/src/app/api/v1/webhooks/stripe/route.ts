import { NextRequest, NextResponse } from "next/server";
import { stripe as getStripe } from "@/lib/stripe";
import {
  getOrder,
  updateOrderStatus,
  isWebhookProcessed,
  markWebhookProcessed,
  getApiKeyByEmail,
} from "@/lib/db";
import { getService } from "@/lib/services";
import { sendApiKeyEmail } from "@/lib/email";
import type { ServiceId } from "@/lib/services";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency
  if (await isWebhookProcessed(event.id)) {
    return NextResponse.json({ received: true });
  }
  await markWebhookProcessed(event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.error("No order_id in session metadata");
      return NextResponse.json({ received: true });
    }

    const order = await getOrder(orderId);
    if (!order) {
      console.error("Order not found:", orderId);
      return NextResponse.json({ received: true });
    }

    await updateOrderStatus(orderId, {
      status: "paid",
      paidAt: new Date(),
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : undefined,
    });

    // Send API key email (order confirmation is sent after step 3 brand details)
    try {
      const apiKeyRecord = await getApiKeyByEmail(order.email);
      if (apiKeyRecord) {
        await sendApiKeyEmail(order.email, apiKeyRecord.id);
      }
    } catch (e) {
      console.error("Failed to send API key email:", e);
    }

    const serviceData = getService(order.service as ServiceId);
    console.log(
      `Order ${orderId} paid: ${serviceData?.name || order.service} x${order.quantity}. Ready for fulfillment.`
    );
  }

  return NextResponse.json({ received: true });
}
