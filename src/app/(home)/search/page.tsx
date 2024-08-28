import { getActivities } from "@/apis/API.type";
import activitiesAPI from "@/apis/activitiesAPI";
import SearchForm from "@/app/(home)/_components/SearchForm";
import Pagination from "@/components/Pagination";

import ActivityGrid from "./_components/ActivityGrid";
import SortDropdown from "./_components/SortDropdown";
import TabList from "./_components/TabList";

const TAB_LIST = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];
const DEFAULT_SORT = "most_reviewed";
const PAGE_SIZE = 12;

interface SearchPageProps {
  searchParams: Pick<getActivities, "keyword" | "category" | "sort" | "page">;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword, category, sort = DEFAULT_SORT, page = 1 } = searchParams;

  const { totalCount, activities } = await activitiesAPI.get({
    keyword,
    category,
    sort,
    page,
    size: PAGE_SIZE,
  });

  return (
    <main className="flex flex-col items-center px-5 pc:px-10">
      <section className="w-full max-w-[1200px] py-5">
        <SearchForm placeholder="내가 원하는 체험은" />
      </section>

      <section className="flex w-full max-w-[1200px] flex-col gap-3 pb-[100px]">
        <h2 className="text-xl font-bold">
          {keyword ? `‘${keyword}’` : "전체"} 검색 결과 {totalCount}개
        </h2>

        <div className="flex items-center justify-between gap-2">
          <div className="grow">
            <TabList paramName="category" paramValues={TAB_LIST} />
          </div>
          <SortDropdown />
        </div>

        {activities.length > 0 ? (
          <div className="flex flex-col gap-5 pt-3">
            <ActivityGrid activities={activities} />
            <Pagination totalCount={totalCount} pageSize={PAGE_SIZE} />
          </div>
        ) : (
          <div className="my-20 flex justify-center text-lg font-medium text-gray-400">
            검색 결과가 없어요.
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchPage;
