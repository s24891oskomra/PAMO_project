import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { Colors } from "@/constants/colors";
import { ROLE_LABELS } from "../constants/profile-labels";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <View className="flex-1">
      <View className="items-center rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm">
        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
          <Text className="text-3xl font-bold text-primary">
            {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()}
          </Text>
        </View>

        <Text className="text-2xl font-bold text-gray-900">
          {user.first_name} {user.last_name}
        </Text>

        <View className="mt-2 rounded-full bg-primary/10 px-3 py-1">
          <Text className="text-sm font-medium text-primary">
            {ROLE_LABELS[user.role] ?? user.role}
          </Text>
        </View>
      </View>

      <View className="mt-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <View className="flex-row items-center gap-3 border-b border-gray-100 px-4 py-3.5">
          <Ionicons name="mail-outline" size={20} color={Colors.gray[500]} />
          <View className="flex-1">
            <Text className="text-xs text-gray-500">E-mail</Text>
            <Text className="mt-0.5 text-base text-gray-900">{user.email}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3 px-4 py-3.5">
          <Ionicons
            name="business-outline"
            size={20}
            color={Colors.gray[500]}
          />
          <View className="flex-1">
            <Text className="text-xs text-gray-500">Schronisko</Text>
            <Text className="mt-0.5 text-base text-gray-900">
              {user.shelter_id}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
