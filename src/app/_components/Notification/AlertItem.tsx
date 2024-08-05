"use client";

import myNotificationsAPI from "@/apis/myNotificationsAPI";
import ContentStatus from "@/utils/ContentStatus";
import formatTime from "@/utils/formatTime";
import Image from "next/image";

interface AlertData {
  id: number;
  content: string;
  updatedAt: string;
}

function AlertItem({ id, content, updatedAt }: AlertData) {
  const status = ContentStatus(content);
  const handleDelete = async (notificationId: number) => {
    await myNotificationsAPI.delete(notificationId);
  };
  return (
    <div className="flex flex-col gap-1 rounded-[5px] border bg-white px-4 py-3 text-md tablet:h-[126px] tablet:w-[328px]">
      <div className="flex items-center justify-between">
        {/* <Image src={status.src} width={5} height={5} alt="ellipse" /> */}
        <div className={`h-[5px] w-[5px] rounded-[5px] bg-${status.color}`}/>
        <Image
          src="/icons/icon-close-gary-bold.svg"
          width={24}
          height={24}
          alt="알람삭제"
          onClick={() => handleDelete(id)}
        />
      </div>
      <p>{status.text}</p>
      <p>{formatTime(updatedAt)}</p>
    </div>
  );
}

export default AlertItem;
