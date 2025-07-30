'use client';
import { useTranslations } from 'next-intl';
import { Header } from '../components/Header/Header';


export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <Header />
      <section className='min-h-screen bg-black text-white'>
        <section className='py-16 md:py-24 text-center px-4 md:px-6 max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-white mb-4'>
            {t('title')}
          </h1>
          <p className='text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed'>
            {t('description')}
          </p>
        </section>

        <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6 max-w-7xl mx-auto pb-16 md:pb-24'>
          <div className='bg-black p-6 rounded-xl shadow-sm border border-gray-100'>
            <h2 className='text-xl font-semibold text-white mb-3'>
              {t('vision.title')}
            </h2>
            <p className='text-white leading-relaxed'>
              {t('vision.description')}
            </p>
          </div>
          <div className='bg-black p-6 rounded-xl shadow-sm border border-gray-100'>
            <h2 className='text-xl font-semibold text-white mb-3'>
              {t('established.title')}
            </h2>
            <p className='text-white leading-relaxed'>
              {t('established.description')}
            </p>
          </div>
          <div className='bg-black p-6 rounded-xl shadow-sm border border-gray-100'>
            <h2 className='text-xl font-semibold text-white mb-3'>
              {t('community.title')}
            </h2>
            <p className='text-white leading-relaxed'>
              {t('community.description')}
            </p>
          </div>
        </section>

        <section className='bg-black py-16 md:py-20 px-4 md:px-6'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-10 text-center'>
              {t('principles.title')}
            </h2>
            <div className='grid md:grid-cols-3 gap-8 text-center'>
              <div className='bg-black p-8 rounded-xl shadow-md border border-gray-200'>
                <h3 className='font-bold text-lg text-white mb-2'>
                  {t('principles.integrity.title')}
                </h3>
                <p className='text-white'>
                  {t('principles.integrity.description')}
                </p>
              </div>
              <div className='bg-black p-8 rounded-xl shadow-md border border-gray-200'>
                <h3 className='font-bold text-lg text-white mb-2'>
                  {t('principles.excellence.title')}
                </h3>
                <p className='text-white'>
                  {t('principles.excellence.description')}
                </p>
              </div>
              <div className='bg-black p-8 rounded-xl shadow-md border border-gray-200'>
                <h3 className='font-bold text-lg text-white mb-2'>
                  {t('principles.collaboration.title')}
                </h3>
                <p className='text-white'>
                  {t('principles.collaboration.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      
    </>
  );
}
