import React from "react";
import { useTranslations } from "next-intl";

function Contact() {
  const t = useTranslations("Footer");

  return (
    <div>
      <footer className="py-20 bg-black text-gray-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-serif text-white mb-6 tracking-tighter">
              TOKSIDO
            </h2>
            <p className="max-w-sm text-sm leading-7 opacity-70">
              {t("description")}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">
              {t("contactHeader")}
            </h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">
                {t("location")}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                info@toksido.com
              </li>
              <li className="text-white/80">+251 900 000 000</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">
              {t("socialHeader")}
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
          {t("copyright")}
        </div>
      </footer>
    </div>
  );
}

export default Contact;
