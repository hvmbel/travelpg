import { BannerCarousel } from "@/components/home/BannerCarousel";
import { EsimStatusCard } from "@/components/home/EsimStatusCard";
import { FavoritesRow } from "@/components/home/FavoritesRow";
import { SubscriptionAlert } from "@/components/home/SubscriptionAlert";
import { VirtualCardBlock } from "@/components/home/VirtualCardBlock";
import type { UserEsimWithPlan, UserFavoriteWithProduct, UserSubscriptionWithProduct } from "@/lib/types";
import {
  getBanners,
  getEsimPlan,
  getStoreProducts,
  getUserCard,
  getUserEsims,
  getUserFavorites,
  getUserSubscriptions,
} from "../../db/queries";

export default function HomePage() {
  const banners = getBanners();
  const esims = getUserEsims(1);
  const card = getUserCard(1);
  const subscriptions = getUserSubscriptions(1);
  const favorites = getUserFavorites(1);
  const products = getStoreProducts();
  const esimsWithPlans: UserEsimWithPlan[] = esims
    .map((esim) => {
      const plan = getEsimPlan(esim.plan_id);
      if (!plan) {
        return null;
      }
      return { ...esim, plan };
    })
    .filter((value): value is UserEsimWithPlan => value !== null);
  const subscriptionsWithProducts: UserSubscriptionWithProduct[] = subscriptions
    .map((subscription) => {
      const product = products.find((item) => item.id === subscription.product_id);
      if (!product) {
        return null;
      }
      return { ...subscription, product };
    })
    .filter((value): value is UserSubscriptionWithProduct => value !== null);
  const favoritesWithProducts: UserFavoriteWithProduct[] = favorites
    .map((favorite) => {
      const product = products.find((item) => item.id === favorite.product_id);
      if (!product) {
        return null;
      }
      return { ...favorite, product };
    })
    .filter((value): value is UserFavoriteWithProduct => value !== null);

  return (
    <section className="space-y-4 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">Главная</h1>
      <BannerCarousel banners={banners} />
      <EsimStatusCard esims={esimsWithPlans} />
      <VirtualCardBlock card={card} />
      <SubscriptionAlert subscriptions={subscriptionsWithProducts} />
      <FavoritesRow favorites={favoritesWithProducts} />
    </section>
  );
}
