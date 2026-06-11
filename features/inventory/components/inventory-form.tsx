import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "@/components/ui/custom-button";
import {
  dispenseFood,
  restockFood,
  type FoodItem,
} from "@/features/inventory/api/inventory-api";
import { inventoryKeys } from "@/features/inventory/api/inventory-keys";

type InventoryFormProps = {
  action: "dispense" | "restock";
  barcode: string;
  item: FoodItem;
};

export default function InventoryForm({
  action,
  barcode,
  item,
}: InventoryFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isDispense = action === "dispense";

  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"kg" | "g">(item.package_weight_unit);
  const [packageCount, setPackageCount] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (isDispense) {
        const parsed = parseFloat(amount);
        if (!parsed || parsed <= 0) {
          setError("Podaj poprawną ilość.");
          return;
        }
        await dispenseFood(barcode, parsed, unit);
      } else {
        const parsed = parseInt(packageCount, 10);
        if (!parsed || parsed <= 0) {
          setError("Podaj poprawną liczbę opakowań.");
          return;
        }
        await restockFood(barcode, parsed);
      }
      await queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      router.back();
    } catch {
      setError(
        isDispense
          ? "Nie udało się wydać karmy."
          : "Nie udało się dodać karmy.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Text className="mt-1 mb-6 text-lg text-gray-700">{item.name}</Text>

      {isDispense ? (
        <>
          <Text className="mb-2 text-sm font-medium text-gray-700">Ilość</Text>
          <TextInput
            className="mb-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="np. 1.5"
          />
          <View className="mb-6 flex-row gap-3">
            {(["kg", "g"] as const).map((u) => (
              <TouchableOpacity
                key={u}
                onPress={() => setUnit(u)}
                className={`flex-1 items-center rounded-xl border py-3 ${
                  unit === u
                    ? "border-primary bg-primary/10"
                    : "border-gray-200"
                }`}
              >
                <Text
                  className={
                    unit === u ? "font-semibold text-primary" : "text-gray-600"
                  }
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Liczba opakowań
          </Text>
          <TextInput
            className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            value={packageCount}
            onChangeText={setPackageCount}
            keyboardType="number-pad"
            placeholder="np. 2"
          />
        </>
      )}

      {error && <Text className="mb-4 text-sm text-red-500">{error}</Text>}

      <CustomButton
        title={isDispense ? "Wydaj" : "Dodaj"}
        onPress={handleSubmit}
        disabled={submitting}
      />
      <CustomButton
        title="Anuluj"
        variant="ghost"
        onPress={() => router.back()}
        style={{ marginTop: 12 }}
      />
    </>
  );
}
