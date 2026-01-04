import { Top } from "@repo/admin-feature-top";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getSession();
  const name = session?.user?.name ?? session?.user?.email;

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({ headers: await headers() });
    redirect("/sign-in");
  };

  return (
    <HydrateClient>
      <Top name={name} onSignOut={handleSignOut} />
    </HydrateClient>
  );
}
