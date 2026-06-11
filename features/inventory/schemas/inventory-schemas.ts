import { z } from "zod";

export const foodItemListSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  barcode: z.string(),
  package_weight: z.string(),
  package_weight_unit: z.enum(["kg", "g"]),
  total_weight_grams: z.string(),
  package_count: z.number(),
  low_stock_threshold_grams: z.string(),
  status: z.string(),
  notes: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type FoodItemListEntry = z.infer<typeof foodItemListSchema>;
