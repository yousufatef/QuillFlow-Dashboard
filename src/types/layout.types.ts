import type { ComponentProps } from 'react';
import type { Sidebar } from '@/components/ui/sidebar';
import type { AppPermissions } from './permissions-types';

// ─── Primitive types ──────────────────────────────────────────────────────────
export type MainModeProps = {
  mode?: 'default';
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  isPrimaryLoading?: boolean;
  isSecondaryLoading?: boolean;
};

export type FormModeProps = {
  mode: 'form';
  title: string;
  subtitle?: string;
  onBack?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  showSecondaryButton?: boolean;
  primaryButtonProps?: React.ComponentProps<'button'>;
  secondaryButtonProps?: React.ComponentProps<'button'>;
  isPrimaryLoading?: boolean;
  isSecondaryLoading?: boolean;
};

export type SidebarSide = ComponentProps<typeof Sidebar>['side'];

export type SubNavItem = {
  title: string;
  href: string;
  permissions?: AppPermissions[];
};

// ─── Component prop types ─────────────────────────────────────────────────────

export type CustomSidebarProps = {
  side?: SidebarSide;
};

export type NavItemProps = {
  to: string;
  icon: string;
  children: React.ReactNode;
  end?: boolean;
};

export type ExpandableNavItemProps = {
  title: string;
  icon: string;
  items: readonly SubNavItem[];
  isOpen: boolean;
  onToggle: () => void;
};
