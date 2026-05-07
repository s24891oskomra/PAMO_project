import apiClient from "@/client";
import type { LoginSchema, LoginResponseSchema } from "../schemas/auth-schemas";
import { loginResponseSchema } from "../schemas/auth-schemas";

export const postLogin = async (
  data: LoginSchema,
): Promise<LoginResponseSchema> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Nie udało się zalogować");
  }

  const responseData = await response.json();
  return loginResponseSchema.parse(responseData);
};

export const postLogout = async (refreshToken: string) => {
  const response = await apiClient.post("/auth/logout", {
    refresh: refreshToken,
  });
  return response;
};
