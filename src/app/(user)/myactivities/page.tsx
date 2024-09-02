import MyActivities from "@/app/(user)/myactivities/_components/MyActivities";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import myActivitiesAPI from "@/apis/myActivitiesAPI";

export const metadata = {
  title: "내 체험 현황",
  description: "내 체험을 확인하고 관리하세요.",
  openGraph: {
    title: "내 체험 현황",
    description: "내 체험을 확인하고 관리하세요.",
    url: "https://travel-kidnap-maker.vercel.app/myactivities",
  },
};

async function MyActivitiesPage() {
  const queryClient = new QueryClient();
  await [
    queryClient.prefetchQuery({
      queryKey: ["myActivities", { size: 10 }],
      queryFn: () => myActivitiesAPI.get({ cursorId: undefined, size: 10 }),
    }),
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyActivities />
    </HydrationBoundary>
  );
}

export default MyActivitiesPage;
