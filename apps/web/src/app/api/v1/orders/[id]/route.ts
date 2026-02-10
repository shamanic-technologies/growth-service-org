import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { getOrder, getOrCreateApiKey, updateOrderStatus } from "@/lib/db";
import { getService } from "@/lib/services";
import { sendOrderConfirmationEmail } from "@/lib/email";
import type { ServiceId } from "@/lib/services";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKeyRecord = await authenticateRequest(req);
  if (!apiKeyRecord) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await getOrder(id);
  if (!order || order.apiKeyId !== apiKeyRecord.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    service: order.service,
    quantity: order.quantity,
    status: order.status,
    amount_cents: order.amountCents,
    brand_url: order.brandUrl,
    description: order.description,
    fulfillment_meta: order.fulfillmentMeta,
    created_at: order.createdAt,
    paid_at: order.paidAt,
    completed_at: order.completedAt,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { brand_url, description, email } = body;

    // Auth: Bearer token or email (for post-checkout flow)
    let apiKeyRecord = await authenticateRequest(req);
    if (!apiKeyRecord && email) {
      apiKeyRecord = await getOrCreateApiKey(email);
    }

    const order = await getOrder(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Allow update if authenticated or if email matches order
    if (apiKeyRecord && order.apiKeyId !== apiKeyRecord.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await updateOrderStatus(id, {
      brandUrl: brand_url || order.brandUrl,
      description: description || order.description,
    });

    // Send order confirmation email with BCC to admin
    const serviceData = getService(order.service as ServiceId);
    const amountLabel = `$${(order.amountCents / 100).toLocaleString()}`;
    sendOrderConfirmationEmail(
      order.email,
      order.id,
      serviceData?.name || order.service,
      order.quantity,
      amountLabel
    ).catch((err) => console.error("Order confirmation email error:", err));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Order update error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
