import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();
        const order = await createPayPalOrder(amount);
        return NextResponse.json(order);
    } catch (error) {
        console.error("PayPal Create Order Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
