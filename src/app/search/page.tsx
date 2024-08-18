import { getActivities } from "@/apis/API.type";
import activitiesAPI from "@/apis/activitiesAPI";
import Link from "next/link";

import SearchForm from "../_components/SearchForm";
import ShortActivityCard from "../_components/ShortActivityCard";

interface SearchPageProps {
  searchParams: Pick<getActivities, "keyword" | "category" | "sort" | "page">;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword, category, sort = "most_reviewed", page = 1 } = searchParams;
  const pageSize = 12;

  const emptyResult = { totalCount: 0, activities: [] };

  const { totalCount, activities } = await (keyword
    ? activitiesAPI.get({
        keyword,
        category,
        sort,
        page,
        size: pageSize,
      })
    : emptyResult);

  return (
    <main className="flex flex-col items-center px-5">
      <div className="flex w-full max-w-[1200px] flex-col">
        <div className="py-5">
          <SearchForm placeholder="내가 원하는 체험은" />
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold">
            &lsquo;{searchParams.keyword}&rsquo; 검색 결과 {totalCount}개
          </h2>
          {activities.length > 0 ? (
            <div className="-ml-3 mt-3 flex flex-wrap tablet:-ml-5">
              {activities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
                <div
                  className="mb-3 basis-1/2 pl-3 tablet:mb-5 tablet:basis-1/3 tablet:pl-5 pc:basis-1/4"
                  key={id}
                >
                  <Link href={`/${id}`}>
                    <ShortActivityCard
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
          ) : (
            <div className="my-20 flex justify-center text-lg font-medium text-gray-400">
              검색 결과가 없어요.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
