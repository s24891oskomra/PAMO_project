import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import type { FoodItemListEntry } from "../schemas/inventory-schemas";
import {
  STATUS_LABELS,
  formatWeightGrams,
} from "../constants/inventory-labels";

export default function FoodItemCard({ item }: { item: FoodItemListEntry }) {
  const statusLabel = STATUS_LABELS[item.status] ?? item.status;

  return (
    <View className="flex flex-row items-center bg-white px-4 py-3.5 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-1 min-w-0">
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-lg font-semibold text-gray-900 flex-shrink">
            {item.name}
          </Text>
          <View className="rounded-full bg-gray-100 px-2.5 py-0.5 flex-shrink-0">
            <Text className="text-xs font-medium text-gray-700">
              {statusLabel}
            </Text>
          </View>
        </View>

        <View className="mt-1 flex flex-col flex-wrap gap-x-4 gap-y-1">
          <Text className="text-sm text-gray-500">
            Stan: {formatWeightGrams(item.total_weight_grams)}
          </Text>
          <Text className="text-sm text-gray-500">
            Opakowania: {item.package_count}
          </Text>
          <Text className="text-sm text-gray-500">
            {item.package_weight} {item.package_weight_unit}/opak.
          </Text>
        </View>
      </View>
    </View>
  );
}
