const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || "";

function logoUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=64`;
}

export function AISearchLogos({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const imgSize = { sm: 20, md: 28, lg: 36 }[size];
  const gap = size === "sm" ? "gap-4" : size === "md" ? "gap-6" : "gap-8";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  const engines = [
    { name: "ChatGPT", domain: "chatgpt.com" },
    { name: "Google AI", domain: "google.com" },
    { name: "Perplexity", domain: "perplexity.ai" },
    { name: "Gemini", domain: "gemini.google.com" },
    { name: "Claude", domain: "claude.ai" },
    { name: "Copilot", domain: "copilot.microsoft.com" },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center ${gap}`}>
      {engines.map(({ name, domain }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl(domain)}
            alt={`${name} logo`}
            width={imgSize}
            height={imgSize}
            className="rounded"
            loading="lazy"
          />
          <span className={`${textSize} text-gray-400 font-medium`}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export function PublicationLogos() {
  const publications = [
    { name: "Reuters", domain: "reuters.com" },
    { name: "Forbes", domain: "forbes.com" },
    { name: "TechCrunch", domain: "techcrunch.com" },
    { name: "Wired", domain: "wired.com" },
    { name: "VentureBeat", domain: "venturebeat.com" },
    { name: "Business Insider", domain: "businessinsider.com" },
    { name: "The Verge", domain: "theverge.com" },
    { name: "Entrepreneur", domain: "entrepreneur.com" },
    { name: "Fast Company", domain: "fastcompany.com" },
    { name: "Sifted", domain: "sifted.eu" },
  ];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10" />
      <div className="flex animate-marquee">
        {[...publications, ...publications].map((pub, i) => (
          <div
            key={`${pub.name}-${i}`}
            className="flex items-center gap-2 px-6 shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl(pub.domain)}
              alt={`${pub.name} logo`}
              className="w-6 h-6 rounded"
              loading="lazy"
            />
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
              {pub.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
