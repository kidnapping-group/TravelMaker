import { getActivitiesRes } from "@/apis/API.type";
import ActivityCard from "@/app/(home)/_components/ActivityCard";
import Link from "next/link";

interface ActivityGridProps {
  activities: getActivitiesRes["activities"];
}

function ActivityGrid({ activities }: ActivityGridProps) {
  return (
    <div className="-ml-3 flex flex-wrap tablet:-ml-5">
      {activities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
        <div
          className="mb-3 basis-1/2 pl-3 tablet:mb-5 tablet:basis-1/3 tablet:pl-5 pc:basis-1/4"
          key={id}
        >
          <Link href={`/${id}`}>
            <ActivityCard
              wide
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
  );
}

export default ActivityGrid;
