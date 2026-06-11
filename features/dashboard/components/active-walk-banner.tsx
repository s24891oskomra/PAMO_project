import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Walk } from "@/features/walks/types/walks-types";
import { Colors } from "@/constants/colors";
import CustomButton from "@/components/ui/custom-button";
import { useEndWalk } from "@/features/walks/hooks/use-walks";
import { formatTime } from "@/features/walks/utils/walks-utils";

type ActiveWalkBannerProps = {
  walk: Walk;
};

export default function ActiveWalkBanner({ walk }: ActiveWalkBannerProps) {
  const { mutate: endWalk } = useEndWalk(walk.id);

  return (
    <View className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm">
      <View className="mb-3 flex-row items-center gap-2">
        <View className="h-2 w-2 rounded-full bg-emerald-500" />
        <Text className="text-sm font-semibold text-emerald-700">
          Twój aktywny spacer
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="mr-4 h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white">
          {walk.animal.mainImageUrl ? (
            <Image
              source={{ uri: walk.animal.mainImageUrl }}
              className="h-14 w-14"
            />
          ) : (
            <Ionicons name="paw" size={26} color={Colors.primary.DEFAULT} />
          )}
        </View>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {walk.animal.name}
          </Text>
          <Text className="mt-1 text-sm text-gray-600">
            Od {formatTime(walk.walk_start)}
          </Text>
        </View>

        <CustomButton
          title="Zakończ"
          variant="ghost"
          style={{ padding: 16 }}
          onPress={() => endWalk()}
        />
      </View>
    </View>
  );
}
