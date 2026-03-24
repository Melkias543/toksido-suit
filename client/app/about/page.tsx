import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  // 1. Await your params
  const { locale } = await params;

  // 2. Use getTranslations (not useTranslations) for Server Components
  const t = await getTranslations({ locale, namespace: "LandingHeropage" });

  return (
    <div className="p-10">
      <p className="text-sm text-gray-500">Current URL Locale: {locale}</p>
      <h1 className="text-3xl font-bold">{t("heroTitle")}</h1>
    </div>
  );
}
