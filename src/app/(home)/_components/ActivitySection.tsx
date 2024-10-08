"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

import activitiesAPI from "@/apis/activitiesAPI";

import { Swiper, SwiperContent, SwiperNext, SwiperPrevious } from "@/components/Swiper";

import createQueryString from "@/utils/createQueryString";

import activitySectionQueryKeys from "../utils/activitySectionQuery";
import ActivityCard from "./ActivityCard";

interface ActivitySectionProps {
  title: string;
  category?: "arts" | "food" | "sports" | "tour" | "sightseeing" | "wellbeing";
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
}

const categoryTitle = {
  arts: "문화 · 예술",
  food: "식음료",
  sports: "스포츠",
  tour: "투어",
  sightseeing: "관광",
  wellbeing: "웰빙",
} as const;

function ActivitySection({
  title: sectionTitle,
  category: categoryKey,
  keyword,
  sort = "most_reviewed",
}: ActivitySectionProps) {
  const category = categoryKey && categoryTitle[categoryKey];

  const { data } = useSuspenseQuery({
    queryKey: activitySectionQueryKeys.list({ category, keyword, sort, page: 1, size: 10 }),
    queryFn: () => activitiesAPI.get({ category, keyword, sort, page: 1, size: 10 }),
  });

  const { activities, totalCount } = data || { activities: [], totalCount: 0 };

  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col px-5 py-5 tablet:px-10">
      <div className="flex items-center justify-between">
        <h2 className="py-3 text-2lg font-bold text-black tablet:text-xl">{sectionTitle}</h2>
        <Link
          className="text-md font-semibold text-primary-500 transition hover:text-primary-600 hover:underline hover:underline-offset-2 active:text-primary-700"
          href={`/search?${createQueryString({ category, keyword, sort })}`}
        >
          더보기
        </Link>
      </div>

      {totalCount > 0 ? (
        <Swiper>
          <SwiperContent isPcFixed>
            {activities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
              <Link href={`/${id}`} key={id}>
                <ActivityCard
                  bannerImageUrl={bannerImageUrl}
                  title={title}
                  price={price}
                  rating={rating}
                  reviewCount={reviewCount}
                />
              </Link>
            ))}
          </SwiperContent>

          <div className="absolute top-[31%] hidden w-full pc:block">
            <SwiperPrevious />
            <SwiperNext />
          </div>
        </Swiper>
      ) : (
        <div className="flex h-full max-h-[265px] min-h-[235px] items-center justify-center rounded-[10px] bg-gray-100 text-gray-300">
          <p>아직 등록된 체험이 없어요.</p>
        </div>
      )}
    </section>
  );
}

export default ActivitySection;
