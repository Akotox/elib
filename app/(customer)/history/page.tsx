
import OrderActions from "@/components/order-confirmation";
import { getUserOrders } from "@/server/client/getUserOrser";
import { auth } from "@clerk/nextjs/server";

export default async function MyOrdersPage() {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const orders = await getUserOrders(userId);

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

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
