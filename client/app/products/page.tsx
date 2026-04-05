import ProductCard from "@/src/components/ProductCard";
import suits from "@/src/data/suits";

const LandingPage = () => {
  return (
    <>
      <ProductCard suits={suits}
      isAdmin={false}
      
      />;
      <section className="py-24 bg-gray-800 text-white text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-[0.03] rounded-full -mr-32 -mt-32"></div>

        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upgrade Your Wardrobe Today
          </h2>
          <p className="mb-10 text-gray-400 text-lg max-w-2xl mx-auto">
            Find the perfect suit for any occasion and stand out with style.
            Precision tailoring for the modern gentleman.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-12 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg shadow-lg shadow-yellow-400/20">
            Shop the Collection
          </button>
        </div>
      </section>
      <footer className="py-12 bg-gray-950 text-gray-500 text-center border-t border-white/5">
        <p className="text-sm tracking-widest uppercase">
          © 2026 TOKSIDO SUITS. CRAFTED FOR EXCELLENCE.
        </p>
      </footer>
    </>
  );
}

export default LandingPage;
