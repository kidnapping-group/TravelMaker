import { getActivities } from "@/apis/API.type";
import activitiesAPI from "@/apis/activitiesAPI";
import ActivityCard from "@/app/_components/ActivityCard";
import SearchForm from "@/app/_components/SearchForm";
import Pagination from "@/components/Pagination";
import Link from "next/link";

import SortDropdown from "./_components/SortDropdown";
import TabList from "./_components/TabList";

interface SearchPageProps {
  searchParams: Pick<getActivities, "keyword" | "category" | "sort" | "page">;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword, category, sort = "most_reviewed", page = 1 } = searchParams;
  const pageSize = 12;

  const { totalCount, activities } = await activitiesAPI.get({
    keyword,
    category,
    sort,
    page,
    size: pageSize,
  });

  return (
    <main className="flex flex-col items-center px-5 pc:px-10">
      <section className="w-full max-w-[1200px] py-5">
        <SearchForm placeholder="내가 원하는 체험은" />
      </section>

      <section className="flex w-full max-w-[1200px] flex-col gap-3 pb-[100px]">
        <h2 className="text-xl font-bold">
          &lsquo;{searchParams.keyword}&rsquo; 검색 결과 {totalCount}개
        </h2>

        <div className="flex items-center justify-between">
          <TabList
            paramName="category"
            paramValues={["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"]}
          />
          <SortDropdown />
        </div>

        {activities.length > 0 ? (
          <div className="flex flex-col gap-5 pt-3">
            <div className="-ml-3 flex flex-wrap tablet:-ml-5">
              {activities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
                <div
                  className="mb-3 basis-1/2 pl-3 tablet:mb-5 tablet:basis-1/3 tablet:pl-5 pc:basis-1/4"
                  key={id}
                >
                  <Link href={`/${id}`}>
                    <ActivityCard
                      bannerImageUrl={bannerImageUrl}
                      title={title}
                      price={price}
                      rating={rating}
                      reviewCount={reviewCount}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <Pagination totalCount={totalCount} pageSize={pageSize} />
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
