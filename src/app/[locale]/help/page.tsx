'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  PlusCircle,
  ListTodo,
  BarChart2,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header/Header';




export default function HelpPage() {
  const t = useTranslations('help');
  const locale = useLocale();

  return (
    <>
    <Header/>
      <main className='bg-black max-w-7xl mx-auto  text-white py-16'>
         
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
  <span>{t('back')}</span>
</Link>
          
          <div className='mt-15'>
            <h1 className='text-4xl text-center font-extrabold text-white mb-4 sm:text-5xl'>
              {t('hero.title')}
            </h1>
            <p className='text-lg text-white max-w-3xl mx-auto'>
              {t('hero.description')}
            </p>
                    
            
                    <section className='mb-16 max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-8'>
              {t('faq.title')}
            </h2>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-lg font-medium text-white hover:no-underline'>
                  {t('faq.q1.question')}
                </AccordionTrigger>
                <AccordionContent className='text-white'>
                  {t('faq.q1.answer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-lg font-medium text-white hover:no-underline'>
                  {t('faq.q2.question')}
                </AccordionTrigger>
                <AccordionContent className='text-white'>
                  {t('faq.q2.answer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger className='text-lg font-medium text-white hover:no-underline'>
                  {t('faq.q3.question')}
                </AccordionTrigger>
                <AccordionContent className='text-white'>
                  {t('faq.q3.answer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger className='text-lg font-medium text-white hover:no-underline'>
                  {t('faq.q4.question')}
                </AccordionTrigger>
                <AccordionContent className='text-white'>
                  {t('faq.q4.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
                    </section>
          </div>

       
      </main>
     
    </>
  );
}
