'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '../components/Header/Header';



export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const locale = useLocale();

  return (
    <>
     <Header />
<div className=" bg-black text-white flex items-center justify-center px-4 py-12">
  <Card className="max-w-3xl w-full shadow-lg border border-white bg-black text-white">
    <CardHeader className="pb-4">
      <Link
        href={`/${locale}`}
        className="text-sm text-white hover:text-gray-300"
      >
        {t('back')}
      </Link>
      <CardTitle className="text-3xl font-bold text-white mt-4">
        {t('title')}
      </CardTitle>
      <CardDescription className="text-white">
        {t('intro')}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8 text-white">
      <p className="text-sm text-white">{t('updated')}</p>

      <ol className="space-y-6 list-decimal list-inside">
        <li>
          <h2 className="font-bold text-xl mb-2">{t('sections.1.title')}</h2>
          <p className="text-base text-white">{t('sections.1.content')}</p>
          <ul className="list-disc ml-4 mt-2 space-y-1 text-white">
            <li>{t('sections.1.items.personal')}</li>
            <li>{t('sections.1.items.usage')}</li>
            <li>{t('sections.1.items.device')}</li>
          </ul>
        </li>

        <li>
          <h2 className="font-bold text-xl mb-2">{t('sections.2.title')}</h2>
          <p className="text-base text-white">{t('sections.2.content')}</p>
        </li>

        <li>
          <h2 className="font-bold text-xl mb-2">{t('sections.3.title')}</h2>
          <p className="text-base text-white">{t('sections.3.content')}</p>
        </li>
      </ol>
    </CardContent>
  </Card>
</div>


    </>
  );
}
