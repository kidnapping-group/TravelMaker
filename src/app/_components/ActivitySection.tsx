import activitiesAPI from "@/apis/activitiesAPI";
import ActivityCard from "@/app/_components/ActivityCard";
import Swiper from "@/components/Swiper";
import Link from "next/link";

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

async function ActivitySection({
  title: sectionTitle,
  category,
  keyword,
  sort = "most_reviewed",
}: ActivitySectionProps) {
  const { activities, totalCount } = await activitiesAPI.get({
    category: category && categoryTitle[category],
    keyword,
    sort,
    page: 1,
    size: 10,
  });

  return (
    <section className="flex flex-col">
      <h2 className="py-3 text-2lg font-bold text-black">{sectionTitle}</h2>
      {totalCount > 0 ? (
        <Swiper>
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
