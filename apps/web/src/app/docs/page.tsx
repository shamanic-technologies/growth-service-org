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
          href="/docs/pr-journalist-leads"
          title="Warm Journalist Leads"
          description="Get journalists who clicked or replied to your press outreach."
        />
        <CardLink
          href="/docs/pr-publication-proposals"
          title="PR Publication Proposals"
          description="Get positive replies from journalists ready to publish."
        />
        <CardLink
          href="/docs/sales-leads"
          title="Warm Sales Leads"
          description="Prospects who opened your website or replied to outreach."
        />
        <CardLink
          href="/docs/sales-positive-replies"
          title="Hot Sales Leads"
          description="Qualified prospects who expressed genuine interest."
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
