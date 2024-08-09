import myActivitiesAPI from "@/apis/myActivitiesAPI";
import MyActivities from "@/app/(user)/myactivities/_components/MyActivities";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function MyActivitiesPage() {
  const queryClient = new QueryClient();
  await [
    queryClient.prefetchQuery({
      queryKey: ["myActivities", 20],
      queryFn: () => myActivitiesAPI.get({ cursorId: undefined, size: 20 }),
    }),
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyActivities />
    </HydrationBoundary>
  );
}

export default MyActivitiesPage;
