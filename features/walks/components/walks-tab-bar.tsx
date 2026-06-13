import { View, Text, Pressable } from "react-native";
import { Colors } from "@/constants/colors";

export type WalksTab = "waiting" | "mine" | "all";

const TABS: { key: WalksTab; label: string }[] = [
  { key: "waiting", label: "Oczekujące" },
  { key: "mine", label: "Moje" },
  { key: "all", label: "Wszystkie" },
];

interface WalksTabBarProps {
  activeTab: WalksTab;
  onTabChange: (tab: WalksTab) => void;
}

export default function WalksTabBar({
  activeTab,
  onTabChange,
}: WalksTabBarProps) {
  return (
    <View className="flex-row rounded-xl bg-gray-100 p-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            testID={`walks-tab-${tab.key}`}
            onPress={() => onTabChange(tab.key)}
            style={{
              flex: 1,
              alignItems: "center",
              borderRadius: 8,
              paddingVertical: 10,
              backgroundColor: isActive
                ? Colors.primary.DEFAULT
                : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isActive ? Colors.white : Colors.gray[500],
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
