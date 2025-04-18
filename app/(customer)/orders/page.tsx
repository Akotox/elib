// "use client"

// import { emailOrderHistory } from "@/app/actions/orders"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useFormState, useFormStatus } from "react-dom"

// export default function MyOrdersPage() {
//   const [data, action] = useFormState(emailOrderHistory, {})
//   return (
//     <form action={action} className="max-2-xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle>My Orders</CardTitle>
//           <CardDescription>
//             Enter your email and we will email you your order history and
//             download links
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input type="email" required name="email" id="email" />
//             {data.error && <div className="text-destructive">{data.error}</div>}
//           </div>
//         </CardContent>
//         <CardFooter>
//           {data.message ? <p>{data.message}</p> : <SubmitButton />}
//         </CardFooter>
//       </Card>
//     </form>
//   )
// }

// function SubmitButton() {
//   const { pending } = useFormStatus()

//   return (
//     <Button className="w-full" size="lg" disabled={pending} type="submit">
//       {pending ? "Sending..." : "Send"}
//     </Button>
//   )
// }

"use client";

import { emailOrderHistory } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition, useState } from "react";

export const mockOrders = [
  {
    id: "order-1",
    pricePaidInCents: 1499,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-1",
      name: "Next.js Crash Course",
      imagePath: "/products/nextjs-course.jpg",
      description: "Learn the basics of Next.js and build your first app.",
    },
  },
  {
    id: "order-2",
    pricePaidInCents: 2999,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-2",
      name: "Advanced Tailwind Workshop",
      imagePath: "/products/tailwind-workshop.jpg",
      description: "Master Tailwind CSS with real-world examples.",
    },
  },
  {
    id: "order-3",
    pricePaidInCents: 1999,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-3",
      name: "TypeScript for Beginners",
      imagePath: "/products/typescript-course.jpg",
      description: "Get started with TypeScript and write better JavaScript.",
    },
  },
  {
    id: "order-3",
    pricePaidInCents: 1999,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-3",
      name: "TypeScript for Beginners",
      imagePath: "/products/typescript-course.jpg",
      description: "Get started with TypeScript and write better JavaScript.",
    },
  },
  {
    id: "order-3",
    pricePaidInCents: 1999,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-3",
      name: "TypeScript for Beginners",
      imagePath: "/products/typescript-course.jpg",
      description: "Get started with TypeScript and write better JavaScript.",
    },
  },
  {
    id: "order-3",
    pricePaidInCents: 1999,
    createdAt: new Date().toISOString(),
    product: {
      id: "prod-3",
      name: "TypeScript for Beginners",
      imagePath: "/products/typescript-course.jpg",
      description: "Get started with TypeScript and write better JavaScript.",
    },
  },
];

type Order = {
  id: string;
  pricePaidInCents: number;
  createdAt: string | Date;
  product: {
    id: string;
    name: string;
    imagePath: string;
    description: string;
  };
};

export default function MyOrdersPage() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Record<string, string>>({});

  const handleSend = (orderId: string) => {
    startTransition(async () => {
      // const res = await emailOrderHistory({ orderId })
      // setStatus((prev) => ({
      //   ...prev,
      //   [orderId]: res?.message || "Email sent!",
      // }))
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
      <ul className="space-y-6">
        {mockOrders.map((order) => (
          <li
            key={order.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-4"
          >
            <div className="flex items-center gap-4">
             
              <div>
                <p className="font-medium">{order.product.name}</p>
                <p className="text-sm text-gray-500">
                  {order.product.description}
                </p>
                <p className="text-sm text-gray-500">
                  Paid ${(order.pricePaidInCents / 100).toFixed(2)} on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <Button
                variant="outline"
                className="rounded-2xl ml-1 tracking-normal bg-blue-500 hover:bg-blue-600 transition-transform group-hover:translate-x-0.5 text-white"
              >
                <span className="text-white">{pending ? "Sending..." : "Send Link"}</span>
              </Button>
              {status[order.id] && (
                <p className="text-xs text-green-600">{status[order.id]}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
