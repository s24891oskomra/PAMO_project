import { FlatList, Text, View } from "react-native";
import { useWaitingWalks } from "../hooks/use-walks";
import WaitingWalkCard from "./walks-waiting-card";

export default function WalksWaiting() {
  const { data: waitingWalks = [] } = useWaitingWalks();

  return (
    <FlatList
      data={waitingWalks}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <WaitingWalkCard animal={item} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-gray-500">Brak zwierząt oczekujących.</Text>
        </View>
      }
    />
  );
}
