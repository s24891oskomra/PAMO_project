import { FlatList, Text, View } from "react-native";
import WalksCard from "./walks-card";
import { useWalksWithImages } from "../hooks/use-walks";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function WalksMine() {
  const { user } = useAuth();
  const {
    data: walks,
    error,
    isError,
    isLoading,
    refetch,
  } = useWalksWithImages();
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

  const myWalks =
    walks?.filter((walk) => walk.walked_by?.id === user?.id) ?? [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={myWalks}
      renderItem={({ item }) => <WalksCard walk={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={() => (
        <View className="items-center justify-center p-4">
          <Text className="text-gray-500">Brak Twoich spacerów.</Text>
        </View>
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
