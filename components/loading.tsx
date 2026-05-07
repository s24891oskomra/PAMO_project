import { Colors } from "@/constants/colors";
import { ActivityIndicator, View, Text } from "react-native";

export default function Loading({ message }: { message: string }) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
      <Text className="mt-3 text-gray-500">{message}</Text>
    </View>
  );
}
