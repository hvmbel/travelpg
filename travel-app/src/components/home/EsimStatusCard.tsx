import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { UserEsimWithPlan } from "@/lib/types";

type EsimStatusCardProps = {
  esims: UserEsimWithPlan[];
};

function formatGb(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1).replace(/\.0$/, "");
}

export function EsimStatusCard({ esims }: EsimStatusCardProps) {
  if (esims.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3" aria-label="Статус eSIM">
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
        {esims.map((esim) => {
          const totalGb = esim.plan.data_gb;
          const usedGb = esim.used_gb;
          const remainingGb = Math.max(totalGb - usedGb, 0);
          const progress = Math.min(100, Math.max(0, (usedGb / totalGb) * 100));

          return (
            <article
              key={esim.id}
              className="w-full min-w-full snap-start rounded-2xl bg-surface-primary p-4 shadow-sm"
            >
              <h2 className="text-base font-semibold text-text-primary">Статус вашей eSIM</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Пакет {esim.plan.country} — {formatGb(totalGb)} Гб / {esim.plan.duration_days} дней
              </p>

              <Progress value={progress} className="mt-3 h-2.5" />

              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-text-secondary">
                <span>
                  {formatGb(usedGb)} Гб / {formatGb(totalGb)} Гб
                </span>
                <span>Осталось: {formatGb(remainingGb)} Гб</span>
              </div>

              <div className="mt-4 flex justify-end">
                <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">Пополнить</Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
