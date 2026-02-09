import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms & Money-Back Guarantee - GrowthService",
  description:
    "GrowthService money-back guarantee terms. 90-day delivery window, 25% deductible on refunds. Transparent and fair.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Terms &amp; Money-Back Guarantee
          </h1>
          <p className="mt-4 text-gray-500">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-10 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                1. Money-Back Guarantee
              </h2>
              <p className="mt-3">
                All GrowthService orders come with a <strong>90-day money-back guarantee</strong>.
                If we fail to deliver the guaranteed number of results within 90
                days of payment, you are entitled to a refund.
              </p>
              <p className="mt-2">
                The refund amount equals your order total minus a{" "}
                <strong>25% deductible</strong>. The deductible covers the cost of
                outreach infrastructure, email sending, and AI processing that was
                already consumed during the campaign.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                2. What Counts as a Delivered Result
              </h2>
              <div className="mt-3 space-y-3">
                <div>
                  <strong className="text-gray-900">PR Journalist Leads:</strong>{" "}
                  A journalist who opened your website, viewed your press kit, or
                  replied with interest to your press outreach.
                </div>
                <div>
                  <strong className="text-gray-900">PR Publication Proposals:</strong>{" "}
                  A journalist who responded positively and confirmed interest in
                  writing about or publishing content related to your brand.
                </div>
                <div>
                  <strong className="text-gray-900">Sales Leads:</strong>{" "}
                  A prospect who opened your website or replied with interest to
                  your cold email outreach.
                </div>
                <div>
                  <strong className="text-gray-900">Sales Positive Replies:</strong>{" "}
                  A prospect who expressed genuine interest in your product or
                  service, such as requesting a demo, asking questions, or
                  indicating a desire to learn more.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                3. Delivery Timeline
              </h2>
              <p className="mt-3">
                Campaigns start instantly after payment is confirmed. First
                results typically appear within days. Full delivery depends on the
                tier size and service type.
              </p>
              <p className="mt-2">
                Sales leads and sales positive replies are typically delivered
                faster than PR services. Journalists take more time to respond
                than sales prospects.
              </p>
              <p className="mt-2">
                The 90-day guarantee window begins on the date of payment
                confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                4. Refund Process
              </h2>
              <ol className="mt-3 space-y-2 list-decimal list-inside">
                <li>
                  If the guaranteed number of results has not been delivered after
                  90 days, contact us at{" "}
                  <a
                    href="mailto:support@growthservice.org"
                    className="underline hover:text-gray-900"
                  >
                    support@growthservice.org
                  </a>
                  .
                </li>
                <li>
                  We will verify the delivery status and confirm eligibility.
                </li>
                <li>
                  Eligible refunds are processed within 14 business days to the
                  original payment method.
                </li>
                <li>
                  Refund amount = order total &minus; 25% deductible.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                5. Refund Examples
              </h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-medium text-gray-900">Service</th>
                      <th className="py-2 pr-4 font-medium text-gray-900">Tier</th>
                      <th className="py-2 pr-4 font-medium text-gray-900">Order Total</th>
                      <th className="py-2 pr-4 font-medium text-gray-900">Deductible (25%)</th>
                      <th className="py-2 font-medium text-gray-900">Refund</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Sales Leads</td>
                      <td className="py-2 pr-4">Starter</td>
                      <td className="py-2 pr-4">$40</td>
                      <td className="py-2 pr-4">$10</td>
                      <td className="py-2">$30</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Sales Leads</td>
                      <td className="py-2 pr-4">Growth</td>
                      <td className="py-2 pr-4">$400</td>
                      <td className="py-2 pr-4">$100</td>
                      <td className="py-2">$300</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">PR Publication Proposals</td>
                      <td className="py-2 pr-4">Starter</td>
                      <td className="py-2 pr-4">$600</td>
                      <td className="py-2 pr-4">$150</td>
                      <td className="py-2">$450</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">PR Journalist Leads</td>
                      <td className="py-2 pr-4">Scale</td>
                      <td className="py-2 pr-4">$4,000</td>
                      <td className="py-2 pr-4">$1,000</td>
                      <td className="py-2">$3,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                6. Exclusions
              </h2>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  The guarantee does not apply if the brand URL or description
                  provided is insufficient for our AI to run an effective campaign
                  (e.g., no website, empty description).
                </li>
                <li>
                  Refunds are not available for orders where results were
                  partially delivered and the shortfall is less than 20% of the
                  guaranteed amount.
                </li>
                <li>
                  The guarantee covers the number of results, not conversion rates
                  or downstream outcomes (e.g., we guarantee leads, not sales).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                7. Service Terms
              </h2>
              <p className="mt-3">
                By placing an order, you agree that you own or have the right to
                promote the brand URL provided. You agree not to use GrowthService
                for illegal, fraudulent, or spam purposes.
              </p>
              <p className="mt-2">
                GrowthService reserves the right to refuse or cancel orders that
                violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                8. Contact
              </h2>
              <p className="mt-3">
                For questions about these terms or to request a refund, email{" "}
                <a
                  href="mailto:support@growthservice.org"
                  className="underline hover:text-gray-900"
                >
                  support@growthservice.org
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
