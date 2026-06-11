import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAnimalsWithImages } from "@/features/animals/hooks/use-animals";
import { useCreateWalk } from "../hooks/use-walks";
import { useAuth } from "@/providers/AuthProvider";
import { Colors } from "@/constants/colors";
import CustomButton from "@/components/ui/custom-button";
import Loading from "@/components/loading";
import Error from "@/components/error";
import type { Animal } from "@/features/animals/types/animals-types";

export default function CreateWalk() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    data: animals,
    isLoading,
    isError,
    error,
    refetch,
  } = useAnimalsWithImages();
  const { mutate: createWalk, isPending } = useCreateWalk();

  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const dogs = animals?.filter(
    (animal) => animal.species.name.toLowerCase() === "pies",
  );

  const handleSubmit = () => {
    if (!selectedAnimal || !user) return;

    createWalk(
      {
        animal_id: selectedAnimal.id,
        walked_by_id: user.id,
        walk_start: new Date().toISOString(),
        walk_end: null,
        notes: "",
      },
      {
        onSuccess: () => router.back(),
      },
    );
  };

  if (isLoading) {
    return <Loading message="Ładowanie zwierząt..." />;
  }

  if (isError) {
    return (
      <Error
        message="Nie udało się załadować zwierząt"
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <View className="flex-1 px-6 pt-8">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">Dodaj spacer</Text>
        <Text className="mt-1 text-sm text-gray-500">
          Wybierz psa, z którym chcesz iść na spacer.
        </Text>
      </View>

      <Text className="text-sm font-medium text-gray-700 mb-3">
        Wybierz psa *
      </Text>

      <ScrollView className="flex-1 mb-4" showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-3">
          {dogs && dogs.length > 0 ? (
            dogs.map((dog) => {
              const isSelected = selectedAnimal?.id === dog.id;
              return (
                <TouchableOpacity
                  key={dog.id}
                  testID={`walk-dog-${dog.id}`}
                  onPress={() => setSelectedAnimal(dog)}
                  activeOpacity={0.7}
                  className={`flex-row items-center rounded-2xl border px-4 py-3 ${
                    isSelected
                      ? "border-primary bg-emerald-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <View className="mr-3 h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-50">
                    {dog.main_image?.url ? (
                      <Image
                        source={{ uri: dog.main_image.url }}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <Ionicons
                        name="paw"
                        size={22}
                        color={Colors.primary.DEFAULT}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {dog.name}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {dog.breed.name}
                    </Text>
                  </View>

                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={Colors.primary.DEFAULT}
                    />
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-500">Brak dostępnych psów.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="pb-8">
        <CustomButton
          title={isPending ? "Dodawanie..." : "Rozpocznij spacer"}
          variant="primary"
          icon="walk-outline"
          iconPosition="left"
          onPress={handleSubmit}
          disabled={!selectedAnimal || isPending}
          style={{ opacity: !selectedAnimal || isPending ? 0.5 : 1 }}
        />
      </View>
    </View>
  );
}
