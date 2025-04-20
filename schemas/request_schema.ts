import {z} from "zod";

export const requestSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    additional: z.string().min(1, "Additional information required"),
});