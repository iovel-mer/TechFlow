'use client';

import { useTranslations } from 'next-intl';
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
} from 'lucide-react';
import { Header } from '../components/Header/Header';



export default function HelpPage() {
  const t = useTranslations('help');

  return (
    <>
      <Header />
      <main className='bg-black text-white px-4 py-16 sm:px-6 lg:px-8 mx-auto'>
        <section className='text-center mb-16'>
          <h1 className='text-4xl font-extrabold text-white mb-4 sm:text-5xl'>
            {t('hero.title')}
          </h1>
          <p className='text-lg text-white max-w-3xl mx-auto'>
            {t('hero.description')}
          </p>
        </section>

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

       
      </main>
     
    </>
  );
}
