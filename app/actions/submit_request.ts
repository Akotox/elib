
'use server'

import db from "@/db/db";
import { productSchema } from "@/schemas/produc-schema";
import { z } from "zod";
import Stripe from "stripe";
import { requestSchema } from "@/schemas/request_schema";

export interface RequestFormData {
    title: string;
    author: string;
    additional: string;
  }

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}


export async function submitRequest(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: RequestFormData = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        additional: formData.get("additional") as string,
    };


    const validatedData = requestSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }


    const { title, author, additional } = validatedData.data;

   

    return {
      success: true,
      message: "Request sent successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}