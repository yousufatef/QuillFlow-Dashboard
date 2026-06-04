import type { CustomTableColumn } from "@/components/shared/customs/CustomTable";
import type { Admin } from "@/types/admin-types";
import ActionButton from "../components/Actions";
const getInitials = (name: string) => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.at(0)?.toUpperCase())
        .join('');
}

export const columns: CustomTableColumn<Admin>[] = [
    {
        key: 'admin',
        header: 'admin',
        cell: (admin) => (
            <div className='flex items-center gap-2'>
                <div className='flex size-10 shrink-0 items-center justify-center'>
                    <span className='flex size-8 items-center justify-center rounded-full bg-primary-500 text-sm font-medium text-primary-50 shadow-[0_4px_10px_rgba(13,59,46,0.07)]'>
                        {getInitials(admin.name)}
                    </span>
                </div>
                <div className="grid gap-0.5">
                    <span className='font-medium'>{admin.name}</span>
                    <span className='text-xs text-muted-foreground'>{admin.role}</span>
                </div>
            </div>
        ),
    },
    {
        key: 'phone',
        header: 'Phone',
        cell: (admin) => (
            <p>{admin.phone}</p>
        ),
    },
    {
        key: 'email',
        header: 'Email',
        cell: (admin) => (
            <p>{admin.email}</p>
        ),
    },
    {
        key: 'createdAt',
        header: 'Created At',
        cell: (admin) => (
            <p>{admin.createdAt}</p>
        ),
    },
    {
        key: 'actions',
        header: '',
        headerClassName: 'w-12 text-right',
        className: 'w-12 text-right',
        cell: (admin) => (
            <ActionButton admin={admin} />
        ),
    },
];