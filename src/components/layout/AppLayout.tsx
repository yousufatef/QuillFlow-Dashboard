import { Suspense, useEffect, useRef, type CSSProperties } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainLoader from '../shared/loader/MainLoader';
import { CustomSidebar } from '../shared/customs';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { TooltipProvider } from '../ui/tooltip';
import { useDirection } from '../../i18n/useDirection';

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
            className=' h-dvh overflow-hidden flex-1 overflow-y-auto bg-background px-4 py-6 text-start md:px-6'
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
