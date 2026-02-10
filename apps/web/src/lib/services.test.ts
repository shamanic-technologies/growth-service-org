import { describe, it, expect } from "vitest";
import {
  SERVICES,
  SERVICE_FREQUENCIES,
  getService,
  getServiceTier,
  getServiceFrequencies,
} from "./services";
import type { ServiceId } from "./services";

describe("services", () => {
  const EXPECTED_SERVICE_IDS: ServiceId[] = [
    "sales_engaged_leads",
    "sales_warm_leads",
    "pr_engaged_leads",
    "pr_hot_leads",
  ];

  it("exports exactly the 4 expected services", () => {
    expect(SERVICES.map((s) => s.id)).toEqual(EXPECTED_SERVICE_IDS);
  });

  it("uses correct naming convention for each service", () => {
    const names = Object.fromEntries(SERVICES.map((s) => [s.id, s.name]));
    expect(names).toEqual({
      sales_engaged_leads: "Engaged Sales Leads",
      sales_warm_leads: "Warm Sales Leads",
      pr_engaged_leads: "Engaged Journalist Leads",
      pr_hot_leads: "Hot Journalist Leads",
    });
  });

  it("does not use old service IDs anywhere", () => {
    const allIds = SERVICES.map((s) => s.id);
    const freqKeys = Object.keys(SERVICE_FREQUENCIES);
    const combined = [...allIds, ...freqKeys];

    const oldIds = [
      "sales_leads",
      "sales_positive_replies",
      "pr_journalist_leads",
      "pr_publication_proposals",
    ];

    for (const oldId of oldIds) {
      expect(combined).not.toContain(oldId);
    }
  });

  it("does not use old naming in service names or descriptions", () => {
    const allText = SERVICES.map((s) => `${s.name} ${s.description}`).join(" ");

    expect(allText).not.toContain("Hot Sales");
    expect(allText).not.toContain("PR Publication");
    expect(allText).not.toContain("Publication Proposals");
  });

  it("each service has 3 tiers (starter, growth, scale)", () => {
    for (const service of SERVICES) {
      expect(service.tiers).toHaveLength(3);
      expect(service.tiers.map((t) => t.tier)).toEqual([
        "starter",
        "growth",
        "scale",
      ]);
    }
  });

  it("tier prices are consistent with unit price * quantity", () => {
    for (const service of SERVICES) {
      for (const tier of service.tiers) {
        expect(tier.priceCents).toBe(tier.quantity * service.unitPriceCents);
      }
    }
  });

  it("quantity labels use the correct lead type qualifier", () => {
    const engaged = SERVICES.filter((s) => s.id.includes("engaged"));
    for (const s of engaged) {
      for (const t of s.tiers) {
        expect(t.quantityLabel).toContain("engaged lead");
      }
    }

    const warm = getService("sales_warm_leads")!;
    for (const t of warm.tiers) {
      expect(t.quantityLabel).toContain("warm lead");
    }

    const hot = getService("pr_hot_leads")!;
    for (const t of hot.tiers) {
      expect(t.quantityLabel).toContain("hot lead");
    }
  });

  it("getService returns correct service for each ID", () => {
    for (const id of EXPECTED_SERVICE_IDS) {
      const service = getService(id);
      expect(service).toBeDefined();
      expect(service!.id).toBe(id);
    }
  });

  it("getServiceTier returns correct tier", () => {
    const tier = getServiceTier("sales_engaged_leads", "growth");
    expect(tier).toBeDefined();
    expect(tier!.quantity).toBe(10);
    expect(tier!.priceCents).toBe(8000);
  });

  it("every service has frequency options", () => {
    for (const id of EXPECTED_SERVICE_IDS) {
      const freqs = getServiceFrequencies(id);
      expect(freqs.length).toBeGreaterThan(0);
      expect(freqs[0].value).toBe("one_off");
    }
  });

  it("sales services have weekly frequency, PR services have quarterly", () => {
    const salesFreqs = getServiceFrequencies("sales_engaged_leads");
    expect(salesFreqs.map((f) => f.value)).toContain("weekly");

    const prFreqs = getServiceFrequencies("pr_engaged_leads");
    expect(prFreqs.map((f) => f.value)).toContain("quarterly");
  });
});
