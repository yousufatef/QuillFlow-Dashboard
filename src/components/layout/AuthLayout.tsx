import { Outlet } from 'react-router-dom';

import useScrollToTop from '@/hooks/useScrollToTop';

import { LanguageSwitcher } from '@/i18n/components/LanguageSwitcher';

import AuthBg from '@/assets/svgs/Logo.svg';

function AuthLayout() {
  useScrollToTop();

  return (
    <div
      className='font-switzer relative min-h-screen w-full bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${AuthBg})` }}
    >
      <LanguageSwitcher />
      <main className='relative z-10 max-md:px-4'>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
