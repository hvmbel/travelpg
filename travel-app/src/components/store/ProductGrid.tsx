"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/store/ProductCard";
import type { StoreCategory, StoreProduct } from "@/lib/types";

type ProductGridProps = {
  products: StoreProduct[];
};

type CategoryFilter = "all" | StoreCategory;

const TABS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "subscriptions", label: "Подписки" },
  { key: "gaming", label: "Игры" },
  { key: "vpn", label: "VPN" },
  { key: "ai", label: "AI" },
];

export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") {
      return products;
    }
    return products.filter((product) => product.category === filter);
  }, [products, filter]);

  return (
    <section className="space-y-4" aria-label="Каталог цифровых товаров">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((tab) => {
          const active = tab.key === filter;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition ${
                active ? "bg-brand-blue text-white" : "bg-surface-primary text-text-secondary shadow-sm"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
