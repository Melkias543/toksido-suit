// "use client";
import Contact from "@/src/components/Contact";
import HeroPage from "@/src/components/HeroPage";
import NavBar from "@/src/components/NavBar";
import ServiceList from "@/src/components/Service";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  // Await the params to get the locale safely

  const { locale } = await params;
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
      <NavBar />

      {/* Passing the locale down to HeroPage */}
      <HeroPage params={locale} />

      {/* --- SERVICES GRID --- */}
      <ServiceList />

      <Contact />
    </div>
  );
}
