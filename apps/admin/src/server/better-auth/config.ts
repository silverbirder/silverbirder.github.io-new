import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";

export const auth = betterAuth({
  account: {
    storeAccountCookie: true,
  },
  plugins: [nextCookies()],
  session: {
    disableSessionRefresh: true,
    expiresIn: 60 * 60,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
