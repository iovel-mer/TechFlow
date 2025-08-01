'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Users } from 'lucide-react';
import { Header } from '../components/Header/Header';


export default function ContactPage() {
  const t = useTranslations('ContactPage');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.reload(); // Refresh the whole page
  };

  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-12 md:py-20 bg-black text-white'>
        <div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl mb-4'>
            {t('getInTouch')}
          </h1>
          <p className='text-lg text-white'>{t('introText')}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {/* Contact Information Section */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5 text-primary' />
                  {t('generalInquiries.title')}
                </CardTitle>
                <CardDescription>
                  {t('generalInquiries.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Phone className='h-5 w-5 text-primary' />
                  {t('technicalSupport.title')}
                </CardTitle>
                <CardDescription>
                  {t('technicalSupport.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-primary' />
                  {t('partnerships.title')}
                </CardTitle>
                <CardDescription>
                  {t('partnerships.description')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Contact Form Section */}
          <Card className='h-fit'>
            <CardHeader>
              <CardTitle>{t('form.title')}</CardTitle>
              <CardDescription>{t('form.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>{t('form.name')}</Label>
                  <Input id='name' placeholder={t('form.namePlaceholder')} />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>{t('form.email')}</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='subject'>{t('form.subject')}</Label>
                  <Select defaultValue='general'>
                    <SelectTrigger id='subject'>
                      <SelectValue placeholder={t('form.subjectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='general'>
                        {t('form.subjectOptions.general')}
                      </SelectItem>
                      <SelectItem value='technical'>
                        {t('form.subjectOptions.technical')}
                      </SelectItem>
                      <SelectItem value='billing'>
                        {t('form.subjectOptions.billing')}
                      </SelectItem>
                      <SelectItem value='partnership'>
                        {t('form.subjectOptions.partnership')}
                      </SelectItem>
                      <SelectItem value='other'>
                        {t('form.subjectOptions.other')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='message'>{t('form.message')}</Label>
                  <Textarea
                    id='message'
                    placeholder={t('form.messagePlaceholder')}
                    className='min-h-[120px]'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  {t('form.sendButton')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
     
    </>
  );
}
