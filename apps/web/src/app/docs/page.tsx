import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - GrowthService",
  description:
    "Everything you need to use GrowthService via API, MCP, or the website. Quickstart, API reference, and service guides.",
};

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Documentation
      </h1>
      <p className="mt-4 text-gray-500">
        Everything you need to use GrowthService via API or MCP.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <CardLink
          href="/docs/quickstart"
          title="Quickstart"
          description="Get your API key and create your first order in under 2 minutes."
        />
        <CardLink
          href="/docs/authentication"
          title="Authentication"
          description="Get your API key with one POST request. No signup required."
        />
        <CardLink
          href="/docs/api-reference"
          title="API Reference"
          description="Full REST API documentation with all endpoints."
        />
        <CardLink
          href="/docs/mcp-server"
          title="MCP Server"
          description="Use GrowthService from Claude, ChatGPT, or any MCP-compatible assistant."
        />
        <CardLink
          href="/docs/pr-engaged-leads"
          title="Engaged Journalist Leads"
          description="Journalists who clicked your website, viewed your press kit, or opened your pitch."
        />
        <CardLink
          href="/docs/pr-hot-leads"
          title="Hot Journalist Leads"
          description="Journalists who expressed interest in an interview, written contribution, podcast invitation, or quoted your brand."
        />
        <CardLink
          href="/docs/sales-engaged-leads"
          title="Engaged Sales Leads"
          description="Prospects who visited your website after receiving outreach on your behalf."
        />
        <CardLink
          href="/docs/sales-warm-leads"
          title="Warm Sales Leads"
          description="Prospects who replied with genuine interest — asking questions, requesting a demo, or wanting to learn more."
        />
      </div>
    </div>
  );
}

function CardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="block border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition"
    >
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </a>
  );
}
