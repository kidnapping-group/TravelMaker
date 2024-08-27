import { getMyReservation, getReservationDate, getReservationMonth } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { queryOptions } from "@tanstack/react-query";

export const queryKeys = {
  myActivities: () => ["myActivities"] as const,

  myActivityMonthReservationStatus: (params: getReservationMonth) =>
    ["myActivityMonthReservationStatus", params.activityId, params.year, params.month] as const,

  myActivityDateReservationStatus: (params: getReservationDate) =>
    ["myActivityDateReservationStatus", params.activityId, params.date] as const,

  myActivityTimeReservationStatus: (params: getMyReservation) =>
    [
      "myActivityTimeReservationStatus",
      params.activityId,
      params.scheduleId,
      params.status,
    ] as const,
};

export const getMyActivities = queryOptions({
  queryKey: queryKeys.myActivities(),
  queryFn: () => myActivitiesAPI.get({ size: 999 }),
});

export const getMyActivityMonthReservationStatus = (params: getReservationMonth) =>
  queryOptions({
    queryKey: queryKeys.myActivityMonthReservationStatus(params),
    queryFn: () => myActivitiesAPI.getReservationMonth(params),
  });

export const getMyActivityDateReservationStatus = (params: getReservationDate) =>
  queryOptions({
    queryKey: queryKeys.myActivityDateReservationStatus(params),
    queryFn: () => myActivitiesAPI.getReservationDate(params),
  });

export const getMyActivityTimeReservationStatus = (params: getMyReservation) =>
  queryOptions({
    queryKey: queryKeys.myActivityTimeReservationStatus(params),
    queryFn: () => myActivitiesAPI.getReservation(params),
  });
