import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const SUPPORTED_LOCALES = ["en", "ja"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
  let locale: SupportedLocale = "en";
  const cookieStore = await cookies();
  const headerList = await headers();

  const localeCookie = cookieStore.get("NEXT_LOCALE");

  if (!localeCookie) {
    const acceptLanguage = headerList.get("accept-language");

    if (acceptLanguage?.includes("ja") || acceptLanguage?.includes("ja-JP")) {
      locale = "ja";
    }
  } else {
    const normalizedLocale = localeCookie.value === "pt" ? "ja" : localeCookie.value;
    if (SUPPORTED_LOCALES.includes(normalizedLocale as SupportedLocale)) {
      locale = normalizedLocale as SupportedLocale;
    }
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
