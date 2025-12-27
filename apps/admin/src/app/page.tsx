import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getSession();
  return (
    <HydrateClient>
      <main>
        <div>
          <div>
            <div>
              <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
              {!session ? (
                <form>
                  <button
                    formAction={async () => {
                      "use server";
                      const res = await auth.api.signInSocial({
                        body: {
                          provider: "github",
                          callbackURL: "/",
                        },
                      });
                      if (!res.url)
                        throw new Error("No URL returned from signInSocial");
                      redirect(res.url);
                    }}
                  >
                    Sign in with Github
                  </button>
                </form>
              ) : (
                <form>
                  <button
                    formAction={async () => {
                      "use server";
                      await auth.api.signOut({ headers: await headers() });
                      redirect("/");
                    }}
                  >
                    Sign out
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
