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

const LAUNCH50_COUPON_ID = "LAUNCH50";

/**
 * Get or create the LAUNCH50 coupon (50% off first month).
 * Idempotent — safe to call on every request.
 */
async function ensureLaunchCoupon(): Promise<string> {
  const stripe = getStripe();

  try {
    await stripe.coupons.retrieve(LAUNCH50_COUPON_ID);
    return LAUNCH50_COUPON_ID;
  } catch {
    // Coupon doesn't exist yet — create it
    await stripe.coupons.create({
      id: LAUNCH50_COUPON_ID,
      percent_off: 50,
      duration: "once",
      name: "Launch offer — 50% off first month",
    });
    return LAUNCH50_COUPON_ID;
  }
}

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
  discount?: boolean;
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
  if (params.discount) {
    metadata.discount = "LAUNCH50";
  }

  // If discount requested, ensure the coupon exists
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (params.discount && isRecurring) {
    const couponId = await ensureLaunchCoupon();
    discounts = [{ coupon: couponId }];
  }

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    customer_email: params.customerEmail,
    line_items: [{ price_data: priceData, quantity: 1 }],
    metadata,
    ...(discounts && { discounts }),
    ...(isRecurring && {
      subscription_data: { metadata },
    }),
    success_url: `${process.env.NEXT_PUBLIC_URL}/?order_complete=${params.orderId}&service=${params.serviceId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
  });

  return session.url!;
}

export { getStripe as stripe };
