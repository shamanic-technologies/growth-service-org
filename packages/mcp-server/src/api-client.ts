const BASE_URL =
  process.env.GROWTHSERVICE_URL || "https://growthservice.org";
const API_KEY = process.env.GROWTHSERVICE_API_KEY || "";

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

export async function requestApiKey(email: string) {
  return request("POST", "/api/v1/auth/request-key", { email });
}

export async function listServices() {
  return request("GET", "/api/v1/services");
}

export async function createOrder(params: {
  service: string;
  tier: string;
  brand_url?: string;
  description?: string;
}) {
  return request("POST", "/api/v1/orders", params);
}

export async function getOrderStatus(orderId: string) {
  return request("GET", `/api/v1/orders/${orderId}`);
}

export async function listOrders() {
  return request("GET", "/api/v1/orders");
}
