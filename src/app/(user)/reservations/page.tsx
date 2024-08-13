import myReservationAPI from "@/apis/myReservationAPI";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import MyReservations from "./_components/MyReservations";

async function Reservations({ status = undefined }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["myReservations", { size: 10, status }],
    queryFn: () => myReservationAPI.get({ cursorId: undefined, size: 10, status }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyReservations initialStatus={status} />
      </HydrationBoundary>
    </div>
  );
}

export default Reservations;
