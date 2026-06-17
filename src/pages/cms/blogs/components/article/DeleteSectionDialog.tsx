import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';

type DeleteSectionDialogProps = {
  sectionLabel: string;
  hasContent: boolean;
  disabled?: boolean;
  onConfirm: () => void;
};

function DeleteSectionDialog({
  sectionLabel,
  hasContent,
  disabled = false,
  onConfirm,
}: DeleteSectionDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (hasContent) {
      setOpen(true);
    } else {
      onConfirm();
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          disabled={disabled}
          onClick={handleDelete}
          aria-label={`Delete ${sectionLabel}`}
          className='text-muted-foreground hover:text-destructive disabled:opacity-30'
        >
          <BlogIcons name='trush' />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {sectionLabel}?</AlertDialogTitle>
          <AlertDialogDescription>
            This section has content that will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSectionDialog;
