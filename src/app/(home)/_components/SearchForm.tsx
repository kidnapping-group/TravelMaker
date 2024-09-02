"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/Button";
import Tooltip from "@/components/Tooltip";

interface SearchFormProps {
  placeholder: string;
}

function SearchForm({ placeholder }: SearchFormProps) {
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

    const encodedKeyword = encodeURIComponent(searchKeyword);
    push(`/search?keyword=${encodedKeyword}`);
  };

  return (
    <form className="flex gap-3" onSubmit={handleSearch}>
      <div className="relative flex grow items-center justify-center">
        <FaSearch size={20} className="absolute left-[14px] text-gray-400" />
        <input
          className="h-full w-full rounded-lg bg-gray-100 py-2 pl-12 pr-4 text-lg font-medium placeholder:text-gray-400"
          name="keyword"
          placeholder={placeholder}
          defaultValue={keyword}
          autoComplete="off"
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
