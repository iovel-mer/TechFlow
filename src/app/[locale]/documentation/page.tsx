'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Book, Zap, Shield } from "lucide-react";

import { Header } from "../components/Header/Header";



 export default function DocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const t = useTranslations("Docs");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
<Header/>
      <div className="min-h-screen flex justify-center items-center bg-black">
        <main className="flex-1 lg:ml-0 p-6 lg:p-8">
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


