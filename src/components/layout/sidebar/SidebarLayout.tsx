import { useState } from 'react';
import sideLogo from '@/assets/svgs/side-logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import SidebarUserMenu from './SidebarUserMenu';
import SidebarIcon from '@/components/shared/icons/SidebarIcon';
import { getCmsNavItems, getMainNavItems, getSettingsNavItems } from '@/constants/sidebar.constant';
import type { CustomSidebarProps } from '@/types/layout.types';
import NavItem from './NavItem';
import ExpandableNavItem from './ExpandableNavItem';
import { useUser } from '@/hooks/auth/useUser';

function SidebarLayout({ side = 'left' }: CustomSidebarProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { user } = useUser();

  const isCmsRoute = pathname.startsWith('/cms');
  const isSettingsRoute = pathname.startsWith('/settings');

  const [cmsOpen, setCmsOpen] = useState(isCmsRoute);
  const [prevIsCmsRoute, setPrevIsCmsRoute] = useState(isCmsRoute);

  const [settingsOpen, setSettingsOpen] = useState(isSettingsRoute);
  const [prevIsSettingsRoute, setPrevIsSettingsRoute] = useState(isSettingsRoute);

  // Sync open state when route changes externally (e.g. browser back/forward)
  if (isCmsRoute !== prevIsCmsRoute) {
    setPrevIsCmsRoute(isCmsRoute);
    if (isCmsRoute) setCmsOpen(true);
  }

  if (isSettingsRoute !== prevIsSettingsRoute) {
    setPrevIsSettingsRoute(isSettingsRoute);
    if (isSettingsRoute) setSettingsOpen(true);
  }

  const mainNavItems = getMainNavItems(t);
  const cmsNavItems = getCmsNavItems(t);
  const settingsNavItems = getSettingsNavItems(t);

  return (
    <Sidebar
      collapsible='offcanvas'
      side={side}
      className='bg-primary-900! border-r-0'
    >
      <SidebarHeader className='border-b-0 p-0'>
        <div className='flex h-29.75 flex-col items-center justify-center gap-3 py-9'>
          <img
            alt='Karat'
            className='w-full object-contain'
            src={sideLogo}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className='gap-0 px-0 py-4'>
        <nav className='flex flex-col gap-0'>
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              end={item.href === '/'}
              icon={item.icon}
              to={item.href}
            >
              {item.title}
            </NavItem>
          ))}

          {/* CMS — expandable group */}
          <ExpandableNavItem
            title={t('sidebar.nav.cms')}
            icon='docs'
            items={cmsNavItems}
            isOpen={cmsOpen}
            onToggle={() => setCmsOpen((open) => !open)}
          />

          {/* Settings — expandable group */}
          <ExpandableNavItem
            title={t('sidebar.nav.settings')}
            icon='settings'
            items={settingsNavItems}
            isOpen={settingsOpen}
            onToggle={() => setSettingsOpen((open) => !open)}
          />
        </nav>
      </SidebarContent>

      <SidebarFooter className='mt-auto gap-0 border-t border-white/10 bg-transparent p-0'>
        <NavLink
          to='/activity-log'
          className={({ isActive }) =>
            cn(
              'type-body-sm flex w-full items-center gap-3 px-4 py-3 text-white/90 transition-colors',
              isActive ? 'bg-white/10 font-medium text-white' : 'hover:bg-white/5',
            )
          }
        >
          <div className='flex size-5 items-center justify-center'>
            <SidebarIcon name='activity' />
          </div>
          <span className='min-w-0 flex-1 truncate'>{t('sidebar.nav.activityLog')}</span>
        </NavLink>

        <SidebarUserMenu
          name={user?.fullName ?? ''}
          role={user?.roleName ?? ''}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarLayout;