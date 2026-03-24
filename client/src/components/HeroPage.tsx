"use client";
import React, { useEffect, useState } from "react";
import suits from "../../src/data/suits.js";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { cos } from "three/tsl";
import Link from "next/link.js";

type Props = {
  params: string;
};

function HeroPage({ params: lll }: Props) {
  const t = useTranslations("LandingHeropage");
  const locale = useLocale(); // This is the correct way to get the locale now

  const [isMobile, setIsMobile] = useState(false);
  console.log("Current locale:", locale);
  console.log("Current message:", t);
  console.log("Actual Translation:", t("heroTitle"));
  const allMessages = useMessages(); // import { useMessages } from 'next-intl';

  console.log("ALL MESSAGES LOADED:", allMessages);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <section className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,20,1)_0%,rgba(0,0,0,1)_100%)]">
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{
              position: [0, 0, isMobile ? 35 : 22],
              fov: isMobile ? 50 : 40,
            }}
          >
            <ambientLight intensity={2.8} />
            <pointLight position={[10, 10, 10]} intensity={5} />

            {suits.slice(0, isMobile ? 3 : 6).map((suit, idx) => {
              const multiplier = isMobile ? 12 : 6.5;
              const offset = isMobile ? 1 : 2.5;
              const x = (idx - offset) * multiplier;
              const y = isMobile ? (idx - 1) * -2 : Math.cos(idx * 0.5) * 1.2;
              const z = isMobile ? -10 : Math.abs(idx - offset) * -4;
              const rotationY = isMobile ? 0 : (idx - offset) * -0.15;

              return (
                <Float key={suit.id} speed={1.5} rotationIntensity={0.2}>
                  <Html
                    position={[x, y, z]}
                    rotation={[0, rotationY, 0]}
                    transform
                    scale={isMobile ? 0.6 : 1}
                    style={{
                      transition: "all 0.9s ease",
                      pointerEvents: "auto",
                    }}
                  >
                    <div className="group relative w-72 md:w-80 h-112.5 md:h-125 cursor-pointer">
                      <div className="relative w-full h-full border-[0.5px] border-white/20 bg-zinc-900 shadow-2xl overflow-hidden group-hover:border-yellow-500/50 transition-colors">
                        <Image
                          src={suit.image}
                          alt={suit.title}
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-8 left-8">
                          <h3 className="text-white text-2xl font-serif italic">
                            {/* Dynamically translate suit names from your JSON */}
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

        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-6 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-[50px] sm:text-7xl md:text-[150px] font-serif font-light text-white leading-[0.9] tracking-tighter">
              TOKSIDO <br />
              <span className="font-bold italic text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                {t("heroTitle")}
              </span>
            </h1>
            <p className="text-gray-400 text-[10px] md:text-lg mt-6 mb-10 max-w-62.5 md:max-w-lg mx-auto font-light tracking-[0.2em] uppercase">
              {t("heroSubtitle")}
            </p>
            <Link href={`/products`} className="cursor-pointer">
              <button className="group cursor-pointer relative border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 md:px-12 md:py-5 font-bold transition-all duration-500 hover:border-white overflow-hidden">
                <span className="relative z-10 tracking-[0.5em] text-[9px] md:text-[10px]">
                  {t("exploreBtn")}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute bottom-10 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[80px] md:text-[220px] font-serif font-black italic text-white/3 tracking-tighter uppercase">
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
