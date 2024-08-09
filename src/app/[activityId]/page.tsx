import ActivityIdDetail from "@/app/[activityId]/_components/ActivityIdDetail";
import ReservationModal from "@/app/[activityId]/_components/ReservationModal";
import Review from "@/app/[activityId]/_components/Review";
import { activityIdOptions, reviewOptions } from "@/app/[activityId]/activityId";
import { openModal } from "@/components/Modal";
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
      <ReservationModal activityId={activityId} />
      <button
        onClick={openModal}
        type="button"
        className="sticky bottom-0 w-full bg-primary-400 py-5"
      >
        예약하기
      </button>
    </HydrationBoundary>
  );
}

export default ActivityId;
