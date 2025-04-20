import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  priceInCents: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price must be greater than 0"),
  filePath: z.string().min(1, "File path is required"),
  imagePath: z.string().min(1, "Image path is required"),
  description: z.string().min(1, "Description is required"),
  isAvailableForPurchase: z.boolean().optional().default(true),
});
