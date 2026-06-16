import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarIcon from '@/components/shared/icons/SidebarIcon';
import type { NavItemProps } from '@/types/layout.types';

function NavItem({ to, icon, children, end }: NavItemProps) {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        cn(
          'type-body-sm flex w-full items-center gap-3 px-4 py-3 text-white/90 transition-colors',
          isActive ? 'bg-white/10 font-medium text-white' : 'hover:bg-white/5',
        )
      }
    >
      <div className='flex size-5 items-center justify-center'>
        <SidebarIcon name={icon} />
      </div>
      <span className='min-w-0 flex-1 truncate'>{children}</span>
    </NavLink>
  );
}

export default NavItem;
