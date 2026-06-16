import { STATUS_CONFIG } from '@/constants/blogs.constants';
import { BlogStatus } from '@/types/blog.types';
import { useTranslation } from 'react-i18next';

interface StatusBadgeProps {
  status: BlogStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === "en"
  return (
    <span
      className={`inline-flex items-center rounded-[8px] px-4 py-2 text-xs font-medium ${config.className}`}
    >
      {!isEnglish ? config.labelAr : config.label}
    </span>
  );
};

export default StatusBadge;
