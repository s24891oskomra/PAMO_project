import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { TouchableOpacity, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import CustomButton from "@/components/ui/custom-button";
import { Link } from "expo-router";
import { TestIds } from "@/constants/test-ids";

export default function TabsLayout() {
  const activeTabColor = Colors.primary[600];
  const inactiveTabColor = Colors.gray[400];
  const { logout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Ionicons name="paw" size={22} color={Colors.primary.DEFAULT} />
          </View>
        ),
        headerLeftContainerStyle: { paddingLeft: 12 },
        headerRightContainerStyle: { paddingRight: 12 },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.gray[900],
          fontWeight: "700",
        },
        tabBarActiveTintColor: activeTabColor,
        tabBarInactiveTintColor: inactiveTabColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray[200],
        },
        headerStyle: {
          height: 120,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Pulpit",
          tabBarButtonTestID: TestIds.tabs.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="walks"
        options={{
          title: "Spacery",
          tabBarButtonTestID: TestIds.tabs.walks,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="walk-sharp" color={color} size={size} />
          ),
          headerRight: () => (
            <Link href="/walks/modal" asChild>
              <CustomButton
                testID={TestIds.walks.addWalk}
                title="Dodaj spacer"
                variant="primary"
                style={{ paddingHorizontal: 8 }}
              />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="animals"
        options={{
          title: "Zwierzęta",
          tabBarButtonTestID: TestIds.tabs.animals,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="magazyn"
        options={{
          title: "Magazyn",
          tabBarButtonTestID: TestIds.tabs.magazyn,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profil",
          tabBarButtonTestID: TestIds.tabs.profile,
          headerRight: () => (
            <TouchableOpacity
              testID={TestIds.profile.logout} onPress={() => logout()}>
              <Ionicons
                name="log-out"
                color={Colors.primary.DEFAULT}
                size={24}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
