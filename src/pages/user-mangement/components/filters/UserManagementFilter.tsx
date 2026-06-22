import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

type UserManagementFilterProps = {
  className?: string;
  triggerVariant?: 'default' | 'compact';
};

const triggerStyles: Record<NonNullable<UserManagementFilterProps['triggerVariant']>, string> = {
  default:
    'min-h-12 rounded-[4px] border-neutral-50 bg-white px-4 py-2 text-base leading-[21px] font-normal text-neutral-900 shadow-[0px_4px_20px_0px_#0018A312] hover:bg-neutral-50',
  compact:
    'min-h-12 rounded-[4px] border-neutral-50 bg-white px-4 py-2 text-base leading-[21px] font-normal text-neutral-900 shadow-[0px_4px_20px_0px_#0018A312] hover:bg-neutral-50',
};

const accountStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
];

const kycStatusOptions = [
  { value: 'approved', label: 'Verified' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'none', label: 'Not Submitted' },
];

const joiningDateOptions = [
  { value: '7', label: 'Last 7 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
];

const UserManagementFilter = ({
  className,
  triggerVariant = 'default',
}: UserManagementFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const appliedAccountStatuses = searchParams.getAll('accountStatus');
  const appliedKycStatuses = searchParams.getAll('kycStatus');
  const appliedJoiningDate = searchParams.get('joiningDate') ?? '';

  const [draftAccountStatuses, setDraftAccountStatuses] = useState<string[]>(appliedAccountStatuses);
  const [draftKycStatuses, setDraftKycStatuses] = useState<string[]>(appliedKycStatuses);
  const [draftJoiningDate, setDraftJoiningDate] = useState(appliedJoiningDate);

  const selectedFiltersCount = useMemo(
    () => appliedAccountStatuses.length + appliedKycStatuses.length + (appliedJoiningDate ? 1 : 0),
    [appliedAccountStatuses.length, appliedKycStatuses.length, appliedJoiningDate],
  );
  const hasFilters = selectedFiltersCount > 0;

  const chipLabel = useMemo(() => {
    if (!hasFilters) return 'Filter';

    if (selectedFiltersCount === 1) {
      const statusLabel =
        accountStatusOptions.find((option) => option.value === appliedAccountStatuses[0])?.label ??
        kycStatusOptions.find((option) => option.value === appliedKycStatuses[0])?.label ??
        joiningDateOptions.find((option) => option.value === appliedJoiningDate)?.label;
      return statusLabel ?? '1 filter';
    }

    return `${selectedFiltersCount} filters`;
  }, [appliedAccountStatuses, appliedJoiningDate, appliedKycStatuses, hasFilters, selectedFiltersCount]);

  const toggleValue = (values: string[], value: string) =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  const handleToggleAccountStatus = (value: string) => {
    setDraftAccountStatuses((prev) => toggleValue(prev, value));
  };

  const handleToggleKycStatus = (value: string) => {
    setDraftKycStatuses((prev) => toggleValue(prev, value));
  };

  const syncDraftFromApplied = () => {
    setDraftAccountStatuses(appliedAccountStatuses);
    setDraftKycStatuses(appliedKycStatuses);
    setDraftJoiningDate(appliedJoiningDate);
  };

  const applyFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('accountStatus');
    next.delete('kycStatus');
    next.delete('joiningDate');

    draftAccountStatuses.forEach((value) => next.append('accountStatus', value));
    draftKycStatuses.forEach((value) => next.append('kycStatus', value));
    if (draftJoiningDate) next.set('joiningDate', draftJoiningDate);

    next.set('pageNumber', '1');
    setSearchParams(next);
    setOpen(false);
  };

  const resetDraft = () => {
    setDraftAccountStatuses([]);
    setDraftKycStatuses([]);
    setDraftJoiningDate('');
  };

  const clearAppliedFilters = (e?: MouseEvent) => {
    e?.stopPropagation();
    const next = new URLSearchParams(searchParams);
    next.delete('accountStatus');
    next.delete('kycStatus');
    next.delete('joiningDate');
    next.set('pageNumber', '1');
    setSearchParams(next);
    setDraftAccountStatuses([]);
    setDraftKycStatuses([]);
    setDraftJoiningDate('');
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) syncDraftFromApplied();
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className={cn(
            'items-center justify-center',
            triggerStyles[triggerVariant],
            className,
          )}
        >
          <span className='relative inline-flex'>
            <BlogIcons name='filter' />
            {hasFilters ? (
              <span className='absolute top-0 -left-0.5 size-1.5 rounded-full bg-error-500' />
            ) : null}
          </span>

          <span className='type-body-md text-neutral-900'>{chipLabel}</span>

          {hasFilters ? (
            <span
              role='button'
              aria-label='Clear filters'
              className='inline-flex items-center'
              onClick={clearAppliedFilters}
            >
              <X className='size-5 text-neutral-900' />
            </span>
          ) : (
            <ChevronDown className='size-5 text-neutral-900' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='w-[321px] gap-2 rounded-[4px] border border-neutral-50 bg-white p-2 shadow-[0px_4px_20px_0px_#0018A312]'
      >
        <div className='border-b border-[#EAEBEB99] px-2 py-1 opacity-90'>
          <h3 className='text-base leading-6 font-bold text-neutral-900'>Filter</h3>
        </div>

        <div className='space-y-0'>
          <div className='pt-0.5'>
            <p className='mb-1 text-sm leading-[21px] font-normal text-neutral-400'>Account Status</p>
            <div className='flex flex-col'>
              {accountStatusOptions.map((option) => (
                <label
                  key={option.value}
                  className='flex cursor-pointer items-center gap-2 py-2'
                >
                  <Checkbox
                    checked={draftAccountStatuses.includes(option.value)}
                    onCheckedChange={() => handleToggleAccountStatus(option.value)}
                    className='size-4 rounded-[4px] border-neutral-100 bg-white data-checked:bg-primary-500 data-checked:text-white'
                  />
                  <span className='text-sm leading-[21px] font-normal text-neutral-900'>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='h-px w-full bg-[#EAEBEB99]' />

          <div className='pt-0.5'>
            <p className='mb-1 text-sm leading-[21px] font-normal text-neutral-400'>KYC Status</p>
            <div className='flex flex-col'>
              {kycStatusOptions.map((option) => (
                <label
                  key={option.value}
                  className='flex cursor-pointer items-center gap-2 py-2'
                >
                  <Checkbox
                    checked={draftKycStatuses.includes(option.value)}
                    onCheckedChange={() => handleToggleKycStatus(option.value)}
                    className='size-4 rounded-[4px] border-neutral-100 bg-white data-checked:bg-primary-500 data-checked:text-white'
                  />
                  <span className='text-sm leading-[21px] font-normal text-neutral-900'>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='h-px w-full bg-[#EAEBEB99]' />

          <div className='pt-0.5'>
            <p className='mb-1 text-sm leading-[21px] font-normal text-neutral-400'>Joining Date</p>
            <RadioGroup
              value={draftJoiningDate}
              onValueChange={setDraftJoiningDate}
              className='gap-0'
            >
              {joiningDateOptions.map((option) => (
                <label
                  key={option.value}
                  className='flex cursor-pointer items-center gap-2 py-2'
                >
                  <RadioGroupItem
                    value={option.value}
                    className='size-4 border-neutral-100 bg-white data-checked:border-primary-500 data-checked:bg-primary-500 data-checked:text-white [&_[data-slot=radio-group-indicator]>span]:bg-white'
                  />
                  <span className='text-sm leading-[21px] font-normal text-neutral-900'>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className='mt-0.5 flex items-center justify-end gap-4'>
          {(draftAccountStatuses.length > 0 || draftKycStatuses.length > 0 || draftJoiningDate) ? (
            <Button
              type='button'
              variant='ghost'
              className='h-10 px-0 text-base leading-[21px] font-normal text-primary-500 underline hover:bg-transparent hover:text-primary-600'
              onClick={resetDraft}
            >
              Reset
            </Button>
          ) : null}
          <Button
            type='button'
            className='h-10 rounded-[4px] bg-primary-500 px-4 text-base leading-[21px] font-normal text-primary-50 shadow-[0px_4px_10px_0px_#0D3B2E12] hover:bg-primary-600'
            onClick={applyFilters}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserManagementFilter;
