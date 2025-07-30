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
import { Button } from '@/components/ui/button';
import { Header } from '../components/Header/Header';



export default function CookiePage() {
  const t = useTranslations('cookies');
  const locale = useLocale();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
        <Card className="max-w-3xl w-full bg-black text-white border border-white">
          <CardHeader>
            <Button
              asChild
              variant="link"
              className="self-start px-0 text-white hover:text-gray-300"
            >
              <Link href={`/${locale}`}>{t('back')}</Link>
            </Button>
            <CardTitle className="text-3xl font-bold text-white mt-4">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-white">
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 text-white">
            <ol className="space-y-6 list-decimal list-inside">
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('what.title')}
                </h2>
                <p className="text-white">{t('what.text')}</p>
              </li>
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('types.title')}
                </h2>
                <p className="space-y-2 text-white">
                  <strong className="block">
                    {t('types.essential').split(':')[0]}:
                  </strong>{' '}
                  {t('types.essential').split(':')[1]}
                  <strong className="block">
                    {t('types.analytics').split(':')[0]}:
                  </strong>{' '}
                  {t('types.analytics').split(':')[1]}
                  <strong className="block">
                    {t('types.functional').split(':')[0]}:
                  </strong>{' '}
                  {t('types.functional').split(':')[1]}
                  <strong className="block">
                    {t('types.marketing').split(':')[0]}:
                  </strong>{' '}
                  {t('types.marketing').split(':')[1]}
                </p>
              </li>
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('thirdParty.title')}
                </h2>
                <p className="text-white">{t('thirdParty.text')}</p>
              </li>
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('manage.title')}
                </h2>
                <p className="text-white">{t('manage.text')}</p>
              </li>
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('consent.title')}
                </h2>
                <p className="text-white">{t('consent.text')}</p>
              </li>
              <li>
                <h2 className="font-semibold text-lg text-white mb-2">
                  {t('update.title')}
                </h2>
                <p className="text-white">{t('update.text')}</p>
              </li>
            </ol>
            <p className="text-sm text-white mt-12 text-right">
              {t('lastUpdated')}
            </p>
          </CardContent>
        </Card>
      </div>
      
    </>
  );
}
