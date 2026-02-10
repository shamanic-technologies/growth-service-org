const BASE_URL =
  process.env.GROWTHSERVICE_URL || "https://growthservice.org";
const EMAIL = process.env.GROWTHSERVICE_EMAIL || "";

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

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

export async function listServices() {
  return request("GET", "/api/v1/services");
}

export async function createOrder(params: {
  service: string;
  budget_usd: number;
  frequency?: string;
  brand_url?: string;
  description?: string;
}) {
  return request("POST", "/api/v1/orders", { ...params, email: EMAIL });
}

export async function getOrderStatus(orderId: string) {
  return request("GET", `/api/v1/orders/${orderId}?email=${encodeURIComponent(EMAIL)}`);
}

export async function listOrders() {
  return request("GET", `/api/v1/orders?email=${encodeURIComponent(EMAIL)}`);
}
