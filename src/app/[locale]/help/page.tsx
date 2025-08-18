'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header/Header';

export default function HelpPage() {
  const t = useTranslations('help');
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen pt-25 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
        {/* Back to Home */}
        <Link
          href={`/${locale}`}
          className="
            inline-flex items-center gap-2
            border border-white
            bg-transparent
            text-white
            rounded-full
            px-3 py-1.5 sm:px-4 sm:py-2
            text-sm sm:text-base font-medium
            transition hover:bg-white/10
            shadow-sm
            mb-6 sm:mb-8
          "
        >
          <ArrowLeft size={18} />
          <span>{t('back')}</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl px-2 sm:px-0 text-gray-300">
            {t('hero.description')}
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mt-12 sm:mt-16 mb-12 sm:mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            {t('faq.title')}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[1, 2, 3, 4].map((num) => (
              <AccordionItem key={num} value={`item-${num}`}>
                <AccordionTrigger className="text-base sm:text-lg font-medium text-white hover:no-underline">
                  {t(`faq.q${num}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-white text-sm sm:text-base">
                  {t(`faq.q${num}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </>
  );
}
