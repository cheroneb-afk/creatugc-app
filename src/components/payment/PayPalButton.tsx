"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PayPalButtonProps {
    amount: string;
    briefData: unknown;
    onSuccess?: (details: unknown) => void;
}

export default function PayPalButton({ amount, briefData, onSuccess }: PayPalButtonProps) {
    const [{ isPending }] = usePayPalScriptReducer();
    const router = useRouter();

    const handleCreateOrder = async () => {
        const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const order = await response.json() as { id: string };
        return order.id;
    };

    const handleApprove = async (data: { orderID: string }) => {
        try {
            const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderID: data.orderID,
                    briefData
                }),
            });

            const capture = await response.json();

            if (capture.status === "COMPLETED") {
                toast.success("Paiement réussi !");
                if (onSuccess) onSuccess(capture);
                router.push("/dashboard");
            } else {
                toast.error("Le paiement n'a pas pu être capturé.");
            }
        } catch (error) {
            console.error("Capture Error:", error);
            toast.error("Erreur lors de la capture du paiement.");
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center p-8 glass rounded-2xl border border-white/10">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={(err) => {
                    console.error("PayPal Error:", err);
                    toast.error("Erreur avec PayPal.");
                }}
            />
        </div>
    );
}
