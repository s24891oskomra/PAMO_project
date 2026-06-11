import { Text, TouchableOpacity, View } from "react-native";

export default function Error({
  message,
  error,
  refetch,
}: {
  message: string;
  error: Error | null;
  refetch: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-center text-base font-semibold text-gray-900">
        {message}
      </Text>
      <Text className="mt-2 text-center text-sm text-gray-500">
        {error instanceof Error ? error.message : "Sprawdź połączenie z API."}
      </Text>
      <TouchableOpacity
        className="mt-4 rounded-lg bg-primary px-4 py-3"
        onPress={() => refetch()}
      >
        <Text className="font-semibold text-white">Spróbuj ponownie</Text>
      </TouchableOpacity>
    </View>
  );
}
