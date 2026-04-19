import { Metadata } from "next";
import { fetchProducts } from "@/actions/products";
import { ProductBrowser } from "@/components/products/product-browser";

export const metadata: Metadata = {
  title: "Products - DigitalMarket",
  description: "Browse our collection of digital products.",
};

export default async function ProductsPage() {
  const products = await fetchProducts().catch(() => []);

  return (
    <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#ecfeff_35%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Marketplace</p>
          <h1 className="mb-2 mt-2 text-4xl font-bold text-slate-900">Digital Products</h1>
          <p className="text-slate-600">
            Choose from {products.length} premium digital products with instant delivery.
          </p>
        </div>

        <ProductBrowser products={products} />
      </div>
    </div>
  );
}
