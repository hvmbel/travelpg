"use client";

import { useState } from "react";
import { BalanceDisplay } from "@/components/card/BalanceDisplay";
import { CardVisual } from "@/components/card/CardVisual";
import { Button } from "@/components/ui/button";
import type { CardTransaction, UserCard } from "@/lib/types";

type CardWorkspaceProps = {
  card: UserCard;
  transactions: CardTransaction[];
};

const CARD_FEATURES = [
  "Работает с Apple Pay и Google Pay",
  "Подходит для международных платежей",
  "Безопасные онлайн-покупки с 3D Secure",
];

const LIMITS_INFO = [
  "Дневной лимит на оплату: $1,000",
  "Месячный лимит на оплату: $10,000",
  "Онлайн-платежи: включены",
  "Снятие наличных: недоступно для виртуальной карты",
];

function formatUsd(amount: number, direction: "in" | "out"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return direction === "out" ? `-${formatted}` : `+${formatted}`;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function CardWorkspace({ card, transactions }: CardWorkspaceProps) {
  const [isFrozen, setIsFrozen] = useState(card.card_status === "frozen");
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showLimits, setShowLimits] = useState(false);

  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 3);
  const hasMoreTransactions = transactions.length > 3;

  return (
    <>
      <CardVisual card={card} isFrozen={isFrozen} />
      <BalanceDisplay card={card} isFrozen={isFrozen} />

      <section className="grid grid-cols-2 gap-3">
        <Button
          variant={isFrozen ? "secondary" : "outline"}
          className="h-10"
          onClick={() => setIsFrozen((prev) => !prev)}
        >
          {isFrozen ? "Разморозить карту" : "Заморозить карту"}
        </Button>
        <Button variant="outline" className="h-10" onClick={() => setShowLimits((prev) => !prev)}>
          Лимиты
        </Button>
      </section>

      {showLimits ? (
        <section className="rounded-2xl bg-surface-primary p-4 shadow-sm" aria-label="Лимиты карты">
          <h2 className="text-base font-semibold text-text-primary">Лимиты и условия</h2>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            {LIMITS_INFO.map((item) => (
              <li key={item} className="rounded-lg bg-surface-secondary px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl bg-surface-primary p-4 shadow-sm" aria-label="Последние операции">
        <h2 className="text-base font-semibold text-text-primary">Последние операции</h2>
        <div className="mt-3 space-y-2">
          {visibleTransactions.map((transaction) => (
            <article
              key={transaction.id}
              className="flex items-center justify-between rounded-lg bg-surface-secondary px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{transaction.title}</p>
                <p className="text-xs text-text-secondary">{formatDate(transaction.occurred_at)}</p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  transaction.direction === "out" ? "text-text-primary" : "text-brand-green"
                }`}
              >
                {formatUsd(transaction.amount_usd, transaction.direction)}
              </p>
            </article>
          ))}
        </div>

        {hasMoreTransactions ? (
          <Button
            variant="outline"
            className="mt-3 h-9 w-full"
            onClick={() => setShowAllTransactions((prev) => !prev)}
          >
            {showAllTransactions ? "Свернуть" : "Еще"}
          </Button>
        ) : null}
      </section>

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
    </>
  );
}
