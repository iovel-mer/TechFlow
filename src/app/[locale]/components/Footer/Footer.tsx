'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Zap } from 'lucide-react';

export default function Footer() {
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const routeMapping = {
    'About Us': `/${locale}/about`,
    Security: `/${locale}/security`,
    'Help Center': `/${locale}/help`,
    'Contact Us': `/${locale}/contact`,
    Blog: `/${locale}/blog`,
    Documentation: `/${locale}/documentation`,
    TermsOfService: `/${locale}/terms`,
    PrivacyPolicy: `/${locale}/privacy`,
    CookiePolicy: `/${locale}/cookie`,
  };

  const translationMapping = {
    'About Us': 'aboutUs',
    Security: 'security',
    'Help Center': 'helpCenter',
    'Contact Us': 'contactUs',
    Blog: 'blog',
    Documentation: 'documentation',
    TermsOfService: 'terms.title',
    PrivacyPolicy: 'privacy.title',
    CookiePolicy: 'cookies.title',
  };

  return (
    <div className='relative'>
      {/* Footer */}
      <footer className='py-20 px-6 border-t border-gray-800 bg-black text-white'>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12'>
            <div className='lg:col-span-2 md:col-span-2'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105'>
                  <Zap size={24} className='text-white' />
                </div>{' '}
                <span className='text-2xl font-bold'>TechFlow</span>
              </div>
              <p className='text-gray-400 mb-6 max-w-sm'>
                {tFooter('description')}
              </p>
            </div>

            {[
              {
                title: tFooter('company'),
                links: ['About Us', 'Security'],
              },
              {
                title: tFooter('terms.title'),
                links: ['TermsOfService', 'PrivacyPolicy', 'CookiePolicy'],
              },
              {
                title: tFooter('support'),
                links: ['Help Center', 'Contact Us'],
              },
              {
                title: tFooter('resources'),
                links: ['Blog', 'Documentation'],
              },
            ].map((section, index) => (
              <div key={section.title} className='md:col-span-1'>
                <h3 className='font-semibold mb-4'>{section.title}</h3>
                <ul className='space-y-2'>
                  {section.links.map(link => (
                    <li key={link}>
                      <Link
                        href={routeMapping[link as keyof typeof routeMapping]}
                        className='text-gray-400 hover:text-white transition-colors cursor-pointer'
                      >
                        {tFooter(
                          translationMapping[
                            link as keyof typeof translationMapping
                          ]
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className='w-full mb-10' />
          <div className='flex flex-col w-full space-y-4 mb-10'>
            <p className='text-gray-400'>{tFooter('company_info')}</p>
            <p className='text-gray-400'>{tFooter('risk_warning')}</p>
            <p className='text-gray-400'>{tFooter('execution_notice')}</p>
            <p className='text-gray-400'>{tFooter('age_restriction')}</p>
          </div>

          <p className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} TechFlow. {tFooter('rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
