"use client";

import { Button } from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  placeholder: string;
}

function SearchForm({ placeholder }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { push } = useRouter();

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.toString();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchKeyword = formData.get("keyword") as string;

    if (!searchKeyword.trim()) {
      setIsTooltipOpen(true);
      return;
    }

    push(`/search?keyword=${searchKeyword}`);
  };

  return (
    <form className="flex gap-3" onSubmit={handleSearch}>
      <div className="relative flex grow items-center justify-center">
        <Image
          className="absolute left-0"
          src="/icons/bed.svg"
          width={48}
          height={48}
          alt="검색 아이콘"
          draggable={false}
        />
        <input
          className="h-full w-full rounded-lg bg-gray-100 py-2 pl-12 pr-4 text-lg font-medium placeholder:text-gray-400"
          name="keyword"
          placeholder={placeholder}
          defaultValue={keyword}
        />
        <Tooltip
          isOpen={isTooltipOpen}
          close={() => setIsTooltipOpen(false)}
          text="체험을 입력해주세요."
        />
      </div>
      <Button size="large" type="submit">
        검색
      </Button>
    </form>
  );
}

export default SearchForm;
