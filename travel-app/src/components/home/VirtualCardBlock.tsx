import { Button } from "@/components/ui/button";
import type { UserCard } from "@/lib/types";

type VirtualCardBlockProps = {
  card: UserCard | undefined;
};

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function VirtualCardBlock({ card }: VirtualCardBlockProps) {
  if (!card) {
    return null;
  }

  return (
    <section
      className="rounded-2xl bg-brand-light p-5 shadow-sm"
      aria-label="Виртуальная карта пользователя"
    >
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <span>Твоя карта *{card.last_four}</span>
        <span className="font-semibold tracking-wide text-text-primary">{card.brand}</span>
      </div>

      <p className="mt-3 text-4xl font-bold leading-none text-text-primary">{formatUsd(card.balance_usd)}</p>

      <div className="mt-5 flex justify-end">
        <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">Пополнить</Button>
      </div>
    </section>
  );
}
