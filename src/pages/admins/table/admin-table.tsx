import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import useTableSearchParam from '@/hooks/useTableSearchParam';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMemo } from "react";
import CustomSelectorFilter from "@/components/shared/customs/CustomFilter";
import { useSearchParams } from "react-router-dom";
import { columns } from "./admin-column";
import type { Admin } from "@/types/admin-types";

const AdminTable = () => {
    const { clearTableSearchParams } = useTableSearchParam();
    const [searchParams] = useSearchParams();
    const hasFilters = [...searchParams.keys()].length > 0;
    // const [searchParams, setSearchParams] = useSearchParams();
    // const clearFilters = () => {
    //   const params = new URLSearchParams(searchParams);
    //   params.delete("sort");
    //   params.delete("status");
    //   params.delete("role");
    //   params.delete("dateFrom");
    //   params.delete("dateTo");
    //   setSearchParams(params);
    // };

    const AdminList = [
        {
            id: '1',
            name: 'John Doe',
            phone: '123-456-7890',
            email: 'lHk1o@example.com',
            role: 'Admin',
            createdAt: '2023-01-01',
        },
        {
            id: '2',
            name: 'Jane Smith',
            phone: '987-654-3210',
            email: 'RwL2m@example.com',
            role: 'Admin',
            createdAt: '2023-02-15',
        },
        {
            id: '3',
            name: 'Alice Johnson',
            phone: '555-123-4567',
            email: 'lHk1o@example.com',
            role: 'Admin',
            createdAt: '2023-03-10',
        },
    ]

    const filteredAdmins = useMemo(
        () =>
            AdminList?.map((admin: Admin, index: number) => ({
                ...admin,
                rowNumber: index + 1,
            })) || [],
        [AdminList],
    );
    
    return (
        <div>
            <div className='flex flex-col gap-3 rounded-lg border bg-card p-3 shadow-xs justify-start md:flex-row md:items-center'>
                <CustomSearchBar
                    placeholder='Search for users by name, Id, email, phone number'
                    searchParamName='search'
                    wrapperClassName='md:max-w-sm shadow-[0px_4px_20px_0px_#0D3B2E12]'
                />
                <CustomSelectorFilter
                    fildName="sort"
                    placeholder={'Sort by: Name (A-Z)'}
                    label=""
                    items={[
                        { value: 'asc', label: 'Ascending', labelEn: 'Name (A-Z)', labelAr: 'الاسم (أ-ي)' },
                        { value: 'desc', label: 'Descending', labelEn: 'Name (Z-A)', labelAr: 'الاسم (ي-أ)' },
                    ]}
                    wrapperClassName="min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]"
                    variant="gray"
                />
                {
                    hasFilters && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="min-h-12 shrink-0"
                            onClick={() => clearTableSearchParams()}
                        >
                            <X />
                            Clear
                        </Button>
                    )
                }
            </div>

            <CustomTable
                columns={columns}
                data={filteredAdmins}
                emptyMessage='No admins match your filters.'
                getRowKey={(admin) => admin.id}
            />
        </div>
    )
}

export default AdminTable