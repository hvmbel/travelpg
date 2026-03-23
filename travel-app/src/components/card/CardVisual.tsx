import type { UserCard } from "@/lib/types";

type CardVisualProps = {
  card: UserCard;
  isFrozen?: boolean;
};

export function CardVisual({ card, isFrozen = false }: CardVisualProps) {
  return (
    <section
      className={`rounded-2xl p-5 text-white shadow-sm transition ${isFrozen ? "bg-gradient-to-br from-zinc-500 via-zinc-600 to-zinc-700" : "bg-gradient-to-br from-[#0A58CA] via-[#0066FF] to-[#00A3FF]"}`}
      aria-label="Визуал карты"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Virtual card</p>
        {isFrozen ? (
          <span className="rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white">Заморожена</span>
        ) : (
          <span className="rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white">Активна</span>
        )}
      </div>
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
