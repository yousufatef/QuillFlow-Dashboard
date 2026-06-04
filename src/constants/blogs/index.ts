import { BlogStatus, type ActionType } from "@/types/blog.types";

export interface StatusConfig {
    label: string;
    className: string;
}

export const STATUS_CONFIG: Record<BlogStatus, StatusConfig> = {
    [BlogStatus.DRAFT]: {
        label: "Draft",
        className:
            "bg-neutral-50 text-neutral-900 ",
    },
    [BlogStatus.PUBLISHED]: {
        label: "Published",
        className:
            "bg-success-50 text-success-500",
    },
};

export const STATUS_ITEMS = [
    { labelEn: "All categories", labelAr: "كل التصنيفات", value: "all" },
    { labelEn: "Published", labelAr: "منشور", value: "Published" },
    { labelEn: "Draft", labelAr: "مسودة", value: "Draft" },
];

export const BLOG_MENU_ITEMS: {
    action: ActionType;
    icon: string;
    label: string;
    className?: string;
}[] = [
        { action: 'publish', icon: 'publish', label: 'Publish' },
        { action: 'edit', icon: 'edit', label: 'Edit' },
        { action: 'delete', icon: 'trush', label: 'Remove', className: 'text-error-500' },
    ];