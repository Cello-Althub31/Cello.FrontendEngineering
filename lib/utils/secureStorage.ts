import * as SecureStore from "expo-secure-store";
import { AuthTokens, User } from "@/types/auth";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_info";

export const secureStorage = {
  async storeTokens(tokens: AuthTokens) {
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));
  },

  async getTokens(): Promise<AuthTokens | null> {
    const json = await SecureStore.getItemAsync(TOKEN_KEY);
    return json ? JSON.parse(json) : null;
  },

  async clearTokens() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async storeUser(user: User) {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const json = await SecureStore.getItemAsync(USER_KEY);
    return json ? JSON.parse(json) : null;
  },

  async clearUser() {
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async clearAll() {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
  },
};
