"use client";

import type React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Book, Zap, Shield, ArrowLeft, Code, Server, Headphones } from "lucide-react";
import Link from "next/link";
import { Header } from "../components/Header/Header";

export default function DocumentationPage() {
  const t = useTranslations("Docs");
  const locale = useLocale();

  return (
    <>
      <Header />

      <div className="min-h-screen max-w-7xl mx-auto pt-15 flex bg-black px-4 sm:px-6 lg:px-8">
        <main className="flex-1 my-8">
          <div className="mb-25">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 border-2 border-white bg-transparent text-white rounded-full px-4 py-2 text-sm font-medium transition shadow-sm"
            >
              <ArrowLeft size={18} />
              <span>{t("backToHome")}</span>
            </Link>
          </div>

          {/* Introduction */}
          <section id="introduction" className="mt-6">
            <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-white mb-6">{t("description")}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Book className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.easy")}</h3>
                <p className="text-white text-sm">{t("features.easyDesc")}</p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Zap className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.realtime")}</h3>
                <p className="text-white text-sm">{t("features.realtimeDesc")}</p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Shield className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.secure")}</h3>
                <p className="text-white text-sm">{t("features.secureDesc")}</p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Code className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.customizable")}</h3>
                <p className="text-white text-sm">{t("features.customizableDesc")}</p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Server className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.scalable")}</h3>
                <p className="text-white text-sm">{t("features.scalableDesc")}</p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
                <Headphones className="w-8 h-8 text-white mb-3" />
                <h3 className="font-semibold text-white mb-2">{t("features.support")}</h3>
                <p className="text-white text-sm">{t("features.supportDesc")}</p>
              </div>
            </div>
          </section>

         

         

         
         
        

        

         
        </main>
      </div>
    </>
  );
}