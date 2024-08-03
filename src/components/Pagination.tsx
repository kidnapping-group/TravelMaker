"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps extends React.PropsWithChildren {
  totalCount: number;
  pageSize: number;
}

function Pagination({ totalCount, pageSize }: PaginationProps) {
  const pathname = usePathname();
  const currentPage = Number(useSearchParams().get("page") ?? "1");
  const totalPages = Math.ceil(totalCount / pageSize);

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  return (
    <div className="flex justify-center gap-10px">
      <Link
        href={`${pathname}?page=${Math.max(1, currentPage - 1)}`}
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-green tablet:h-[55px] tablet:w-[55px]"
      >
        <Image
          src={`/icons/icon-arrow-prev-${currentPage === 1 ? "passive-" : ""}pagination.svg`}
          width={18}
          height={18}
          alt="이전"
        />
      </Link>
      {pageNumbers.map(pageNumber => (
        <Link
          key={pageNumber}
          href={`${pathname}?page=${pageNumber}`}
          className={`${
            currentPage === pageNumber ? "bg-green text-white" : "text-green"
          } flex h-10 w-10 items-center justify-center rounded-2xl border border-green text-lg font-normal tablet:h-[55px] tablet:w-[55px]`}
        >
          {pageNumber}
        </Link>
      ))}
      <Link
        href={`${pathname}?page=${Math.min(totalPages, currentPage + 1)}`}
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-green tablet:h-[55px] tablet:w-[55px]"
      >
        <Image
          src={`/icons/icon-arrow-next-${currentPage === totalPages ? "passive-" : ""}pagination.svg`}
          width={18}
          height={18}
          alt="다음"
        />
      </Link>
    </div>
  );
}

export default Pagination;
