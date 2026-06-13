import { View, Text } from "react-native";
import Animals from "@/features/animals/components/animals";
import { TestIds } from "@/constants/test-ids";

export default function AnimalsPage() {
  return (
    <View testID={TestIds.screens.animals} className="flex-1 p-4">
      <Text
        testID={TestIds.animals.title}
        className="text-base font-semibold text-gray-900 mb-4 mt-8"
      >
        Wszystkie zwierzęta
      </Text>
      <Animals />
    </View>
  );
}
