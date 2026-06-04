import { memo, useState } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Dialog } from '@/components/ui/dialog';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { BLOG_MENU_ITEMS } from '@/constants/blogs';
import type { ActionType, BlogCardProps } from '@/types/blog.types';

interface ActionsDropDownProps {
  blog?: BlogCardProps;
}

const ActionsDropDown = memo(({ blog }: ActionsDropDownProps) => {
  console.log('🚀 ~ blog:', blog);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ActionType | null>(null);
  const openDialog = (content: ActionType) => {
    setDialogContent(content);
    setIsOpen(true);
  };
  return (
    <>
      {/* Dialog Menu  */}
      <DropdownMenu>
        <DropdownMenuTrigger className='rounded p-1 bg-white border-none'>
          <MoreVertical size={20} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          {BLOG_MENU_ITEMS.map(({ action, icon, label, className }) => (
            <DropdownMenuItem key={action} onSelect={() => openDialog(action)}>
              <BlogIcons name={icon} />
              <span className={className}>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog Content  */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {dialogContent === 'publish' && <div>edit</div>}
        {dialogContent === 'edit' && <div>edit</div>}

        {dialogContent === 'delete' && <div>delete</div>}
      </Dialog>
    </>
  );
});

ActionsDropDown.displayName = 'ActionsDropDown';

export default ActionsDropDown;
