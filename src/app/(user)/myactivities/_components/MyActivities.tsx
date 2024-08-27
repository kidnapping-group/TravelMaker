"use client";

import { getActivitiesRes } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { LinkButton } from "@/components/Button";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

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

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-[100px] pt-[200px] text-3xl font-bold">
        <Image
          width={450}
          height={450}
          src="/images/spinner.png"
          alt="spinner"
          className="animate-[spin_1500ms_linear_infinite]"
        />
      </div>
    );
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <div className="relative h-[100vh] w-full max-w-[806px] px-4 pb-[140px]">
      <div className="relative z-10 flex w-full max-w-[800px] items-start justify-between bg-gray-100 pb-4 pt-2">
        <h1 className="text-3xl font-bold">내 체험 관리</h1>
        <LinkButton href="/myactivities/add" variant="default" size="medium">
          체험 등록하기
        </LinkButton>
      </div>
      {hasActivities ? (
        <div className="h-full pb-20">
          <div className="h-full overflow-y-auto" onScroll={handleScroll}>
            {data?.pages.map(page => (
              <div key={page.cursorId} className="flex flex-col gap-[24px]">
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center tablet:w-[800px]">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-2xl font-medium text-gray-500">아직 등록한 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}

export default MyActivities;
