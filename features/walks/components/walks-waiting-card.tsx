import { View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { type WaitingWalk } from "../types/walks-types";
import { Colors } from "@/constants/colors";
import { useCreateWalk } from "../hooks/use-walks";
import { useAuth } from "@/providers/AuthProvider";
import CustomButton from "@/components/ui/custom-button";

export default function WaitingWalkCard({ animal }: { animal: WaitingWalk }) {
  const { user } = useAuth();
  const { mutate: createWalk } = useCreateWalk();

  const handleCreateWalk = () => {
    if (!user) return;
    createWalk({
      animal_id: animal.id,
      walked_by_id: user.id,
      walk_start: new Date().toISOString(),
      walk_end: null,
      notes: "",
    });
  };

  return (
    <View className="flex flex-row items-center bg-white px-4 py-3.5 rounded-2xl shadow-sm border border-gray-100">
      <View className="mr-4 h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-emerald-50">
        {animal.image_url ? (
          <Image source={{ uri: animal.image_url }} className="h-16 w-16" />
        ) : (
          <Ionicons name="paw" size={28} color={Colors.primary.DEFAULT} />
        )}
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">
          {animal.name}
        </Text>
        <Text className="mt-1 text-sm text-gray-500">
          {animal.days_since_last_walk && animal.hours_since_last_walk
            ? `Ostatni spacer: ${animal.days_since_last_walk} dni i ${animal.hours_since_last_walk} godz. temu`
            : "Ostatni spacer: nigdy"}
        </Text>
      </View>
      <CustomButton
        title="Zacznij spacer"
        style={{ padding: 4 }}
        onPress={handleCreateWalk}
        variant="ghost"
      />
    </View>
  );
}
