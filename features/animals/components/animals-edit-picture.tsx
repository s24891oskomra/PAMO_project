import { View, Text, Pressable, Button, Alert } from "react-native";
import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import CustomButton from "@/components/ui/custom-button";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { postPresignedUploadUrl } from "../api/animals-api";
import { usePatchAnimalImage } from "../hooks/use-animals";
import { File as ExpoFile } from "expo-file-system/next";
import { useRouter } from "expo-router";

export default function AnimalsEditPicture({ animalId }: { animalId: string }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const router = useRouter();
  const { mutateAsync: patchImage } = usePatchAnimalImage();

  if (!permission) {
    return (
      <View className="flex-1 bg-white">
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Text>Brak uprawnień do kamery</Text>
        <CustomButton
          title="Zezwól na dostęp do kamery"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const takePicture = async () => {
    const image = await camera.current?.takePictureAsync();
    if (image?.uri) setImageUri(image.uri);
  };

  const savePicture = async () => {
    if (!imageUri) return;

    try {
      const file = new ExpoFile(imageUri);
      if (!file.exists) return;
      const { size } = file.info();

      const blobResponse = await fetch(imageUri);
      const blob = await blobResponse.blob();

      const presigned = await postPresignedUploadUrl({
        file_name: imageUri.split("/").pop() ?? "photo.jpg",
        content_type: "image/jpeg",
        file_size: size ?? 0,
      });

      const response = await fetch(presigned.upload_url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Length": String(blob.size),
        },
        body: blob,
      });

      if (response.ok) {
        await patchImage({ animalId, objectKey: presigned.object_key });
        router.back();
      } else {
        const text = await response.text();
        Alert.alert("Błąd uploadu", `Status: ${response.status}\n${text}`);
      }
    } catch (error) {
      Alert.alert(
        "Błąd",
        error instanceof Error ? error.message : "Nieznany błąd",
      );
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = (uri: string) => {
    return (
      <View className="flex-1">
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: "100%", height: "90%" }}
        />
        <View className="flex-row items-center justify-center">
          <Button
            onPress={() => setImageUri(null)}
            title="Zrób kolejne zdjęcie"
          />
          <Button onPress={() => savePicture()} title="Zapisz zdjęcie" />
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View className="flex-1">
        <CameraView
          ref={camera}
          mode={mode}
          facing={facing}
          mute={false}
          style={{ flex: 1 }}
          responsiveOrientationWhenOrientationLocked
        />
        <View className="flex-row items-center justify-between">
          <Pressable>
            <AntDesign name="picture" size={32} color="white" />
          </Pressable>
          <Pressable
            onPress={takePicture}
            accessibilityRole="button"
            accessibilityLabel="Zrób zdjęcie"
            hitSlop={12}
            className="items-center justify-center"
          >
            {({ pressed }) => (
              <View
                className="h-[76px] w-[76px] rounded-full border-[5px] border-white items-center justify-center bg-black/25"
                style={{ opacity: pressed ? 0.88 : 1 }}
              >
                <View
                  className="rounded-full bg-white"
                  style={{
                    width: pressed ? 54 : 58,
                    height: pressed ? 54 : 58,
                  }}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {imageUri ? renderPicture(imageUri) : renderCamera()}
    </View>
  );
}
