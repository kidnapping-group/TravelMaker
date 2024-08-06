"use client";

import { activityIdOptions } from "@/app/[activityId]/activityId";
import { useSuspenseQuery } from "@tanstack/react-query";

function ActivityIdDetail({ activityId }: { activityId: string }) {
  const { data, isLoading } = useSuspenseQuery(activityIdOptions(activityId));

  if (isLoading) return null;

  return <div>{data.title}</div>;
}

export default ActivityIdDetail;
