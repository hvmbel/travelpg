import type { UserFavoriteWithProduct } from "@/lib/types";

type FavoritesRowProps = {
  favorites: UserFavoriteWithProduct[];
};

export function FavoritesRow({ favorites }: FavoritesRowProps) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3" aria-label="Избранное">
      <h2 className="text-lg font-semibold text-text-primary">Избранное</h2>
      <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-1">
        {favorites.map((favorite) => (
          <article key={favorite.id} className="flex w-[72px] shrink-0 flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-primary text-sm font-semibold text-text-primary shadow-sm">
              {favorite.product.name.slice(0, 2).toUpperCase()}
            </div>
            <p className="w-full truncate text-center text-xs text-text-secondary">{favorite.product.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
