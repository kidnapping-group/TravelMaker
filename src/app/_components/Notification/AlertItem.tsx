"use client";

import myNotificationsAPI from "@/apis/myNotificationsAPI";
import formatTime from "@/utils/formatTime";
import Image from "next/image";

interface AlertData {
  id: number;
  content: string;
  updatedAt: string;
}

const contentStatus = (content: string): { text: JSX.Element[]; color: string } => {
  const activityNameEnd = content.indexOf("예약이") + 3;
  const activityName = content.slice(0, activityNameEnd).trim();
  const status = content.slice(activityNameEnd, activityNameEnd + 3).trim();
  const conclusion = content.slice(activityNameEnd + 3).trim();

  let color = "";
  if (status === "승인") {
    color = "blue-500";
  } else if (status === "거절") {
    color = "red-500";
  } else {
    color = "green-500";
  }
  const text = [
    <span key="1">{activityName} </span>,
    <span key="2" className={`text-${color} font-bold`}>
      {status}
    </span>,
    <span key="3">{conclusion}</span>,
  ];

  return { text, color };
};

function AlertItem({ id, content, updatedAt }: AlertData) {
  const status = contentStatus(content);
  const handleDelete = async (notificationId: number) => {
    await myNotificationsAPI.delete({ NotificationId: notificationId });
  };
  return (
    <div className="flex flex-col gap-1 rounded-[5px] border bg-white px-4 py-3 text-md tablet:h-[126px] tablet:w-[328px]">
      <div className="flex items-center justify-between">
        <div className={`h-[5px] w-[5px] rounded-[5px] bg-${status.color}`} />
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
