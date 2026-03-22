export type EsimStatus = "active" | "expired";
export type StoreCategory = "subscriptions" | "gaming" | "vpn" | "ai";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_initials: string;
}

export interface EsimPlan {
  id: number;
  country: string;
  country_code: string;
  region: string | null;
  data_gb: number;
  duration_days: number;
  price_rub: number;
  is_popular: number;
}

export interface UserEsim {
  id: number;
  user_id: number;
  plan_id: number;
  used_gb: number;
  activated_at: string;
  status: EsimStatus;
}

export interface UserCard {
  id: number;
  user_id: number;
  last_four: string;
  brand: string;
  balance_usd: number;
  currency: string;
}

export interface StoreProduct {
  id: number;
  name: string;
  category: StoreCategory;
  icon_url: string | null;
  price_usd: number;
  description: string | null;
}

export interface UserSubscription {
  id: number;
  user_id: number;
  product_id: number;
  renewal_date: string;
  price_usd: number;
}

export interface UserFavorite {
  id: number;
  user_id: number;
  product_id: number;
  sort_order: number;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string | null;
  gradient_from: string;
  gradient_to: string;
  link_to: string | null;
}

export interface UserEsimWithPlan extends UserEsim {
  plan: EsimPlan;
}

export interface UserSubscriptionWithProduct extends UserSubscription {
  product: StoreProduct;
}

export interface UserFavoriteWithProduct extends UserFavorite {
  product: StoreProduct;
}
