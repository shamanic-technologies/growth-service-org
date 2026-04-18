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

const LAUNCH100_COUPON_ID = "LAUNCH100";

/**
 * Get or create the LAUNCH100 coupon ($100 off first month).
 * Idempotent — safe to call on every request.
 */
async function ensureLaunchCoupon(): Promise<string> {
  const stripe = getStripe();

  try {
    await stripe.coupons.retrieve(LAUNCH100_COUPON_ID);
    return LAUNCH100_COUPON_ID;
  } catch {
    // Coupon doesn't exist yet — create it
    await stripe.coupons.create({
      id: LAUNCH100_COUPON_ID,
      amount_off: 10000,
      currency: "usd",
      duration: "once",
      name: "Launch offer — $100 off first month",
    });
    return LAUNCH100_COUPON_ID;
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
  includeTracking?: boolean;
}): Promise<string> {
  const stripe = getStripe();
  const isRecurring = params.frequency !== "one_off";

  const frequencyLabel =
    params.frequency === "one_off"
      ? ""
      : ` (${params.frequency})`;

  const mainPriceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: "usd",
    product_data: {
      name: `${params.serviceName} x${params.quantity}${frequencyLabel}`,
    },
    unit_amount: params.amountCents,
    ...(isRecurring && {
      recurring: FREQUENCY_TO_RECURRING[params.frequency as Exclude<Frequency, "one_off">],
    }),
  };

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price_data: mainPriceData, quantity: 1 },
  ];

  // Add AI Visibility Score Tracking line item if requested
  if (params.includeTracking && isRecurring) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "AI Visibility Score Tracking (weekly)",
        },
        unit_amount: 7900,
        recurring: FREQUENCY_TO_RECURRING[params.frequency as Exclude<Frequency, "one_off">],
      },
      quantity: 1,
    });
  }

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
    metadata.discount = "LAUNCH100";
  }
  if (params.includeTracking) {
    metadata.include_tracking = "true";
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
    line_items: lineItems,
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
