"use client";

import activitiesAPI from "@/apis/activitiesAPI";
import BigActivityCard from "@/app/(home)/_components/BigActivityCard";
import activitySectionQueryKeys from "@/app/(home)/utils/activitySectionQuery";
import { Swiper, SwiperContent, SwiperNext, SwiperPrevious } from "@/components/Swiper";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

interface BigActivitySectionProps {
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

function BigActivitySection({
  title: sectionTitle,
  category,
  keyword,
  sort = "most_reviewed",
}: BigActivitySectionProps) {
  const { data } = useSuspenseQuery({
    queryKey: activitySectionQueryKeys.list({
      category: category && categoryTitle[category],
      keyword,
      sort,
      page: 1,
      size: 10,
    }),
    queryFn: () =>
      activitiesAPI.get({
        category: category && categoryTitle[category],
        keyword,
        sort,
        page: 1,
        size: 10,
      }),
  });

  const { activities, totalCount } = data || { activities: [], totalCount: 0 };

  return (
    <section className="flex flex-col">
      <h2 className="py-3 text-2lg font-bold text-black tablet:text-xl">{sectionTitle}</h2>

      {totalCount > 0 ? (
        <Swiper>
          <SwiperContent isPcFixed>
            {activities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
              <Link href={`/${id}`} key={id}>
                <BigActivityCard
                  bannerImageUrl={bannerImageUrl}
                  title={title}
                  price={price}
                  rating={rating}
                  reviewCount={reviewCount}
                />
              </Link>
            ))}
          </SwiperContent>

          <div className="absolute top-1/2 hidden w-full pc:block">
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

export default BigActivitySection;
