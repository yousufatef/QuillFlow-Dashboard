import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { Admin } from "@/types/admin-types";
import { Link } from "react-router-dom";
import { useDeleteAdmin } from '@/hooks/admins/useDeleteAdmin';
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ActionButton = ({
    admin,
}: {
    admin?: Admin;
}) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { deleteAdmin, isLoading } = useDeleteAdmin();
    // const { adminData } = useAdmin(admin?.id ?? '');
    const isEnglish = true;
    async function handleDelete() {
        await deleteAdmin(admin?.id ?? '');
        setIsDeleteOpen(false);
    }

    return (
        <>
            {/* Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-label='Open row actions' size='icon-sm' variant='ghost'>
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-36'>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to={`/settings/admins/edit/${admin?.id}`} className="w-full">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem variant='destructive' onClick={() => setIsDeleteOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete DIALOG */}
            <Dialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            >
                <DialogContent className='sm:max-w-115.25 sm:max-h-41 gap-2'>
                    <DialogHeader className='type-heading-sm text-neutral-900'>
                        <DialogTitle>
                            {isEnglish ? 'Delete Admin' : 'حذف الادمن'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className='text-neutral-400 type-body-md'>
                        {isEnglish ? (
                            <p className='text-secondary-400'>
                                Are you sure you want to delete this{' '}
                                <span className='text-primary-500'>Admin</span> from
                                Admins List?
                            </p>
                        ) : (
                            <p className='text-secondary-400'>
                                هل انت متأكد من مسح{' '}
                                <span className='text-primary-500'>الادمن</span> من قائمة الادمن ؟
                            </p>
                        )}
                    </div>

                    <div className='flex justify-end gap-3'>
                        <Button
                            className="type-body-md min-h-10 min-w-20.5 border-primary-500 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            variant='outline'
                            onClick={() => setIsDeleteOpen(false)}
                        >
                            {isEnglish ? 'Cancel' : 'إلغاء'}
                        </Button>

                        <Button
                            variant='destructive'
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="bg-error-500 text-white type-body-md min-h-10 min-w-19.25 hover:bg-error-600 focus:ring-2 focus:ring-error-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isLoading
                                ? isEnglish
                                    ? 'Deleting...'
                                    : 'جاري الحذف...'
                                : isEnglish
                                    ? 'Delete'
                                    : 'حذف'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default ActionButton;
