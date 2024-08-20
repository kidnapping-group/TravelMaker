import myReservationAPI from "@/apis/myReservationAPI";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Image from "next/image";

import Bed from "../../../../../icons/bed.svg";

async function ReservationStatusPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["myReservations"],
    queryFn: () => myReservationAPI.get({ cursorId: undefined, size: 1000 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Image src={Bed} width={3} height={3} />
      <h1>예약 현황</h1>
    </HydrationBoundary>
  );
}

export default ReservationStatusPage;
