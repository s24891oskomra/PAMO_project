import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { ROLE_LABELS } from "@/features/profile/constants/profile-labels";
import {
  useWaitingWalksWithImages,
  useWalksWithImages,
} from "@/features/walks/hooks/use-walks";
import { useAnimals } from "@/features/animals/hooks/use-animals";
import { isSameDay } from "@/features/walks/utils/walks-utils";
import { Colors } from "@/constants/colors";
import StatCard from "./stat-card";
import ActiveWalkBanner from "./active-walk-banner";
import WaitingPreview from "./waiting-preview";
import InventoryPreview from "./inventory-preview";
import { useFoodItems } from "@/features/inventory/hooks/use-inventory";
import {
  countWalksToday,
  getActiveWalk,
  getMyWalks,
} from "../utils/dashboard-utils";

type SectionErrorProps = {
  message: string;
  onRetry: () => void;
};

function SectionError({ message, onRetry }: SectionErrorProps) {
  return (
    <View className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
      <Text className="text-sm text-red-700">{message}</Text>
      <TouchableOpacity onPress={onRetry} className="mt-2 self-start">
        <Text className="text-sm font-semibold text-primary">
          Spróbuj ponownie
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const {
    data: waitingWalks,
    isLoading: isWaitingLoading,
    isError: isWaitingError,
    refetch: refetchWaiting,
  } = useWaitingWalksWithImages();
  const {
    data: walks,
    isLoading: isWalksLoading,
    isError: isWalksError,
    refetch: refetchWalks,
  } = useWalksWithImages();
  const {
    data: animals,
    isLoading: isAnimalsLoading,
    isError: isAnimalsError,
    refetch: refetchAnimals,
  } = useAnimals();
  const {
    data: foodItems,
    isLoading: isInventoryLoading,
    isError: isInventoryError,
    refetch: refetchInventory,
  } = useFoodItems();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchWaiting(),
      refetchWalks(),
      refetchAnimals(),
      refetchInventory(),
    ]);
    setRefreshing(false);
  };

  const myWalks = getMyWalks(walks, user?.id);
  const activeWalk = getActiveWalk(myWalks);
  const walksToday = countWalksToday(myWalks, new Date());

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">
          Cześć, {user?.first_name}!
        </Text>
        {user?.role && (
          <Text className="mt-1 text-sm text-gray-500">
            {ROLE_LABELS[user.role] ?? user.role}
          </Text>
        )}
      </View>

      <View className="mb-6 flex-row gap-3">
        <StatCard
          icon="time-outline"
          loading={isWaitingLoading}
          value={isWaitingError ? "—" : (waitingWalks?.length ?? 0)}
          label="Oczekujące"
        />
        <StatCard
          icon="paw-outline"
          loading={isAnimalsLoading}
          value={isAnimalsError ? "—" : (animals?.length ?? 0)}
          label="Zwierzęta"
        />
        <StatCard
          icon="walk-outline"
          loading={isWalksLoading}
          value={isWalksError ? "—" : walksToday}
          label="Dziś"
        />
      </View>

      {isWalksError && (
        <SectionError
          message="Nie udało się załadować spacerów."
          onRetry={() => refetchWalks()}
        />
      )}

      {!isWalksLoading && !isWalksError && activeWalk && (
        <View className="mb-6">
          <ActiveWalkBanner walk={activeWalk} />
        </View>
      )}

      {isWaitingError ? (
        <SectionError
          message="Nie udało się załadować listy priorytetów."
          onRetry={() => refetchWaiting()}
        />
      ) : isWaitingLoading ? (
        <View className="items-center rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm">
          <ActivityIndicator size="small" color={Colors.primary.DEFAULT} />
          <Text className="mt-3 text-sm text-gray-500">
            Ładowanie priorytetów...
          </Text>
        </View>
      ) : (
        <WaitingPreview waitingWalks={waitingWalks ?? []} />
      )}

      <View className="mt-6">
        {isInventoryError ? (
          <SectionError
            message="Nie udało się załadować magazynu."
            onRetry={() => refetchInventory()}
          />
        ) : isInventoryLoading ? (
          <View className="items-center rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm">
            <ActivityIndicator size="small" color={Colors.primary.DEFAULT} />
            <Text className="mt-3 text-sm text-gray-500">
              Ładowanie magazynu...
            </Text>
          </View>
        ) : (
          <InventoryPreview foodItems={foodItems ?? []} />
        )}
      </View>
    </ScrollView>
  );
}
