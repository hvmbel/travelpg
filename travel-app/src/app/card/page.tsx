import { BalanceDisplay } from "@/components/card/BalanceDisplay";
import { CardVisual } from "@/components/card/CardVisual";
import { getUserCard } from "../../../db/queries";

const CARD_FEATURES = [
  "Работает с Apple Pay и Google Pay",
  "Подходит для международных платежей",
  "Безопасные онлайн-покупки с 3D Secure",
];

export default function CardPage() {
  const card = getUserCard(1);

  if (!card) {
    return (
      <section className="space-y-4 py-2">
        <h1 className="text-2xl font-semibold text-text-primary">Карта</h1>
        <div className="rounded-2xl bg-surface-primary p-4 shadow-sm">
          <p className="text-sm text-text-secondary">Карта еще не выпущена.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">Карта</h1>
      <CardVisual card={card} />
      <BalanceDisplay card={card} />

      <section className="rounded-2xl bg-surface-primary p-4 shadow-sm" aria-label="Возможности карты">
        <h2 className="text-base font-semibold text-text-primary">Возможности</h2>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          {CARD_FEATURES.map((feature) => (
            <li key={feature} className="rounded-lg bg-surface-secondary px-3 py-2">
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
