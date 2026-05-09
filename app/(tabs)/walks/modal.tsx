import { View, Text } from "react-native";
import CreateWalk from "@/features/walks/components/create-walk";

export default function WalksModal() {
  return (
    <View className="flex-1 bg-white">
      <CreateWalk />
    </View>
  );
}
