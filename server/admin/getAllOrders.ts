"use server";

import db from "@/db/db";
import { Order } from "@prisma/client";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await db.order.findMany();
    return orders;
  } catch (error) {
    throw new Error("Could not fetch orders.");
  }
}