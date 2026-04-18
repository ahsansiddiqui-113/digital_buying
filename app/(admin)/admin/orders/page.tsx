import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function AdminOrdersPage() {
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

  // Fetch all orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, stripe_session_id, amount_paid, created_at, products(title), users(email)")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600">All customer orders</p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600">No orders yet.</p>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">
                    {order.stripe_session_id.slice(0, 12)}...
                  </td>
                  <td className="py-3 px-4">{order.products?.title || "—"}</td>
                  <td className="py-3 px-4">{order.users?.email || "—"}</td>
                  <td className="py-3 px-4">
                    ${(order.amount_paid / 100).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.created_at).toLocaleDateString()}
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
