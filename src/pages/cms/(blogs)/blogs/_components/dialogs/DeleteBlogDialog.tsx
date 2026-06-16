import ConfirmDialog from "@/components/shared/customs/CustomConfirmDialog"
import { useDeleteBlog } from "@/hooks/blogs/useDeleteBlog"
// import { useDeleteBlog } from "@/hooks/blogs/useDeleteBlog"
import type { BlogCardProps } from "@/types/blog.types"
import { useTranslation } from "react-i18next"

type DeleteBlogDialogProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    blog: BlogCardProps
}

const DeleteBlogDialog = ({ isOpen, setIsOpen, blog }: DeleteBlogDialogProps) => {
    const { t } = useTranslation()
    const { deleteBlog, isLoading } = useDeleteBlog()

    const handleDelete = async () => {
        await deleteBlog(blog.id)
    }
    return (
        <ConfirmDialog
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            title={t('pages.blogs.delete_blog')}
            description={
                <p className='text-secondary-400'>
                    {t('pages.blogs.delete_blog_desc')}
                </p>
            }
            confirmText={t('pages.blogs.delete')}
            cancelText={t('pages.blogs.cancel')}
            onConfirm={handleDelete}
            mode='destructive'
            loading={isLoading}
        />
    )
}

export default DeleteBlogDialog