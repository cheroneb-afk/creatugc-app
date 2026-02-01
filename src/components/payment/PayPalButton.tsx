"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PayPalButtonProps {
    amount: string;
    email?: string;
    briefData: {
        pack_type?: string;
        is_checkout?: boolean;
        id?: string;
        promo_code?: string;
        discount_amount?: number;
    };
    onSuccess?: (details: unknown) => void;
    onProcessing?: (isProcessing: boolean) => void;
}

export default function PayPalButton({ amount, email, briefData, onSuccess, onProcessing }: PayPalButtonProps) {
    const [{ isPending }] = usePayPalScriptReducer();
    const router = useRouter();

    console.log("=== PAYPAL BUTTON RENDER ===");
    console.log("Amount:", amount);
    console.log("Email:", email);
    console.log("BriefData:", briefData);

    const handleCreateOrder = async () => {
        console.log("=== CREATE ORDER CALLED ===");
        console.log("Creating order with amount:", amount);

        try {
            const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            console.log("Create order response status:", response.status);
            const order = await response.json() as { id: string };
            console.log("Created PayPal order:", order);

            return order.id;
        } catch (error) {
            console.error("Create order error:", error);
            throw error;
        }
    };

    const handleApprove = async (data: { orderID: string }) => {
        console.log("=== PAYPAL APPROVE START ===");
        console.log("OrderID:", data.orderID);
        console.log("Email:", email);
        console.log("BriefData:", briefData);

        // Notify parent that processing has started
        if (onProcessing) onProcessing(true);

        try {
            console.log("Calling capture-order API...");
            const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderID: data.orderID,
                    briefData,
                    email
                }),
            });

            console.log("API Response status:", response.status);
            const capture = await response.json();
            console.log("API Response body:", JSON.stringify(capture));

            // Check for success - API returns success: true AND status: "COMPLETED"
            const captureOrderId = capture.orderId || capture.dbOrderId;
            const isSuccess = (capture.success === true || capture.status === "COMPLETED") && captureOrderId;

            if (isSuccess) {
                console.log("=== PAYMENT SUCCESS ===");
                console.log("Order ID:", captureOrderId);
                toast.success("Paiement réussi !");
                if (onSuccess) onSuccess(capture);

                // Build success URL
                const successUrl = `/checkout/success?orderId=${captureOrderId}&email=${encodeURIComponent(capture.email || email || "")}`;
                console.log("Redirecting to:", successUrl);

                // Use window.location for full page redirect
                window.location.href = successUrl;
            } else {
                console.error("=== PAYMENT FAILED ===");
                console.error("Status:", capture.status);
                console.error("Error:", capture.error);
                console.error("Details:", capture.details);
                toast.error(capture.error || capture.details || "Le paiement n'a pas pu être capturé.");
            }
        } catch (error) {
            console.error("=== CAPTURE ERROR ===", error);
            toast.error("Erreur lors de la capture du paiement.");
        }
    };

    if (isPending) {
        console.log("PayPal script is pending...");
        return (
            <div className="flex items-center justify-center p-8 glass rounded-2xl border border-white/10">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    console.log("PayPal script loaded, rendering buttons");

    return (
        <div className="w-full">
            <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onCancel={() => {
                    console.log("=== PAYMENT CANCELLED ===");
                    toast.info("Paiement annulé");
                }}
                onError={(err) => {
                    console.error("=== PAYPAL ERROR ===", err);
                    toast.error("Erreur avec PayPal.");
                }}
            />
        </div>
    );
}

