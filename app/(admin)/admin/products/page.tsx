import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { fetchProducts } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function AdminProductsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Check if user is admin
  const supabase = await createClient();
  const { data: user } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", session.user.id)
    .single();

  if (!user?.is_admin) {
    redirect("/");
  }

  const products = await fetchProducts().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Manage your digital products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>+ New Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">No products yet.</p>
          <Link href="/admin/products/new">
            <Button>Create Your First Product</Button>
          </Link>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Slug</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{product.title}</td>
                  <td className="py-3 px-4">{product.slug}</td>
                  <td className="py-3 px-4">
                    ${(product.price / 100).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <a
                        href={`/product/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View
                      </a>
                      <button className="text-red-600 hover:underline text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
