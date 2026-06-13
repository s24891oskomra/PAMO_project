import { View, Text } from "react-native";
import { Link } from "expo-router";
import CustomButton from "@/components/ui/custom-button";
import FoodItems from "@/features/inventory/components/food-items";
import { TestIds } from "@/constants/test-ids";

export default function MagazynPage() {
  return (
    <View testID={TestIds.screens.magazyn} className="flex-1 p-4">
      <View className="mb-4 mt-8 flex-row gap-3">
        <View className="flex-1">
          <Link href="/magazyn/modal?action=dispense" asChild>
            <CustomButton
              testID={TestIds.magazyn.dispense}
              title="Wydaj karmę"
              variant="outline"
            />
          </Link>
        </View>
        <View className="flex-1">
          <Link href="/magazyn/modal?action=restock" asChild>
            <CustomButton testID={TestIds.magazyn.restock} title="Dodaj karmę" />
          </Link>
        </View>
      </View>

      <Text
        testID={TestIds.magazyn.title}
        className="text-base font-semibold text-gray-900 mb-4"
      >
        Produkty w magazynie
      </Text>
      <FoodItems />
    </View>
  );
}
