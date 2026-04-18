"use server";

import { generateToken, hashToken } from "@/lib/utils/crypto";
import { createDownload, getDownloadByToken } from "@/lib/db/queries";
import { createAdminClient } from "@/lib/supabase/admin";

export async function generateDownloadToken(orderId: string) {
  const token = generateToken();
  const hashedToken = hashToken(token);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await createDownload({
    order_id: orderId,
    download_token: hashedToken,
    expires_at: expiresAt,
  });

  return token;
}

export async function validateDownloadToken(token: string) {
  const hashedToken = hashToken(token);
  const download = await getDownloadByToken(hashedToken);

  if (!download) {
    return null;
  }

  if (new Date(download.expires_at) < new Date()) {
    return null;
  }

  return download;
}

export async function getSignedDownloadUrl(fileUrl: string) {
  const supabase = await createAdminClient();

  // Extract bucket and path from file URL
  const url = new URL(fileUrl);
  const pathParts = url.pathname.split("/storage/v1/object/public/");
  if (pathParts.length !== 2) {
    throw new Error("Invalid file URL");
  }

  const [bucket, path] = pathParts[1].split("/", 1).length === 1
    ? [pathParts[1].split("/")[0], pathParts[1].slice(pathParts[1].split("/")[0].length + 1)]
    : pathParts[1].split("/");

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 3600); // 1 hour expiry

  if (error) {
    throw error;
  }

  return data.signedUrl;
}
