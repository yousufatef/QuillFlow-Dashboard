import * as React from 'react';
import { Search, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type CustomSearchFilter = Record<string, string | undefined>;

type CustomSearchBarProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onFilterChange?: (filter: CustomSearchFilter) => void;
  searchParamName?: string;
  debounceMs?: number;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
  showClearButton?: boolean;
};

function CustomSearchBar({
  value,
  defaultValue = '',
  onValueChange,
  onFilterChange,
  searchParamName = 'search',
  debounceMs = 400,
  placeholder = 'Search...',
  ariaLabel = 'Search',
  disabled,
  wrapperClassName,
  inputClassName,
  showClearButton = true,
}: CustomSearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const searchValue = value ?? internalValue;

  React.useEffect(() => {
    if (!onFilterChange) return;

    const timeoutId = window.setTimeout(() => {
      const trimmedValue = searchValue.trim();

      onFilterChange({
        [searchParamName]: trimmedValue || undefined,
      });
    }, debounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, onFilterChange, searchParamName, searchValue]);

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={cn('relative w-full', wrapperClassName)}>
      <Search className='pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        aria-label={ariaLabel}
        className={cn('pe-9 ps-9 min-h-12 pl-9! bg-white! rounded', inputClassName)}
        disabled={disabled}
        onChange={(event) => updateValue(event.target.value)}
        placeholder={placeholder}
        value={searchValue}
      />
      {showClearButton && searchValue ? (
        <Button
          aria-label='Clear search'
          className='absolute inset-e-1 top-1/2 size-7 -translate-y-1/2'
          disabled={disabled}
          onClick={() => updateValue('')}
          size='icon-sm'
          type='button'
          variant='ghost'
        >
          <XIcon />
        </Button>
      ) : null}
    </div>
  );
}

export default CustomSearchBar;
