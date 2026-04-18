import { headers } from "next/headers";
import { getStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { getOrderByStripeSessionId, createOrder, createDownload, getProductById } from "@/lib/db/queries";
import { generateToken } from "@/lib/utils/crypto";
import { getResendClient, FROM_EMAIL } from "@/lib/email/resend";
import { downloadLinkEmail } from "@/lib/email/templates";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  let event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Prevent duplicate orders
    const existingOrder = await getOrderByStripeSessionId(session.id);
    if (existingOrder) {
      return new Response(JSON.stringify({ received: true }));
    }

    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;

    if (!userId || !productId) {
      return new Response("Missing metadata", { status: 400 });
    }

    try {
      // Create order
      const order = await createOrder({
        user_id: userId,
        product_id: productId,
        stripe_session_id: session.id,
        amount_paid: session.amount_total || 0,
      });

      // Generate download token
      const token = await generateToken();
      await createDownload({
        order_id: order.id,
        download_token: token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      // Get product details
      const product = await getProductById(productId);

      // Send email with download link
      const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/download/${token}`;

      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: session.customer_email!,
        subject: `Your ${product.title} is ready to download!`,
        html: downloadLinkEmail(
          product.title,
          downloadLink,
          "24 hours"
        ),
      });

      return new Response(JSON.stringify({ received: true }));
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }));
}
