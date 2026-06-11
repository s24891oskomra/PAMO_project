/**
 * Authentication API — login, logout, and permissions.
 *
 * @module auth-api
 * @category Authentication
 */
import apiClient from "@/client";
import {
  loginResponseSchema,
  userPermissionsSchema,
  type LoginSchema,
  type LoginResponseSchema,
  type UserPermissionsSchema,
} from "../schemas/auth-schemas";

/**
 * Authenticates with email and password.
 * Uses `fetch` (not `apiClient`) because no token exists yet.
 */
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

/** Invalidates the refresh token on the server. */
export const postLogout = async (refreshToken: string) => {
  const response = await apiClient.post("/auth/logout", {
    refresh: refreshToken,
  });
  return response;
};

/** Fetches the current user's module permissions. */
export const getUserPermissions = async (): Promise<UserPermissionsSchema> => {
  const response = await apiClient.get("/users/me/permissions");
  return userPermissionsSchema.parse(response.data);
};
