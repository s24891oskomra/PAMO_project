import Logo from "@/components/logo";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/ui/custom-button";
import { useForm, Controller } from "react-hook-form";
import { LoginSchema, loginSchema } from "../schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { postLogin } from "../api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, error: loginError } = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      await login(data);
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation(data);
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-8"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingVertical: 48,
          }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <Logo />

          <View className="mb-8">
            <Text className="mb-2 text-3xl font-bold text-gray-900">
              Witaj z powrotem
            </Text>
            <Text className="text-base text-gray-500">
              Zaloguj się do panelu administracyjnego schroniska
            </Text>
          </View>

          <View className="mb-5">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="mb-2 text-sm font-medium text-gray-700">
                    Adres email
                  </Text>

                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={Colors.gray[400]}
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      testID="login-email"
                      className="flex-1 text-base text-gray-900"
                      placeholder="shelter.admin.krk@example.com"
                      placeholderTextColor={Colors.gray[400]}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                </View>
              )}
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </View>

          <View className="mb-8">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-sm font-medium text-gray-700">
                      Hasło
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-sm font-medium text-primary">
                        Zapomniałeś hasła?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={Colors.gray[400]}
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      testID="login-password"
                      className="flex-1 text-base text-gray-900"
                      placeholder="••••••••"
                      placeholderTextColor={Colors.gray[400]}
                      secureTextEntry={!showPassword}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={Colors.gray[400]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </View>

          {loginError && (
            <Text className="mb-4 text-center text-red-500">
              {loginError.message}
            </Text>
          )}

          <AppButton
            testID="login-submit"
            title="Zaloguj się"
            icon="arrow-forward"
            onPress={onSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
