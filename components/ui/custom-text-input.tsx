import { View, Text, TextInput, type TextInputProps } from "react-native";
import { Colors } from "@/constants/colors";

interface AppTextInputProps extends TextInputProps {
  label?: string;
}

export default function CustomTextInput({
  label,
  ...inputProps
}: AppTextInputProps) {
  return (
    <View>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      )}

      <TextInput
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
        placeholderTextColor={Colors.gray[400]}
        {...inputProps}
      />
    </View>
  );
}
