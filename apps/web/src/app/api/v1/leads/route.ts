import { NextRequest, NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@growthservice.org";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, brand_url } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Notify admins about new lead
    await sendTransactionalEmail({
      to: ADMIN_EMAIL,
      subject: `New lead: ${email} — ${brand_url || "no URL"}`,
      tag: "lead-notification",
      htmlBody: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="font-size: 20px; font-weight: 600;">New Lead</h2>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
            <div><strong>Email:</strong> ${email}</div>
            ${brand_url ? `<div><strong>Website:</strong> <a href="${brand_url}" style="color: #111;">${brand_url}</a></div>` : ""}
          </div>
          <p style="color: #666; font-size: 14px;">
            This lead entered their info on the checkout modal. They may or may not complete payment.
          </p>
        </div>
      `,
    }).catch((err) => console.error("[growthservice] Lead notification error:", err));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[growthservice] Lead capture error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
