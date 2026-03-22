import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { UserEsimWithPlan } from "@/lib/types";

type TrafficMonitorProps = {
  esim: UserEsimWithPlan | undefined;
};

function formatGb(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(1).replace(/\.0$/, "");
}

function getDaysRemaining(activatedAt: string, durationDays: number): number {
  const activatedDate = new Date(`${activatedAt}T00:00:00`);
  const expiresAt = new Date(activatedDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (24 * 60 * 60 * 1000)));
}

export function TrafficMonitor({ esim }: TrafficMonitorProps) {
  if (!esim) {
    return (
      <section className="rounded-2xl bg-surface-primary p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-text-primary">Трафик eSIM</h2>
        <p className="mt-2 text-sm text-text-secondary">Активных eSIM пока нет.</p>
      </section>
    );
  }

  const totalGb = esim.plan.data_gb;
  const usedGb = esim.used_gb;
  const remainingGb = Math.max(totalGb - usedGb, 0);
  const progress = Math.min(100, Math.max(0, (usedGb / totalGb) * 100));
  const daysRemaining = getDaysRemaining(esim.activated_at, esim.plan.duration_days);
  const isActive = esim.status === "active";

  return (
    <section className="rounded-2xl bg-surface-primary p-4 shadow-sm" aria-label="Монитор трафика eSIM">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Трафик eSIM</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {esim.plan.country}, пакет {formatGb(totalGb)} Гб на {esim.plan.duration_days} дней
          </p>
        </div>
        <Badge className={isActive ? "bg-brand-green text-white" : "bg-text-muted text-white"}>
          {isActive ? "Активна" : "Истекла"}
        </Badge>
      </div>

      <Progress value={progress} className="mt-4 h-3" />

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-surface-secondary p-3">
          <p className="text-xs text-text-secondary">Использовано</p>
          <p className="mt-1 font-semibold text-text-primary">
            {formatGb(usedGb)} / {formatGb(totalGb)} Гб
          </p>
        </div>
        <div className="rounded-xl bg-surface-secondary p-3">
          <p className="text-xs text-text-secondary">Осталось</p>
          <p className="mt-1 font-semibold text-text-primary">{formatGb(remainingGb)} Гб</p>
        </div>
        <div className="rounded-xl bg-surface-secondary p-3">
          <p className="text-xs text-text-secondary">Дней до окончания</p>
          <p className="mt-1 font-semibold text-text-primary">{daysRemaining}</p>
        </div>
        <div className="rounded-xl bg-surface-secondary p-3">
          <p className="text-xs text-text-secondary">Статус</p>
          <p className="mt-1 font-semibold text-text-primary">{isActive ? "В работе" : "Отключена"}</p>
        </div>
      </div>
    </section>
  );
}
