import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function Logo() {
  return (
    <View className="mb-10 items-center">
      <View className="flex-row items-center mb-2 gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Ionicons name="paw" size={22} color={Colors.primary.DEFAULT} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">
          Zwierz<Text className="text-primary">App</Text>
        </Text>
      </View>
    </View>
  );
}
