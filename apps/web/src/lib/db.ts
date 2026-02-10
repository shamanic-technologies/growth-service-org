// Placeholder DB module. Will be replaced with Drizzle + Neon when database is set up.
// For now, uses in-memory storage to allow testing the full flow.

import { randomBytes } from "crypto";

interface OrderRecord {
  id: string;
  email: string;
  service: string;
  quantity: number;
  frequency: string;
  status: string;
  amountCents: number;
  budgetUsd: number;
  brandUrl?: string;
  description?: string;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  fulfillmentRef?: string;
  fulfillmentMeta?: Record<string, unknown>;
  createdAt: Date;
  paidAt?: Date;
  completedAt?: Date;
}

// In-memory stores (replaced by Neon in production)
const orders = new Map<string, OrderRecord>();
const processedWebhooks = new Set<string>();

function generateOrderId(): string {
  return `ord_${randomBytes(12).toString("base64url")}`;
}

export async function createOrder(params: {
  email: string;
  service: string;
  quantity: number;
  frequency: string;
  amountCents: number;
  budgetUsd: number;
  brandUrl?: string;
  description?: string;
  stripeCheckoutSessionId?: string;
}): Promise<OrderRecord> {
  const order: OrderRecord = {
    id: generateOrderId(),
    email: params.email,
    service: params.service,
    quantity: params.quantity,
    frequency: params.frequency,
    status: "pending_payment",
    amountCents: params.amountCents,
    budgetUsd: params.budgetUsd,
    brandUrl: params.brandUrl,
    description: params.description,
    stripeCheckoutSessionId: params.stripeCheckoutSessionId,
    createdAt: new Date(),
  };
  orders.set(order.id, order);
  return order;
}

export async function getOrder(
  orderId: string
): Promise<OrderRecord | undefined> {
  return orders.get(orderId);
}

export async function getOrdersByEmail(
  email: string
): Promise<OrderRecord[]> {
  return Array.from(orders.values()).filter(
    (o) => o.email.toLowerCase() === email.toLowerCase()
  );
}

export async function updateOrderStatus(
  orderId: string,
  updates: Partial<OrderRecord>
): Promise<void> {
  const order = orders.get(orderId);
  if (order) {
    Object.assign(order, updates);
  }
}

export async function isWebhookProcessed(
  stripeEventId: string
): Promise<boolean> {
  return processedWebhooks.has(stripeEventId);
}

export async function markWebhookProcessed(
  stripeEventId: string
): Promise<void> {
  processedWebhooks.add(stripeEventId);
}
