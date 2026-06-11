import { useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BarcodeScanner from "@/features/inventory/components/barcode-scanner";
import InventoryForm from "@/features/inventory/components/inventory-form";
import {
  getFoodByBarcode,
  type FoodItem,
} from "@/features/inventory/api/inventory-api";

const TITLES = { dispense: "Wydaj karmę", restock: "Dodaj karmę" } as const;

export default function InventoryModal() {
  const { action = "dispense" } = useLocalSearchParams<{
    action: "dispense" | "restock";
  }>();

  const [item, setItem] = useState<FoodItem | null>(null);
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = async (code: string) => {
    setLoading(true);
    setScanError(null);
    try {
      const food = await getFoodByBarcode(code);
      setBarcode(code);
      setItem(food);
    } catch {
      setScanError("Nie znaleziono produktu o tym kodzie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <Text className="text-2xl font-bold text-gray-900">{TITLES[action]}</Text>

      {item ? (
        <InventoryForm action={action} barcode={barcode} item={item} />
      ) : (
        <>
          <Text className="mt-1 mb-6 text-sm text-gray-500">
            Zeskanuj kod kreskowy opakowania
          </Text>
          {scanError && (
            <Text className="mb-4 text-sm text-red-500">{scanError}</Text>
          )}
          <BarcodeScanner onScan={handleScan} loading={loading} />
        </>
      )}
    </View>
  );
}
