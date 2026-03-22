import { Badge } from "@/components/ui/badge";
import type { StoreProduct } from "@/lib/types";

type ProductCardProps = {
  product: StoreProduct;
};

const CATEGORY_LABELS: Record<StoreProduct["category"], string> = {
  subscriptions: "Подписки",
  gaming: "Игры",
  vpn: "VPN",
  ai: "AI",
};

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="space-y-3 rounded-2xl bg-surface-primary p-4 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-blue">
        {product.name.slice(0, 2).toUpperCase()}
      </div>

      <div>
        <p className="line-clamp-2 text-sm font-semibold text-text-primary">{product.name}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary">{formatUsd(product.price_usd)}</p>
      </div>

      <Badge className="bg-surface-secondary text-text-secondary">{CATEGORY_LABELS[product.category]}</Badge>
    </article>
  );
}
