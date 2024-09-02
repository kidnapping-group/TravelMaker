"use client";

import { useSearchParams } from "next/navigation";

import useUpdateQuery from "@/hooks/useUpdateQuery";

import { NextButton, PageButton, PrevButton } from "./Button";

interface PaginationProps extends React.PropsWithChildren {
  totalCount: number;
  pageSize: number;
}

function Pagination({ totalCount, pageSize }: PaginationProps) {
  const updateQuery = useUpdateQuery("page");

  const currentPage = Number(useSearchParams().get("page") ?? "1");
  const totalPages = Math.ceil(totalCount / pageSize);

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center gap-2">
      <PrevButton
        disabled={currentPage <= 1}
        onClick={() => {
          updateQuery(Math.max(1, currentPage - 1));
        }}
      />
      {pageNumbers.map(pageNumber => (
        <PageButton
          key={pageNumber}
          isActive={currentPage === pageNumber}
          onClick={() => {
            updateQuery(pageNumber);
          }}
        >
          {pageNumber}
        </PageButton>
      ))}
      <NextButton
        disabled={currentPage >= totalPages}
        onClick={() => {
          updateQuery(Math.min(totalPages, currentPage + 1));
        }}
      />
    </div>
  );
}

export default Pagination;
