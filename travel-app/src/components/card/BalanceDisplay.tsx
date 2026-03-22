import { Button } from "@/components/ui/button";
import type { UserCard } from "@/lib/types";

type BalanceDisplayProps = {
  card: UserCard;
};

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function BalanceDisplay({ card }: BalanceDisplayProps) {
  return (
    <section className="space-y-4 rounded-2xl bg-surface-primary p-4 shadow-sm" aria-label="Баланс карты">
      <div>
        <p className="text-sm text-text-secondary">Текущий баланс</p>
        <p className="mt-2 text-4xl font-bold leading-none text-text-primary">{formatUsd(card.balance_usd)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button className="h-10 bg-brand-blue text-white hover:bg-brand-blue/90">Пополнить</Button>
        <Button variant="outline" className="h-10">
          Реквизиты
        </Button>
      </div>
    </section>
  );
}
