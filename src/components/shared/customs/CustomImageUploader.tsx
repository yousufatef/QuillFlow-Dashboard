import * as React from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';
import FieldLayout from '@/components/forms/FieldLayout';
import FieldMessage from '@/components/forms/FieldMessage';
import { formFieldStyles } from '@/components/forms/form-field.styles';
import type { FieldBaseProps } from '@/components/forms/field.types';
import type { FieldValues } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import BlogIcons from '../icons/blog-icons/BlogIcons';
import { useTranslation } from 'react-i18next';
import {
  ACCEPTED_IMAGE_FILE_TYPES,
  MAX_IMAGE_FILE_SIZE_BYTES,
  MAX_IMAGE_FILE_SIZE_MB,
} from '@/constants';
import {
  getImageFileSizeErrorMessage,
  getImageFileTypeErrorMessage,
  isAcceptedImageFile,
} from '@/utils/schemas';
import { getCurrLocale } from '@/utils/language';

type CustomImageUploaderProps<TFieldValues extends FieldValues = FieldValues> =
  FieldBaseProps<TFieldValues> & {
    disabled?: boolean;
    previewFieldName?: string; // Name of the field containing preview URL (e.g., 'coverPreview')
  };

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFriendlyType = (type: string) => {
  if (type === 'image/jpeg') return 'JPG';
  if (type.endsWith('/*')) return type.replace('/*', '').toUpperCase();
  if (type.startsWith('.')) return type.slice(1).toUpperCase();

  return type.split('/')[1]?.toUpperCase() ?? type;
};

const getFriendlyTypes = (types: string[]) => [...new Set(types.map(getFriendlyType))].join(', ');

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
  previewFieldName,
}: CustomImageUploaderProps<TFieldValues>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const acceptedTypes = [...ACCEPTED_IMAGE_FILE_TYPES];
  const acceptAttr = acceptedTypes.join(',');
  const { t } = useTranslation();
  const isAr = getCurrLocale() === 'ar';

  // Watch for preview field value (for edit mode with existing images)
  const existingPreviewUrl = useWatch({
    control,
    name: previewFieldName as any
  }) as string | null | undefined;

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
          } else if (existingPreviewUrl) {
            // Use existing preview URL from edit mode
            setPreviewUrl(existingPreviewUrl);
          } else {
            setPreviewUrl(null);
          }
        }, [file, existingPreviewUrl]);

        const validateAndSet = (incomingFiles: FileList | null) => {
          setUploadError('');

          if (!incomingFiles?.length) return;

          const selectedFile = incomingFiles[0];

          if (!isAcceptedImageFile(selectedFile)) {
            const errorMsg = getImageFileTypeErrorMessage();
            toast({
              description: errorMsg,
              title: isAr ? 'لم يتم قبول الملف' : 'File not accepted',
              variant: 'destructive',
            });
            setUploadError(errorMsg);
            return;
          }

          if (selectedFile.size > MAX_IMAGE_FILE_SIZE_BYTES) {
            const errorMsg = getImageFileSizeErrorMessage();
            toast({
              description: errorMsg,
              title: isAr ? 'لم يتم قبول الملف' : 'File not accepted',
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
                'bg-background focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex items-center gap-4 rounded-[4px] border-2 border-dashed border-neutral-100 p-2 transition-colors focus-visible:ring-3 focus-visible:outline-none aria-invalid:ring-3',
                dragOver && 'border-primary bg-primary/5',
                isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
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
                if ((event.key === 'Enter' || event.key === ' ') && !isDisabled && !file) {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role='button'
              tabIndex={isDisabled ? -1 : 0}
            >
              {(file || previewUrl) ? (
                <>
                  {/* Image Preview Thumbnail */}
                  <div className='bg-muted flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border'>
                    <img
                      alt={file?.name ?? 'Cover image'}
                      className='size-full object-cover'
                      src={previewUrl ?? ''}
                    />
                  </div>

                  {/* File Info */}
                  <div className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='type-body-sm-semibold text-neutral-900'>
                      {file?.name ?? (isAr ? 'صورة موجودة' : 'Existing image')}
                    </span>
                    {file && (
                      <span className='type-body-sm text-neutral-400'>{formatBytes(file.size)}</span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    aria-label={`Remove ${file?.name ?? 'image'}`}
                    className='text-error-500 hover:bg-destructive/10 inline-flex size-10 shrink-0 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50'
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
                  <span className='bg-muted text-muted-foreground flex size-16 shrink-0 items-center justify-center rounded-[8px]'>
                    <BlogIcons name='upload' />
                  </span>

                  {/* Empty State - Upload Text */}
                  <div className='flex min-w-0 flex-1 flex-col gap-1'>
                    <span className='type-body-sm-semibold text-neutral-900'>
                      {t("forms.labels.blog_cover_image")}
                    </span>
                    <span className='type-body-sm text-neutral-400'>
                      {getFriendlyTypes(acceptedTypes)} • {t('forms.labels.max_size')}{' '}
                      {MAX_IMAGE_FILE_SIZE_MB}MB
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
