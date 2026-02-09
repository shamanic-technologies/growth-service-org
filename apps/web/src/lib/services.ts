export type ServiceId =
  | "pr_journalist_leads"
  | "pr_publication_proposals"
  | "sales_leads"
  | "sales_positive_replies";

export type TierId = "starter" | "growth" | "scale";

export interface ServiceTier {
  tier: TierId;
  label: string;
  quantity: number;
  quantityLabel: string;
  priceCents: number;
  priceLabel: string;
}

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
  unit: string;
  tiers: ServiceTier[];
}

export const SERVICES: Service[] = [
  {
    id: "pr_journalist_leads",
    name: "PR Journalist Leads",
    description:
      "Journalists who opened your website, press kit, or replied with interest.",
    unit: "leads",
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 2,
        quantityLabel: "2 leads guaranteed",
        priceCents: 4000,
        priceLabel: "$40",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 20,
        quantityLabel: "20 leads guaranteed",
        priceCents: 40000,
        priceLabel: "$400",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 200,
        quantityLabel: "200 leads guaranteed",
        priceCents: 400000,
        priceLabel: "$4,000",
      },
    ],
  },
  {
    id: "pr_publication_proposals",
    name: "PR Publication Proposals",
    description:
      "Positive replies from journalists ready to publish about your brand.",
    unit: "proposals",
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 proposal guaranteed",
        priceCents: 60000,
        priceLabel: "$600",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 5,
        quantityLabel: "5 proposals guaranteed",
        priceCents: 300000,
        priceLabel: "$3,000",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 10,
        quantityLabel: "10 proposals guaranteed",
        priceCents: 600000,
        priceLabel: "$6,000",
      },
    ],
  },
  {
    id: "sales_leads",
    name: "Sales Leads",
    description:
      "Prospects who opened your website or replied with interest to your outreach.",
    unit: "leads",
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 5,
        quantityLabel: "5 leads guaranteed",
        priceCents: 4000,
        priceLabel: "$40",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 50,
        quantityLabel: "50 leads guaranteed",
        priceCents: 40000,
        priceLabel: "$400",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 500,
        quantityLabel: "500 leads guaranteed",
        priceCents: 400000,
        priceLabel: "$4,000",
      },
    ],
  },
  {
    id: "sales_positive_replies",
    name: "Sales Positive Replies",
    description:
      "Qualified prospects who expressed genuine interest in your product or service.",
    unit: "replies",
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 reply guaranteed",
        priceCents: 3200,
        priceLabel: "$32",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 replies guaranteed",
        priceCents: 32000,
        priceLabel: "$320",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 replies guaranteed",
        priceCents: 320000,
        priceLabel: "$3,200",
      },
    ],
  },
];

export type Frequency = "one_off" | "weekly" | "monthly" | "quarterly";

export interface FrequencyOption {
  value: Frequency;
  label: string;
}

// PR services: slower cadence (journalists need time)
// Sales services: can run faster
export const SERVICE_FREQUENCIES: Record<ServiceId, FrequencyOption[]> = {
  pr_journalist_leads: [
    { value: "one_off", label: "One-off" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
  pr_publication_proposals: [
    { value: "one_off", label: "One-off" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
  sales_leads: [
    { value: "one_off", label: "One-off" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
  sales_positive_replies: [
    { value: "one_off", label: "One-off" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
};

export function getServiceFrequencies(id: ServiceId): FrequencyOption[] {
  return SERVICE_FREQUENCIES[id];
}

export function getService(id: ServiceId): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServiceTier(
  serviceId: ServiceId,
  tierId: TierId
): ServiceTier | undefined {
  return getService(serviceId)?.tiers.find((t) => t.tier === tierId);
}
