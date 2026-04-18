import { notFound, redirect } from "next/navigation";
import { getSession } from "@/actions/auth";
import { createCheckoutSession } from "@/actions/orders";
import { fetchProductById } from "@/actions/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CheckoutPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect(`/login?redirect=/checkout/${params.id}`);
  }

  const product = await fetchProductById(params.id).catch(() => null);

  if (!product) {
    notFound();
  }

  const checkoutSession = await createCheckoutSession(params.id);

  if (!checkoutSession.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(checkoutSession.url);
}
