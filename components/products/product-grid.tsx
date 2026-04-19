import { Product } from "@/types/database";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
        <p className="mt-2 text-slate-600 text-lg">Try changing your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className || ""}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
