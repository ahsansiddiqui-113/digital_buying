import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchProductBySlug } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - DigitalMarket`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductBySlug(params.slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="text-blue-600 hover:underline mb-8">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-9xl">📦</span>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">
              ${(product.price / 100).toFixed(2)}
            </span>
          </div>

          <Card className="mb-8">
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </Card>

          <Card className="mb-8">
            <h3 className="font-semibold mb-3">What You Get</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Instant download after purchase</li>
              <li>✓ Lifetime access to your purchase</li>
              <li>✓ High-quality digital file</li>
              <li>✓ 24-hour security-verified download link</li>
            </ul>
          </Card>

          <Link href={`/checkout/${product.id}`}>
            <Button size="lg" className="w-full">
              Buy Now - ${(product.price / 100).toFixed(2)}
            </Button>
          </Link>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
