"use client";
import suits from "./data/suits.js";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import Link from "next/link.js";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 1. Handle dynamic screen checks
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
      {/* --- STICKY NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter uppercase">
            Toksido
          </h2>
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-yellow-500 transition">
              Collections
            </a>
            <a href="#" className="hover:text-yellow-500 transition">
              Bespoke
            </a>
            <a href="#" className="hover:text-yellow-500 transition">
              Showroom
            </a>
          </div>
          <button className="border border-gray-900 dark:border-white px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition">
            Book Fitting
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,15,20,1)_0%,_rgba(0,0,0,1)_100%)]">
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
                      transition: "all 0.8s ease",
                      pointerEvents: "auto",
                    }}
                  >
                    <div className="group relative w-72 md:w-80 h-[450px] md:h-[500px] cursor-pointer">
                      <div className="relative w-full h-full border-[0.5px] border-white/20 bg-zinc-900 shadow-2xl overflow-hidden group-hover:border-yellow-500/50 transition-colors">
                        <Image
                          src={suit.image}
                          alt={suit.title}
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-8 left-8">
                          <h3 className="text-white text-2xl font-serif italic">
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
          <div className="pointer-events-auto text-yellow-600">
            <h1 className="text-[50px] sm:text-7xl md:text-[150px] font-serif font-light text-white leading-[0.9] tracking-tighter text-yellow-600">
              TOKSIDO <br />
              <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                Standards Suit
              </span>
            </h1>
            <p className="text-gray-400 text-[10px] md:text-lg mt-6 mb-10 max-w-[250px] md:max-w-lg mx-auto font-light tracking-[0.2em] uppercase">
              Architecture you can wear.
            </p>
            <Link href="/products">
              <button className="group relative border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 md:px-12 md:py-5 font-bold transition-all duration-500 hover:border-white overflow-hidden">
                <span className="relative z-10 tracking-[0.5em] text-[9px] md:text-[10px]">
                  EXPLORE COLLECTION
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <style jsx>{`
                  button:hover span {
                    color: black;
                  }
                `}</style>
              </button>
            </Link>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute bottom-10 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[80px] md:text-[220px] font-serif font-black italic text-white/[0.03] tracking-tighter uppercase">
            2026
          </h1>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Our Services
            </h2>
            <div className="h-1 w-20 bg-yellow-500 mt-6"></div>
          </div>
          <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
            From wedding galas to corporate boardrooms, we ensure your presence
            is felt before you speak a word.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              title: "Bespoke Tailoring",
              desc: "Hand-stitched perfection measured to your unique silhouette.",
              icon: "01",
            },
            {
              title: "Wedding Packages",
              desc: "Coordinated elegance for the groom and the entire wedding party.",
              icon: "02",
            },
            {
              title: "Ready-to-Wear",
              desc: "Premium off-the-rack selections for the modern professional.",
              icon: "03",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="group p-8 md:p-12 bg-gray-50 dark:bg-[#0d0d0d] border border-transparent hover:border-yellow-500/30 transition-all duration-500 cursor-pointer"
            >
              <span className="text-5xl md:text-6xl font-serif text-gray-200 dark:text-gray-800 group-hover:text-yellow-500/20 transition-colors">
                {service.icon}
              </span>
              <h3 className="text-xl font-bold mt-6 mb-4 uppercase tracking-wider">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                Learn More <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 bg-black text-gray-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-serif text-white mb-6 tracking-tighter">
              TOKSIDO
            </h2>
            <p className="max-w-sm text-sm leading-7 opacity-70">
              Defining menswear through precision, heritage, and contemporary
              design since 2026. Join our newsletter for exclusive trunk show
              access.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">
              Contact
            </h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">
                Addis Ababa, Ethiopia
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                info@toksido.com
              </li>
              <li className="text-white/80">+251 900 000 000</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">
              Social
            </h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">
                Instagram
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Pinterest
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Twitter
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center mt-20 pt-10 border-t border-white/5 text-[10px] tracking-[0.3em] uppercase opacity-40">
          © 2026 TOKSIDO SUITS. CRAFTED FOR EXCELLENCE.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
