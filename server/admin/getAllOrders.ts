"use server";

import db from "@/db/db";
import { Order } from "@prisma/client";
import { OrderWithProduct } from "../client/getUserOrser";

export async function getAllOrders(): Promise<OrderWithProduct[]> {
  try {
    const orders = await db.order.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc", // This assumes you have a 'createdAt' field
      },
    });
    return orders;
  } catch (error) {
    throw new Error("Could not fetch orders.");
  }
}