'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Header } from '../components/Header/Header';


export default function TermsPage() {
  const t = useTranslations('Terms');

  return (
    <>
      <Header />
      <div className='min-h-screen bg-black text-white flex items-center justify-center px-4 py-12'>
        <div className='max-w-3xl w-full bg-black text-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10'>
          <Link
            href='/'
            className='text-sm text-white hover:text-gray-700 transition-colors'
          >
            ← {t('backToHome')}
          </Link>
          <h1 className='text-3xl md:text-4xl font-bold text-white mt-4 mb-8'>
            {t('title')}
          </h1>
          <ol className='space-y-8'>
            {[...Array(8)].map((_, i) => (
              <li key={i}>
                <h2 className='font-bold text-xl mb-2'>
                  {t(`sections.${i + 1}.title`)}
                </h2>
                <p className='text-white'>{t(`sections.${i + 1}.content`)}</p>
              </li>
            ))}
          </ol>
          <p className='text-sm text-white mt-12 text-center'>
            {t('lastUpdated')}
          </p>
        </div>
      </div>
      
    </>
  );
}
