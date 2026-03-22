import { ProductGrid } from "@/components/store/ProductGrid";
import { getStoreProducts } from "../../../db/queries";

export default function StorePage() {
  const products = getStoreProducts();

  return (
    <section className="space-y-4 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">Витрина</h1>
      <ProductGrid products={products} />
    </section>
  );
}
