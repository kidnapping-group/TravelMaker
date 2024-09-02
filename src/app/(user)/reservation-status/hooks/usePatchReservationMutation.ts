import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  MyReservation,
  getMyReservation,
  getReservationDate,
  getReservationMonth,
  patchMyReservation,
} from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";

import { queryKeys } from "../utils/reservationStatus";

const usePatchReservation = (reservation: MyReservation) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: patchMyReservation) => myActivitiesAPI.patchReservation(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivityTimeReservationStatus({
          activityId: reservation.activityId,
          scheduleId: reservation.scheduleId,
          status: reservation.status,
        } as getMyReservation),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivityDateReservationStatus({
          activityId: reservation.activityId,
          date: reservation.date,
        } as getReservationDate),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivityMonthReservationStatus({
          activityId: reservation.activityId,
          year: reservation.date.split("-")[0],
          month: reservation.date.split("-")[1],
        } as getReservationMonth),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.myActivities(),
      });
    },
  });

  const createPatchHandler = (newStatus: patchMyReservation["status"]) => {
    mutation.mutate({
      activityId: reservation.activityId,
      reservationId: reservation.id,
      status: newStatus,
    });
  };

  return {
    mutation,
    createPatchHandler,
  };
};

export default usePatchReservation;
