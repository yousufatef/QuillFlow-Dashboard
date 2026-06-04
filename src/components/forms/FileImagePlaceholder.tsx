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
        'flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted',
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
        <ImageIcon className='size-5 text-muted-foreground' />
      )}
    </div>
  );
}

export default FileImagePlaceholder;
