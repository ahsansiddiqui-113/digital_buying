import Link from "next/link";
import { Product } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-600 rounded-t-xl mb-0 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/10"></div>
          <span className="text-white text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">📦</span>
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Badge variant="primary">
              {`$${(product.price / 100).toFixed(2)}`}
            </Badge>
            <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
              View →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
