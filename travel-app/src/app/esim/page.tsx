import { EsimActions } from "@/components/esim/EsimActions";
import { CountryGrid, type CountryGridItem } from "@/components/esim/CountryGrid";
import { TrafficMonitor } from "@/components/esim/TrafficMonitor";
import type { UserEsimWithPlan } from "@/lib/types";
import { getAvailablePlans, getEsimPlan, getUserEsims } from "../../../db/queries";

type CountryAgg = {
  countryCode: string;
  country: string;
  minPriceRub: number;
  isPopular: number;
  purchased: boolean;
};

export default function EsimPage() {
  const allPlans = getAvailablePlans();
  const userEsims = getUserEsims(1);

  const userEsimsWithPlan: UserEsimWithPlan[] = userEsims
    .map((esim) => {
      const plan = getEsimPlan(esim.plan_id);
      if (!plan) {
        return null;
      }
      return { ...esim, plan };
    })
    .filter((value): value is UserEsimWithPlan => value !== null);

  const activeEsim = userEsimsWithPlan.find((item) => item.status === "active") ?? userEsimsWithPlan[0];
  const purchasedCountries = new Set(userEsimsWithPlan.map((item) => item.plan.country_code));

  const byCountry = new Map<string, CountryAgg>();
  for (const plan of allPlans) {
    const existing = byCountry.get(plan.country_code);
    const purchased = purchasedCountries.has(plan.country_code);

    if (!existing) {
      byCountry.set(plan.country_code, {
        countryCode: plan.country_code,
        country: plan.country,
        minPriceRub: plan.price_rub,
        isPopular: plan.is_popular,
        purchased,
      });
      continue;
    }

    existing.minPriceRub = Math.min(existing.minPriceRub, plan.price_rub);
    existing.isPopular = Math.max(existing.isPopular, plan.is_popular);
    existing.purchased = existing.purchased || purchased;
  }

  const countries: CountryGridItem[] = Array.from(byCountry.values())
    .sort((a, b) => {
      if (a.purchased !== b.purchased) {
        return a.purchased ? -1 : 1;
      }
      if (a.isPopular !== b.isPopular) {
        return b.isPopular - a.isPopular;
      }
      return a.country.localeCompare(b.country, "ru");
    })
    .map((country) => ({
      countryCode: country.countryCode,
      country: country.country,
      minPriceRub: country.minPriceRub,
    }));

  return (
    <section className="space-y-4 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">eSIM</h1>
      <TrafficMonitor esim={activeEsim} />
      <EsimActions esim={activeEsim} />
      <CountryGrid countries={countries} />
    </section>
  );
}
