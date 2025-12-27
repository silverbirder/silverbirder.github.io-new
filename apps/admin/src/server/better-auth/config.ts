import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
