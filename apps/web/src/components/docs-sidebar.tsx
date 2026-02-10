"use client";

import { usePathname } from "next/navigation";

const NAV = [
  { href: "/docs", label: "Overview" },
  { heading: "Getting Started" },
  { href: "/docs/quickstart", label: "Quickstart" },
  { heading: "Reference" },
  { href: "/docs/api-reference", label: "API Reference" },
  { href: "/docs/authentication", label: "Authentication" },
  { href: "/docs/mcp-server", label: "MCP Server" },
  { heading: "Services" },
  { href: "/docs/pr-engaged-leads", label: "Engaged Journalist Leads" },
  { href: "/docs/pr-hot-leads", label: "Hot Journalist Leads" },
  { href: "/docs/sales-engaged-leads", label: "Engaged Sales Leads" },
  { href: "/docs/sales-warm-leads", label: "Warm Sales Leads" },
] as const;

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5">
      {NAV.map((item, i) =>
        "heading" in item ? (
          <div
            key={i}
            className="text-xs font-medium text-gray-400 uppercase tracking-wider pt-5 pb-1.5 px-3 first:pt-0"
          >
            {item.heading}
          </div>
        ) : (
          <a
            key={item.href}
            href={item.href}
            className={`block px-3 py-1.5 text-sm rounded-lg transition ${
              pathname === item.href
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </a>
        )
      )}
    </nav>
  );
}
