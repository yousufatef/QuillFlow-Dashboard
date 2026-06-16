import * as React from 'react';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import FieldLayout from './FieldLayout';
import { formFieldStyles } from './form-field.styles';
import type { FieldBaseProps } from './field.types';
import type { Direction } from '@/i18n/useDirection';
import type { FieldValues } from 'react-hook-form';

type CustomCalendarProps<TFieldValues extends FieldValues = FieldValues> =
  FieldBaseProps<TFieldValues> & {
    defaultValue?: Date;
    onValueChange?: (value: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    fromDate?: Date;
    toDate?: Date;
    triggerClassName?: string;
    contentClassName?: string;
    formatValue?: (date: Date) => string;
    dir?: Direction;
  };

const defaultFormatValue = (date: Date) => {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const toDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function CustomCalendar<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  optional,
  subLabel,
  wrapperClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
  defaultValue,
  onValueChange,
  placeholder = 'Pick a date',
  disabled,
  fromDate,
  toDate,
  formatValue = defaultFormatValue,
  dir,
}: CustomCalendarProps<TFieldValues>) {
  const generatedId = React.useId();
  const triggerId = generatedId;
  const [open, setOpen] = React.useState(false);

  return (
    <FieldLayout
      className={cn(formFieldStyles.root, wrapperClassName)}
      control={control}
      hint={helperText}
      htmlFor={triggerId}
      labelClassName={labelClassName}
      name={name}
      optional={optional}
      required={required}
      subLabel={subLabel}
      label={label}
    >
      {(field, fieldState) => {
        const fieldValue = field.value as unknown;
        const selectedDate = fieldValue instanceof Date ? fieldValue : defaultValue;
        const updateValue = (nextValue: Date | undefined) => {
          field.onChange(nextValue);
          onValueChange?.(nextValue);
        };

        return (
          <>
            {selectedDate ? (
              <input
                name={field.name}
                type='hidden'
                value={toDateInputValue(selectedDate)}
              />
            ) : null}

            <Popover
              onOpenChange={setOpen}
              open={open}
            >
              <PopoverTrigger asChild>
                <Button
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    formFieldStyles.selectTrigger,
                    'justify-between gap-2 px-3 font-normal',
                    !selectedDate && 'text-muted-foreground',
                    triggerClassName,
                  )}
                  disabled={disabled}
                  id={triggerId}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  type='button'
                  variant='outline'
                >
                  <span className='truncate'>
                    {selectedDate ? formatValue(selectedDate) : placeholder}
                  </span>
                  <span className='flex items-center gap-1'>
                    {selectedDate ? (
                      <span
                        className='text-muted-foreground hover:text-foreground inline-flex size-5 items-center justify-center rounded-sm'
                        onClick={(event) => {
                          event.stopPropagation();
                          updateValue(undefined);
                        }}
                        role='button'
                        tabIndex={-1}
                      >
                        <XIcon className='size-3.5' />
                      </span>
                    ) : null}
                    <CalendarIcon className='text-muted-foreground size-4' />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align='start'
                className={cn('w-auto p-0', contentClassName)}
                dir={dir}
              >
                <Calendar
                  captionLayout='dropdown'
                  dir={dir}
                  disabled={(date) => {
                    if (fromDate && date < fromDate) return true;
                    if (toDate && date > toDate) return true;
                    return false;
                  }}
                  mode='single'
                  onSelect={(date) => {
                    updateValue(date);
                    setOpen(false);
                  }}
                  selected={selectedDate}
                />
              </PopoverContent>
            </Popover>
          </>
        );
      }}
    </FieldLayout>
  );
}

export default CustomCalendar;
