import { NextRequest, NextResponse } from "next/server";
import { getOrCreateApiKey } from "@/lib/db";
import { sendApiKeyEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const apiKeyRecord = await getOrCreateApiKey(email);

    // Send API key by email
    try {
      await sendApiKeyEmail(email, apiKeyRecord.id);
    } catch (e) {
      console.error("Failed to send API key email:", e);
      // Don't fail the request - the key is still created
    }

    return NextResponse.json({
      message: "API key sent to your email. Check your inbox.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
