import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GrowthService - AI-Native Growth Agency",
    template: "%s | GrowthService",
  },
  description:
    "Guaranteed growth results via API & MCP. Sales outreach, PR outreach, and more. Transparent pricing, money-back guarantee. Powered by MCP Factory.",
  keywords: [
    "growth agency",
    "sales outreach",
    "PR outreach",
    "lead generation",
    "API",
    "MCP",
    "money-back guarantee",
    "AI-powered",
    "sales leads",
    "journalist leads",
    "engaged leads",
    "warm leads",
    "hot leads",
  ],
  metadataBase: new URL("https://growthservice.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GrowthService",
    title: "GrowthService - AI-Native Growth Agency",
    description:
      "Guaranteed growth results via API & MCP. Sales outreach, PR outreach, lead generation. Transparent pricing, 90-day money-back guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthService - AI-Native Growth Agency",
    description:
      "Guaranteed growth results via API & MCP. Transparent pricing, 90-day money-back guarantee.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://growthservice.org",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GrowthService",
  url: "https://growthservice.org",
  description:
    "AI-native growth agency with guaranteed results. Sales outreach, PR outreach, lead generation via API and MCP.",
  foundingDate: "2026",
  sameAs: ["https://mcpfactory.org", "https://growthagency.dev"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GrowthService",
  url: "https://growthservice.org",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://growthservice.org/docs?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Lead Generation",
  provider: {
    "@type": "Organization",
    name: "GrowthService",
    url: "https://growthservice.org",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Growth Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Engaged Journalist Leads",
          description: "Journalists who clicked your website or viewed your press kit",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "20.00",
          priceCurrency: "USD",
          description: "Starting at $20 for 1 lead",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hot Journalist Leads",
          description:
            "Journalists who expressed interest in an interview, written contribution, podcast invitation, or quoted your brand",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "600.00",
          priceCurrency: "USD",
          description: "Starting at $600 for 1 lead",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Engaged Sales Leads",
          description: "Prospects who visited your website after we reached out about your brand",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "8.00",
          priceCurrency: "USD",
          description: "Starting at $8 for 1 lead",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Warm Sales Leads",
          description:
            "Prospects who replied with genuine interest — asking questions, requesting a demo, or wanting to learn more",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "32.00",
          priceCurrency: "USD",
          description: "Starting at $32 for 1 reply",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
