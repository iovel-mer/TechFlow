'use client';

import { useLocale, useTranslations } from "next-intl";
import { Book, Zap, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "../components/Header/Header";


 export default function DocumentationPage() {
  const t = useTranslations("Docs");
  const locale = useLocale();

  return (
    <>
        <Header/>
      <div className="min-h-screen  flex  bg-black">
        <main className="flex-1 m-15 ">
           <div className="mb-20 ">
           <Link
  href={`/${locale}`}
  className="
    inline-flex items-center gap-2
    border-2 border-amber-400
    bg-transparent
    text-white
    rounded-full
    px-4 py-2
    text-sm font-medium
    transition
    hover:bg-amber-400 hover:text-black
    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
    shadow-sm
  "
>
  <ArrowLeft size={18} />
  <span>{t('backToHome')}</span>
</Link>
          </div>
          <section id="introduction" className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white mb-6">
              {t("description")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black p-6 rounded-lg">
                <Book className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">
                  {t("features.easy")}
                </h3>
                <p className="text-white text-sm">
                  {t("features.easyDesc")}
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg">
                <Zap className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">
                  {t("features.realtime")}
                </h3>
                <p className="text-white text-sm">
                  {t("features.realtimeDesc")}
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg">
                <Shield className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">
                  {t("features.secure")}
                </h3>
                <p className="text-white text-sm">
                  {t("features.secureDesc")}
                </p>
              </div>
            </div>
          </section>

          
        </main>
      </div>
      
    </>
  );
};


