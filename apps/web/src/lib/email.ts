import { ServerClient } from "postmark";

let _client: ServerClient | null = null;

function getPostmark(): ServerClient {
  if (!_client) {
    _client = new ServerClient(process.env.POSTMARK_API_KEY!);
  }
  return _client;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kevin@growthservice.org";
const TRANSACTIONAL_STREAM =
  process.env.POSTMARK_TRANSACTIONAL_STREAM_ID || "outbound";
const FROM_ADDRESS = ADMIN_EMAIL;

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
  const client = getPostmark();

  return client.sendEmail({
    From: FROM_ADDRESS,
    To: to,
    ...(bcc && { Bcc: bcc }),
    Subject: subject,
    HtmlBody: htmlBody,
    ...(textBody && { TextBody: textBody }),
    ...(tag && { Tag: tag }),
    MessageStream: TRANSACTIONAL_STREAM,
  });
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
          Pick a service, choose your budget, and check out. Your campaign starts instantly after payment.
        </p>
        <a href="https://growthservice.org" style="display: inline-block; margin-top: 16px; background: #111; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">
          Browse Services
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          GrowthService &middot; <a href="https://growthservice.org" style="color: #999;">growthservice.org</a>
        </p>
      </div>
    `,
    textBody: `Welcome to GrowthService!\n\nPick a service, choose your budget, and check out. Your campaign starts instantly after payment.\n\nhttps://growthservice.org`,
  });
}

export async function sendAdminNotificationEmail(
  orderId: string,
  email: string,
  serviceName: string,
  quantity: number,
  amount: string,
  frequency: string = "one_off",
  budgetUsd?: number
) {
  const freqLabel = frequency === "one_off" ? "one-off" : frequency;
  return sendTransactionalEmail({
    to: ADMIN_EMAIL,
    subject: `New checkout: ${serviceName} x${quantity} (${freqLabel}) — ${amount}`,
    tag: "admin-notification",
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">New Checkout</h2>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <div><strong>Order:</strong> ${orderId}</div>
          <div><strong>Customer:</strong> ${email}</div>
          <div><strong>Service:</strong> ${serviceName}</div>
          <div><strong>Quantity:</strong> ${quantity}</div>
          <div><strong>Frequency:</strong> ${freqLabel}</div>
          ${budgetUsd !== undefined ? `<div><strong>Budget:</strong> $${budgetUsd}</div>` : ""}
          <div><strong>Amount:</strong> ${amount} (${freqLabel})</div>
        </div>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(params: {
  email: string;
  orderId: string;
  serviceName: string;
  quantity: number;
  amount: string;
  frequency: string;
  budgetUsd?: number;
  brandUrl?: string;
  description?: string;
}) {
  const freqLabel = params.frequency === "one_off" ? "one-off" : params.frequency;
  const descriptionHtml = params.description
    ? params.description.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
    : "";

  return sendTransactionalEmail({
    to: params.email,
    subject: `Order Confirmed: ${params.serviceName} x${params.quantity} (${freqLabel}) — ${params.amount}`,
    tag: "order-confirmation",
    bcc: ADMIN_EMAIL,
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600;">Order Confirmed</h2>
        <p style="color: #666; font-size: 14px;">Your order is being processed.</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <div><strong>Order:</strong> ${params.orderId}</div>
          <div><strong>Service:</strong> ${params.serviceName}</div>
          <div><strong>Quantity:</strong> ${params.quantity}</div>
          <div><strong>Frequency:</strong> ${freqLabel}</div>
          ${params.budgetUsd !== undefined ? `<div><strong>Budget:</strong> $${params.budgetUsd}</div>` : ""}
          <div><strong>Amount:</strong> ${params.amount} (${freqLabel})</div>
          ${params.brandUrl ? `<div><strong>Brand:</strong> <a href="${params.brandUrl}" style="color: #111;">${params.brandUrl}</a></div>` : ""}
          ${descriptionHtml ? `<div style="margin-top: 8px;"><strong>Brief:</strong><br>${descriptionHtml}</div>` : ""}
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
