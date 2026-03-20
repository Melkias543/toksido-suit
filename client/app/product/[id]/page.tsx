"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
// Adjusted import path for suits data
import suits from "../../data/suits.js";

const ProductDetail = () => {
  const { id } = useParams();
  const suit = suits.find((s) => s.id.toString() === id) || suits[0];

  const [selectedSize, setSelectedSize] = useState("40R");
  const [selectedColor, setSelectedColor] = useState("Midnight Blue");

  const sizes = ["38R", "40R", "42R", "44R", "46L"];

  // Using the exact color palette from your landing page categories
  const colors = [
    { name: "Midnight Blue", class: "bg-blue-900" },
    { name: "Executive Gray", class: "bg-gray-800" },
    { name: "Autumn Amber", class: "bg-amber-900" },
    { name: "Deep Zinc", class: "bg-zinc-900" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 pt-32 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-yellow-500 uppercase tracking-widest mb-10 hover:translate-x-[-4px] transition-transform"
        >
          ← Back to Collection
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* --- LEFT: PRODUCT IMAGE --- */}
          <div className="lg:w-3/5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl border border-transparent dark:border-white/5 bg-white dark:bg-gray-800">
              <Image
                src={suit.image}
                alt={suit.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-gray-900/90 dark:bg-black/80 text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md backdrop-blur-md">
                {suit.category || "Premium Suit"}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={suit.image}
                    alt="Detail view"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: CONFIGURATION --- */}
          <div className="lg:w-2/5">
            <div className="lg:sticky lg:top-32 space-y-10">
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-yellow-500"></div>
                  <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Toksido Signature
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {suit.title}
                </h1>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    ${suit.price}
                  </span>
                  <div className="flex items-center text-yellow-400 text-sm font-bold bg-yellow-400/10 px-3 py-1 rounded">
                    {suit.rating} ★
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm border-t border-gray-200 dark:border-gray-800 pt-6">
                {suit.description}
              </p>

              {/* Config Section */}
              <div className="space-y-8 pt-4">
                {/* Colors (Using Landing Page Logic) */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Finish & Color:{" "}
                    <span className="text-gray-900 dark:text-gray-200">
                      {selectedColor}
                    </span>
                  </label>
                  <div className="flex gap-4">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${
                          selectedColor === c.name
                            ? "border-yellow-500 scale-110"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className={`${c.class} w-full h-full rounded-full border border-white/10`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                      Select Size
                    </label>
                    <button className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest border-b border-yellow-500/30">
                      Size Chart
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 text-xs font-bold transition-all rounded-lg border ${
                          selectedSize === size
                            ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black shadow-xl"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-yellow-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col gap-4 pt-6">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-5 rounded-xl uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl shadow-yellow-500/20 active:scale-[0.98]">
                  Add to Wardrobe
                </button>
                <button className="w-full border-2 border-gray-900 dark:border-white py-5 rounded-xl uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                  Book A Bespoke Fitting
                </button>
              </div>

              {/* Bottom Details */}
              <footer className="pt-10 border-t border-gray-200 dark:border-gray-800 flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                <p>✓ Premium Italian Wool</p>
                <p>✓ Hand-Finished Details</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
