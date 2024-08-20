import myNotificationsAPI from "@/apis/myNotificationsAPI";
import ReservationStatus from "@/app/(user)/reservation-status/_components/ReservationStatus";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function ReservationStatusPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["myNotificationsAPI"],
    queryFn: () => myNotificationsAPI.get({ cursorId: undefined, size: 1000 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationStatus />
    </HydrationBoundary>
  );
}

export default ReservationStatusPage;
