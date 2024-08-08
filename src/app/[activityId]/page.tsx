import ActivityIdDetail from "@/app/[activityId]/_components/ActivityIdDetail";
import Review from "@/app/[activityId]/_components/Review";
import { activityIdOptions, reviewOptions } from "@/app/[activityId]/activityId";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function ActivityId({ params: { activityId } }: { params: { activityId: string } }) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(activityIdOptions(activityId)),
    queryClient.prefetchQuery(reviewOptions(activityId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityIdDetail activityId={activityId} />
      <Review activityId={activityId} />
    </HydrationBoundary>
  );
}

export default ActivityId;
