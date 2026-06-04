import { useEffect, useMemo } from 'react';
import { PlayIcon, VideoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileVideoPlaceholderProps = {
  file: File;
  className?: string;
};

function FileVideoPlaceholder({ file, className }: FileVideoPlaceholderProps) {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div
      className={cn(
        'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted',
        className,
      )}
    >
      {previewUrl ? (
        <video
          aria-label={file.name}
          className='size-full object-cover'
          muted
          preload='metadata'
          src={previewUrl}
        />
      ) : (
        <VideoIcon className='size-5 text-muted-foreground' />
      )}
      <span className='absolute inset-0 grid place-items-center bg-black/20 text-white'>
        <PlayIcon className='size-4 fill-current' />
      </span>
    </div>
  );
}

export default FileVideoPlaceholder;
