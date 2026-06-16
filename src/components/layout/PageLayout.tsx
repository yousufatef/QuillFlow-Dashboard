import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import MainHeader from './header/MainHeader';
import FormHeader from './header/FormHeader';
import type { FormModeProps, MainModeProps } from '@/types/layout.types';
import DiscardChanges from '../shared/customs/DiscardChanges';

type PageLayoutProps = (MainModeProps | FormModeProps) & {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const PageLayout = ({ children, className, wrapperClassName, ...props }: PageLayoutProps) => {
  return (
    <section className={cn('flex h-full w-full flex-col', wrapperClassName)}>
      {props.mode === 'form' ? (
        <>
          <FormHeader {...props} />
          <DiscardChanges />
        </>
      ) : (
        <MainHeader {...props} />
      )}

      <div
        className={cn('flex w-full flex-1 flex-col gap-4 overflow-y-auto px-4 md:px-6', className)}
      >
        {children}
      </div>
    </section>
  );
};

export default PageLayout;
