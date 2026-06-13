import Loading from "@/components/loading";
import Error from "@/components/error";
import AnimalCard from "@/features/animals/components/animal-card";
import { useAnimalsWithImages } from "@/features/animals/hooks/use-animals";
import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import { TestIds } from "@/constants/test-ids";

export default function Animals() {
  const {
    data: animals,
    error,
    isError,
    isLoading,
    refetch,
  } = useAnimalsWithImages();
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      testID={TestIds.animals.list}
      data={animals ?? []}
      renderItem={({ item }) => <AnimalCard animal={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-gray-500">Brak zwierząt.</Text>
        </View>
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
