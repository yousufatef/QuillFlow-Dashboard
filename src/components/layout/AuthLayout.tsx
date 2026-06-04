import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';

import useScrollToTop from '@/hooks/useScrollToTop';

import { TOKEN, USER_VERIFIED } from '@/constants';
import { LanguageSwitcher } from '@/i18n/components/LanguageSwitcher';

import AuthBg from '@/assets/svgs/Logo.svg';
const useAuthRedirect = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    Cookies.get(TOKEN) && Cookies.get(USER_VERIFIED) === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      void navigate('/'); // Redirects to the previous page if logged in
    }
  }, [isLoggedIn, navigate]);
};

function AuthLayout() {
  useAuthRedirect();
  useScrollToTop();

  return (
    <div
      className='relative min-h-screen w-full font-switzer bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${AuthBg})` }}>
      <LanguageSwitcher />
      <main className='relative z-10 max-md:px-4'>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
