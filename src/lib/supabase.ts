import { createClient } from "@supabase/supabase-js";
import { Order, Product } from "@/types";
import { Enquiry } from "@/lib/data/store";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wqgubwlsmtvwnjeuoqtz.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ3Vid2xzbXR2d25qZXVvcXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMzAxODEsImV4cCI6MjEwODgwNjE4MX0.jIPUbFkZGssRcqxnvH8oFMfP1-q4rJgcmnKx-vst6Ug";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseHealth {
  connected: boolean;
  tableReady: boolean;
  productCount: number;
  message: string;
  error?: any;
}

/**
 * Perform a real-time health inspection of the Supabase PostgreSQL connection
 * and verify whether the 'public.products' table exists and is accessible.
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  try {
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) {
      // PGRST205 indicates table does not exist in the PostgREST schema cache
      if (error.code === "PGRST205") {
        return {
          connected: true,
          tableReady: false,
          productCount: 0,
          message:
            "Supabase is connected, but the 'products' table has not been created yet in SQL editor.",
          error,
        };
      }
      return {
        connected: false,
        tableReady: false,
        productCount: 0,
        message: `Supabase error: ${error.message} (${error.code || "unknown"})`,
        error,
      };
    }

    return {
      connected: true,
      tableReady: true,
      productCount: count ?? 0,
      message: `Supabase connected successfully. Found ${count ?? 0} products in cloud database.`,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableReady: false,
      productCount: 0,
      message: `Supabase connection exception: ${err?.message || err}`,
      error: err,
    };
  }
}

/**
 * Fetch all products from Supabase 'public.products' table.
 * Maps PostgreSQL columns back to camelCase Product type.
 */
export async function fetchProductsFromSupabase(): Promise<{
  data: Product[] | null;
  error: any;
}> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetchProducts warning:", error.message);
      return { data: null, error };
    }

    if (!data) {
      return { data: [], error: null };
    }

    const mapped: Product[] = data.map((row: any) => ({
      id: String(row.id),
      title: String(row.title || ""),
      slug: String(row.slug || ""),
      shortDesc: row.short_desc || "",
      description: row.description || "",
      ingredients: row.ingredients || "",
      benefits: row.benefits || "",
      howToUse: row.how_to_use || "",
      categoryId: String(row.category_id || ""),
      categoryName: row.category_name || "",
      isFeatured: Boolean(row.is_featured),
      isVisible: row.is_visible !== false,
      variants: Array.isArray(row.variants) ? row.variants : [],
      images: Array.isArray(row.images) ? row.images : [],
      rating: Number(row.rating) || 5.0,
      reviewCount: Number(row.review_count) || 0,
      createdAt: row.created_at || new Date().toISOString(),
    }));

    return { data: mapped, error: null };
  } catch (err: any) {
    console.warn("Supabase fetchProducts exception:", err);
    return { data: null, error: err };
  }
}

/**
 * Sync / Upsert a single product to Supabase products table
 * Includes complete variants and images JSONB payloads.
 */
export async function syncProductToSupabase(product: Product): Promise<{
  data: any;
  error: any;
}> {
  try {
    const payload = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      short_desc: product.shortDesc || "",
      description: product.description || "",
      ingredients: product.ingredients || "",
      benefits: product.benefits || "",
      how_to_use: product.howToUse || "",
      category_id: product.categoryId,
      category_name: product.categoryName || "",
      is_featured: Boolean(product.isFeatured),
      is_visible: Boolean(product.isVisible),
      variants: product.variants || [],
      images: product.images || [],
      rating: product.rating ?? 5.0,
      review_count: product.reviewCount ?? 0,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("products")
      .upsert([payload], { onConflict: "id" })
      .select();

    if (error) {
      console.warn("Supabase syncProduct warning:", error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn("Supabase syncProduct exception:", err);
    return { data: null, error: err };
  }
}

/**
 * Delete a product permanently from Supabase products table by ID
 */
export async function deleteProductFromSupabase(id: string): Promise<{
  data: any;
  error: any;
}> {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.warn("Supabase deleteProduct warning:", error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn("Supabase deleteProduct exception:", err);
    return { data: null, error: err };
  }
}

/**
 * Subscribe to realtime changes on 'public.products'
 * Returns an unsubscribe teardown function.
 */
export function subscribeToProductChanges(
  onChange: () => void
): () => void {
  try {
    const channel = supabase
      .channel("zh-realtime-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          onChange();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn("Realtime subscription failed:", err);
    return () => {};
  }
}

/**
 * Sync an order to Supabase orders table
 */
export async function syncOrderToSupabase(order: Order): Promise<{
  data: any;
  error: any;
}> {
  try {
    const { data, error } = await supabase.from("orders").upsert([
      {
        id: order.id,
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        customer_email: order.customerEmail || "",
        total_amount: order.totalAmount,
        subtotal: order.subtotal || order.totalAmount,
        shipping_cost: order.shippingCost || 0,
        discount_amount: order.discountAmount || 0,
        status: order.status,
        payment_method: order.paymentMethod || "CASH_ON_DELIVERY",
        payment_status: order.paymentStatus || "PENDING",
        address: order.address,
        items: order.items,
        notes: order.notes || "",
        created_at: order.createdAt || new Date().toISOString(),
      },
    ]);
    if (error) {
      console.warn("Supabase orders table sync note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase syncOrder exception:", err);
    return { data: null, error: err };
  }
}

/**
 * Sync an enquiry message to Supabase enquiries table
 */
export async function syncEnquiryToSupabase(enquiry: Enquiry): Promise<{
  data: any;
  error: any;
}> {
  try {
    const { data, error } = await supabase.from("enquiries").upsert([
      {
        id: enquiry.id,
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email || "",
        message: enquiry.message,
        is_read: enquiry.isRead,
        created_at: enquiry.createdAt || new Date().toISOString(),
      },
    ]);
    if (error) {
      console.warn("Supabase enquiries table sync note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase syncEnquiry exception:", err);
    return { data: null, error: err };
  }
}
