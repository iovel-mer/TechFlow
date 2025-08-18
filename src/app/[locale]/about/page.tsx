'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header/Header';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <>
    <Header/>
    <main className="bg-black text-white">
      <section className="py-16 md:py-20 text-center px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
        
          <div className="mb-20 text-left">
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
    shadow-sm
  "
>
  <ArrowLeft size={18} />
  <span>{t('backToHome')}</span>
</Link>

          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Vision, Established, Community Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6 max-w-7xl mx-auto pb-16 md:pb-24">
        <div className="bg-black p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3">
            {t('vision.title')}
          </h2>
          <p className="leading-relaxed">
            {t('vision.description')}
          </p>
        </div>
        <div className="bg-black p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3">
            {t('established.title')}
          </h2>
          <p className="leading-relaxed">
            {t('established.description')}
          </p>
        </div>
        <div className="bg-black p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3">
            {t('community.title')}
          </h2>
          <p className="leading-relaxed">
            {t('community.description')}
          </p>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            {t('principles.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-black p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">
                {t('principles.integrity.title')}
              </h3>
              <p>{t('principles.integrity.description')}</p>
            </div>
            <div className="bg-black p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">
                {t('principles.excellence.title')}
              </h3>
              <p>{t('principles.excellence.description')}</p>
            </div>
            <div className="bg-black p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">
                {t('principles.collaboration.title')}
              </h3>
              <p>{t('principles.collaboration.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
