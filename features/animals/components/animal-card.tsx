import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Animal } from "../types/animals-types";
import { Colors } from "@/constants/colors";
import {
  SEX_ICONS,
  STATUS_LABELS,
  SEX_LABELS,
} from "../constants/animals-labels";
import { useRouter } from "expo-router";

export default function AnimalCard({ animal }: { animal: Animal }) {
  const imageUri = animal.main_image?.url;
  const router = useRouter();

  const handleEditImage = (stringAnimalId: string) => {
    router.push({
      pathname: "/animals/modal",
      params: { animalId: stringAnimalId },
    });
  };

  return (
    <View className="flex flex-row items-center bg-white px-4 py-3.5 rounded-2xl shadow-sm border border-gray-100">
      <View className="mr-4 h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-emerald-50">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="h-16 w-16" />
        ) : (
          <Ionicons name="paw" size={28} color={Colors.primary.DEFAULT} />
        )}
      </View>

      <View className="flex-1 min-w-0">
        <View className="flex flex-row items-center justify-between gap-2">
          <Text className="text-lg font-semibold text-gray-900 flex-shrink">
            {animal.name}
          </Text>
          <View className="rounded-full bg-gray-100 px-2.5 py-0.5 flex-shrink-0">
            <Text className="text-xs font-medium text-gray-700">
              {STATUS_LABELS[animal.status]}
            </Text>
          </View>
        </View>

        <View className="mt-1.5 flex flex-row items-center gap-1.5">
          <Ionicons name="leaf-outline" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-600 flex-1" numberOfLines={1}>
            {animal.species.name} · {animal.breed.name}
          </Text>
        </View>

        <View className="mt-1 flex flex-row justify-between">
          <View className="flex flex-row rounded-full py-0.5 flex-shrink-0 items-center gap-1.5">
            <Ionicons name={SEX_ICONS[animal.sex]} size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">
              {SEX_LABELS[animal.sex]}
            </Text>
          </View>
          <View className="flex flex-row rounded-full bg-primary px-2.5 py-0.5 flex-shrink-0 items-center">
            <TouchableOpacity onPress={() => handleEditImage(animal.id)}>
              <Text className="text-xs font-medium text-white">
                Edytuj zdjęcie
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
