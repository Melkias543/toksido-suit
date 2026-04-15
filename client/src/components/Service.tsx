import React from "react";
import service from "../data/services";
import { useTranslations } from "next-intl";
import ServiceGridUI from "@/app/admin/services/page";
function ServiceList() {
  const t = useTranslations("Services");

  return (
    <div>
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              {/* Add this to JSON: "sectionTitle": "Our Services" */}
              {t("sectionTitle")}
            </h2>
            <div className="h-1 w-20 bg-yellow-500 mt-6"></div>
          </div>
          <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
            {/* Add this to JSON: "sectionSubtitle": "From wedding galas..." */}
            {t("sectionSubtitle")}
          </p>
        </div>

        <ServiceGridUI mode="view" />
      </section>
    </div>
  );
}

export default ServiceList;

