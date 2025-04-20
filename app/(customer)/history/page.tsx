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

// "use client";

import OrderActions from "@/components/order-confirmation";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { getUserOrders, OrderWithProduct } from "@/server/client/getUserOrser";
import { sendConfirmationEmail } from "@/server/client/sendLink";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";

// export const mockOrders = [
//   {
//     id: "order-1",
//     pricePaidInCents: 1499,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-1",
//       name: "Next.js Crash Course",
//       imagePath: "/products/nextjs-course.jpg",
//       description: "Learn the basics of Next.js and build your first app.",
//     },
//   },
//   {
//     id: "order-2",
//     pricePaidInCents: 2999,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-2",
//       name: "Advanced Tailwind Workshop",
//       imagePath: "/products/tailwind-workshop.jpg",
//       description: "Master Tailwind CSS with real-world examples.",
//     },
//   },
//   {
//     id: "order-3",
//     pricePaidInCents: 1999,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-3",
//       name: "TypeScript for Beginners",
//       imagePath: "/products/typescript-course.jpg",
//       description: "Get started with TypeScript and write better JavaScript.",
//     },
//   },
//   {
//     id: "order-4",
//     pricePaidInCents: 1999,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-3",
//       name: "TypeScript for Beginners",
//       imagePath: "/products/typescript-course.jpg",
//       description: "Get started with TypeScript and write better JavaScript.",
//     },
//   },
//   {
//     id: "order-5",
//     pricePaidInCents: 1999,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-3",
//       name: "TypeScript for Beginners",
//       imagePath: "/products/typescript-course.jpg",
//       description: "Get started with TypeScript and write better JavaScript.",
//     },
//   },
//   {
//     id: "order-6",
//     pricePaidInCents: 1999,
//     createdAt: new Date().toISOString(),
//     product: {
//       id: "prod-3",
//       name: "TypeScript for Beginners",
//       imagePath: "/products/typescript-course.jpg",
//       description: "Get started with TypeScript and write better JavaScript.",
//     },
//   },
// ];

// type Order = {
//   id: string;
//   pricePaidInCents: number;
//   createdAt: string | Date;
//   product: {
//     id: string;
//     name: string;
//     imagePath: string;
//     description: string;
//   };
// };

export default async function MyOrdersPage() {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const orders = await getUserOrders(userId);

  const handleSend = async (order: OrderWithProduct) => {
    try {
      const result = await sendConfirmationEmail({
        customerEmail: order.email,
        firstName: "BookWorm",
        downloadUrl: order.product.filePath,
      });
  
      if (result.success) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Purchase History</h1>
      <p className="text-sm mb-6 text-black">
        Once your purchase is complete, a download link will be sent to your
        email. If you do not receive the email or accidentally delete it, you
        can return to this page to access your purchase history and request the
        download link again.
      </p>
      <ul className="space-y-6">
        {orders.map((order) => (
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
              <OrderActions order={order} />

              {/* <p className="text-xs text-green-600">status</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
