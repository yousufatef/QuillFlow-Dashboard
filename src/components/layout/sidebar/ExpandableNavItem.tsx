import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarIcon from '@/components/shared/icons/SidebarIcon';
import type { ExpandableNavItemProps } from '@/types/layout.types';
import { WithPermissions } from '@/components/shared/permissions/WithPermissions';

function ExpandableNavItem({ title, icon, items, isOpen, onToggle }: ExpandableNavItemProps) {
  const allItemsPermissions = items.flatMap((item) => item.permissions ?? []);
  const allItemsHasPermissions = items.every((item) => item.permissions !== undefined);

  return (
    <WithPermissions
      permissions={allItemsHasPermissions ? allItemsPermissions : []}
      require='some'
    >
      <div
        className={cn(
          'flex flex-col gap-1 transition-all duration-300',
          isOpen && 'bg-primary-500 mb-2',
        )}
      >
        <button
          type='button'
          onClick={onToggle}
          className={cn(
            'type-body-sm flex w-full items-center gap-3 px-4 py-2 text-white/90 transition-colors hover:bg-white/5',
            isOpen && 'font-medium text-white',
          )}
        >
          <div className='flex size-5 items-center justify-center'>
            <SidebarIcon name={icon} />
          </div>
          <span className='min-w-0 flex-1 truncate text-start'>{title}</span>
          {isOpen ? <SidebarIcon name='arrowUp' /> : <SidebarIcon name='arrowDown' />}
        </button>

        {/* Smooth height transition container */}
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className='overflow-hidden'>
            <ul className='flex flex-col gap-2'>
              {items.map((item) => (
                <WithPermissions
                  permissions={item.permissions ?? []}
                  key={item.href}
                >
                  <li>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'type-body-sm text-primary-50 flex w-full items-center rounded-e-md py-1 ps-4 pe-12 transition-colors',
                          isActive
                            ? 'bg-primary-400 rounded-e border-s-2 border-[#f9f9f9]'
                            : 'hover:bg-primary-400',
                        )
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                </WithPermissions>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WithPermissions>
  );
}

export default ExpandableNavItem;
