import { Suspense, useEffect, useRef, type CSSProperties } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import MainLoader from '../shared/loader/MainLoader';
import { CustomSidebar } from '../shared/customs';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { TooltipProvider } from '../ui/tooltip';
import { useDirection } from '../../i18n/useDirection';
import { useUser } from '@/hooks/auth/useUser';

function AppLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const direction = useDirection();
  const sidebarSide = direction === 'rtl' ? 'right' : 'left';

  useEffect(() => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const { isAuthenticated, isLoading, isError } = useUser();

  if (isAuthenticated && isLoading) {
    return <MainLoader className='size-full' />;
  }

  if (isError) return <Navigate to={'/login'} />;

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '220px',
          } as CSSProperties
        }
      >
        <CustomSidebar side={sidebarSide} />
        <SidebarInset>
          <main
            ref={mainRef}
            className='bg-background h-dvh flex-1 overflow-hidden py-6 text-start'
          >
            <Suspense fallback={<MainLoader />}>
              <Outlet />
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default AppLayout;
