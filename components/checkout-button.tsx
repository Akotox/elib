"use client";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "./ui/button";

type CheckoutButtonProps = {
  productId: string;
  priceId: string | null;
  priceInCents: number;
};

export function CheckoutButton({ productId, priceId, priceInCents }: CheckoutButtonProps) {
  
  const handlePurchase = async () => {
    // const user = await currentUser()

    if (!priceId) return;
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        priceId,
        productId,
        clerkUserId: "clerkUserId", // TODO: Replace with actual user ID
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <Button
      variant="outline"
      className="w-full rounded-2xl ml-1 tracking-normal bg-black text-white hover:bg-blue-600 hover:text-white transition-colors duration-300"
      onClick={handlePurchase}
      disabled={!priceId}
    >
      <span>Purchase {formatCurrency(priceInCents/100)}</span>
    </Button>
  );
}