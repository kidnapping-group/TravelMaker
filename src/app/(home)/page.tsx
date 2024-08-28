import activitiesAPI from "@/apis/activitiesAPI";
import ActivitySection from "@/app/(home)/_components/ActivitySection";
import Banner from "@/app/(home)/_components/Banner";
import BigActivitySection from "@/app/(home)/_components/BigActivitySection";
import SearchForm from "@/app/(home)/_components/SearchForm";
import activitySectionQueryKeys from "@/app/(home)/utils/activitySectionQuery";
import LoadingSpinner from "@/utils/LoadingSpinnter";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: activitySectionQueryKeys.list({ sort: "most_reviewed", page: 1, size: 999 }),
    queryFn: () => activitiesAPI.get({ sort: "most_reviewed", page: 1, size: 999 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex flex-col items-center">
          <div className="relative flex w-full">
            <Banner />

            <div className="absolute bottom-16 flex w-full justify-center px-5 pc:px-10">
              <div className="flex w-full max-w-[1200px] flex-col gap-5 rounded-2xl bg-white p-5">
                <h2 className="text-2lg font-bold">무엇을 체험하고 싶으신가요?</h2>
                <SearchForm placeholder="내가 원하는 체험은" />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center px-5 pc:px-10">
            <div className="mb-[100px] mt-[50px] flex w-full max-w-[1200px] flex-col gap-5 tablet:gap-10">
              <BigActivitySection title="실시간 인기 체험 🔥" sort="most_reviewed" />
              <ActivitySection title="새로 오픈한 체험 🆕" sort="latest" />
              <ActivitySection title="일상을 풍요롭게 만드는 특별한 경험 🎨🎶" category="arts" />
              <ActivitySection title="입맛을 사로잡는 미식 여행 🍽️" category="food" />
              <ActivitySection title="에너지 넘치는 스포츠 체험 ⚽" category="sports" />
              <ActivitySection title="일상 밖의 모험, 숨은 명소로의 초대장 💌" category="tour" />
              <ActivitySection title="웰빙으로 건강한 일상 만들기 🌱" category="wellbeing" />
              <ActivitySection title="손끝에 전해지는 짜릿한 손맛! 🐟" keyword="낚시" />
            </div>
          </div>
        </main>
      </Suspense>
    </HydrationBoundary>
  );
}

export default Home;
