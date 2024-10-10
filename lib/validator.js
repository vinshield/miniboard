import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(800, "Description must be less than 800 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must be less than 200 characters"),
  // imageUrl: z.string(),
  startDateTime: z.string().or(z.date()),
  endDateTime: z.string().or(z.date()),
  categoryId: z.string(),
  isAllDay: z.boolean(),
  //   price: z.string(),
  //   isFree: z.boolean(),
  // url: z.string().url(),
});
