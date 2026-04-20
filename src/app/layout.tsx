import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Crimson_Pro, Noto_Sans_JP, Unbounded } from "next/font/google";

import JotaiProvider from "@/components/jotai-provider";
import { Toaster } from "@/components/ui/sonner";
import { MotionWrapper } from "@/components/motion-wrapper";
import CherryBlossomTrail from "@/components/cherry-blossom-trail";
import JapaneseAmbientBackground from "@/components/japanese-ambient-background";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nakamura Kazuya | AI Product Engineer",
  description:
    "Portfolio of Nakamura Kazuya, AI Product Engineer from Japan with 8+ years of experience shipping LLM, RAG, and full-stack AI products.",
};

const crimson = Crimson_Pro({
  preload: true,
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

const jp = Noto_Sans_JP({
  preload: true,
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
});

const unbounded = Unbounded({
  preload: true,
  variable: "--font-unbounded",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      <meta property="og:url" content="https://Nakamura.page/" />
      <meta property="og:type" content="site" />
      <meta property="og:title" content="Nakamura Kazuya | AI Product Engineer" />
      <meta
        property="og:description"
        content="Portfolio of Nakamura Kazuya, AI Product Engineer from Japan with 8+ years of experience shipping production AI systems."
      />

      <meta property="og:image" content="https://Nakamura.page/images/og.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://Nakamura.page/" />
      <meta name="twitter:title" content="Nakamura Kazuya | AI Product Engineer" />
      <meta
        name="twitter:description"
        content="Portfolio of Nakamura Kazuya, AI Product Engineer from Japan with 8+ years of experience shipping production AI systems."
      />
      <meta name="twitter:image" content="https://Nakamura.page/images/og.png" />

      <body
        className={`${jp.variable} ${unbounded.variable} ${crimson.variable} font-unbounded bg-background antialiased`}
      >
        <JotaiProvider>
          <JapaneseAmbientBackground />
          <CherryBlossomTrail />
          <MotionWrapper>
            <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
          </MotionWrapper>
        </JotaiProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
