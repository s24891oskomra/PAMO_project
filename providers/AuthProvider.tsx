/**
 * Authentication context: session restore, login, and logout.
 *
 * Persists access/refresh tokens and user profile in `expo-secure-store`.
 *
 * @module AuthProvider
 * @category Providers
 */
import { createContext, useContext, useState } from "react";
import type { LoginResponse, User } from "@/features/auth/types/auth-types";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { postLogout } from "@/features/auth/api/auth-api";
import { setAccessToken } from "@/client";

type AuthContextType = {
  user: User | null;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

/** Wraps the app and restores the user session from secure storage on mount. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const userData = await SecureStore.getItemAsync("user");
        if (token && userData) {
          setAccessToken(token);
          setUser(JSON.parse(userData));
        }
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (data: LoginResponse) => {
    setAccessToken(data.access);
    await SecureStore.setItemAsync("accessToken", data.access);
    await SecureStore.setItemAsync("refreshToken", data.refresh);
    await SecureStore.setItemAsync("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    setAccessToken(null);

    try {
      if (refreshToken) {
        await postLogout(refreshToken);
      }
    } catch {
    } finally {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Returns the auth context. Must be used inside {@link AuthProvider}. */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
