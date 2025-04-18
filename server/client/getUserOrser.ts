"use server";

import db from "@/db/db";

interface OrderWithProduct {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  updatedAt: Date;
  status: "PENDING" | "DELIVERED" | "FAILED"; 
  userId: string;
  email: string;
  productId: string;
  product: {
    id: string;
    name: string;
    priceInCents: number;
    filePath: string;
    imagePath: string;
    description: string;
    isAvailableForPurchase: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function getUserOrders(userId: string): Promise<OrderWithProduct[]> {
  try {
    const orders = await db.order.findMany({
        where: {
            userId: userId,
        },
        include: {
            product: true,
        }
    });

    return orders;
  } catch (error) {
    throw new Error("Could not fetch orders.");
  }
}