import activitiesAPI from "@/apis/activitiesAPI";
import { queryOptions } from "@tanstack/react-query";

export const getActivityQueryKey = (activityId: string) => ["activity", activityId];
export const activityIdOptions = (activityId: string) =>
  queryOptions({
    queryKey: getActivityQueryKey(activityId),
    queryFn: () => activitiesAPI.getInfo(Number(activityId)),
    enabled: !!activityId,
  });

export const getCommentQueryKey = (activityId: string) => ["comment", activityId];
export const commentOptions = (activityId: string) =>
  queryOptions({
    queryKey: getCommentQueryKey(activityId),
    queryFn: () => activitiesAPI.getReview({ id: Number(activityId) }),
    enabled: !!activityId,
  });
