import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { adminSchema, type AdminFormValues } from "@/schemas/admin.schema";
import RoleSummary from "./RoleSummary";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import CustomInput, { CustomSelect } from "@/components/forms";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useParams } from 'react-router-dom';
import FormHeader from "@/components/layout/FormHeader";
import { useAdmin } from "@/hooks/admins/useGetAdmin";
import { useUpdateAdmin } from "@/hooks/admins/useUpdateAdmin";
import { useCreateAdmin } from "@/hooks/admins/useCreateAdmin";

const ADMIN_ROLES = {
    operations: {
        label: "Operations Admin",
        permissions: [
            "View and manage users",
            "Review KYC requests",
            "Manage CMS content",
        ],
    },
    support: {
        label: "Support Admin",
        permissions: [
            "View users",
            "Review tickets",
            "Manage support requests",
        ],
    },
    super_admin: {
        label: "Super Admin",
        permissions: [
            "Full system access",
            "Manage admins",
            "Manage CMS content",
            "Review KYC requests",
        ],
    },
} as const;
type NewAdminProps = {
    mode: 'add' | 'edit';
};
export default function NewAdmin({ mode = 'edit' }: NewAdminProps) {
    const navigate = useNavigate();
    const isEdit = mode === 'edit';
    const { adminId } = useParams<{ adminId: string }>();
    const { adminData } = useAdmin(adminId ?? '');
    const { updateAdmin } = useUpdateAdmin();
    const { createAdmin } = useCreateAdmin();
    console.log("adminData", adminData);
    const admin = {
        id: '1',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'lHk1o@example.com',
        role: 'operations',
        createdAt: '2023-01-01',
    }
    const adminSchema = z.object({
        name: z.string().min(3, "Full name is required"),
        email: z.email("Invalid email"),
        phone: z.string().min(8, "Invalid phone number"),
        role: z.string().min(1, "Role is required"),
    });
    type AdminFormValues = z.infer<typeof adminSchema>;
    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            name: admin?.name || "",
            email: admin?.email || "",
            phone: admin?.phone || "",
            role: admin?.role || "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const values = useWatch({
        control: form.control,
    });

    const onSubmit = (data: any) => {
        if (isEdit) {
            // Call update API
            // console.log("Updating admin with data:", data);
            updateAdmin(adminId ?? '', data);

        } else {
            // Call create API
            // console.log("Creating admin with data:", data);
            createAdmin(data);
        }
        navigate(-1);
    };

    const watchAll = form.watch();
    const errors = form.formState.errors;
    useEffect(() => {
    }, [watchAll, errors]);


    return (
        <section className="flex w-full flex-col gap-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormHeader
                        title={isEdit ? "Edit Admin User" : "Add Admin User"}
                        subtitle="Create a new admin account and assign role-based access permissions."
                        onBack={() => navigate(-1)}
                        primaryLabel={isEdit ? "Update" : "Create"}
                        secondaryLabel="Cancel"
                        onSecondaryClick={() => navigate(-1)}
                    />
                    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                        {/* LEFT */}
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="mb-6 type-heading-sm">
                                Admin Information
                            </h2>

                            <div className="grid gap-6 md:grid-cols-2">
                                <CustomInput
                                    control={form.control}
                                    label='Name'
                                    name='name'
                                    placeholder='Ahmed Mohamed'
                                    required
                                />

                                <CustomInput
                                    control={form.control}
                                    label='Email Address'
                                    name='email'
                                    placeholder='mail@mail.com'
                                    required
                                />

                                <CustomInput
                                    control={form.control}
                                    label='Phone Number'
                                    name='phone'
                                    placeholder='01003369980'
                                    required
                                />

                                <CustomSelect
                                    control={form.control}
                                    label='Role'
                                    name='role'
                                    placeholder='Select admin role'
                                    required
                                    options={Object.entries(ADMIN_ROLES).map(
                                        ([value, role]) => ({
                                            value,
                                            label: role.label,
                                        }),
                                    )}
                                />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <RoleSummary
                            fullName={values.name}
                            email={values.email}
                            phone={values.phone}
                            role={values.role}
                        />
                    </div>
                </form>
            </Form>
        </section>
    );
}