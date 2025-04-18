"use server";

import db from "@/db/db";
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany();
    return products;
  } catch (error) {
    throw new Error("Could not fetch teacher meetings.");
  }
}