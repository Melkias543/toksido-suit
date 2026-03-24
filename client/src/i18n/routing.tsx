import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "am", "om"],
  defaultLocale: "en",
  localePrefix: "never", // This is the key change
});
