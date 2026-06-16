import { useEffect, useMemo } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileImagePlaceholderProps = {
  file: File;
  className?: string;
};

function FileImagePlaceholder({ file, className }: FileImagePlaceholderProps) {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div
      className={cn(
        'bg-muted flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border',
        className,
      )}
    >
      {previewUrl ? (
        <img
          alt={file.name}
          className='size-full object-cover'
          src={previewUrl}
        />
      ) : (
        <ImageIcon className='text-muted-foreground size-5' />
      )}
    </div>
  );
}

export default FileImagePlaceholder;
