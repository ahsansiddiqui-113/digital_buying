import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/actions/products";
import { ProductGrid } from "@/components/products/product-grid";

export default async function Home() {
  const products = await fetchProducts().catch(() => []);

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#f8fafc_100%)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#67e8f9_0%,transparent_35%),radial-gradient(circle_at_80%_10%,#93c5fd_0%,transparent_40%),linear-gradient(130deg,#0f172a_0%,#0f3a66_45%,#0c4a6e_100%)] py-28 text-white">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 left-20 h-72 w-72 rounded-full bg-cyan-200 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2">
            <p className="text-sm font-semibold">Premium Digital Marketplace</p>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Build Faster With
            <span className="block bg-gradient-to-r from-cyan-200 to-blue-100 bg-clip-text text-transparent">Professional Digital Products</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-cyan-50 md:text-2xl">
            Discover production-ready templates, systems, and assets from proven creators. Instant access, secure checkout, and lifetime value.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Why Teams Choose DigitalMarket</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">Everything needed for a reliable digital product buying experience.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Secure Payments</h3>
              <p className="leading-relaxed text-slate-600">
                Bank-level security with Stripe. Your transactions and data are always protected.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Instant Access</h3>
              <p className="leading-relaxed text-slate-600">
                Download immediately after purchase. No waiting, no delays. 24-hour secure links.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Global Marketplace</h3>
              <p className="leading-relaxed text-slate-600">
                Access products from creators worldwide. Available 24/7 from anywhere on Earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Featured Products</h2>
            <p className="text-lg text-slate-600">Explore our curated collection of premium digital assets.</p>
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
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-5xl font-bold">Ready to Upgrade Your Workflow?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-cyan-100">Join teams and creators buying trusted digital products every day.</p>
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
