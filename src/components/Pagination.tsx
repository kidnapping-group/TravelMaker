"use client";

import useUpdateQuery from "@/hooks/useUpdateQuery";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
    <div className="gap-10px flex justify-center">
      <button
        className="border-green flex h-10 w-10 items-center justify-center rounded-2xl border tablet:h-[55px] tablet:w-[55px]"
        type="button"
        onClick={() => {
          updateQuery(Math.max(1, currentPage - 1));
        }}
      >
        <Image
          src={`/icons/icon-arrow-prev-${currentPage === 1 ? "passive-" : ""}pagination.svg`}
          width={18}
          height={18}
          alt="이전"
        />
      </button>
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          className={`${
            currentPage === pageNumber ? "bg-primary-500 text-white" : "text-green"
          } border-green flex h-10 w-10 items-center justify-center rounded-2xl border text-lg font-normal tablet:h-[55px] tablet:w-[55px]`}
          type="button"
          onClick={() => {
            updateQuery(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="border-green flex h-10 w-10 items-center justify-center rounded-2xl border tablet:h-[55px] tablet:w-[55px]"
        type="button"
        onClick={() => {
          updateQuery(Math.min(totalPages, currentPage + 1));
        }}
      >
        <Image
          src={`/icons/icon-arrow-next-${currentPage === totalPages ? "passive-" : ""}pagination.svg`}
          width={18}
          height={18}
          alt="다음"
        />
      </button>
    </div>
  );
}

export default Pagination;
