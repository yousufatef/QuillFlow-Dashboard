import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import FieldLayout from './FieldLayout';
import { formFieldStyles } from './form-field.styles';
import type { FieldBaseProps } from './field.types';
import type { FieldValues } from 'react-hook-form';

export type CustomSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type CustomSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Select>,
  'name'
> &
  FieldBaseProps<TFieldValues> & {
    options: CustomSelectOption[];
    placeholder?: string;
    triggerClassName?: string;
    contentClassName?: string;
  };

function CustomSelect<TFieldValues extends FieldValues = FieldValues>({
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
  placeholder,
  options,
  onValueChange,
  ...props
}: CustomSelectProps<TFieldValues>) {
  const generatedId = React.useId();
  const triggerId = generatedId;

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
      {(field, fieldState) => (
        <Select
          {...props}
          name={field.name}
          onValueChange={(value) => {
            field.onChange(value);
            onValueChange?.(value);
          }}
          required={required}
          value={field.value ?? ''}
        >
          <SelectTrigger
            aria-invalid={fieldState.invalid}
            className={cn(formFieldStyles.selectTrigger, triggerClassName)}
            id={triggerId}
            onBlur={field.onBlur}
            ref={field.ref}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={contentClassName}>
            {options.map((option) => (
              <SelectItem
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FieldLayout>
  );
}

export default CustomSelect;
