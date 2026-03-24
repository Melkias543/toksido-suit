import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fallback if no locale is detected
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Use the explicit switch to avoid the Turbopack "Module not found" error
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
