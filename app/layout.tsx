import "./global.css";
import type { Metadata } from "next";
import { Zen_Kurenaido } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "silverbirder",
    template: "%s | silverbirder",
  },
  description: "Personal website of silverbirder.",
  openGraph: {
    title: "silverbirder",
    description: "Personal website of silverbirder.",
    url: baseUrl,
    siteName: "silverbirder",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const noto = Zen_Kurenaido({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="ja"
        className={cx(
          "text-black bg-white dark:text-white dark:bg-black",
          noto.className
        )}
      >
        <body
          className={cx(
            "antialiased max-w-xl mx-4 mt-8 lg:mx-auto",
            "bg-[linear-gradient(#e5e5e5_1px,transparent_1px)]",
            "bg-[length:100%_1rem]",
            "dark:bg-[linear-gradient(#333333_1px,transparent_1px)]"
          )}
        >
          <main className="flex-auto min-w-0 mt-4 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
