import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, GlobeIcon, LogOutIcon } from 'lucide-react';
import UserProfile from '@/components/shared/customs/UserProfile';
import ConfirmDialog from '@/components/shared/customs/CustomConfirmDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { getLanguageDirection, useDirection } from '@/i18n/useDirection';
import SidebarIcon from '@/components/shared/icons/SidebarIcon';
import { useLogout } from '@/pages/auth/hooks/useLogout';

type SidebarUserMenuProps = {
  name: string;
  role?: string;
};

type AppLanguage = 'en' | 'ar';

const menuItemClassName =
  'type-body-sm-semibold cursor-pointer text-white outline-none focus:bg-transparent focus:text-white focus:outline-none focus-visible:outline-none focus-visible:ring-0 data-[variant=destructive]:text-white data-[variant=destructive]:focus:bg-transparent data-[variant=destructive]:focus:text-white';

const menuSubTriggerClassName =
  'type-body-sm-semibold cursor-pointer text-white outline-none focus:bg-transparent focus:text-white focus:outline-none focus-visible:outline-none focus-visible:ring-0 data-open:bg-transparent data-open:text-white';

const menuContentClassName =
  'bg-primary-800 min-w-48 rounded-lg border border-white/10 p-2 text-white shadow-lg ring-0 outline-none';

function SidebarUserMenu({ name, role }: SidebarUserMenuProps) {
  const { t, i18n } = useTranslation();
  const direction = useDirection();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logOut, isLoading } = useLogout();
  const currentLanguage: AppLanguage = i18n.language === 'ar' ? 'ar' : 'en';

  const changeLanguage = async (language: AppLanguage) => {
    await i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = getLanguageDirection(language);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } finally {
      setLogoutOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu dir={direction}>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            className='flex w-full items-center gap-2 rounded-md p-4 text-start transition-colors outline-none hover:bg-white/5 focus:outline-none focus-visible:ring-0 focus-visible:outline-none'
          >
            <UserProfile
              name={name}
              role={role}
              className='min-w-0 flex-1'
            />
            <SidebarIcon
              name='arrowSide'
              className='rtl:rotate-180'
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side='right'
          align='end'
          sideOffset={0}
          className={menuContentClassName}
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={menuSubTriggerClassName}>
              <GlobeIcon className='size-5' />
              <span>{t('common.language')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className={menuContentClassName}>
              <DropdownMenuItem
                className={menuItemClassName}
                onClick={() => void changeLanguage('en')}
              >
                <span className='flex-1'>{t('common.english')}</span>
                {currentLanguage === 'en' && <CheckIcon className='size-4' />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItemClassName}
                onClick={() => void changeLanguage('ar')}
              >
                <span className='flex-1'>{t('common.arabic')}</span>
                {currentLanguage === 'ar' && <CheckIcon className='size-4' />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem
            className={cn(menuItemClassName, 'mt-1')}
            onClick={() => setLogoutOpen(true)}
          >
            <LogOutIcon className='size-5' />
            <span>{t('sidebar.userMenu.logOut')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={logoutOpen}
        title={t('sidebar.userMenu.logoutTitle')}
        description={
          <p className='text-muted-foreground'>{t('sidebar.userMenu.logoutDescription')}</p>
        }
        confirmText={t('sidebar.userMenu.logoutConfirm')}
        cancelText={t('sidebar.userMenu.logoutCancel')}
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
        loading={isLoading}
        mode='destructive'
        className='sm:max-w-86.5'
      />
    </>
  );
}

export default SidebarUserMenu;
