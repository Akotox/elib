import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Booking Completed",
  };
}

export const revalidate = 0;

export default async function SuccessPage({
  params: { productId },
  searchParams: { session_id },
}: {
  params: { productId: string };
  searchParams: { session_id: string };
}) {
  
    const product = await db.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      return notFound();
    }

  const appUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-xl bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg rounded-2xl p-6 w-full mx-4">
        <CardHeader className="text-center flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500 " />
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            {`Successfully Purchased ${product.name} e-book`}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Thank you for your purchase! Your order is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-700 dark:text-gray-200">
          🎉 You should receive an email with a download link shortly. Feel free to
          close this page or check your order history to resend the link.
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href={appUrl} className="inline-block">
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Continue
            </button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}