import { View, Text, Image } from "react-native";
import type { Walk } from "../types/walks-types";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/custom-button";
import { useEndWalk } from "../hooks/use-walks";
import { Colors } from "@/constants/colors";
import { formatDate, formatTime } from "../utils/walks-utils";
import { TestIds } from "@/constants/test-ids";

export default function WalksCard({ walk }: { walk: Walk }) {
  const { mutate: endWalk } = useEndWalk(walk.id);
  const isOngoing = !walk.walk_end;

  return (
    <View className="flex flex-row items-center bg-white px-4 py-3.5 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex flex-col items-center gap-1.5 mr-4">
        <View className="w-14 h-14 rounded-full bg-emerald-50 items-center justify-center overflow-hidden">
          {walk.animal.mainImageUrl ? (
            <Image
              source={{ uri: walk.animal.mainImageUrl }}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <Ionicons name="paw" size={26} color={Colors.primary.DEFAULT} />
          )}
        </View>
        <Text className="text-sm font-semibold text-gray-800">
          {walk.animal.name}
        </Text>
      </View>

      <View className="flex-1 flex flex-col gap-1.5">
        <View className="flex flex-row items-center gap-1.5">
          <Ionicons name="person-outline" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-600">
            {walk.walked_by?.first_name} {walk.walked_by?.last_name}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-1.5">
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-600">
            {formatDate(walk.walk_start)}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-3">
          <View className="flex flex-row items-center gap-1.5">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-600">
              {formatTime(walk.walk_start)}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={12} color="#D1D5DB" />
          {isOngoing ? (
            <View
              testID={TestIds.walks.ongoingBadge}
              className="flex flex-row items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full"
            >
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <Text className="text-xs font-medium text-emerald-700">Trwa</Text>
            </View>
          ) : (
            <Text className="text-sm text-gray-600">
              {formatTime(walk.walk_end!)}
            </Text>
          )}
        </View>
      </View>

      <View className="flex flex-row items-center gap-3">
        {isOngoing && (
          <CustomButton
            testID={TestIds.walks.endButton}
            title="Zakończ"
            variant="ghost"
            style={{ padding: 16 }}
            onPress={() => endWalk()}
          />
        )}
      </View>
    </View>
  );
}
