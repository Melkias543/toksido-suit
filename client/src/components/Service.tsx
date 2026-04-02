import React from "react";
import service from "../data/services";
import { useTranslations } from "next-intl";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {service.map((item, i) => (
            <div key={i} className="...">
              <span className="...">{item.icon}</span>
              <h3 className="...">{t(`service${i + 1}Title`)}</h3>
              <p className="...">{t(`service${i + 1}Desc`)}</p>
              <div className="...">
                {/* Add this to JSON: "learnMore": "Learn More" */}
                {t("learnMore")} <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServiceList;


// import React from "react";
// import service from "../data/services";
// import { useTranslations } from "next-intl";

// function ServiceList() {
//   const t = useTranslations("Services");

//   return (
//     <div className="bg-[#fdfdfc]">
//       <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-8">
//           <div className="max-w-xl">
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a2b3c]">
//               {t("sectionTitle")}
//             </h2>
//             <div className="h-1 w-20 bg-[#c5a059] mt-6"></div>
//           </div>
//           <p className="text-[#5a6a7a] max-w-md text-sm md:text-base leading-relaxed italic">
//             {t("sectionSubtitle")}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
//           {service.map((item, i) => (
//             <div
//               key={i}
//               className="group border border-[#e2dec9]/30 p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white"
//             >
//               {/* Icon with a subtle scale effect on hover */}
//               <span className="text-[#c5a059] text-4xl block mb-8 transform group-hover:scale-110 transition-transform duration-500">
//                 {item.icon}
//               </span>

//               <h3 className="text-xl font-serif font-bold text-[#1a2b3c] mb-4">
//                 {t(`service${i + 1}Title`)}
//               </h3>

//               <p className="text-[#5a6a7a] text-sm leading-relaxed mb-8">
//                 {t(`service${i + 1}Desc`)}
//               </p>

//               {/* Enhanced 'Learn More' link with moving arrow */}
//               <div className="text-[#c5a059] font-bold text-[10px] uppercase tracking-[0.2em] cursor-pointer flex items-center group-hover:text-[#1a2b3c] transition-colors duration-300">
//                 {t("learnMore")}
//                 <span className="ml-2 transform group-hover:translate-x-3 transition-transform duration-300">
//                   →
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default ServiceList;