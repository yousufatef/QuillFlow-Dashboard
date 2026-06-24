import type { TFunction } from 'i18next';
import type { SubNavItem } from '@/types/layout.types';

export type MainNavItem = SubNavItem & { icon: string };

export function getMainNavItems(t: TFunction): MainNavItem[] {
  return [
    { title: t('sidebar.nav.home'), href: '/', icon: 'home' },
    { title: t('sidebar.nav.users'), href: '/users', icon: 'users', permissions: ['users.read'] },
    {
      title: t('sidebar.nav.transactions'),
      href: '/transactions',
      icon: 'transactions',
      permissions: ['transactions.read'],
    },
  ];
}

export function getCmsNavItems(t: TFunction): SubNavItem[] {
  return [
    { title: t('sidebar.cms.blogs'), href: '/cms/blogs' },
    { title: t('sidebar.cms.faqs'), href: '/cms/faqs' },
    { title: t('sidebar.cms.onboarding'), href: '/cms/onboarding' },
    { title: t('sidebar.cms.about'), href: '/cms/about' },
  ];
}

export function getSettingsNavItems(t: TFunction): SubNavItem[] {
  return [
    { title: t('sidebar.settings.admins'), href: '/settings/admins' },
    { title: t('sidebar.settings.roles'), href: '/settings/roles' },
  ];
}
