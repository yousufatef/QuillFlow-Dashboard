import { STATUS_CONFIG } from "@/constants/blogs";
import { BlogStatus } from "@/types/blog.types";

interface StatusBadgeProps {
  status: BlogStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded-[8px] px-4 py-2 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
