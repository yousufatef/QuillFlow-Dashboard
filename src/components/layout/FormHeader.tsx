import { Button } from "@/components/ui/button";

interface FormHeaderProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    primaryLabel?: string;
    secondaryLabel?: string;
    onSecondaryClick?: () => void;
    showSecondaryButton?: boolean;
    primaryButtonProps?: React.ComponentProps<typeof Button>;
    secondaryButtonProps?: React.ComponentProps<typeof Button>;
}

export default function FormHeader({
    title,
    subtitle,
    onBack,
    primaryLabel = "Save",
    secondaryLabel = "Cancel",
    onSecondaryClick,
    showSecondaryButton = true,
    primaryButtonProps,
    secondaryButtonProps,
}: FormHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-neutral-50 pb-6">
            <div className="flex items-start gap-3">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-1 shrink-0 cursor-pointer"
                    >
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_152_2442)">
                                <path d="M13.125 16.25L6.875 10L13.125 3.75" stroke="#1A1D28" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_152_2442">
                                    <rect width={20} height={20} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                )}

                <div>
                    <h1 className="type-heading-sm">{title}</h1>

                    {subtitle && (
                        <p className="mt-2 text-neutral-400 type-body-md">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                {showSecondaryButton && (
                    <Button
                        variant="outline"
                        type="button"
                        onClick={onSecondaryClick}
                        {...secondaryButtonProps}
                        className="type-body-md min-h-10 min-w-31 border-primary-500 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {secondaryLabel}
                    </Button>
                )}

                <Button
                    type="submit"
                    className="bg-primary-500 text-white type-body-md min-h-10 min-w-31"
                    {...primaryButtonProps}
                >
                    {primaryLabel}
                </Button>
            </div>
        </div>
    );
}
// Usage example:
{/* <FormHeader
    title="Blog Details"
    subtitle="Edit blog content and preview how it will appear in the QuillFlow app."
    onBack={() => navigate(-1)}
    primaryLabel="Publish"
    secondaryLabel="Save as Draft"
    onSecondaryClick={() => console.log('Save as draft')}
/> */}