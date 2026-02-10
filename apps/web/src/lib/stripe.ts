import Stripe from "stripe";
import type { ServiceId } from "./services";
import type { Frequency } from "./services";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

const FREQUENCY_TO_RECURRING: Record<
  Exclude<Frequency, "one_off">,
  Stripe.PriceCreateParams.Recurring
> = {
  weekly: { interval: "week" },
  monthly: { interval: "month" },
  quarterly: { interval: "month", interval_count: 3 },
};

export async function createCheckoutSession(params: {
  orderId: string;
  serviceId: ServiceId;
  serviceName: string;
  quantity: number;
  customerEmail: string;
  amountCents: number;
  frequency: Frequency;
  budgetUsd?: number;
  brandUrl?: string;
  description?: string;
}): Promise<string> {
  const stripe = getStripe();
  const isRecurring = params.frequency !== "one_off";

  const frequencyLabel =
    params.frequency === "one_off"
      ? ""
      : ` (${params.frequency})`;

  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: "usd",
    product_data: {
      name: `${params.serviceName} x${params.quantity}${frequencyLabel}`,
    },
    unit_amount: params.amountCents,
    ...(isRecurring && {
      recurring: FREQUENCY_TO_RECURRING[params.frequency as Exclude<Frequency, "one_off">],
    }),
  };

  const metadata: Record<string, string> = {
    order_id: params.orderId,
    service_id: params.serviceId,
    customer_email: params.customerEmail,
    quantity: String(params.quantity),
    frequency: params.frequency,
    amount_cents: String(params.amountCents),
  };
  if (params.budgetUsd !== undefined) {
    metadata.budget_usd = String(params.budgetUsd);
  }
  if (params.brandUrl) {
    metadata.brand_url = params.brandUrl.slice(0, 500);
  }
  if (params.description) {
    metadata.description = params.description.slice(0, 500);
  }

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    customer_email: params.customerEmail,
    line_items: [{ price_data: priceData, quantity: 1 }],
    metadata,
    ...(isRecurring && {
      subscription_data: { metadata },
    }),
    success_url: `${process.env.NEXT_PUBLIC_URL}/?order_complete=${params.orderId}&service=${params.serviceId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
  });

  return session.url!;
}

export { getStripe as stripe };
