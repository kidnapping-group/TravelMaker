"use client";

import { getActivitiesRes } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { LinkButton } from "@/components/Button";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import MyActivityItem from "./_components/MyActivityItem";

const useMyActivities = (size = 20) =>
  useInfiniteQuery<
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

function MyActivities() {
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useMyActivities();
  const { data, isFetchingNextPage, status, error } = useMyActivities();

  if (status === "pending") return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="relative mx-auto h-full w-full max-w-[806px] flex-col items-center justify-center pt-0">
      <div className="fixed z-10 flex w-full max-w-[800px] items-start justify-between bg-gray-100 pb-6">
        <h1 className="text-3xl font-bold">내 체험 관리</h1>
        <LinkButton href="/myactivities" variant="default" size="medium">
          체험 등록하기
        </LinkButton>
      </div>
      {data?.pages.length ? (
        <div className="overflow-y-auto pb-[72px] pt-[72px]">
          <div>
            {data.pages.map(page => (
              <div key={crypto.randomUUID()} className="flex flex-col gap-[24px]">
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ))}
            {isFetchingNextPage && <div>로딩 중...</div>}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-2xl font-medium text-gray-500">아직 등록한 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}

export default MyActivities;
