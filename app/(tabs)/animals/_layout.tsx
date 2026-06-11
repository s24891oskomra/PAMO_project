import { Stack } from "expo-router";

export default function AnimalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Zwierzęta" }} />
      <Stack.Screen
        name="modal"
        options={{ title: "Dodaj zwierzę", presentation: "modal" }}
      />
    </Stack>
  );
}
