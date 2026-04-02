"use client";
import React, { useEffect, useState } from "react";
import suits from "../../src/data/suits.js";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link.js";

type Props = {
  params: string;
};

function HeroPage({ params: lll }: Props) {
  const t = useTranslations("LandingHeropage");
  const [isMobile, setIsMobile] = useState(false);
  const [activeSuitIndex, setActiveSuitIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
useEffect(() => {
  // Silence the THREE.Clock deprecation warning
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock")
    ) {
      return;
    }
    originalWarn(...args);
  };
}, []);
  // Timer for mobile background rotation (20 seconds)
  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setActiveSuitIndex((prev) => (prev + 1) % suits.length);
      }, 20000);
      return () => clearInterval(timer);
    }
  }, [isMobile]);

  return (
    <div>
      <section className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        {/* MOBILE BACKGROUND: Full Screen Fade Slider */}
        {isMobile && (
          <div className="absolute inset-0 z-0">
            {suits.map((suit, index) => (
              <div
                key={suit.id}
                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                  index === activeSuitIndex ? "opacity-60" : "opacity-0"
                }`}
              >
                <Image
                  src={suit.image}
                  alt={suit.title}
                  fill
                  className="object-cover"
                  priority={index === 0} // Only priority for the first image
                  sizes="100vw"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* DESKTOP/TABLET BACKGROUND */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,20,1)_0%,rgba(0,0,0,1)_100%)]">
            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
          </div>
        )}

        {/* 3D Canvas - Large Size for PC & Tablet */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
              <ambientLight intensity={2.8} />
              <pointLight position={[15, 15, 15]} intensity={5} />
              {suits.slice(0, 6).map((suit, idx) => {
                // Increased spacing for larger images
                const multiplier = 8.5;
                const offset = 2.5;
                const x = (idx - offset) * multiplier;
                const y = Math.cos(idx * 0.5) * 1.5;
                const z = Math.abs(idx - offset) * -6;
                const rotationY = (idx - offset) * -0.15;

                return (
                  <Float
                    key={suit.id}
                    speed={1.5}
                    rotationIntensity={0.3}
                    floatIntensity={0.8}
                  >
                    <Html
                      position={[x, y, z]}
                      rotation={[0, rotationY, 0]}
                      transform
                      // Increased scale for impact on PC/Tablet
                      scale={1.1}
                      style={{
                        transition: "all 0.9s ease",
                        pointerEvents: "auto",
                      }}
                    >
                      {/* Increased dimensions to w-80 and h-500px */}
                      <div className="group relative w-80 h-[500px] cursor-pointer">
                        <div className="relative w-full h-full border-[0.5px] border-white/20 bg-zinc-900 shadow-2xl overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500">
                          <Image
                            src={suit.image}
                            alt={suit.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            loading="eager"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-10 left-10">
                            <h3 className="text-white text-3xl font-serif italic tracking-wide">
                              {suit.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Html>
                  </Float>
                );
              })}
            </Canvas>
          </div>
        )}

        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-6 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-[55px] sm:text-7xl md:text-[150px] font-serif font-light text-white leading-[0.9] tracking-tighter">
              TOKSIDO <br />
              <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                {t("heroTitle")}
              </span>
            </h1>
            <p className="text-gray-400 text-[11px] md:text-lg mt-6 mb-10 max-w-[260px] md:max-w-lg mx-auto font-light tracking-[0.2em] uppercase">
              {t("heroSubtitle")}
            </p>
            <Link href={`/products`} className="cursor-pointer">
              <button className="group cursor-pointer relative border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 md:px-12 md:py-5 font-bold transition-all duration-500 hover:border-white overflow-hidden">
                <span className="relative z-10 tracking-[0.5em] text-[10px]">
                  {t("exploreBtn")}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute bottom-10 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[90px] md:text-[220px] font-serif font-black italic text-white/5 tracking-tighter uppercase">
            2026
          </h1>
        </div>
      </section>

      <style jsx>{`
        button:hover span {
          color: black !important;
        }
      `}</style>
    </div>
  );
}

export default HeroPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import suits from "../../src/data/suits.js";
// import Image from "next/image";
// import { Canvas } from "@react-three/fiber";
// import { Float, Html } from "@react-three/drei";
// import { useLocale, useTranslations } from "next-intl";
// import Link from "next/link.js";

// type Props = {
//   params: string;
// };

// function HeroPage({ params: lll }: Props) {
//   const t = useTranslations("LandingHeropage");
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeSuitIndex, setActiveSuitIndex] = useState(0);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const originalWarn = console.warn;
//     console.warn = (...args) => {
//       if (
//         args[0] &&
//         typeof args[0] === "string" &&
//         args[0].includes("THREE.Clock")
//       )
//         return;
//       originalWarn(...args);
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobile) {
//       const timer = setInterval(() => {
//         setActiveSuitIndex((prev) => (prev + 1) % suits.length);
//       }, 20000);
//       return () => clearInterval(timer);
//     }
//   }, [isMobile]);

//   return (
//     <div>
//       {/* Background updated to Warm Ivory (#f8f5f0) */}
//       <section className="relative flex items-center justify-center h-screen overflow-hidden bg-[#f8f5f0]">
//         {/* MOBILE BACKGROUND */}
//         {isMobile && (
//           <div className="absolute inset-0 z-0">
//             {suits.map((suit, index) => (
//               <div
//                 key={suit.id}
//                 className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
//                   index === activeSuitIndex ? "opacity-30" : "opacity-0"
//                 }`}
//               >
//                 <Image
//                   src={suit.image}
//                   alt={suit.title}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                   sizes="100vw"
//                 />
//               </div>
//             ))}
//             {/* Soft cream overlay for light theme consistency */}
//             <div className="absolute inset-0 bg-[#f8f5f0]/40" />
//           </div>
//         )}

//         {/* DESKTOP/TABLET BACKGROUND: Soft Radial gradient */}
//         {!isMobile && (
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f0ede4_100%)]">
//             {/* Subtle paper/fabric texture instead of carbon fibre */}
//             <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
//           </div>
//         )}

//         {/* 3D Canvas */}
//         {!isMobile && (
//           <div className="absolute inset-0 z-0 pointer-events-none">
//             <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
//               <ambientLight intensity={1.5} />
//               <pointLight
//                 position={[15, 15, 15]}
//                 intensity={3}
//                 color="#8e6d31"
//               />
//               {suits.slice(0, 6).map((suit, idx) => {
//                 const multiplier = 8.5;
//                 const offset = 2.5;
//                 const x = (idx - offset) * multiplier;
//                 const y = Math.cos(idx * 0.5) * 1.5;
//                 const z = Math.abs(idx - offset) * -6;
//                 const rotationY = (idx - offset) * -0.15;

//                 return (
//                   <Float
//                     key={suit.id}
//                     speed={1.5}
//                     rotationIntensity={0.3}
//                     floatIntensity={0.8}
//                   >
//                     <Html
//                       position={[x, y, z]}
//                       rotation={[0, rotationY, 0]}
//                       transform
//                       scale={1.1}
//                       style={{
//                         transition: "all 0.9s ease",
//                         pointerEvents: "auto",
//                       }}
//                     >
//                       <div className="group relative w-80 h-[500px] cursor-pointer">
//                         {/* Card Background now Navy/Dark with Gold Border */}
//                         <div className="relative w-full h-full border-[0.5px] border-[#8e6d31]/40 bg-[#1a2b3c] shadow-2xl overflow-hidden group-hover:border-[#8e6d31] transition-all duration-500">
//                           <Image
//                             src={suit.image}
//                             alt={suit.title}
//                             fill
//                             className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
//                             loading="eager"
//                             sizes="33vw"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3c]/90 via-transparent to-transparent opacity-90" />
//                           <div className="absolute bottom-10 left-10">
//                             {/* Ivory text on dark cards */}
//                             <h3 className="text-[#f8f5f0] text-3xl font-serif italic tracking-wide">
//                               {suit.title}
//                             </h3>
//                           </div>
//                         </div>
//                       </div>
//                     </Html>
//                   </Float>
//                 );
//               })}
//             </Canvas>
//           </div>
//         )}

//         {/* HERO CONTENT */}
//         <div className="relative z-10 text-center px-6 pointer-events-none">
//           <div className="pointer-events-auto">
//             {/* TOKSIDO in Navy, HeroTitle in Deep Bronze Gradient */}
//             <h1 className="text-[55px] sm:text-7xl md:text-[150px] font-serif font-light text-[#1a2b3c] leading-[0.9] tracking-tighter">
//               TOKSIDO <br />
//               <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-b from-[#8e6d31] to-[#5d471f]">
//                 {t("heroTitle")}
//               </span>
//             </h1>
//             <p className="text-[#5a6a7a] text-[11px] md:text-lg mt-6 mb-10 max-w-[260px] md:max-w-lg mx-auto font-light tracking-[0.2em] uppercase">
//               {t("heroSubtitle")}
//             </p>
//             <Link href={`/products`} className="cursor-pointer">
//               {/* Button with Navy/Bronze theme */}
//               <button className="group cursor-pointer relative border border-[#1a2b3c]/20 bg-[#1a2b3c]/5 backdrop-blur-md text-[#1a2b3c] px-8 py-4 md:px-12 md:py-5 font-bold transition-all duration-500 hover:border-[#1a2b3c] overflow-hidden">
//                 <span className="relative z-10 tracking-[0.5em] text-[10px]">
//                   {t("exploreBtn")}
//                 </span>
//                 <div className="absolute inset-0 bg-[#1a2b3c] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* WATERMARK - Very Faint Navy Tint */}
//         <div className="absolute bottom-10 w-full text-center z-0 pointer-events-none">
//           <h1 className="text-[90px] md:text-[220px] font-serif font-black italic text-[#1a2b3c]/5 tracking-tighter uppercase">
//             2026
//           </h1>
//         </div>
//       </section>

//       <style jsx>{`
//         button:hover span {
//           color: #f8f5f0 !important; /* Switch to Ivory on hover for contrast */
//         }
//       `}</style>
//     </div>
//   );
// }

// export default HeroPage;