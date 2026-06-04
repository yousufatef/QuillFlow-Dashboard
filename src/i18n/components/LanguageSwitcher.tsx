import { useTranslation } from 'react-i18next';
import { getLanguageDirection } from '../useDirection';
import GlobalIcons from '@/components/shared/icons/auth-icons/GlobalIcon';

type Language = 'en' | 'ar';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language === 'ar' ? 'ar' : 'en';
  const nextLanguage: Language = currentLanguage === 'ar' ? 'en' : 'ar';

  const changeLanguage = async () => {
    await i18n.changeLanguage(nextLanguage);

    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = getLanguageDirection(nextLanguage);
  };

  return (
    <button
      type='button'
      aria-label={`Switch language to ${nextLanguage.toUpperCase()}`}
      onClick={() => {
        void changeLanguage();
      }}
      className='absolute top-18.5 right-18.5 z-20
       flex items-center justify-center gap-2 
        h-12 min-w-20.25 
        rotate-0  rounded-[4px] 
        cursor-pointer 
        border border-primary-500 text-primary-500 bg-transparent
         px-4 py-2
          leading-5.25   transition-colors hover:bg-primary-100
            max-md:top-4 max-md:right-4'
    >
      <GlobalIcons />
      {/* <Globe2 className='size-4 shrink-0' aria-hidden='true' /> */}
      <span className='align-middle'>
        {currentLanguage === 'en' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}
