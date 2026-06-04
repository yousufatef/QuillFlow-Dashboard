import * as React from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';
import FieldLayout from '@/components/forms/FieldLayout';
import FieldMessage from '@/components/forms/FieldMessage';
import { formFieldStyles } from '@/components/forms/form-field.styles';
import type { FieldBaseProps } from '@/components/forms/field.types';
import type { FieldValues } from 'react-hook-form';
import BlogIcons from '../icons/blog-icons/BlogIcons';

type CustomImageUploaderProps<TFieldValues extends FieldValues = FieldValues> =
  FieldBaseProps<TFieldValues> & {
    disabled?: boolean;
    maxSizeMB?: number;
    acceptedTypes?: string[];
  };

const defaultAcceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFriendlyType = (type: string) => {
  if (type.endsWith('/*')) return type.replace('/*', '').toUpperCase();
  if (type.startsWith('.')) return type.slice(1).toUpperCase();

  return type.split('/')[1]?.toUpperCase() ?? type;
};

const getFriendlyTypes = (types: string[]) =>
  [...new Set(types.map(getFriendlyType))].join(' or ');

const getFileExtension = (file: File) =>
  `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;

const isAcceptedFile = (file: File, acceptedTypes: string[]) => {
  if (!acceptedTypes.length) return true;

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.endsWith('/*')) {
      return file.type.startsWith(acceptedType.replace('*', ''));
    }

    if (acceptedType.startsWith('.')) {
      return getFileExtension(file) === acceptedType.toLowerCase();
    }

    return file.type === acceptedType;
  });
};

const getFileFromValue = (value: unknown) => {
  if (!value) return null;
  if (value instanceof File) return value;

  return null;
};

function CustomImageUploader<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  optional,
  subLabel,
  wrapperClassName,
  labelClassName,
  disabled = false,
  maxSizeMB = 1,
  acceptedTypes = defaultAcceptedTypes,
}: CustomImageUploaderProps<TFieldValues>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const acceptAttr = acceptedTypes.length ? acceptedTypes.join(',') : undefined;

  React.useEffect(() => {
    const preventFileNavigation = (event: DragEvent) => {
      if (!event.dataTransfer?.types.includes('Files')) return;

      event.preventDefault();
    };

    window.addEventListener('dragover', preventFileNavigation);
    window.addEventListener('drop', preventFileNavigation);

    return () => {
      window.removeEventListener('dragover', preventFileNavigation);
      window.removeEventListener('drop', preventFileNavigation);
    };
  }, []);

  return (
    <FieldLayout
      className={cn(formFieldStyles.root, wrapperClassName)}
      control={control}
      hint={helperText}
      label={label}
      labelClassName={labelClassName}
      name={name}
      optional={optional}
      required={required}
      subLabel={subLabel}
    >
      {(field, fieldState) => {
        const file = getFileFromValue(field.value);
        const isDisabled = disabled || field.disabled;

        // Update preview URL when file changes
        React.useEffect(() => {
          if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url);
          } else {
            setPreviewUrl(null);
          }
        }, [file]);

        const validateAndSet = (incomingFiles: FileList | null) => {
          setUploadError('');

          if (!incomingFiles?.length) return;

          const selectedFile = incomingFiles[0];

          if (!isAcceptedFile(selectedFile, acceptedTypes)) {
            const errorMsg = `Invalid type. Allowed: ${getFriendlyTypes(acceptedTypes)}`;
            toast({
              description: errorMsg,
              title: 'File not accepted',
              variant: 'destructive',
            });
            setUploadError(errorMsg);
            return;
          }

          if (selectedFile.size > maxSizeBytes) {
            const errorMsg = `File too large. Max size is ${maxSizeMB}MB.`;
            toast({
              description: errorMsg,
              title: 'File not accepted',
              variant: 'destructive',
            });
            setUploadError(errorMsg);
            return;
          }

          field.onChange(selectedFile);
        };

        const removeFile = () => {
          setUploadError('');
          field.onChange(null);
          if (inputRef.current) inputRef.current.value = '';
        };

        const handleClick = () => {
          if (!isDisabled && !file) inputRef.current?.click();
        };

        return (
          <div className='flex flex-col gap-2'>
            <div
              aria-disabled={isDisabled}
              aria-invalid={fieldState.invalid}
              aria-label='Upload image'
              className={cn(
                'flex items-center gap-4 rounded-[4px] border-2 border-dashed border-neutral-100  bg-background  p-2 transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
                dragOver && 'border-primary bg-primary/5',
                isDisabled &&
                  'pointer-events-none cursor-not-allowed opacity-50',
                !isDisabled && !file && 'cursor-pointer',
              )}
              onClick={handleClick}
              onDragEnter={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isDisabled) setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isDisabled) setDragOver(true);
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragOver(false);
                if (!isDisabled) validateAndSet(event.dataTransfer.files);
              }}
              onKeyDown={(event) => {
                if (
                  (event.key === 'Enter' || event.key === ' ') &&
                  !isDisabled &&
                  !file
                ) {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role='button'
              tabIndex={isDisabled ? -1 : 0}
            >
              {file && previewUrl ? (
                <>
                  {/* Image Preview Thumbnail */}
                  <div className='flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted'>
                    <img
                      alt={file.name}
                      className='size-full object-cover'
                      src={previewUrl}
                    />
                  </div>

                  {/* File Info */}
                  <div className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='type-body-sm-semibold text-neutral-900'>
                      {file.name}
                    </span>
                    <span className='type-body-sm text-neutral-400'>
                      {formatBytes(file.size)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    aria-label={`Remove ${file.name}`}
                    className='text-error-500 inline-flex size-10 shrink-0 items-center justify-center rounded-md  transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50'
                    disabled={isDisabled}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeFile();
                    }}
                    type='button'
                  >
                    <BlogIcons name='trush' />
                  </button>
                </>
              ) : (
                <>
                  {/* Empty State - Upload Icon */}
                  <span className='flex size-16 shrink-0 items-center justify-center rounded-[8px] bg-muted text-muted-foreground'>
                    <BlogIcons name='upload' />
                  </span>

                  {/* Empty State - Upload Text */}
                  <div className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='type-body-sm-semibold text-neutral-900'>
                      Drag and drop cover image here, or click to upload
                    </span>
                    <span className='type-body-sm text-neutral-400'>
                      Recommended: {getFriendlyTypes(acceptedTypes)} • Max{' '}
                      {maxSizeMB}MB
                    </span>
                  </div>
                </>
              )}

              <input
                accept={acceptAttr}
                className='hidden'
                disabled={isDisabled}
                multiple={false}
                onBlur={field.onBlur}
                onChange={(event) => validateAndSet(event.target.files)}
                ref={inputRef}
                type='file'
              />
            </div>

            {uploadError ? <FieldMessage error={uploadError} /> : null}
          </div>
        );
      }}
    </FieldLayout>
  );
}

export default CustomImageUploader;
