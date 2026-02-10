const MCPFACTORY_EMAIL_URL =
  process.env.MCPFACTORY_EMAIL_URL || "https://email-sending.mcpfactory.org";
const MCPFACTORY_EMAIL_API_KEY = process.env.MCPFACTORY_EMAIL_API_KEY || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@growthservice.org";

export async function sendTransactionalEmail({
  to,
  subject,
  htmlBody,
  textBody,
  tag,
  bcc,
}: {
  to: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  tag?: string;
  bcc?: string;
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
      bcc: bcc || "",
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

export async function sendWelcomeEmail(email: string) {
  return sendTransactionalEmail({
    to: email,
    subject: "Welcome to GrowthService",
    tag: "welcome",
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">Welcome to GrowthService</h2>
        <p style="color: #666; font-size: 14px;">
          Thanks for signing up. You're one step away from guaranteed growth results.
        </p>
        <p style="color: #666; font-size: 14px;">
          Pick a service, choose your volume, and check out. Your campaign starts instantly after payment.
        </p>
        <a href="https://growthservice.org" style="display: inline-block; margin-top: 16px; background: #111; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">
          Browse Services
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          GrowthService &middot; <a href="https://growthservice.org" style="color: #999;">growthservice.org</a>
        </p>
      </div>
    `,
    textBody: `Welcome to GrowthService!\n\nPick a service, choose your volume, and check out. Your campaign starts instantly after payment.\n\nhttps://growthservice.org`,
  });
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

export async function sendAdminNotificationEmail(
  orderId: string,
  email: string,
  serviceName: string,
  quantity: number,
  amount: string
) {
  return sendTransactionalEmail({
    to: ADMIN_EMAIL,
    subject: `New checkout: ${serviceName} x${quantity} — ${amount}`,
    tag: "admin-notification",
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">New Checkout</h2>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <div><strong>Order:</strong> ${orderId}</div>
          <div><strong>Customer:</strong> ${email}</div>
          <div><strong>Service:</strong> ${serviceName}</div>
          <div><strong>Quantity:</strong> ${quantity}</div>
          <div><strong>Amount:</strong> ${amount}</div>
        </div>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  serviceName: string,
  quantity: number,
  amount: string
) {
  return sendTransactionalEmail({
    to: email,
    subject: `Order Confirmed: ${serviceName} x${quantity}`,
    tag: "order-confirmation",
    bcc: ADMIN_EMAIL,
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">Order Confirmed</h2>
        <p style="color: #666; font-size: 14px;">Your order is being processed.</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <div><strong>Order:</strong> ${orderId}</div>
          <div><strong>Service:</strong> ${serviceName}</div>
          <div><strong>Quantity:</strong> ${quantity}</div>
          <div><strong>Amount:</strong> ${amount}</div>
        </div>
        <p style="color: #666; font-size: 14px;">
          Your campaign starts instantly. First results within days.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          GrowthService &middot; <a href="https://growthservice.org" style="color: #999;">growthservice.org</a>
        </p>
      </div>
    `,
  });
}
