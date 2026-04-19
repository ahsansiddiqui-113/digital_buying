import Link from "next/link";
import { Product } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_CONTENT } from "@/lib/product-content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const content = PRODUCT_CONTENT[product.slug];
  const emoji = content?.emoji ?? "📦";
  const gradient = content?.gradient ?? "from-blue-400 to-purple-600";
  const accentColor = content?.accentColor ?? "text-blue-700";

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group cursor-pointer overflow-hidden rounded-2xl border-slate-200 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className={`relative mb-0 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-none bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25"></div>
          <span className="relative z-10 text-6xl transition-transform duration-300 group-hover:scale-110">{emoji}</span>
          <div className="absolute left-4 top-4">
            <Badge variant="secondary">Digital Download</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
            {product.title}
          </h3>
          <p className="mb-4 h-10 line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <Badge variant="primary" className="text-base">
              {`$${(product.price / 100).toFixed(2)}`}
            </Badge>
            <span className={`font-semibold ${accentColor} transition-transform group-hover:translate-x-1`}>
              View →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
