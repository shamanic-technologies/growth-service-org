const MCPFACTORY_EMAIL_URL =
  process.env.MCPFACTORY_EMAIL_URL || "https://email-sending.mcpfactory.org";
const MCPFACTORY_EMAIL_API_KEY = process.env.MCPFACTORY_EMAIL_API_KEY || "";

export async function sendTransactionalEmail({
  to,
  subject,
  htmlBody,
  textBody,
  tag,
}: {
  to: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  tag?: string;
}) {
  const res = await fetch(`${MCPFACTORY_EMAIL_URL}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": MCPFACTORY_EMAIL_API_KEY,
    },
    body: JSON.stringify({
      type: "transactional",
      appId: "growthservice",
      brandId: "growthservice",
      campaignId: "transactional",
      runId: `tx_${Date.now()}`,
      to,
      recipientFirstName: "",
      recipientLastName: "",
      recipientCompany: "",
      subject,
      htmlBody,
      textBody: textBody || "",
      tag: tag || "growthservice-transactional",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Email send failed: ${err}`);
  }

  return res.json();
}

export async function sendApiKeyEmail(email: string, apiKey: string) {
  return sendTransactionalEmail({
    to: email,
    subject: "Your GrowthService API Key",
    tag: "api-key",
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">Your API Key</h2>
        <p style="color: #666; font-size: 14px;">Here's your GrowthService API key. Keep it safe.</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 14px; margin: 20px 0; word-break: break-all;">
          ${apiKey}
        </div>
        <p style="color: #666; font-size: 14px;">
          Use it in the <code>Authorization: Bearer ${apiKey}</code> header, or paste it into your MCP server config.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          GrowthService &middot; <a href="https://growthservice.org" style="color: #999;">growthservice.org</a>
        </p>
      </div>
    `,
    textBody: `Your GrowthService API Key: ${apiKey}\n\nUse it in the Authorization: Bearer header.\n\nhttps://growthservice.org`,
  });
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  serviceName: string,
  tierLabel: string,
  amount: string
) {
  return sendTransactionalEmail({
    to: email,
    subject: `Order Confirmed: ${serviceName} (${tierLabel})`,
    tag: "order-confirmation",
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">Order Confirmed</h2>
        <p style="color: #666; font-size: 14px;">Your order is being processed.</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <div><strong>Order:</strong> ${orderId}</div>
          <div><strong>Service:</strong> ${serviceName}</div>
          <div><strong>Tier:</strong> ${tierLabel}</div>
          <div><strong>Amount:</strong> ${amount}</div>
        </div>
        <p style="color: #666; font-size: 14px;">
          We'll start working on your campaign within 24 hours.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          GrowthService &middot; <a href="https://growthservice.org" style="color: #999;">growthservice.org</a>
        </p>
      </div>
    `,
  });
}
