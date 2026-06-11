/**
 * Food inventory API — list, barcode lookup, dispense, and restock.
 *
 * @module inventory-api
 * @category Inventory
 */
import apiClient from "@/client";
import {
  foodItemListSchema,
  type FoodItemListEntry,
} from "../schemas/inventory-schemas";

const barcodePath = (barcode: string) =>
  `/inventory/food-items/barcode/${encodeURIComponent(barcode)}`;

export type FoodItem = {
  name: string;
  package_weight_unit: "kg" | "g";
};

/** Fetches all food items and their stock status. */
export const getFoodItems = async (): Promise<FoodItemListEntry[]> => {
  const response = await apiClient.get("/inventory/food-items/");
  return foodItemListSchema.array().parse(response.data);
};

/** Looks up a food item by barcode (EAN, Code 128, etc.). */
export const getFoodByBarcode = async (barcode: string): Promise<FoodItem> => {
  const { data } = await apiClient.get(barcodePath(barcode));
  return data;
};

/** Records food dispensed from inventory (by weight). */
export const dispenseFood = async (
  barcode: string,
  amount: number,
  unit: "kg" | "g",
) => {
  await apiClient.post(`${barcodePath(barcode)}/dispense`, { amount, unit });
};

/** Records a food delivery (restock by package count). */
export const restockFood = async (barcode: string, package_count: number) => {
  await apiClient.post(`${barcodePath(barcode)}/restock`, { package_count });
};
