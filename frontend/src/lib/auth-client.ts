import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "@/features/auth/constants/local-storage";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "omit",
    auth: {
      type: "Bearer",
      token: async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY);

        return token ?? undefined;
      },
    },
  },
});
