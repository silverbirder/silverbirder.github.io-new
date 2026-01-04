import type { Route } from "next";

import { SignIn } from "@repo/admin-feature-sign-in";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/env";
import { isAllowedEmail, parseAllowedEmails } from "@/server/allowed-users";
import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";

export default async function SignInPage() {
  const session = await getSession();
  const allowedEmails = parseAllowedEmails(env.ADMIN_ALLOWED_EMAILS);
  const isAllowed =
    !!session?.user && isAllowedEmail(session.user.email, allowedEmails);

  if (session?.user && isAllowed) {
    redirect("/");
  }

  const hasAllowList = allowedEmails.length > 0;
  const status = session?.user
    ? hasAllowList
      ? "forbidden"
      : "missingAllowList"
    : "default";

  return (
    <SignIn
      onSignIn={async () => {
        "use server";
        const res = await auth.api.signInSocial({
          body: {
            callbackURL: "/",
            provider: "github",
          },
        });
        if (!res.url) {
          throw new Error("No URL returned from signInSocial");
        }
        redirect(res.url as Route);
      }}
      onSignOut={
        session?.user && !isAllowed
          ? async () => {
              "use server";
              await auth.api.signOut({ headers: await headers() });
              redirect("/sign-in");
            }
          : undefined
      }
      status={status}
    />
  );
}
