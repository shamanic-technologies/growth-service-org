import { z } from "zod";
import {
  requestApiKey,
  listServices,
  createOrder,
  getOrderStatus,
  listOrders,
} from "./api-client.js";

export const tools = [
  {
    name: "growthservice_request_api_key",
    description:
      'Request a GrowthService API key. The key will be sent to the provided email. The user should then paste it here so you can make authenticated requests. Set the GROWTHSERVICE_API_KEY env var or use this tool.',
    inputSchema: z.object({
      email: z.string().email().describe("Email address to receive the API key"),
    }),
    handler: async (input: { email: string }) => {
      const result = await requestApiKey(input.email);
      return `${result.message}\n\nPlease check your email and paste the API key here. Then set it as GROWTHSERVICE_API_KEY in your MCP server config.`;
    },
  },
  {
    name: "growthservice_list_services",
    description:
      "List all available GrowthService services with pricing. Shows PR and Sales services with Starter/Growth/Scale tiers.",
    inputSchema: z.object({}),
    handler: async () => {
      const result = await listServices();
      let output = "Available GrowthService services:\n\n";
      for (const service of result.services) {
        output += `**${service.name}**\n${service.description}\n`;
        for (const tier of service.tiers) {
          output += `  - ${tier.label}: ${tier.quantity_label} — ${tier.price_label}\n`;
        }
        output += "\n";
      }
      output +=
        "All services include money-back guarantee (25% deductible). Powered by MCP Factory.";
      return output;
    },
  },
  {
    name: "growthservice_create_order",
    description:
      "Create an order for a GrowthService product. Returns a Stripe payment link. The user must open this link and pay to activate the order.",
    inputSchema: z.object({
      service: z
        .enum([
          "pr_journalist_leads",
          "pr_publication_proposals",
          "sales_leads",
          "sales_positive_replies",
        ])
        .describe("Service ID"),
      quantity: z.number().int().positive().describe("Number of results to deliver"),
      brand_url: z
        .string()
        .url()
        .optional()
        .describe("URL of the brand/company to promote"),
      description: z
        .string()
        .optional()
        .describe("Brief description of what the user wants (1-2 lines)"),
    }),
    handler: async (input: {
      service: string;
      quantity: number;
      brand_url?: string;
      description?: string;
    }) => {
      const result = await createOrder(input);
      return `Order created!\n\n- Order ID: ${result.order_id}\n- Amount: $${(result.amount_cents / 100).toFixed(2)}\n- Payment link: ${result.checkout_url}\n\nPlease open the payment link to complete your purchase. Once paid, we'll start working on your campaign within 24 hours.`;
    },
  },
  {
    name: "growthservice_order_status",
    description: "Check the status of a GrowthService order.",
    inputSchema: z.object({
      order_id: z.string().describe("Order ID (starts with ord_)"),
    }),
    handler: async (input: { order_id: string }) => {
      const order = await getOrderStatus(input.order_id);
      return `Order ${order.id}:\n- Service: ${order.service}\n- Quantity: ${order.quantity}\n- Status: ${order.status}\n- Amount: $${(order.amount_cents / 100).toFixed(2)}\n- Created: ${order.created_at}${order.paid_at ? `\n- Paid: ${order.paid_at}` : ""}${order.completed_at ? `\n- Completed: ${order.completed_at}` : ""}`;
    },
  },
  {
    name: "growthservice_list_orders",
    description: "List all your GrowthService orders.",
    inputSchema: z.object({}),
    handler: async () => {
      const result = await listOrders();
      if (!result.orders.length) return "No orders found.";
      let output = "Your orders:\n\n";
      for (const order of result.orders) {
        output += `- ${order.id}: ${order.service} (qty: ${order.quantity}) — ${order.status} — $${(order.amount_cents / 100).toFixed(2)}\n`;
      }
      return output;
    },
  },
];
