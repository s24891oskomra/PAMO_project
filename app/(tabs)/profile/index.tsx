import { View } from "react-native";
import Profile from "@/features/profile/components/profile";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

export default function ProfilePage() {
  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Profile />
    </View>
  );
}
