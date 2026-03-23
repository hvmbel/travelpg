import db from "./index";
import {
  type Banner,
  type CardTransaction,
  type EsimPlan,
  type StoreCategory,
  type StoreProduct,
  type User,
  type UserCard,
  type UserEsim,
  type UserFavorite,
  type UserSubscription,
} from "@/lib/types";

export function getUser(id: number): User | undefined {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
}

export function getUserEsims(userId: number): UserEsim[] {
  return db.prepare("SELECT * FROM user_esims WHERE user_id = ? ORDER BY id DESC").all(userId) as UserEsim[];
}

export function getEsimPlan(planId: number): EsimPlan | undefined {
  return db.prepare("SELECT * FROM esim_plans WHERE id = ?").get(planId) as EsimPlan | undefined;
}

export function getAvailablePlans(): EsimPlan[] {
  return db.prepare("SELECT * FROM esim_plans ORDER BY is_popular DESC, country ASC, price_rub ASC").all() as EsimPlan[];
}

export function getPlansByCountry(countryCode: string): EsimPlan[] {
  return db
    .prepare("SELECT * FROM esim_plans WHERE country_code = ? ORDER BY is_popular DESC, data_gb ASC")
    .all(countryCode) as EsimPlan[];
}

export function getUserCard(userId: number): UserCard | undefined {
  return db.prepare("SELECT * FROM user_cards WHERE user_id = ?").get(userId) as UserCard | undefined;
}

export function getCardTransactions(userCardId: number): CardTransaction[] {
  return db
    .prepare("SELECT * FROM card_transactions WHERE user_card_id = ? ORDER BY occurred_at DESC")
    .all(userCardId) as CardTransaction[];
}

export function getUserSubscriptions(userId: number): UserSubscription[] {
  return db
    .prepare("SELECT * FROM user_subscriptions WHERE user_id = ? ORDER BY renewal_date ASC")
    .all(userId) as UserSubscription[];
}

export function getUserFavorites(userId: number): UserFavorite[] {
  return db
    .prepare("SELECT * FROM user_favorites WHERE user_id = ? ORDER BY sort_order ASC")
    .all(userId) as UserFavorite[];
}

export function getStoreProducts(): StoreProduct[] {
  return db.prepare("SELECT * FROM store_products ORDER BY name ASC").all() as StoreProduct[];
}

export function getStoreProductsByCategory(category: StoreCategory): StoreProduct[] {
  return db
    .prepare("SELECT * FROM store_products WHERE category = ? ORDER BY name ASC")
    .all(category) as StoreProduct[];
}

export function getBanners(): Banner[] {
  return db.prepare("SELECT * FROM banners ORDER BY id ASC").all() as Banner[];
}
