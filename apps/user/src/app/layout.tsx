import type { Metadata } from "next";

import { createSiteMetadata } from "@repo/metadata";
import { Provider, UserLayout } from "@repo/ui";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Sans_JP } from "next/font/google";
import { ViewTransition } from "react";

export const metadata: Metadata = createSiteMetadata();

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={notoSansJP.className}>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <ViewTransition>
              <UserLayout>{children}</UserLayout>
            </ViewTransition>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
