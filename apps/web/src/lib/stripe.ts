import Stripe from "stripe";
import type { ServiceId } from "./services";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

export async function createCheckoutSession(params: {
  orderId: string;
  serviceId: ServiceId;
  serviceName: string;
  quantity: number;
  customerEmail: string;
  amountCents: number;
}): Promise<string> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${params.serviceName} x${params.quantity}`,
          },
          unit_amount: params.amountCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      order_id: params.orderId,
      service_id: params.serviceId,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/?order_complete=${params.orderId}&service=${params.serviceId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
  });

  return session.url!;
}

export { getStripe as stripe };
