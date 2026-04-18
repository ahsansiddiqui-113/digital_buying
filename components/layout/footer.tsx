export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold"></span>
              </div>
              <h3 className="text-lg font-bold">DigitalMarket</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The premier marketplace for premium digital products and resources from world-class creators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wide">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/products" className="hover:text-primary-400 transition-colors">Browse Products</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Trending</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} DigitalMarket. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
