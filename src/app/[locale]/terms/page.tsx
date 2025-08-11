'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header/Header';

export default function TermsPage() {
  const t = useTranslations('Terms');
  const locale = useLocale();

  return (
    <>
    <Header/>
    <main className="bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back to Home button under the logo */}
        <div className="text-left">
          <Link
            href={`/${locale}`}
            className="
    inline-flex items-center gap-2
    border-2 border-white
    bg-transparent
    text-white
    rounded-full
    px-4 py-2
    text-sm font-medium
    transition
   
    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
    shadow-sm
  "
          >
            <ArrowLeft size={18} />
            <span>{t('backToHome')}</span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center">{t('title')}</h1>

        {/* Main content */}
        <div className="max-w-3xl w-full mx-auto bg-black text-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
          <ol className="space-y-8">
            {[...Array(8)].map((_, i) => (
              <li key={i}>
                <h2 className="font-bold text-xl mb-2">
                  {t(`sections.${i + 1}.title`)}
                </h2>
                <p className="text-white">{t(`sections.${i + 1}.content`)}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-white mt-12 text-center">
            {t('lastUpdated')}
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
