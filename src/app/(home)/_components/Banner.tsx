import activitiesAPI from "@/apis/activitiesAPI";
import Carousel from "@/app/(home)/_components/Carousel";
import Image from "next/image";

async function Banner() {
  const { activities } = await activitiesAPI.get({ sort: "most_reviewed", page: 1, size: 3 });

  const thisMonth = new Date().getMonth() + 1;

  return (
    <div className="relative flex h-[440px] w-full justify-center">
      <Carousel>
        {activities.map(({ id, title, bannerImageUrl }, index) => (
          <div key={id} className="flex h-full w-full justify-center">
            {/* 배너 이미지 */}
            <Image
              className="z-0 object-cover"
              src={bannerImageUrl}
              alt={`배너 이미지 ${index + 1}`}
              fill
              priority
              draggable={false}
            />
            <div className="absolute z-[1] h-full w-full bg-black opacity-30" />

            {/* 배너 텍스트 */}
            <div className="absolute z-[2] flex h-full w-full max-w-[1280px] flex-col justify-end gap-1 px-5 pb-64 font-bold text-white tablet:px-10">
              <h2 className="text-3xl">{title}</h2>
              <p className="text-xl">{thisMonth}월의 인기 체험 BEST 🔥</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
