import { z } from "zod";

// Helper for ObjectId validation
const objectIdValidator = (val) => /^[0-9a-fA-F]{24}$/.test(val);

// --- Product ---
export const productSchema = z.object({
  _id: z.string().refine(objectIdValidator, { message: "Invalid Product ID" }).optional(),
  name: z.object({
    en: z.string().trim().optional(),
    am: z.string().trim().optional(),
    or: z.string().trim().optional(),
  }).refine(
    val => val.en || val.am || val.or,
    { message: "A product name must be provided in at least one language (en, am, or or)" }
  ),
  description: z.object({
    en: z.string().trim().optional(),
    am: z.string().trim().optional(),
    or: z.string().trim().optional(),
  }).optional(),
  price: z.number().min(0, { message: "Price cannot be negative" }),
  category_id: z.string(),
// image: z
//   .custom() // More flexible than instanceof
//   .refine((file) => !!file, "Image is required")
//   .refine((file) => {
//     // If it's a FileList, check the first item. If it's a File, check itself.
//     const f = file instanceof FileList ? file[0] : file;
//     return f?.type?.startsWith("image/");
//   }, "Must be an image"),

image: z.any()
    .refine((file) => !!file, "Image is required")
    .refine((file) => {
      // Only run this check in the browser
      if (typeof window === "undefined") return true;
      return file instanceof File || (typeof FileList !== "undefined" && file instanceof FileList);
    }, "Invalid file format")
});

// --- Category ---
export const categorySchema = z.object({
  _id: z.string().refine(objectIdValidator, { message: "Invalid Category ID" }).optional(),
  name: z.object({
    en: z.string().trim().optional(),
    am: z.string().trim().optional(),
    or: z.string().trim().optional(),
  }).refine(
    val => val.en || val.am || val.or,
    { message: "You must provide a name in at least one language (en, am, or or)" }
  ),

});

// --- Review ---
export const reviewSchema = z.object({
  user_id: z.string().refine(objectIdValidator, { message: "Invalid User ID" }),
  product_id: z.string().refine(objectIdValidator, { message: "Invalid Product ID" }),
  rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating cannot exceed 5" }),
  comment: z.string().optional(),
});

// --- Service ---
export const serviceSchema = z.object({
  _id: z.string().refine(objectIdValidator, { message: "Invalid Service ID" }).optional(),
  name: z.object({
    en: z.string().trim().optional(),
    am: z.string().trim().optional(),
    or: z.string().trim().optional(),
  }).refine(
    val => val.en || val.am || val.or,
    { message: "A service name must be provided in at least one language (en, am, or or)" }
  ),
  description: z.object({
    en: z.string().trim().optional(),
    am: z.string().trim().optional(),
    or: z.string().trim().optional(),
  }).optional(),
  price: z.number().min(0, { message: "Price cannot be negative" }),
});

// --- User ---
export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role_id: z.string().optional(),
  phone: z.string().optional(),
});