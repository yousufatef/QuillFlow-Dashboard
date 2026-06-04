import { Check } from "lucide-react";
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

interface Props {
    fullName?: string;
    email?: string;
    phone?: string;
    role?: string;
}

export default function RoleSummary({
    fullName,
    email,
    phone,
    role,
}: Props) {
    const roleData =
        role && role in ADMIN_ROLES
            ? ADMIN_ROLES[role as keyof typeof ADMIN_ROLES]
            : null;

    return (
        <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-5 type-heading-sm">
                Role Summary
            </h2>

            <div className="space-y-2 text-muted-foreground">
                <p>Name: {fullName || "N/A"}</p>
                <p>Mail: {email || "N/A"}</p>
                <p>Phone: {phone || "N/A"}</p>
            </div>

            <div className="my-5 border-t" />

            <h3 className="mb-4 type-heading-sm">
                Admin will be able to
            </h3>

            {roleData ? (
                <>
                    <p className="mb-3 text-neutral-400 type-body-md">
                        Role: {roleData.label}
                    </p>

                    <ul className="space-y-3">
                        {roleData.permissions.map((permission) => (
                            <li
                                key={permission}
                                className="flex items-center gap-2 text-neutral-400 type-body-md"
                            >
                                <Check className="size-4 text-primary" />
                                {permission}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="text-muted-foreground">
                    Select role to preview permissions
                </p>
            )}
        </div>
    );
}