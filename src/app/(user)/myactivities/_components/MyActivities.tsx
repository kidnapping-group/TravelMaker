"use client";

import { getActivitiesRes } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { LinkButton } from "@/components/Button";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import MyActivityItem from "./MyActivityItem";

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
  const { data, status, error } = useMyActivities();

  const hasActivities = data?.pages.some(page => page.activities.length > 0);

  if (status === "pending")
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
    <div className="relative mx-auto h-full w-full max-w-[806px] flex-col items-center justify-center px-4">
      <div className="z-10 flex max-w-[800px] flex-grow items-start justify-between bg-gray-100 pb-6">
        <h1 className="text-3xl font-bold">내 체험 관리</h1>
        <LinkButton href="/myactivities/register" variant="default" size="medium">
          체험 등록하기
        </LinkButton>
      </div>
      {hasActivities ? (
        <div className="h-full overflow-y-auto pb-[72px]">
          <div>
            {data.pages.map(page => (
              <div key={crypto.randomUUID()} className="flex flex-col gap-[24px]">
                {page.activities.map(activity => (
                  <MyActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ))}
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
