import { Stack } from "expo-router";

export default function WalksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Spacery" }} />
      <Stack.Screen
        name="modal"
        options={{ title: "Dodaj spacer", presentation: "modal" }}
      />
    </Stack>
  );
}
