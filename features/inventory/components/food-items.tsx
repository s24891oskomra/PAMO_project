import Loading from "@/components/loading";
import Error from "@/components/error";
import FoodItemCard from "@/features/inventory/components/food-item-card";
import { useFoodItems } from "@/features/inventory/hooks/use-inventory";
import { FlatList, Text, View } from "react-native";
import { useState } from "react";

export default function FoodItems() {
  const { data, error, isError, isLoading, refetch } = useFoodItems();
  const [refreshing, setRefreshing] = useState(false);

  if (isLoading) {
    return <Loading message="Ładowanie magazynu..." />;
  }

  if (isError) {
    return (
      <Error
        message="Nie udało się załadować produktów"
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
      data={data ?? []}
      renderItem={({ item }) => <FoodItemCard item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-gray-500">Brak produktów.</Text>
        </View>
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
