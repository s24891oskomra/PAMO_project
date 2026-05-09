import { FlatList, Text, View } from "react-native";
import WalksCard from "./walks-card";
import { useWalks } from "../hooks/use-walks";
import { useState } from "react";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function Walks() {
  const { data: walks, error, isError, isLoading, refetch } = useWalks();
  const [refreshing, setRefreshing] = useState(false);

  if (isLoading) {
    return <Loading message="Ładowanie spacerów..." />;
  }

  if (isError) {
    return (
      <Error
        message="Nie udało się załadować spacerów"
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
      data={walks ?? []}
      renderItem={({ item }) => <WalksCard walk={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-gray-500">Brak spacerów.</Text>
        </View>
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
