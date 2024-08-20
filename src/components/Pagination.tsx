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
    <div className="flex justify-center gap-2">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 disabled:pointer-events-none tablet:h-10 tablet:w-10"
        type="button"
        onClick={() => {
          updateQuery(Math.max(1, currentPage - 1));
        }}
      >
        <Image
          className="select-none"
          src={`/icons/icon-arrow-prev-${currentPage === 1 ? "passive-" : ""}pagination.svg`}
          width={18}
          height={18}
          alt="이전"
          draggable={false}
        />
      </button>
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          className={`${
            currentPage === pageNumber
              ? "bg-primary-500 text-white"
              : "bg-white text-black hover:bg-gray-100"
          } flex h-8 w-8 items-center justify-center rounded-full text-md font-medium disabled:pointer-events-none tablet:h-10 tablet:w-10 tablet:text-lg`}
          type="button"
          onClick={() => {
            updateQuery(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 disabled:pointer-events-none tablet:h-10 tablet:w-10"
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
