import Link from "next/link";
import { getSession, signOut } from "@/actions/auth";
import { fetchProducts } from "@/actions/products";
import { Button } from "@/components/ui/button";

export async function Header() {
  const [session, products] = await Promise.all([
    getSession(),
    fetchProducts().catch(() => []),
  ]);

  const previewProducts = products.slice(0, 6);

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="border-b border-gray-100 bg-slate-900 text-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="font-medium">Instant Delivery | Secure Checkout | 24/7 Help</p>
          <p className="hidden sm:block">{products.length} products live in marketplace</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-700 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-700 bg-clip-text text-transparent">
              DigitalMarket
            </span>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="relative group">
              <Link href="/products" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group inline-flex items-center gap-1">
                Products
                <span className="text-xs">▼</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <div className="invisible opacity-0 translate-y-1 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 absolute left-0 top-full mt-3 w-72 rounded-xl border border-gray-200 bg-white shadow-xl p-2 z-50">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Featured Products
                </p>
                {previewProducts.length > 0 ? (
                  previewProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-xs text-primary-700 font-semibold">
                        ${(product.price / 100).toFixed(2)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-500">No products yet.</p>
                )}
                <div className="mt-1 border-t border-gray-100 pt-2">
                  <Link
                    href="/products"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            </div>

            {session && (
              <Link href="/admin" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group">
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}

            <Link href="/login" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group">
              Help
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex gap-3 items-center">
            {session ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg border border-primary-100">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-gray-700">{session.user.email}</span>
                </div>
                <form action={signOut}>
                  <Button variant="outline" size="sm">
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
