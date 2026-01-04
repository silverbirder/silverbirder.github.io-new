import { jaMessages } from "@repo/message";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getSession();
  const name =
    session?.user?.name ??
    session?.user?.email ??
    jaMessages.admin.home.unknownUser;
  const signedInAs = jaMessages.admin.home.signedInAs.replace("{name}", name);
  return (
    <HydrateClient>
      <main>
        <section>
          <header>
            <h1>{jaMessages.admin.home.title}</h1>
            <p>{signedInAs}</p>
          </header>
          <form>
            <button
              formAction={async () => {
                "use server";
                await auth.api.signOut({ headers: await headers() });
                redirect("/sign-in");
              }}
            >
              {jaMessages.admin.home.signOut}
            </button>
          </form>
        </section>
      </main>
    </HydrateClient>
  );
}
