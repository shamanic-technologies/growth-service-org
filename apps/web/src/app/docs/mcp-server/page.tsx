import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server - GrowthService Docs",
  description:
    "Use GrowthService from Claude Desktop, ChatGPT, Cursor, or any MCP-compatible AI assistant. Install and configure the MCP server.",
};

export default function McpServerPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        MCP Server
      </h1>
      <p className="mt-4 text-gray-500">
        Use GrowthService from any MCP-compatible AI assistant (Claude Desktop,
        ChatGPT, Cursor, etc).
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Install</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
{`npx @growthservice/mcp-server`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Claude Desktop config</h2>
        <pre className="mt-3 bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre">
{`{
  "mcpServers": {
    "growthservice": {
      "command": "npx",
      "args": ["@growthservice/mcp-server"],
      "env": {
        "GROWTHSERVICE_EMAIL": "you@company.com"
      }
    }
  }
}`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Available tools</h2>
        <div className="mt-4 space-y-4">
          <ToolDoc
            name="growthservice_list_services"
            description="List all services with pricing tiers."
          />
          <ToolDoc
            name="growthservice_create_order"
            description="Create an order and get a payment link."
            params={`{ "service": "sales_engaged_leads", "budget_usd": 80, "brand_url": "...", "description": "..." }`}
          />
          <ToolDoc
            name="growthservice_order_status"
            description="Check the status of an order."
            params={`{ "order_id": "ord_..." }`}
          />
          <ToolDoc
            name="growthservice_list_orders"
            description="List all your orders."
          />
        </div>
      </section>
    </div>
  );
}

function ToolDoc({
  name,
  description,
  params,
}: {
  name: string;
  description: string;
  params?: string;
}) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <code className="bg-gray-50 px-2 py-0.5 rounded text-xs font-mono font-semibold">
        {name}
      </code>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {params && (
        <pre className="mt-2 bg-gray-50 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-pre">
{params}
        </pre>
      )}
    </div>
  );
}
