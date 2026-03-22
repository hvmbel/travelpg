"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { EsimPlan } from "@/lib/types";

type PackagePickerProps = {
  plans: EsimPlan[];
  countryName: string;
};

function formatPriceRub(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export function PackagePicker({ plans, countryName }: PackagePickerProps) {
  const recommendedId = useMemo(() => {
    const popular = plans.find((plan) => plan.is_popular === 1);
    return popular ? popular.id : plans[0]?.id;
  }, [plans]);

  const [selectedId, setSelectedId] = useState<number | undefined>(recommendedId);
  const selectedPlan = plans.find((plan) => plan.id === selectedId) ?? plans[0];

  return (
    <section className="space-y-4" aria-label="Выбор пакета eSIM">
      <div className="space-y-3">
        {plans.map((plan) => {
          const selected = plan.id === selectedId;
          const recommended = plan.id === recommendedId;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedId(plan.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-brand-blue bg-brand-light/60 shadow-sm"
                  : "border-border bg-surface-primary hover:border-brand-blue/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-text-primary">{plan.data_gb} Гб</p>
                  <p className="mt-1 text-sm text-text-secondary">{plan.duration_days} дней</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-text-primary">{formatPriceRub(plan.price_rub)} ₽</p>
                  {recommended ? (
                    <p className="mt-1 inline-block rounded-full bg-brand-green px-2 py-0.5 text-xs font-medium text-white">
                      Рекомендуем
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        className="h-10 w-full bg-brand-blue text-white hover:bg-brand-blue/90"
        onClick={() => {
          if (!selectedPlan) {
            return;
          }
          alert(`Покупка eSIM для ${countryName}: ${selectedPlan.data_gb} Гб на ${selectedPlan.duration_days} дней`);
        }}
      >
        Купить
      </Button>
    </section>
  );
}
