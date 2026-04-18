import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GrowthService — Get Recommended by AI Search Engines",
    template: "%s | GrowthService",
  },
  description:
    "Boost your visibility on ChatGPT, Google AI Overview, Perplexity, and more. One organic press article per month in DR50+ publications. $350/mo with 100% money-back guarantee.",
  keywords: [
    "AI search visibility",
    "ChatGPT recommendations",
    "Google AI Overview",
    "Perplexity visibility",
    "AI search optimization",
    "organic press coverage",
    "PR for AI search",
    "get recommended by AI",
    "AI citations",
    "AI SEO",
    "domain rating",
    "DR50 backlinks",
    "press articles",
  ],
  metadataBase: new URL("https://growthservice.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GrowthService",
    title: "GrowthService — Get Recommended by AI Search Engines",
    description:
      "Boost your visibility on ChatGPT, Google AI Overview & Perplexity. 1 organic press article/month. $350/mo. 100% money-back guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthService — Get Recommended by AI Search Engines",
    description:
      "AI Search visibility through organic press. $350/mo. 100% money-back guarantee.",
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
    "AI Search visibility through organic press coverage. Get recommended by ChatGPT, Google AI Overview, Perplexity, and more.",
  foundingDate: "2026",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GrowthService",
  url: "https://growthservice.org",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Search Visibility",
  provider: {
    "@type": "Organization",
    name: "GrowthService",
    url: "https://growthservice.org",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Search Visibility Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Search Visibility — Monthly Subscription",
          description:
            "1 organic press article per month in a DR50+ publication. Boosts visibility on ChatGPT, Google AI Overview, Perplexity, and other AI search engines.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "350.00",
          priceCurrency: "USD",
          billingDuration: "P1M",
          description: "$350/month with 100% money-back guarantee",
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
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
