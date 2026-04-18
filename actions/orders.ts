"use server";

import { getSession } from "./auth";
import {
  createOrder as dbCreateOrder,
  getOrderByStripeSessionId,
  getUserOrders,
  getProductById,
} from "@/lib/db/queries";
import { getStripeClient } from "@/lib/stripe/client";

export async function createCheckoutSession(productId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  // Fetch product details
  const product = await getProductById(productId);

  // Create Stripe checkout session
  const stripe = getStripeClient();
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/products`,
    customer_email: session.user.email,
    metadata: {
      userId: session.user.id,
      productId: productId,
    },
  });

  return checkoutSession;
}

export async function createOrder(
  userId: string,
  productId: string,
  stripeSessionId: string,
  amountPaid: number
) {
  return dbCreateOrder({
    user_id: userId,
    product_id: productId,
    stripe_session_id: stripeSessionId,
    amount_paid: amountPaid,
  });
}

export async function getOrdersByUser() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return getUserOrders(session.user.id);
}

export async function getOrderBySessionId(sessionId: string) {
  return getOrderByStripeSessionId(sessionId);
}
