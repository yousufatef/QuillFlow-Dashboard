import MainHeader from "@/components/layout/MainHeader";
import AdminTable from "./table/admin-table";
import { useNavigate } from "react-router-dom";

const Admins = () => {
    const navigate = useNavigate();
    return (
        <section className='flex w-full flex-col gap-6'>
            <MainHeader
                title="Admin Users"
                primaryLabel="Add New"
                onPrimaryClick={() => navigate('/settings/admins/add')}
            />
            <AdminTable />
        </section>
    )
}

export default Admins