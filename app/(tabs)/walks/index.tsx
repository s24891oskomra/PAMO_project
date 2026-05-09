import { Text, View } from "react-native";
import WalksWaiting from "@/features/walks/components/walks-waiting";
import Walks from "@/features/walks/components/walks";

export default function WalksPage() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-base font-semibold text-gray-900 mb-4">
        Oczekujące na spacer
      </Text>
      <WalksWaiting />
      <Text className="text-base font-semibold text-gray-900 mb-4 mt-8">
        Wszystkie spacery
      </Text>
      <Walks />
    </View>
  );
}
