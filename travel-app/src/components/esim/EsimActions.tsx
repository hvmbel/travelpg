import Link from "next/link";
import { ArrowRight, Plus, RefreshCw } from "lucide-react";
import type { UserEsimWithPlan } from "@/lib/types";

type EsimActionsProps = {
  esim: UserEsimWithPlan | undefined;
};

export function EsimActions({ esim }: EsimActionsProps) {
  const topUpHref = esim ? `/esim/${esim.plan.country_code}` : "#new-esim";
  const topUpSubtitle = esim ? `Для ${esim.plan.country}` : "Выберите страну и пакет";

  return (
    <section className="grid grid-cols-2 gap-3" aria-label="Действия с eSIM">
      <Link
        href={topUpHref}
        className="rounded-2xl bg-surface-primary p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-light"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand-blue">
          <RefreshCw className="h-5 w-5" />
        </div>
        <p className="mt-6 text-base font-semibold text-text-primary">Добавить тариф</p>
        <p className="mt-1 text-sm text-text-secondary">{topUpSubtitle}</p>
      </Link>

      <Link
        href="#new-esim"
        className="rounded-2xl bg-[#11162C] p-4 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1A2142]"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Plus className="h-5 w-5" />
          </div>
          <ArrowRight className="h-5 w-5 text-white/70" />
        </div>
        <p className="mt-6 text-base font-semibold">Новая eSIM</p>
        <p className="mt-1 text-sm text-white/70">Для новой страны или отдельного номера</p>
      </Link>
    </section>
  );
}
