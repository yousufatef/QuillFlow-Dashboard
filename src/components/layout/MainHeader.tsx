import { Button } from "@/components/ui/button";

interface MainHeaderProps {
    title: string;
    subtitle?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    showPrimaryButton?: boolean;
    showSecondaryButton?: boolean;
    isPrimaryLoading?: boolean;
}

export default function MainHeader({
    title,
    subtitle,
    primaryLabel = "Add New",
    secondaryLabel = "Export",
    onPrimaryClick,
    onSecondaryClick,
    showPrimaryButton = true,
    showSecondaryButton = false,
    isPrimaryLoading = false,
}: MainHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-neutral-50 pb-6">
            <div>
                <h1 className="type-heading-sm">{title}</h1>

                {subtitle && (
                    <p className="mt-2 text-neutral-400 type-body-md">
                        {subtitle}
                    </p>
                )}
            </div>

            {(showPrimaryButton || showSecondaryButton) && (
                <div className="flex items-center gap-3 flex-wrap">
                    {showSecondaryButton && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onSecondaryClick}
                            className="type-body-md min-h-10 min-w-31 border-primary-500 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {secondaryLabel}
                        </Button>
                    )}

                    {showPrimaryButton && (
                        <Button
                            type="button"
                            onClick={onPrimaryClick}
                            disabled={isPrimaryLoading}
                            className="type-body-md min-h-10 min-w-31 bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {primaryLabel}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
// Usage example:
{/* <MainHeader
    title="Audit Logs"
    subtitle="View system activity."
    primaryLabel="Add New"
    onPrimaryClick={() => console.log('Add new')}
    showSecondaryButton
    secondaryLabel="Export"
    onSecondaryClick={() => console.log('Export')}
/> */}