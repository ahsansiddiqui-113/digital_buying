import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import { Button } from "@/components/ui/button";

export default async function NewProductPage() {
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

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/admin/products">
          <Button variant="outline">← Back</Button>
        </Link>
      </div>

      <ProductForm
        onSuccess={() => {
          // You could redirect here if needed
        }}
      />
    </div>
  );
}
