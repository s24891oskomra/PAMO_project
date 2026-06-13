import {
  Stack,
  useRouter,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import "../globals.css";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (isLoading) return;
    if (!navigationState?.key) return;

    const onLoginPage = segments[0] === "login";

    if (!user && !onLoginPage) {
      router.replace("/login");
      return;
    }

    if (user && onLoginPage) {
      router.replace("/(tabs)/(home)");
      return;
    }

    SplashScreen.hideAsync();
  }, [user, isLoading, segments, navigationState?.key]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
