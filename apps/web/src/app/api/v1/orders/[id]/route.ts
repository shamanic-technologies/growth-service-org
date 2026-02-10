import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrderStatus } from "@/lib/db";
import { getService } from "@/lib/services";
import { sendOrderConfirmationEmail } from "@/lib/email";
import type { ServiceId } from "@/lib/services";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      { error: "email query param required" },
      { status: 400 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);
  if (!order || order.email.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    service: order.service,
    quantity: order.quantity,
    frequency: order.frequency,
    status: order.status,
    amount_cents: order.amountCents,
    budget_usd: order.budgetUsd,
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

    if (!email) {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );
    }

    const order = await getOrder(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await updateOrderStatus(id, {
      brandUrl: brand_url || order.brandUrl,
      description: description || order.description,
    });

    // Send order confirmation email with all info
    const serviceData = getService(order.service as ServiceId);
    const amountLabel = `$${(order.amountCents / 100).toLocaleString()}`;
    await sendOrderConfirmationEmail({
      email: order.email,
      orderId: order.id,
      serviceName: serviceData?.name || order.service,
      quantity: order.quantity,
      amount: amountLabel,
      frequency: order.frequency,
      budgetUsd: order.budgetUsd,
      brandUrl: brand_url || order.brandUrl,
      description: description || order.description,
    }).catch((err) => console.error("Order confirmation email error:", err));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Order update error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
