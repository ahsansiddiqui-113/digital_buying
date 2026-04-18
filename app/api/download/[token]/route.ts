import { validateDownloadToken, getSignedDownloadUrl } from "@/actions/downloads";
import { getOrderById, getProductById } from "@/lib/db/queries";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const download = await validateDownloadToken(token);

    if (!download) {
      return new Response("Invalid or expired download token", { status: 404 });
    }

    // Get order and product details
    const order = await getOrderById(download.order_id);
    const product = await getProductById(order.product_id);

    // Get signed URL from Supabase
    const signedUrl = await getSignedDownloadUrl(product.file_url);

    // Redirect to the signed URL
    return new Response(null, {
      status: 302,
      headers: {
        Location: signedUrl,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Error processing download", { status: 500 });
  }
}
