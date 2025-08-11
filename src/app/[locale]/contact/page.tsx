'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { ArrowLeft, Mail, Phone, Users } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header/Header';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    // Check if all fields are valid
    const valid =
      name.trim().length > 0 &&
      emailRegex.test(email) &&
      subject.trim().length > 0 &&
      message.trim().length > 0;
    setIsFormValid(valid);
  }, [name, email, subject, message]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return; // Extra safety
    setSuccessMessage('✨ Your message has been sent successfully!');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-12 md:py-20 bg-black text-white'>
        <div className='mb-20 text-left ml-10'>
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
            <span>{t('backToHome')}</span>
          </Link>
        </div>

        <div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl mb-4'>
            {t('getInTouch')}
          </h1>
          <p className='text-lg text-white'>{t('introText')}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {/* Contact Information */}
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

          {/* Contact Form */}
          <Card className='h-fit'>
            <CardHeader>
              <CardTitle>{t('form.title')}</CardTitle>
              <CardDescription>{t('form.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>{t('form.name')}</Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>{t('form.email')}</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='subject'>{t('form.subject')}</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id='subject'>
                      <SelectValue
                        placeholder={t('form.subjectPlaceholder')}
                      />
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('form.messagePlaceholder')}
                    className='min-h-[120px]'
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={!isFormValid}
                >
                  {t('form.sendButton')}
                </Button>
                {successMessage && (
                  <div className='text-emerald-400 text-base text-center mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm'>
                    {successMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
