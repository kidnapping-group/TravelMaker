import activitiesAPI from "@/apis/activitiesAPI";
import Swiper from "@/components/Swiper";
import Link from "next/link";

import LongActivityCard from "./_components/LongActivityCard";

async function Home() {
  const { activities: popularActivities } = await activitiesAPI.get({
    sort: "most_reviewed",
    page: 1,
    size: 10,
  });

  return (
    <main className="m-auto w-full max-w-[1200px]">
      <section className="flex flex-col">
        <h2 className="py-3 text-2lg font-bold text-black">🔥 인기 체험</h2>
        <Swiper>
          {popularActivities.map(({ id, bannerImageUrl, title, price, rating, reviewCount }) => (
            <Link href={`/${id}`} key={id}>
              <LongActivityCard
                bannerImageUrl={bannerImageUrl}
                title={title}
                price={price}
                rating={rating}
                reviewCount={reviewCount}
              />
            </Link>
          ))}
        </Swiper>
      </section>
    </main>
  );
}

export default Home;
