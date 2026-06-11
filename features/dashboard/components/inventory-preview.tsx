import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import FoodItemCard from "@/features/inventory/components/food-item-card";
import type { FoodItemListEntry } from "@/features/inventory/schemas/inventory-schemas";

type InventoryPreviewProps = {
  foodItems: FoodItemListEntry[];
};

const LOW_STOCK_STATUSES = new Set(["low_stock", "out_of_stock"]);

export default function InventoryPreview({ foodItems }: InventoryPreviewProps) {
  const router = useRouter();
  const lowStockItems = foodItems
    .filter((item) => LOW_STOCK_STATUSES.has(item.status))
    .slice(0, 3);

  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-900">
          Niski stan magazynu
        </Text>
        <TouchableOpacity onPress={() => router.push("/magazyn")}>
          <Text className="text-sm font-medium text-primary">
            Zobacz wszystkie
          </Text>
        </TouchableOpacity>
      </View>

      {lowStockItems.length === 0 ? (
        <View className="items-center rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
          <Text className="text-center text-sm text-gray-500">
            Wszystkie produkty są na stanie!
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          {lowStockItems.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}
