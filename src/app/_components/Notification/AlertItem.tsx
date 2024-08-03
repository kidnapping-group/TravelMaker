"use client";

import ContentStatus from "@/utils/ContentStatus";
import formatTime from "@/utils/formatTime";
import Image from "next/image";

type Notification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

function AlertItem({ notification }: { notification: Notification }) {
  const Status = ContentStatus(notification.content);
  // const handleDelete = async (id: number) => {
  //   await myNotificationAPI.delete(id);
  // };
  return (
    <div className="bg-white px-4 py-3 rounded-[5px] border flex flex-col gap-1 font-[14px] tablet:h-[126px] tablet:w-[328px] pc:h-[126px] pc:w-[328px]">
      <div className="flex items-center justify-between">
        <Image src={Status.src} width={5} height={5} alt="" />
        <Image
          src="/icons/icon-close-gary-bold.svg"
          width={24}
          height={24}
          alt="알람삭제"
          // onClick={() => handleDelete(notification.id)}
        />
      </div>
      <p>{Status.text}</p>
      <p>{formatTime(notification.updatedAt)}</p>
    </div>
  );
}

export default AlertItem;
