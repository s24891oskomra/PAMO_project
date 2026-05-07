import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { TouchableOpacity, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import CustomButton from "@/components/ui/custom-button";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pulpit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="walks/index"
        options={{
          title: "Spacery",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="walk-sharp" color={color} size={size} />
          ),
          headerRight: () => (
            <CustomButton
              title="Dodaj spacer"
              variant="primary"
              onPress={() => console.log("add")}
              style={{ paddingHorizontal: 8 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="animals/index"
        options={{
          title: "Zwierzęta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profil",
          headerRight: () => (
            <TouchableOpacity onPress={() => logout()}>
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
