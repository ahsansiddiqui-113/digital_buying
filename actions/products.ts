"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct as dbCreateProduct,
} from "@/lib/db/queries";
import { getSession } from "./auth";

export async function fetchProducts() {
  return getProducts();
}

export async function fetchProductBySlug(slug: string) {
  return getProductBySlug(slug);
}

export async function fetchProductById(id: string) {
  return getProductById(id);
}

export async function createProduct(
  title: string,
  slug: string,
  description: string,
  price: number,
  fileUrl: string
) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  const { data: user } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", session.user.id)
    .single();

  if (!user?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  return dbCreateProduct({
    title,
    slug,
    description,
    price,
    file_url: fileUrl,
  });
}

export async function uploadProductFile(file: File): Promise<string> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const supabase = await createAdminClient();

  const filename = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("product-files")
    .upload(filename, file);

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("product-files")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
