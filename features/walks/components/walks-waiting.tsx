import { FlatList, Text, View } from "react-native";
import { useWaitingWalksWithImages } from "../hooks/use-walks";
import WaitingWalkCard from "./walks-waiting-card";
import { useState } from "react";
import Loading from "@/components/loading";
import Error from "@/components/error";
import { TestIds } from "@/constants/test-ids";

export default function WalksWaiting() {
  const {
    data: waitingWalks,
    error,
    isError,
    isLoading,
    refetch,
  } = useWaitingWalksWithImages();
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
      testID={TestIds.walks.waitingList}
      data={waitingWalks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <WaitingWalkCard animal={item} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <View className="items-center justify-center p-4">
          <Text className="text-gray-500">Brak zwierząt oczekujących.</Text>
        </View>
      }
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
