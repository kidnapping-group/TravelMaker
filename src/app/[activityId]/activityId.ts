// queryOptions.ts
import activitiesAPI from "@/apis/activitiesAPI";
import { queryOptions } from "@tanstack/react-query";

export const activityIdOptions = (activityId: string) =>
  queryOptions({
    queryKey: ["activity", activityId],
    queryFn: () => activitiesAPI.getInfo(Number(activityId)),
  });

export const reviewOptions = (activityId: string) =>
  queryOptions({
    queryKey: ["review", activityId],
    queryFn: () => activitiesAPI.getReview({ id: Number(activityId) }),
  });
