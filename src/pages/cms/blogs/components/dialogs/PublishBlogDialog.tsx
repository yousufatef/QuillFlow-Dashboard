import ConfirmDialog from "@/components/shared/customs/CustomConfirmDialog"
import { useToggleBlogStatus } from "@/pages/cms/blogs/hooks/useToggleBlogStatus"
import type { BlogCardProps } from "@/pages/cms/blogs/types/blog.types"
import { useTranslation } from "react-i18next"

type PublishBlogDialogProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    blog: BlogCardProps
}

const PublishBlogDialog = ({ isOpen, setIsOpen, blog }: PublishBlogDialogProps) => {
    const isPublished = blog.isPublished
    const { t } = useTranslation()
    const { toggleStatus, isLoading } = useToggleBlogStatus()

    const handleToggle = async () => {
        await toggleStatus(blog.id)
        setIsOpen(false)
    }
    return (
        <ConfirmDialog
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            title={isPublished ? t('pages.blogs.unpublish_blog') : t('pages.blogs.publish_blog')}
            description={
                <p className='text-secondary-400'>
                    {isPublished ? t('pages.blogs.unpublish_blog_desc') : t('pages.blogs.publish_blog_desc')}
                </p>

            }
            confirmText={isPublished ? t('pages.blogs.unpublish') : t('pages.blogs.publish')}
            cancelText={t('pages.blogs.cancel')}
            onConfirm={handleToggle}
            mode='default'
            loading={isLoading}
        />
    )
}

export default PublishBlogDialog