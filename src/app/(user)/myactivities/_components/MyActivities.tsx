"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import { getActivitiesRes } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";

import { LinkButton } from "@/components/Button";
import Picture from "@/components/Picture";

import LoadingSpinner from "@/utils/LoadingSpinnter";

import MyActivityItem from "./MyActivityItem";

function MyActivities() {
  let size = 20;
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery<
    getActivitiesRes,
    Error,
    InfiniteData<getActivitiesRes>,
    [string, number],
    number | undefined
  >({
    queryKey: ["myActivities", size],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      myActivitiesAPI.get({ cursorId: pageParam, size }),
    initialPageParam: undefined,
    getNextPageParam: lastBatch => lastBatch.cursorId,
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1 && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const hasActivities = data?.pages.some(page => page.activities.length > 0);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <div className="mb-5 flex w-full items-start justify-between">
        <h1 className="text-2xl font-bold">내 체험 관리</h1>
        <LinkButton href="/myactivities/add" size="medium">
          체험 등록하기
        </LinkButton>
      </div>

      {hasActivities ? (
        <div onScroll={handleScroll}>
          {data?.pages.map(page => (
            <div key={page.cursorId} className="flex flex-col gap-[24px]">
              {page.activities.map(activity => (
                <MyActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <Picture src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-xl font-medium text-gray-500">아직 등록한 체험이 없어요</p>
        </div>
      )}
    </>
  );
}

export default MyActivities;
