export const formFieldStyles = {
  root: 'grid w-full gap-2',
  label: 'gap-1 type-body-sm text-neutral-900',
  required: 'ms-0.5 text-destructive',
  control:
    'h-auto w-full rounded-[4px] border border-[#BFC1C0] bg-background p-4 text-start text-sm text-foreground opacity-100 shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  textarea:
    'min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-start text-sm text-foreground shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  selectTrigger:
    'h-12! w-full rounded-md border border-input bg-background px-3 text-start text-sm text-foreground shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground',
  checkboxRow: 'flex items-center gap-2',
  checkbox:
    'mt-0.5 size-4 rounded-[4px] border-input shadow-xs focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  helper: 'text-start text-xs leading-5 text-muted-foreground',
  error: 'text-start text-xs font-medium leading-5 text-destructive',
};
