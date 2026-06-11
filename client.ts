/**
 * Shared HTTP client for the ZwierzApp REST API.
 *
 * Attaches JWT access tokens to outgoing requests and automatically
 * refreshes expired tokens on HTTP 401 responses.
 *
 * @module client
 * @category HTTP Client
 */
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

let accessToken: string | null = null;

/** Stores the in-memory access token used by request interceptors. */
export function setAccessToken(token: string | null) {
  accessToken = token;
}

/** Returns the current in-memory access token, or `null` if logged out. */
export function getAccessToken() {
  return accessToken;
}

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

/**
 * Exchanges the stored refresh token for a new access/refresh pair.
 * Updates SecureStore and the in-memory token on success.
 *
 * @throws Redirects to `/login` when refresh fails.
 */
async function refreshAccessToken(): Promise<string> {
  const refreshToken = await SecureStore.getItemAsync("refreshToken");

  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/token/refresh`,
    { refresh: refreshToken },
  );

  const { access, refresh } = response.data;

  accessToken = access;
  await SecureStore.setItemAsync("accessToken", access);
  await SecureStore.setItemAsync("refreshToken", refresh);

  return access;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const access = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        accessToken = null;
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        router.replace("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

/** Pre-configured Axios instance — use this for all authenticated API calls. */
export default apiClient;
