import MoreActions from '@/components/shared/customs/MoreActions';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { User } from '../../types/user.types';
import UserIcons from '@/components/shared/icons/users-management/UserIcons';
import UserActivitySheetContent from './view-activity/UserActivitySheetContent';
import ActionDialog from '@/components/shared/customs/ActionDialog';
import { CheckCircle } from 'lucide-react';

type UserActionsProps = {
  user: User;
};

const UserActions = ({ user }: UserActionsProps) => {
  const { t } = useTranslation();
  const [isReactivateDialogOpen, setIsReactivateDialogOpen] = useState(false);
  const [isForgetPasswordDialogOpen, setIsForgetPasswordDialogOpen] = useState(false);
  const [isOverviewSheetOpen, setIsOverviewSheetOpen] = useState(false);
  const [isSuspendSheetOpen, setIsSuspendSheetOpen] = useState(false);

  return (
    <>
      <MoreActions
        actions={[
          {
            onClick: () => setIsReactivateDialogOpen(true),
            text: t('users.actions.reactivateAccount'),
            variant: 'default',
            icon: <UserIcons name='reactivateAccount' />,
          },
          {
            onClick: () => setIsForgetPasswordDialogOpen(true),
            text: t('users.actions.forgetPassword'),
            variant: 'default',
            icon: <UserIcons name='forgetPassword' />,
          },
          {
            onClick: () => setIsOverviewSheetOpen(true),
            text: t('users.actions.viewActivityLog'),
            variant: 'default',
            icon: <UserIcons name='activityLog' />,
          },
          {
            onClick: () => setIsSuspendSheetOpen(true),
            text: t('users.actions.suspendAccount'),
            variant: 'default',
            icon: <UserIcons name='suspendAccount' />,
          },
        ]}
      />

      <ActionDialog
        open={isReactivateDialogOpen}
        title={t('users.actions.reactivateAccount')}
        description={t('users.actions.reactivateAccountDescription')}
        ActionText={t('users.actions.reactivateAccount')}
        onConfirm={() => { }}
        onCancel={() => setIsReactivateDialogOpen(false)}
        icon={<CheckCircle className='size-full' />}
      >
        {/* reactivate form */}
        <div></div>
      </ActionDialog>

      <Dialog
        open={isForgetPasswordDialogOpen}
        onOpenChange={setIsForgetPasswordDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('users.actions.forgetPassword')}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Sheet
        open={isOverviewSheetOpen}
        onOpenChange={setIsOverviewSheetOpen}
      >
        <SheetContent className='gap-0 p-0 data-[side=left]:sm:max-w-[471px] data-[side=right]:sm:max-w-[471px]'>
          <UserActivitySheetContent user={user} />
        </SheetContent>
      </Sheet>

      <Sheet
        open={isSuspendSheetOpen}
        onOpenChange={setIsSuspendSheetOpen}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t('users.actions.suspendAccount')}</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserActions;
