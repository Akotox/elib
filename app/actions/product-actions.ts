
'use server'

import db from "@/db/db";
import { productSchema } from "@/schemas/produc-schema";
import { z } from "zod";
import Stripe from "stripe";

export interface ProductFormData {
    name: string;
    priceInCents: number;
    filePath: string;
    imagePath: string;
    description: string;
    isAvailableForPurchase?: boolean; // optional if you want default to true
  }

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function submitProduct(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: ProductFormData = {
      name: formData.get("name") as string,
      priceInCents: parseInt(formData.get("priceInCents") as string, 10),
      filePath: formData.get("filePath") as string,
      imagePath: formData.get("imagePath") as string,
      description: formData.get("description") as string,
      isAvailableForPurchase: formData.get("isAvailableForPurchase") === "on",
    };


    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }


    const product = await stripe.products.create({
      name: validatedData.data.name,
      description: validatedData.data.description,
      images: [validatedData.data.imagePath],

    });

    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: validatedData.data.priceInCents,
      product: product.id,
    });


   
    await db.product.create({
      data:{
        name: validatedData.data.name,
        priceInCents: validatedData.data.priceInCents,
        filePath: validatedData.data.filePath,
        imagePath: validatedData.data.imagePath,
        description: validatedData.data.description,
        isAvailableForPurchase: validatedData.data.isAvailableForPurchase,
        stripePriceId: price.id,
        stripeProductId: product.id,
      }
    })

    return {
      success: true,
      message: "Product saved successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}