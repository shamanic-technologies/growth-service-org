export function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Growth Services.
          <br />
          <span className="text-gray-400">API-First.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Cold emails, PR outreach, and more. Pay per result. Use via API, MCP,
          or just click Buy. Money-back guarantee on everything.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#pricing"
            className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            See Pricing
          </a>
          <a
            href="/docs"
            className="border border-gray-200 text-gray-700 px-8 py-3 rounded-full text-sm font-medium hover:border-gray-300 transition"
          >
            Read Docs
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: "Transparent", label: "Pricing" },
            { value: "Guaranteed", label: "Outcomes" },
            { value: "Instant", label: "Delivery" },
            { value: "Instant", label: "Onboarding" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl md:text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
