'use client';

import { Calendar, Clock, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Header } from "../components/Header/Header";


export default function BlogPage() {
  const t = useTranslations("Blog");

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-black rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 pt-8 pb-6">

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {t("title")}
              </h1>

              <div className="flex items-center gap-6 text-white text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{t("author")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t("date")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t("readTime")}</span>
                </div>
              </div>
            </div>

            {/* For the full content, wrap every text string with t("...") accordingly */}
            <div className="px-8 pb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-white leading-relaxed mb-6">
                  {t("intro")}
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("section.whatTitle")}</h2>
                <p className="text-white leading-relaxed mb-6">{t("section.whatBody")}</p>

                <div className="bg-black border-l-4 border-blue-400 p-6 my-8">
                  <p className="text-white font-medium">{t("quote.text")}</p>
                  <p className="text-white text-sm mt-2">— {t("quote.author")}</p>
                </div>

              </div>
            </div>
          </article>
        </div>
      </div>
     
    </>
  );
};


