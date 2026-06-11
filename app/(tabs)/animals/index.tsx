import { View, Text } from "react-native";
import Animals from "@/features/animals/components/animals";

export default function AnimalsPage() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-base font-semibold text-gray-900 mb-4 mt-8">
        Wszystkie zwierzęta
      </Text>
      <Animals />
    </View>
  );
}
