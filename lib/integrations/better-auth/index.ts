import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins"; 

export const betterAuthClient = createAuthClient({
  baseURL: "https://hackernews.kindbay-5679c40b.centralindia.azurecontainerapps.io",
  plugins: [usernameClient(),nextCookies()],
});

