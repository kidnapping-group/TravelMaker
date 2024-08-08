"use client";

import { reviewOptions } from "@/app/[activityId]/activityId";
import { useSuspenseQuery } from "@tanstack/react-query";

function Review({ activityId }: { activityId: string }) {
  const { data } = useSuspenseQuery(reviewOptions(activityId));

  return <div>{data.reviews[0].content}</div>;
}

export default Review;
