import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import type { WaitingWalk } from "@/features/walks/types/walks-types";
import WaitingWalkCard from "@/features/walks/components/walks-waiting-card";

type WaitingPreviewProps = {
  waitingWalks: WaitingWalk[];
};

export default function WaitingPreview({ waitingWalks }: WaitingPreviewProps) {
  const router = useRouter();
  const previewWalks = waitingWalks.slice(0, 3);

  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-900">
          Oczekujące na spacer
        </Text>
        <TouchableOpacity onPress={() => router.push("/walks")}>
          <Text className="text-sm font-medium text-primary">
            Zobacz wszystkie
          </Text>
        </TouchableOpacity>
      </View>

      {previewWalks.length === 0 ? (
        <View className="items-center rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
          <Text className="text-center text-sm text-gray-500">
            Brak oczekujących spacerów!
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          {previewWalks.map((animal) => (
            <WaitingWalkCard key={animal.id} animal={animal} />
          ))}
        </View>
      )}
    </View>
  );
}
