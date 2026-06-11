import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import CustomButton from "@/components/ui/custom-button";
import { Colors } from "@/constants/colors";

type BarcodeScannerProps = {
  onScan: (code: string) => void;
  loading?: boolean;
};

export default function BarcodeScanner({ onScan, loading }: BarcodeScannerProps) {
  const [manualCode, setManualCode] = useState("");
  const scannedRef = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!loading) scannedRef.current = false;
  }, [loading]);

  const handleScan = (code: string) => {
    if (scannedRef.current || loading) return;
    scannedRef.current = true;
    onScan(code);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
      ) : permission?.granted ? (
        <View className="mb-4 h-64 overflow-hidden rounded-2xl">
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "code128", "code39", "qr"],
            }}
            onBarcodeScanned={({ data }) => handleScan(data)}
          />
        </View>
      ) : (
        <CustomButton
          title="Zezwól na kamerę"
          onPress={requestPermission}
          style={{ marginBottom: 16 }}
        />
      )}

      <Text className="mb-2 text-sm text-gray-600">Lub wpisz kod ręcznie</Text>
      <TextInput
        className="mb-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        value={manualCode}
        onChangeText={setManualCode}
        placeholder="Kod kreskowy"
      />
      <CustomButton
        title="Szukaj"
        variant="outline"
        onPress={() => {
          const code = manualCode.trim();
          if (code) handleScan(code);
        }}
      />
    </>
  );
}
