import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, setRequestLocale } from "next-intl/server";
import "./globals.css";

// Configure Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (SEO)
export const metadata: Metadata = {
  title: "Toksido Suit | Crafted for Excellence",
  description:
    "Defining menswear through precision, heritage, and contemporary design since 2026.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in /public
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Get the current locale from cookies/headers (handled by middleware)
  const locale = await getLocale();

  // 2. Set the request locale (Required for some next-intl APIs in Server Components)
  setRequestLocale(locale);

  // 3. Load the specific JSON messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* NextIntlClientProvider allows 'use client' components 
            to use the useTranslations() hook.
        */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
