import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { getOrder } from "@/lib/db";

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
    tier: order.tier,
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
