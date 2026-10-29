import { NextResponse } from "next/server";
import { Store } from "@/lib/data/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // SERVER-SIDE PRICE CALCULATION: Never trust client-submitted amounts
    let calculatedSubtotal = 0;
    const products = Store.getAllProductsAdmin();

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) continue;
      const unitPrice = variant.discountPrice || variant.price;
      calculatedSubtotal += unitPrice * item.quantity;
    }

    let discount = 0;
    if (couponCode) {
      const couponResult = Store.validateCoupon(couponCode, calculatedSubtotal);
      if (couponResult.valid && couponResult.discount) {
        discount = couponResult.discount;
      }
    }

    const shipping = calculatedSubtotal >= 499 || calculatedSubtotal === 0 ? 0 : 60;
    const grandTotal = Math.max(0, calculatedSubtotal - discount + shipping);

    // Mock Razorpay order creation response (ready for real Razorpay SDK)
    const razorpayOrderId = `order_rzp_${Date.now()}`;

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: grandTotal * 100, // in paise
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
