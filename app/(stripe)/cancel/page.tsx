import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Payment Cancelled",
  };
}

export const revalidate = 0;

const appUrl = process.env.NEXT_PUBLIC_URL;


export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-xl bg-gradient-to-br from-red-50 to-gray-100 shadow-lg rounded-2xl p-6 w-full mx-4">
        <CardHeader className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4 mx-auto" />
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Your payment was not completed. You can retry your purchase at any time.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-700 dark:text-gray-200">
          If this was a mistake, don’t worry. You can return to the product page and
          try again.
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href={appUrl} className="inline-block">
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Return
            </button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}