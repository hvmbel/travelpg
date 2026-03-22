import type { UserCard } from "@/lib/types";

type CardVisualProps = {
  card: UserCard;
};

export function CardVisual({ card }: CardVisualProps) {
  return (
    <section
      className="rounded-2xl bg-gradient-to-br from-[#0A58CA] via-[#0066FF] to-[#00A3FF] p-5 text-white shadow-sm"
      aria-label="Визуал карты"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-white/80">Virtual card</p>
      <p className="mt-8 text-xl font-semibold tracking-[0.1em]">•••• •••• •••• {card.last_four}</p>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-xs text-white/75">CARD HOLDER</p>
          <p className="mt-1 text-sm font-semibold">ANDREY N.</p>
        </div>
        <p className="text-lg font-bold tracking-wide">{card.brand}</p>
      </div>
    </section>
  );
}
