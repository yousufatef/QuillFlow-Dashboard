import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InputTrimmer, trimStringValues } from '@/utils/api';
import FieldLayout from './FieldLayout';
import { formFieldStyles } from './form-field.styles';
import type { FieldBaseProps } from './field.types';
import type { FieldValues } from 'react-hook-form';

export type CustomInputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Input>,
  'name'
> &
  FieldBaseProps<TFieldValues> & {
    inputClassName?: string;
    trimValue?: boolean;
  };

function CustomInput<TFieldValues extends FieldValues = FieldValues>({
  id,
  control,
  name,
  label,
  helperText,
  required,
  optional,
  subLabel,
  wrapperClassName,
  labelClassName,
  inputClassName,
  trimValue = true,
  className,
  onBlur,
  onChange,
  ...props
}: CustomInputProps<TFieldValues>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <FieldLayout
      className={cn(formFieldStyles.root, wrapperClassName)}
      control={control}
      hint={helperText}
      htmlFor={inputId}
      labelClassName={labelClassName}
      name={name}
      optional={optional}
      required={required}
      subLabel={subLabel}
      label={label}
    >
      {(field, fieldState) => (
        <Input
          aria-invalid={fieldState.invalid}
          className={cn(formFieldStyles.control, inputClassName, className)}
          id={inputId}
          required={required}
          {...props}
          {...field}
          onBlur={(event) => {
            if (trimValue && typeof event.currentTarget.value === 'string') {
              event.currentTarget.value = trimStringValues(
                InputTrimmer(event.currentTarget.value),
              ) as string;
            }

            field.onBlur();
            onBlur?.(event);
          }}
          onChange={(event) => {
            if (trimValue && typeof event.currentTarget.value === 'string') {
              event.currentTarget.value = InputTrimmer(event.currentTarget.value) as string;
            }

            field.onChange(event);
            onChange?.(event);
          }}
        />
      )}
    </FieldLayout>
  );
}

export default CustomInput;
