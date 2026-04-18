import Link from "next/link";
import { getSession } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export async function Header() {
  const session = await getSession();

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
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
            <Link href="/products" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {session && (
              <Link href="/admin" className="font-medium text-gray-700 hover:text-primary-600 transition-colors relative group">
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>

          <div className="flex gap-3 items-center">
            {session ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg border border-primary-100">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-gray-700">{session.user.email}</span>
                </div>
                <form action="/api/auth/signout" method="POST">
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
