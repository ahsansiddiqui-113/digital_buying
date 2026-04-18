import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Product, Order, Download } from "@/types/database";

// Products
export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Product;
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Product;
}

export async function createProduct(product: Omit<Product, "id" | "created_at">) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

// Orders
export async function createOrder(order: Omit<Order, "id" | "created_at">) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

export async function getOrderByStripeSessionId(sessionId: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as Order | null;
}

export async function getOrderById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Order;
}

// Downloads
export async function createDownload(download: Omit<Download, "id" | "created_at">) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("downloads")
    .insert([download])
    .select()
    .single();

  if (error) throw error;
  return data as Download;
}

export async function getDownloadByToken(token: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .eq("download_token", token)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as Download | null;
}

export async function getUserOrders(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, products(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
