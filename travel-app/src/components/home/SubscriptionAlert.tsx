import type { UserSubscriptionWithProduct } from "@/lib/types";

type SubscriptionAlertProps = {
  subscriptions: UserSubscriptionWithProduct[];
};

function formatRenewalDate(dateRaw: string): string {
  const date = new Date(`${dateRaw}T00:00:00`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function SubscriptionAlert({ subscriptions }: SubscriptionAlertProps) {
  if (subscriptions.length === 0) {
    return null;
  }

  const next = subscriptions[0];

  return (
    <section className="space-y-3" aria-label="Ближайшие подписки">
      <h2 className="text-lg font-semibold text-text-primary">Ближайшие подписки</h2>

      <article className="flex items-center justify-between rounded-2xl bg-surface-primary p-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-blue">
            {next.product.name.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">{next.product.name} — Продление</p>
            <p className="text-xs text-text-secondary">{formatRenewalDate(next.renewal_date)}</p>
          </div>
        </div>
        <p className="shrink-0 text-sm font-semibold text-text-primary">{formatUsd(next.price_usd)}</p>
      </article>
    </section>
  );
}
