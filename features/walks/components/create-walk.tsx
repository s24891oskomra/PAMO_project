import { View, Text } from "react-native";

export default function CreateWalk() {
  return (
    <View className="flex-1 justify-center px-8">
      <View className="mb-5 bg-gray-100 rounded-xl p-4">
        <View className="flex flex-col gap-4">
          <Text className="text-2xl font-bold ">Dodaj spacer</Text>
          <Text className="text-sm text-gray-500">
            Dodaj nowy spacer do bazy danych.
          </Text>
        </View>

        <View className="mt-4 flex-col">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium">Zwierzę *</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
