import { View } from "react-native";
import { useState } from "react";
import WalksWaiting from "@/features/walks/components/walks-waiting";
import Walks from "@/features/walks/components/walks";
import WalksMine from "@/features/walks/components/walks-mine";
import WalksTabBar, {
  type WalksTab,
} from "@/features/walks/components/walks-tab-bar";
import { TestIds } from "@/constants/test-ids";

const TAB_CONTENT: Record<WalksTab, React.ComponentType> = {
  waiting: WalksWaiting,
  mine: WalksMine,
  all: Walks,
};

export default function WalksPage() {
  const [activeTab, setActiveTab] = useState<WalksTab>("waiting");
  const Content = TAB_CONTENT[activeTab];

  return (
    <View testID={TestIds.screens.walks} className="flex-1 p-4">
      <WalksTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <View className="mt-4 flex-1">
        <Content />
      </View>
    </View>
  );
}
