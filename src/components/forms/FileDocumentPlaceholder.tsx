import { FileTextIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileDocumentPlaceholderProps = {
  file: File;
  className?: string;
};

const getDocumentLabel = (file: File) => {
  const extension = file.name.split('.').pop()?.toUpperCase();

  if (extension) return extension;
  if (file.type === 'application/pdf') return 'PDF';

  return 'DOC';
};

function FileDocumentPlaceholder({
  file,
  className,
}: FileDocumentPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex size-12 shrink-0 flex-col items-center justify-center rounded-md border bg-muted text-muted-foreground',
        className,
      )}
    >
      <FileTextIcon className='size-5' />
      <span className='mt-0.5 max-w-10 truncate text-[10px] font-semibold leading-none'>
        {getDocumentLabel(file)}
      </span>
    </div>
  );
}

export default FileDocumentPlaceholder;
