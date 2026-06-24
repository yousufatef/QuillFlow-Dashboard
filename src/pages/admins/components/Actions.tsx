import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import type { Admin } from '@/pages/admins/types/admin.types';
import { Link } from 'react-router-dom';
import { useDeleteAdmin } from '@/pages/admins/hooks/useDeleteAdmin';
import { useState } from 'react';
import { SendLinkIcon } from '@/components/shared/icons/admins/SendLinkIcon';
import { EditIcon } from '@/components/shared/icons/admins/EditIcon';
import { DeleteIcon } from '@/components/shared/icons/admins/DeleteIcon';
import ConfirmDialog from '@/components/shared/customs/CustomConfirmDialog';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/i18n/useDirection';
const ActionButton = ({ admin }: { admin?: Admin }) => {
  const { t } = useTranslation();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deleteAdmin, isLoading } = useDeleteAdmin();
  // const { adminData } = useAdmin(admin?.id ?? '');
  const direction = useDirection();
  const isEnglish = direction === 'ltr';
  async function handleDelete() {
    await deleteAdmin(String(admin?.id ?? ''));
    setIsDeleteOpen(false);
  }

  return (
    <>
      {/* Dropdown */}
      <DropdownMenu dir={direction}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label='Open row actions'
            size='icon-sm'
            variant='ghost'
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-36'
        >
          <DropdownMenuItem>
            <SendLinkIcon />
            <Link
              to={`/settings/admins/resend-invite/${admin?.id}`}
              className='w-full'
            >
              {t('admin.buttons.resendLink')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EditIcon />
            <Link
              to={`/settings/admins/edit/${admin?.id}`}
              className='w-full'
            >
              {t('admin.buttons.edit')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant='destructive'
            onClick={() => setIsDeleteOpen(true)}
          >
            <DeleteIcon />
            {t('admin.buttons.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete DIALOG */}
      <ConfirmDialog
        open={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        title={isEnglish ? 'Delete Admin' : 'حذف الادمن'}
        description={
          isEnglish ? (
            <p className='text-secondary-400'>
              Are you sure you want to delete this Admin{' '}
              from Admins List?
            </p>
          ) : (
            <p className='text-secondary-400'>
              هل انت متأكد من مسح الادمن من قائمة الادمن ؟
            </p>
          )
        }
        confirmText={t('admin.buttons.delete')}
        cancelText={t('admin.buttons.cancel')}
        onConfirm={handleDelete}
        mode='destructive'
        loading={isLoading}
      />
    </>
  );
};

export default ActionButton;
