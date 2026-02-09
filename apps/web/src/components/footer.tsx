export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="text-lg font-semibold">GrowthService</div>
          <p className="text-sm text-gray-400 mt-1">
            AI-powered growth with guaranteed results.
          </p>
        </div>

        <div className="flex gap-8 md:gap-12 text-sm text-gray-500">
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Product</div>
            <a href="#pricing" className="block hover:text-gray-700">Pricing</a>
            <a href="/docs" className="block hover:text-gray-700">API Docs</a>
            <a href="/docs/mcp-server" className="block hover:text-gray-700">MCP Server</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Company</div>
            <a href="/terms" className="block hover:text-gray-700">Terms &amp; Guarantee</a>
            <a href="https://mcpfactory.org" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700">
              MCP Factory
            </a>
            <a href="https://growthagency.dev" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700">
              GrowthAgency.dev
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400">
        Built on open-source MCP Factory. All services include money-back guarantee.
      </div>
    </footer>
  );
}
