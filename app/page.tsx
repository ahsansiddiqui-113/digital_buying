import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/actions/products";
import { ProductGrid } from "@/components/products/product-grid";

export default async function Home() {
  const products = await fetchProducts().catch(() => []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-white/10 rounded-full border border-white/20">
            <p className="text-sm font-semibold">🚀 Premium Digital Marketplace</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Exceptional <span className="bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent">Digital Products</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Access premium digital assets, templates, courses, and resources from world-class creators. Instant delivery, lifetime access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Browse Collection →
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose DigitalMarket?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for a seamless digital marketplace experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with Stripe. Your transactions and data are always protected.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Download immediately after purchase. No waiting, no delays. 24-hour secure links.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Marketplace</h3>
              <p className="text-gray-600 leading-relaxed">
                Access products from creators worldwide. Available 24/7 from anywhere on Earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Explore our curated collection of premium digital assets</p>
          </div>
          <ProductGrid products={products.slice(0, 6)} />
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="primary">
                View All Products ({products.length}) →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 to-secondary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-primary-100 max-w-2xl mx-auto">Join thousands of satisfied customers discovering premium digital products</p>
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Explore Now →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
