import { Button } from "@/components/Button";
import Image from "next/image";

interface Props {
  placeholder: string;
}

function SearchForm({ placeholder }: Props) {
  return (
    <form className="flex gap-3" action="/search" method="get">
      <div className="relative flex grow items-center">
        <Image
          className="absolute"
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
        />
      </div>
      <Button size="large" type="submit">
        검색
      </Button>
    </form>
  );
}

export default SearchForm;
