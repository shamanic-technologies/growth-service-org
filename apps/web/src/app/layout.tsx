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
    "Guaranteed growth results via API & MCP. Cold emails, PR outreach, and more. Transparent pricing, money-back guarantee. Powered by MCP Factory.",
  keywords: [
    "growth agency",
    "cold email",
    "PR outreach",
    "lead generation",
    "API",
    "MCP",
    "money-back guarantee",
    "AI-powered",
    "sales leads",
    "journalist leads",
    "publication proposals",
  ],
  metadataBase: new URL("https://growthservice.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GrowthService",
    title: "GrowthService - AI-Native Growth Agency",
    description:
      "Guaranteed growth results via API & MCP. Cold emails, PR outreach, sales leads. Transparent pricing, 90-day money-back guarantee.",
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
    "AI-native growth agency with guaranteed results. Cold emails, PR outreach, sales leads via API and MCP.",
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
          name: "PR Journalist Leads",
          description: "Journalists who engaged with your press outreach",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "40.00",
          priceCurrency: "USD",
          description: "Starting at $40 for 2 leads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PR Publication Proposals",
          description:
            "Positive replies from journalists ready to publish about your brand",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "600.00",
          priceCurrency: "USD",
          description: "Starting at $600 for 1 proposal",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sales Leads",
          description: "Prospects who engaged with your cold email outreach",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "40.00",
          priceCurrency: "USD",
          description: "Starting at $40 for 5 leads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sales Positive Replies",
          description:
            "Qualified prospects who expressed genuine interest in your product",
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
