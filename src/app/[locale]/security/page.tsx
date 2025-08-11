'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldCheck,
  Lock,
  Banknote,
  Gem,
  Lightbulb,
  FileText,
  Fingerprint,
  Scale,
  Landmark,
  Wallet,
  ClipboardList,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import { Header } from '../components/Header/Header';

export default function SecurityPage() {
  const t = useTranslations('security');
  const locale = useLocale();

  return (
    <>
      <Header/>
      <main className='bg-black text-white mt-10 pt-5'>
        {/* Hero Section */}
        <section className='container mx-auto text-center mb-16 px-4 md:px-6'>
           <div className="mb-20 text-left ml-10">
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
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white'>
            {t('title')}
          </h1>
          <p className='text-lg md:text-xl text-white max-w-3xl mx-auto'>
            {t('subtitle')}
          </p>
        </section>

        {/* Key Security Pillars */}
        <section className='container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4 md:px-6'>
          {/* Asset Protection */}
          <Card className='shadow-lg'>
            <CardHeader className='flex flex-row items-center space-x-4 pb-2'>
              <ShieldCheck className='h-8 w-8 text-primary' />
              <CardTitle className='text-xl font-semibold'>
                {t('assetProtection.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <Lock className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('assetProtection.coldStorage.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('assetProtection.coldStorage.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <Banknote className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('assetProtection.insurance.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('assetProtection.insurance.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <Wallet className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('assetProtection.accounts.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('assetProtection.accounts.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Security */}
          <Card className='shadow-lg'>
            <CardHeader className='flex flex-row items-center space-x-4 pb-2'>
              <Fingerprint className='h-8 w-8 text-primary' />
              <CardTitle className='text-xl font-semibold'>
                {t('technical.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <Gem className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('technical.multiSig.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('technical.multiSig.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <Lock className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('technical.encryption.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('technical.encryption.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <Eye className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('technical.monitoring.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('technical.monitoring.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card className='shadow-lg'>
            <CardHeader className='flex flex-row items-center space-x-4 pb-2'>
              <Scale className='h-8 w-8 text-primary' />
              <CardTitle className='text-xl font-semibold'>
                {t('compliance.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <Landmark className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('compliance.regulatory.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('compliance.regulatory.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <ClipboardList className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('compliance.audits.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('compliance.audits.description')}
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <FileText className='h-5 w-5 text-gray-500 mt-1' />
                <div>
                  <h3 className='font-medium'>
                    {t('compliance.transparency.title')}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {t('compliance.transparency.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

       
      </main>
     
    </>
  );
}
