import { useState } from 'react';
import sideLogo from '@/assets/svgs/side-logo.svg.svg';
import { NavLink, useLocation } from 'react-router-dom';
import type { ComponentProps } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import UserProfile from '../shared/customs/UserProfile';
import SidebarIcon from '../shared/icons/side-bar/SidebarIcon';

type SidebarSide = ComponentProps<typeof Sidebar>['side'];

const mainNavItems = [
  { title: 'Home', href: '/', icon: 'home' },
  { title: 'Users', href: '/users', icon: 'users' },
] as const;

const cmsNavItems = [
  { title: 'Blogs', href: '/cms/blogs' },
  { title: 'FAQs', href: '/cms/faqs' },
  { title: 'Onboarding', href: '/cms/onboarding' },
  { title: 'About QuillFlow', href: '/cms/about' },
] as const;

const settingsNavItems = [
  { title: 'Admins', href: '/settings/admins' },
] as const;

type CustomSidebarProps = {
  side?: SidebarSide;
};

// Reusable Navigation Link Component
function NavItem({
  to,
  icon,
  children,
  end,
}: {
  to: string;
  icon: string;
  children: React.ReactNode;
  end?: boolean;
}) {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        cn(
          'flex w-full items-center gap-3 px-4 py-3 type-body-sm text-white/90 transition-colors',
          isActive ? 'bg-white/10 text-white font-medium' : 'hover:bg-white/5',
        )
      }
    >
      <div className='size-5 flex items-center justify-center'>
        <SidebarIcon name={icon} />
      </div>
      <span className='min-w-0 flex-1 truncate'>{children}</span>
    </NavLink>
  );
}

type SubNavItem = {
  title: string;
  href: string;
};

type ExpandableNavItemProps = {
  title: string;
  icon: string;
  items: readonly SubNavItem[];
  isOpen: boolean;
  onToggle: () => void;
};

// Reusable Expandable Group Component
function ExpandableNavItem({
  title,
  icon,
  items,
  isOpen,
  onToggle,
}: ExpandableNavItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 p-2 transition-all duration-300',
        isOpen && 'bg-primary-500',
      )}
    >
      <button
        type='button'
        onClick={onToggle}
        className={cn(
          'flex w-full items-center gap-3 px-2  type-body-sm text-white/90 transition-colors hover:bg-white/5',
          isOpen && 'text-white font-medium',
        )}
      >
        <div className='size-5 flex items-center justify-center'>
          <SidebarIcon name={icon} />
        </div>
        <span className='min-w-0 flex-1 truncate text-start'>{title}</span>
        {isOpen ? (
          <SidebarIcon name='arrowUp' />
        ) : (
          <SidebarIcon name='arrowDown' />
        )}
      </button>

      {/* Smooth height transition container */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className='overflow-hidden'>
          <ul className='flex flex-col gap-2 pt-2'>
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex w-full items-center py-1 ps-4 pe-12 type-body-sm text-primary-50 transition-colors',
                      isActive
                        ? 'rounded-r border-l-2 border-[#f9f9f9] bg-primary-400'
                        : 'rounded-md hover:bg-primary-800/40',
                    )
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SidebarLayout({ side = 'left' }: CustomSidebarProps) {
  const { pathname } = useLocation();
  const isCmsRoute = pathname.startsWith('/cms');
  const isSettingsRoute = pathname.startsWith('/settings');

  const [cmsOpen, setCmsOpen] = useState(isCmsRoute);
  const [prevIsCmsRoute, setPrevIsCmsRoute] = useState(isCmsRoute);

  const [settingsOpen, setSettingsOpen] = useState(isSettingsRoute);
  const [prevIsSettingsRoute, setPrevIsSettingsRoute] =
    useState(isSettingsRoute);

  // Sync state if pathname changes to trigger auto-expand
  if (isCmsRoute !== prevIsCmsRoute) {
    setPrevIsCmsRoute(isCmsRoute);
    if (isCmsRoute) {
      setCmsOpen(true);
    }
  }

  if (isSettingsRoute !== prevIsSettingsRoute) {
    setPrevIsSettingsRoute(isSettingsRoute);
    if (isSettingsRoute) {
      setSettingsOpen(true);
    }
  }

  return (
    <Sidebar
      collapsible='offcanvas'
      side={side}
      className='border-r-0 bg-primary-900!'
    >
      <SidebarHeader className='border-b-0 p-0'>
        <div className='flex h-29.75 flex-col items-center justify-center gap-3 py-9'>
          <img alt='QuillFlow' className=' w-full object-contain' src={sideLogo} />
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
            title='CMS'
            icon='docs'
            items={cmsNavItems}
            isOpen={cmsOpen}
            onToggle={() => setCmsOpen((open) => !open)}
          />

          {/* Settings — expandable group */}
          <ExpandableNavItem
            title='Settings'
            icon='settings'
            items={settingsNavItems}
            isOpen={settingsOpen}
            onToggle={() => setSettingsOpen((open) => !open)}
          />
        </nav>
      </SidebarContent>

      <SidebarFooter className='gap-0 border-t border-white/10 bg-transparent p-0 mt-auto'>
        <NavLink
          to='/activity-log'
          className={({ isActive }) =>
            cn(
              'flex w-full items-center gap-3 px-4 py-3 type-body-sm text-white/90 transition-colors',
              isActive
                ? 'bg-white/10 text-white font-medium'
                : 'hover:bg-white/5',
            )
          }
        >
          <div className='size-5 flex items-center justify-center'>
            <SidebarIcon name='activity' />
          </div>
          <span className='min-w-0 flex-1 truncate'>Activity log</span>
        </NavLink>

        <div className='px-4 py-4'>
          <UserProfile name='Mina Atef' role='Admin' />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarLayout;
