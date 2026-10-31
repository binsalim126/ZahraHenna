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

/**
 * Sync an order to Supabase orders table
 */
export async function syncOrderToSupabase(order: Order) {
  try {
    const { data, error } = await supabase.from("orders").insert([
      {
        id: order.id,
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        customer_email: order.customerEmail,
        total_amount: order.totalAmount,
        status: order.status,
        address: order.address,
        items: order.items,
        notes: order.notes,
        created_at: order.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase orders table sync note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase syncOrder exception:", err);
    return { error: err };
  }
}

/**
 * Sync an enquiry message to Supabase enquiries table
 */
export async function syncEnquiryToSupabase(enquiry: Enquiry) {
  try {
    const { data, error } = await supabase.from("enquiries").insert([
      {
        id: enquiry.id,
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email,
        message: enquiry.message,
        is_read: enquiry.isRead,
        created_at: enquiry.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase enquiries table sync note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase syncEnquiry exception:", err);
    return { error: err };
  }
}

/**
 * Sync a product to Supabase products table
 */
export async function syncProductToSupabase(product: Product) {
  try {
    const { data, error } = await supabase.from("products").upsert([
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        short_desc: product.shortDesc,
        description: product.description,
        ingredients: product.ingredients,
        benefits: product.benefits,
        how_to_use: product.howToUse,
        category_id: product.categoryId,
        category_name: product.categoryName,
        is_featured: product.isFeatured,
        is_visible: product.isVisible,
        images: product.images,
        created_at: product.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase products table sync note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase syncProduct exception:", err);
    return { error: err };
  }
}

/**
 * Delete a product from Supabase products table
 */
export async function deleteProductFromSupabase(id: string) {
  try {
    const { data, error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.warn("Supabase products table delete note:", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase deleteProduct exception:", err);
    return { error: err };
  }
}
