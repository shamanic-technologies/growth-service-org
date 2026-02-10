export type ServiceId =
  | "sales_engaged_leads"
  | "sales_warm_leads"
  | "pr_engaged_leads"
  | "pr_hot_leads";

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
    id: "sales_engaged_leads",
    name: "Engaged Sales Leads",
    description:
      "Prospects who visited your website after being reached out.",
    unit: "leads",
    unitPriceCents: 800,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 engaged lead guaranteed",
        priceCents: 800,
        priceLabel: "$8",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 engaged leads guaranteed",
        priceCents: 8000,
        priceLabel: "$80",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 engaged leads guaranteed",
        priceCents: 80000,
        priceLabel: "$800",
      },
    ],
  },
  {
    id: "sales_warm_leads",
    name: "Warm Sales Leads",
    description:
      "Prospects who replied with genuine interest — asking questions, requesting a demo, or wanting to learn more.",
    unit: "replies",
    unitPriceCents: 3200,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 warm lead guaranteed",
        priceCents: 3200,
        priceLabel: "$32",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 warm leads guaranteed",
        priceCents: 32000,
        priceLabel: "$320",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 warm leads guaranteed",
        priceCents: 320000,
        priceLabel: "$3,200",
      },
    ],
  },
  {
    id: "pr_engaged_leads",
    name: "Engaged Journalist Leads",
    description:
      "Journalists who clicked your website, viewed your press kit, or opened your pitch.",
    unit: "leads",
    unitPriceCents: 2000,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 engaged lead guaranteed",
        priceCents: 2000,
        priceLabel: "$20",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 10,
        quantityLabel: "10 engaged leads guaranteed",
        priceCents: 20000,
        priceLabel: "$200",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 100,
        quantityLabel: "100 engaged leads guaranteed",
        priceCents: 200000,
        priceLabel: "$2,000",
      },
    ],
  },
  {
    id: "pr_hot_leads",
    name: "Hot Journalist Leads",
    description:
      "Journalists who expressed interest in an interview, written contribution (op-ed, Q&A), podcast invitation, or quoted your brand.",
    unit: "leads",
    unitPriceCents: 60000,
    tiers: [
      {
        tier: "starter",
        label: "Starter",
        quantity: 1,
        quantityLabel: "1 hot lead guaranteed",
        priceCents: 60000,
        priceLabel: "$600",
      },
      {
        tier: "growth",
        label: "Growth",
        quantity: 5,
        quantityLabel: "5 hot leads guaranteed",
        priceCents: 300000,
        priceLabel: "$3,000",
      },
      {
        tier: "scale",
        label: "Scale",
        quantity: 10,
        quantityLabel: "10 hot leads guaranteed",
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
  pr_engaged_leads: [
    { value: "one_off", label: "One-off" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
  pr_hot_leads: [
    { value: "one_off", label: "One-off" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ],
  sales_engaged_leads: [
    { value: "one_off", label: "One-off" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ],
  sales_warm_leads: [
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
