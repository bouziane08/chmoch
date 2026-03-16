import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
  total = 0,
}: UsePaginationProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;

  const nextPage = () => {
    if (hasNext) setPage(page + 1);
  };

  const previousPage = () => {
    if (hasPrevious) setPage(page - 1);
  };

  const reset = () => {
    setPage(initialPage);
    setLimit(initialLimit);
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
    reset,
  };
}
