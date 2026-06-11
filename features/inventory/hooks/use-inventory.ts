/**
 * React Query hooks for food inventory.
 *
 * @module use-inventory
 * @category Inventory
 */
import { useQuery } from "@tanstack/react-query";
import { getFoodItems } from "../api/inventory-api";
import { inventoryKeys } from "../api/inventory-keys";

/** Fetches all food items with stock status. */
export const useFoodItems = () => {
  return useQuery({
    queryKey: inventoryKeys.all,
    queryFn: getFoodItems,
  });
};
