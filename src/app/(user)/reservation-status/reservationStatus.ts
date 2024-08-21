import { getMyReservation, getReservationDate, getReservationMonth } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { queryOptions } from "@tanstack/react-query";

export const getMyActivities = queryOptions({
  queryKey: ["myActivities"],
  queryFn: () => myActivitiesAPI.get({ size: 999 }),
});

export const getMyActivityMonthReservationStatus = (params: getReservationMonth) =>
  queryOptions({
    queryKey: ["myActivityMonthReservationStatus", params],
    queryFn: () => myActivitiesAPI.getReservationMonth(params),
  });

export const getMyActivityDateReservationStatus = (params: getReservationDate) =>
  queryOptions({
    queryKey: ["myActivityDateReservationStatus", params],
    queryFn: () => myActivitiesAPI.getReservationDate(params),
  });

export const getMyActivityTimeReservationStatus = (params: getMyReservation) =>
  queryOptions({
    queryKey: ["myActivityTimeReservationStatus", params],
    queryFn: () => myActivitiesAPI.getReservation(params),
  });
