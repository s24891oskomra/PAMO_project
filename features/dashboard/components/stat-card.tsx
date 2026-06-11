import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type StatCardProps = {
  icon: IoniconsName;
  value: number | string;
  label: string;
  loading?: boolean;
};

export default function StatCard({
  icon,
  value,
  label,
  loading = false,
}: StatCardProps) {
  return (
    <View className="flex-1 items-center rounded-2xl border border-gray-100 bg-white px-3 py-4 shadow-sm">
      <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
        <Ionicons name={icon} size={20} color={Colors.primary.DEFAULT} />
      </View>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary.DEFAULT} />
      ) : (
        <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      )}
      <Text className="mt-1 text-center text-xs text-gray-500">{label}</Text>
    </View>
  );
}
