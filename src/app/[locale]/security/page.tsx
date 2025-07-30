'use client';

import { useTranslations } from 'next-intl';
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
} from 'lucide-react';
import { Header } from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function SecurityPage() {
  const t = useTranslations('security');

  return (
    <>
      <Header />
      <main className='bg-black text-white py-16 md:py-24 lg:py-32'>
        {/* Hero Section */}
        <section className='container mx-auto text-center mb-16 px-4 md:px-6'>
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

        {/* Security Tips */}
        <section className='container mx-auto px-4 md:px-6 mb-16'>
          <Card className='bg-blue-50 border border-blue-200 shadow-md'>
            <CardHeader>
              <CardTitle className='text-blue-700 flex items-center space-x-2'>
                <Lightbulb className='h-6 w-6' />
                <span>{t('tips.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='list-disc list-inside text-sm text-blue-800 space-y-2'>
                <li>{t('tips.list.0')}</li>
                <li>{t('tips.list.1')}</li>
                <li>{t('tips.list.2')}</li>
                <li>{t('tips.list.3')}</li>
                <li>{t('tips.list.4')}</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
