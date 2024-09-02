import { useMutation } from "@tanstack/react-query";

import activitiesAPI from "@/apis/activitiesAPI";

import { openPopup } from "@/components/Popup";

const usePostReservationMutation = (
  activityId: string,
  reservationId: number | null,
  population: number,
) => {
  const postReservationMutation = useMutation({
    mutationFn: () => {
      if (reservationId === null) {
        throw new Error("예약 ID가 없습니다.");
      }
      return activitiesAPI.postReservations(Number(activityId), {
        scheduleId: reservationId,
        headCount: population,
      });
    },
    onSuccess: () => {
      openPopup("reservationSuccess");
    },
  });

  return { postReservationMutation, ...postReservationMutation };
};

export default usePostReservationMutation;
