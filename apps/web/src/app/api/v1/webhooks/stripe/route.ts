import { NextRequest, NextResponse } from "next/server";
import { stripe as getStripe } from "@/lib/stripe";
import {
  getOrder,
  updateOrderStatus,
  isWebhookProcessed,
  markWebhookProcessed,
  getApiKeyByEmail,
} from "@/lib/db";
import { sendOrderConfirmationEmail, sendApiKeyEmail } from "@/lib/email";
import { getService, getServiceTier } from "@/lib/services";
import type { ServiceId, TierId } from "@/lib/services";

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

    // Send confirmation + API key emails
    try {
      const serviceId = order.service as ServiceId;
      const tierId = order.tier as TierId;
      const service = getService(serviceId);
      const tier = getServiceTier(serviceId, tierId);

      if (service && tier) {
        await sendOrderConfirmationEmail(
          order.email,
          order.id,
          service.name,
          tier.label,
          tier.priceLabel
        );
      }

      // Send API key if this is a new user from landing page
      const apiKeyRecord = await getApiKeyByEmail(order.email);
      if (apiKeyRecord) {
        await sendApiKeyEmail(order.email, apiKeyRecord.id);
      }
    } catch (e) {
      console.error("Failed to send emails:", e);
    }

    // TODO: Dispatch fulfillment to MCP Factory
    console.log(`Order ${orderId} paid. Ready for fulfillment.`);
  }

  return NextResponse.json({ received: true });
}
