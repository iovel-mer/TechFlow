'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import 'flag-icons/css/flag-icons.min.css';

const languages = [
  { code: 'en', name: 'English', countryCode: 'us' },
  { code: 'es', name: 'Español', countryCode: 'es' },
  { code: 'de', name: 'Deutsch', countryCode: 'de' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    const basePath = languages.some(lang => lang.code === segments[1])
      ? '/' + segments.slice(2).join('/')
      : pathname;

    const newPath = `/${newLocale}${basePath === '/' ? '' : basePath}`;
    router.push(newPath);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-black text-white flex items-center px-3"
        >
          <span className={`fi fi-${currentLanguage?.countryCode} w-5 h-4 rounded-sm`} />
          <span className="text-sm">{currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' bg-black text-white'>
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center  text-base ${
              locale === language.code ? ' font-medium' : ''
            }`}
          >
            <span className={`fi fi-${language.countryCode} w-5 h-4 rounded-sm`} />
            <span className='ml-2'>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
