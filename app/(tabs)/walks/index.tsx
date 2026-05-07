import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useWalks } from "@/features/walks/hooks/use-walks";
import WalksCard from "@/features/walks/components/walks-card";
import WalksWaiting from "@/features/walks/components/walks-waiting";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function WalksPage() {
  const { data: walks, error, isError, isLoading, refetch } = useWalks();

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

  return (
    <View className="flex-1 p-4">
      <Text className="text-base font-semibold text-gray-900 mb-4">
        Oczekujące na spacer
      </Text>
      <WalksWaiting />
      <Text className="text-base font-semibold text-gray-900 mb-4 mt-8">
        Wszystkie spacery
      </Text>
      <FlatList
        data={walks ?? []}
        renderItem={({ item }) => <WalksCard walk={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-center text-base font-semibold text-gray-900">
              Brak spacerów
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-500">
              Nie znaleziono jeszcze żadnych spacerów do wyświetlenia.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
