export type ServiceId =
  | "sales_leads"
  | "sales_positive_replies"
  | "pr_journalist_leads"
  | "pr_publication_proposals";

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
  unitPriceCents: number;
  tiers: ServiceTier[];
}

export const SERVICES: Service[] = [
  {
    id: "sales_leads",
    name: "Sales Leads",
    description:
      "Prospects who opened your website or replied with interest to your outreach.",
    unit: "leads",
    unitPriceCents: 800,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 lead guaranteed",
        priceCents: 800,
        priceLabel: "$8",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 leads guaranteed",
        priceCents: 8000,
        priceLabel: "$80",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 leads guaranteed",
        priceCents: 80000,
        priceLabel: "$800",
      },
    ],
  },
  {
    id: "sales_positive_replies",
    name: "Sales Positive Replies",
    description:
      "Qualified prospects who expressed genuine interest in your product or service.",
    unit: "replies",
    unitPriceCents: 3200,
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
  {
    id: "pr_journalist_leads",
    name: "PR Journalist Leads",
    description:
      "Journalists who opened your website, press kit, or replied with interest.",
    unit: "leads",
    unitPriceCents: 2000,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 lead guaranteed",
        priceCents: 2000,
        priceLabel: "$20",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 leads guaranteed",
        priceCents: 20000,
        priceLabel: "$200",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 leads guaranteed",
        priceCents: 200000,
        priceLabel: "$2,000",
      },
    ],
  },
  {
    id: "pr_publication_proposals",
    name: "PR Publication Proposals",
    description:
      "Positive replies from journalists ready to publish about your brand.",
    unit: "proposals",
    unitPriceCents: 60000,
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
];

export type Frequency = "one_off" | "weekly" | "monthly" | "quarterly";

export interface FrequencyOption {
  value: Frequency;
  label: string;
}

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
  ],
  sales_positive_replies: [
    { value: "one_off", label: "One-off" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
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
