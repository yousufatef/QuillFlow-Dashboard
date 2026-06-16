import { memo, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { getBlogMenuItems } from '@/constants/blogs.constants';
import type { ActionType, BlogCardProps } from '@/types/blog.types';
import { useNavigate } from 'react-router-dom';
import DeleteBlogDialog from './dialogs/DeleteBlogDialog';
import PublishBlogDialog from './dialogs/PublishBlogDialog';
import { useTranslation } from 'react-i18next';
import MoreActions from '@/components/shared/customs/MoreActions';

interface ActionsDropDownProps {
  blog: BlogCardProps;
}

const ActionsDropDown = memo(({ blog }: ActionsDropDownProps) => {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === "en"
  const navigate = useNavigate()
  console.log('🚀 ~ blog:', blog);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ActionType | null>(null);

  const openDialog = (content: ActionType) => {
    setDialogContent(content);
    setIsOpen(true);
  };
  return (
    <>
      <MoreActions
        className='bg-white'
        actions={getBlogMenuItems(blog?.isPublished ?? false).map(
          ({ action, icon, labelAr, labelEn, className }) => ({
            text: isEnglish ? labelEn : labelAr,
            icon: <BlogIcons name={icon} />,
            className,
            onClick: () => {
              action === 'edit'
                ? navigate(`edit/${blog?.id}`)
                : openDialog(action);
            },
          })
        )}
      />

      {/* Dialog Content  */}
      < Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {(dialogContent === 'publish' || dialogContent === 'draft') && (
          <PublishBlogDialog isOpen={isOpen} setIsOpen={setIsOpen} blog={blog} />
        )}


        {dialogContent === 'delete' && (
          <DeleteBlogDialog isOpen={isOpen} setIsOpen={setIsOpen} blog={blog} />
        )}
      </Dialog >
    </>
  );
});

ActionsDropDown.displayName = 'ActionsDropDown';

export default ActionsDropDown;


