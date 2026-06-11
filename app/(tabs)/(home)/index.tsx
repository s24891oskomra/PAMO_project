import { View } from "react-native";
import Dashboard from "@/features/dashboard/components/dashboard";

export default function HomePage() {
  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Dashboard />
    </View>
  );
}
