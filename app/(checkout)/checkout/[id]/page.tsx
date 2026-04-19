import { notFound, redirect } from "next/navigation";
import { getSession } from "@/actions/auth";
import { createCheckoutSession } from "@/actions/orders";
import { fetchProductById } from "@/actions/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?redirect=/checkout/${id}`);
  }

  const product = await fetchProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const checkoutSession = await createCheckoutSession(id);

  if (!checkoutSession.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(checkoutSession.url);
}
