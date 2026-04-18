import { Metadata } from "next";
import { fetchProducts } from "@/actions/products";
import { ProductGrid } from "@/components/products/product-grid";

export const metadata: Metadata = {
  title: "Products - DigitalMarket",
  description: "Browse our collection of digital products.",
};

export default async function ProductsPage() {
  const products = await fetchProducts().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Digital Products</h1>
        <p className="text-gray-600">
          Choose from {products.length} digital products
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
