import { useEffect, useRef } from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useTableSearchParam from '@/hooks/useTableSearchParam';

type PaginationProps = {
  fieldName?: string;
  totalCount?: number;
  currentCount?: number;
  pageSize?: number;
};

const Pagination = ({ fieldName = 'pageNumber', totalCount, currentCount, pageSize: pageSizeProp }: PaginationProps) => {
  const { i18n, t } = useTranslation();
  const { searchParams, setTableSearchParam } = useTableSearchParam({
    shouldResetPage: false,
  });

  const pageNumber = Math.max(1, Number(searchParams.get(fieldName)) || 1);
  const pageSize = pageSizeProp ?? Math.max(1, Number(searchParams.get('pageSize')) || 10);
  const isEnglish = i18n.language.startsWith('en');

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / pageSize));

  const isNavigatingRef = useRef(false);
  const lastProcessedCountRef = useRef(currentCount);

  // ================= HANDLE DELETE LAST ITEM =================
  useEffect(() => {
    if (
      currentCount === 0 &&
      pageNumber > 1 &&
      lastProcessedCountRef.current !== 0 &&
      !isNavigatingRef.current
    ) {
      isNavigatingRef.current = true;

      const newPageNumber = pageNumber - 1;

      setTableSearchParam(fieldName, newPageNumber);

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 200);
    }

    lastProcessedCountRef.current = currentCount;
  }, [currentCount, fieldName, pageNumber, setTableSearchParam]);

  // ================= HANDLE PAGE > TOTAL PAGES =================
  useEffect(() => {
    if (isNavigatingRef.current || totalPages === 0) return;

    if (pageNumber > totalPages) {
      isNavigatingRef.current = true;

      setTableSearchParam(fieldName, totalPages);

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 200);
    }
  }, [fieldName, pageNumber, setTableSearchParam, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (isNavigatingRef.current || page === pageNumber || page < 1 || page > totalPages) {
      return;
    }

    isNavigatingRef.current = true;

    setTableSearchParam(fieldName, page);

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 200);
  };

  return (
    <ShadcnPagination className='mt-4 justify-start'>
      <PaginationContent>
        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationLink
            aria-label='Go to previous page'
            size='default'
            className={cn(
              'gap-1 px-2.5',
              pageNumber === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer',
            )}
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 1) {
                handlePageChange(pageNumber - 1);
              }
            }}
          >
            <ChevronRight className={`h-4 w-4 ${isEnglish ? 'rotate-180' : ''}`} />
            <span>{t('common.previous')}</span>
          </PaginationLink>
        </PaginationItem>

        {/* FIRST PAGE */}
        <PaginationItem>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={pageNumber === 1}
            className={cn(
              'cursor-pointer',
              pageNumber === 1 &&
              'bg-secondary-500 hover:bg-secondary-500 text-neutral-900 hover:text-neutral-700',
            )}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* LEFT DOTS */}
        {pageNumber > 3 && (
          <PaginationItem>
            <span className='px-2'>...</span>
          </PaginationItem>
        )}

        {/* CURRENT PAGE */}
        {pageNumber !== 1 && pageNumber !== totalPages && (
          <PaginationItem>
            <PaginationLink
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNumber);
              }}
              isActive
              className='bg-secondary-500 hover:bg-secondary-500 cursor-pointer text-neutral-900 hover:text-neutral-700'
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* RIGHT DOTS */}
        {pageNumber < totalPages - 2 && (
          <PaginationItem>
            <span className='px-2'>...</span>
          </PaginationItem>
        )}

        {/* LAST PAGE */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              isActive={pageNumber === totalPages}
              className={cn(
                'cursor-pointer',
                pageNumber === totalPages &&
                'bg-secondary-500 hover:bg-secondary-500 text-neutral-900 hover:text-neutral-700',
              )}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* NEXT */}
        <PaginationItem>
          <PaginationLink
            aria-label='Go to next page'
            size='default'
            className={cn(
              'gap-1 px-2.5',
              pageNumber === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer',
            )}
            onClick={(e) => {
              e.preventDefault();

              if (pageNumber < totalPages) {
                handlePageChange(pageNumber + 1);
              }
            }}
          >
            <span>{t('common.next')}</span>
            <ChevronLeft className={`h-4 w-4 ${isEnglish ? 'rotate-180' : ''}`} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
