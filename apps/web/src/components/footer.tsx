export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="text-lg font-semibold flex items-center gap-2">
            GrowthService
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-md leading-none">
              beta
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            AI Search visibility through organic press.
          </p>
        </div>

        <div className="flex gap-8 md:gap-12 text-sm text-gray-500">
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Product</div>
            <a href="#pricing" className="block hover:text-gray-700">Pricing</a>
            <a href="#how-it-works" className="block hover:text-gray-700">How It Works</a>
            <a href="#faq" className="block hover:text-gray-700">FAQ</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Company</div>
            <a href="/terms" className="block hover:text-gray-700">Terms &amp; Guarantee</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Our Network</div>
            <a href="https://pressbeat.io" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700">
              PressBeat.io <span className="text-gray-400">— Organic Press on Demand</span>
            </a>
            <a href="https://growthagency.dev" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700">
              GrowthAgency.dev <span className="text-gray-400">— Growth Agency for Humans</span>
            </a>
            <a href="https://distribute.you" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700">
              Distribute.you <span className="text-gray-400">— Outreach Automation for Developers</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} GrowthService. 100% money-back guarantee on all plans.
      </div>
    </footer>
  );
}
