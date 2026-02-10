// Placeholder DB module. Will be replaced with Drizzle + Neon when database is set up.
// For now, uses in-memory storage to allow testing the full flow.

import { randomBytes } from "crypto";

interface ApiKeyRecord {
  id: string;
  email: string;
  createdAt: Date;
}

interface OrderRecord {
  id: string;
  apiKeyId: string;
  email: string;
  service: string;
  quantity: number;
  frequency: string;
  status: string;
  amountCents: number;
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
const apiKeys = new Map<string, ApiKeyRecord>();
const apiKeysByEmail = new Map<string, ApiKeyRecord>();
const orders = new Map<string, OrderRecord>();
const processedWebhooks = new Set<string>();

function generateApiKey(): string {
  return `gsk_${randomBytes(24).toString("base64url")}`;
}

function generateOrderId(): string {
  return `ord_${randomBytes(12).toString("base64url")}`;
}

export async function getOrCreateApiKey(email: string): Promise<ApiKeyRecord> {
  const existing = apiKeysByEmail.get(email.toLowerCase());
  if (existing) return existing;

  const record: ApiKeyRecord = {
    id: generateApiKey(),
    email: email.toLowerCase(),
    createdAt: new Date(),
  };
  apiKeys.set(record.id, record);
  apiKeysByEmail.set(record.email, record);
  return record;
}

export async function getApiKeyRecord(
  apiKey: string
): Promise<ApiKeyRecord | undefined> {
  return apiKeys.get(apiKey);
}

export async function getApiKeyByEmail(
  email: string
): Promise<ApiKeyRecord | undefined> {
  return apiKeysByEmail.get(email.toLowerCase());
}

export async function createOrder(params: {
  apiKeyId: string;
  email: string;
  service: string;
  quantity: number;
  frequency: string;
  amountCents: number;
  brandUrl?: string;
  description?: string;
  stripeCheckoutSessionId?: string;
}): Promise<OrderRecord> {
  const order: OrderRecord = {
    id: generateOrderId(),
    apiKeyId: params.apiKeyId,
    email: params.email,
    service: params.service,
    quantity: params.quantity,
    frequency: params.frequency,
    status: "pending_payment",
    amountCents: params.amountCents,
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

export async function getOrdersByApiKey(
  apiKeyId: string
): Promise<OrderRecord[]> {
  return Array.from(orders.values()).filter((o) => o.apiKeyId === apiKeyId);
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
