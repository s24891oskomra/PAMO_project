import { Stack } from "expo-router";

export default function MagazynLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Magazyn" }} />
      <Stack.Screen
        name="modal"
        options={{ title: "Magazyn", presentation: "modal" }}
      />
    </Stack>
  );
}
