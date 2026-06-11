import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AnimalsEditPicture from "@/features/animals/components/animals-edit-picture";

export default function AnimalsModal() {
  const { animalId } = useLocalSearchParams<{ animalId: string }>();

  return (
    <View className="flex-1 bg-white">
      <AnimalsEditPicture animalId={animalId} />
    </View>
  );
}
