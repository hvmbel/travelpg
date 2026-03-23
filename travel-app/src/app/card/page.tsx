import { CardWorkspace } from "@/components/card/CardWorkspace";
import { getCardTransactions, getUserCard } from "../../../db/queries";

export default function CardPage() {
  const card = getUserCard(1);
  const transactions = card ? getCardTransactions(card.id) : [];

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
      <CardWorkspace card={card} transactions={transactions} />
    </section>
  );
}
