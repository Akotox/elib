import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { CheckOutRequest } from "@/app/api/stripe/checkout/route";
import { CheckoutButton } from "./checkout-button";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
  stripePriceId: string | null; 
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
  stripePriceId,
}: ProductCardProps) {

  // const checkoutData: CheckOutRequest = {
  //   priceId: id,
  //   productId: stripePriceId!,
  // };

  // const handlePurchase = async () => {
  //   if (!stripePriceId) return;
  //   const response = await fetch("/api/stripe/checkout", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       priceId: stripePriceId,
  //       productId: id,
  //       clerkUserId: "clerkUserId", // Replace with actual user ID
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const { url } = await response.json();
  //   window.location.href = url;
  // };


  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <CheckoutButton 
          priceId={stripePriceId!}
          productId={id}/>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <span className="block w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
