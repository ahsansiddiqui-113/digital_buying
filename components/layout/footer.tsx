export function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700">
                <span className="text-sm font-bold text-white">D</span>
              </div>
              <h3 className="text-lg font-bold">DigitalMarket</h3>
            </div>
            <p className="leading-relaxed text-slate-400">
              The premier marketplace for premium digital products and resources from world-class creators.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-white">Marketplace</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="/products" className="transition-colors hover:text-cyan-300">Browse Products</a></li>
              <li><a href="/" className="transition-colors hover:text-cyan-300">Featured Collection</a></li>
              <li><a href="/admin" className="transition-colors hover:text-cyan-300">Seller Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-white">Support</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="/login" className="transition-colors hover:text-cyan-300">Sign In</a></li>
              <li><a href="/signup" className="transition-colors hover:text-cyan-300">Create Account</a></li>
              <li><a href="/products" className="transition-colors hover:text-cyan-300">Product Help</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-white">Trust</h4>
            <ul className="space-y-3 text-slate-400">
              <li>Stripe-secured checkout</li>
              <li>Instant digital delivery</li>
              <li>24-hour secure download links</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} DigitalMarket. All rights reserved.
            </p>
            <div className="mt-4 flex gap-4 md:mt-0">
              <a href="/products" className="text-slate-400 transition-colors hover:text-cyan-300">Catalog</a>
              <a href="/admin" className="text-slate-400 transition-colors hover:text-cyan-300">Admin</a>
              <a href="/login" className="text-slate-400 transition-colors hover:text-cyan-300">Account</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
