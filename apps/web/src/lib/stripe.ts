import Stripe from "stripe";
import type { ServiceId, TierId } from "./services";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

// Maps service+tier to Stripe Price IDs (set via env vars)
const PRICE_MAP: Record<string, string | undefined> = {
  pr_journalist_leads_starter: process.env.STRIPE_PRICE_PR_LEADS_STARTER,
  pr_journalist_leads_growth: process.env.STRIPE_PRICE_PR_LEADS_GROWTH,
  pr_journalist_leads_scale: process.env.STRIPE_PRICE_PR_LEADS_SCALE,
  pr_publication_proposals_starter: process.env.STRIPE_PRICE_PR_PUBS_STARTER,
  pr_publication_proposals_growth: process.env.STRIPE_PRICE_PR_PUBS_GROWTH,
  pr_publication_proposals_scale: process.env.STRIPE_PRICE_PR_PUBS_SCALE,
  sales_leads_starter: process.env.STRIPE_PRICE_SALES_LEADS_STARTER,
  sales_leads_growth: process.env.STRIPE_PRICE_SALES_LEADS_GROWTH,
  sales_leads_scale: process.env.STRIPE_PRICE_SALES_LEADS_SCALE,
  sales_positive_replies_starter: process.env.STRIPE_PRICE_SALES_REPLIES_STARTER,
  sales_positive_replies_growth: process.env.STRIPE_PRICE_SALES_REPLIES_GROWTH,
  sales_positive_replies_scale: process.env.STRIPE_PRICE_SALES_REPLIES_SCALE,
};

export function getStripePriceId(
  serviceId: ServiceId,
  tierId: TierId
): string | undefined {
  return PRICE_MAP[`${serviceId}_${tierId}`];
}

export async function createCheckoutSession(params: {
  orderId: string;
  serviceId: ServiceId;
  tierId: TierId;
  customerEmail: string;
  amountCents: number;
}): Promise<string> {
  const stripe = getStripe();
  const priceId = getStripePriceId(params.serviceId, params.tierId);

  const lineItems = priceId
    ? [{ price: priceId, quantity: 1 }]
    : [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${params.serviceId} (${params.tierId})`,
            },
            unit_amount: params.amountCents,
          },
          quantity: 1,
        },
      ];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: lineItems,
    metadata: {
      order_id: params.orderId,
      service_id: params.serviceId,
      tier_id: params.tierId,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?order_id=${params.orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
  });

  return session.url!;
}

export { getStripe as stripe };
