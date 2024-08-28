"use client";

import formatTime from "@/utils/formatTime";
import { FaXmark } from "react-icons/fa6";

interface AlertItemProps {
  id: number;
  content: string;
  updatedAt: string;
  onClick: (id: number) => void;
}

function AlertItem({ id, content, updatedAt, onClick }: AlertItemProps) {
  const activityNameEnd = content.indexOf("예약이") + 3;
  const activityName = content.slice(0, activityNameEnd).trim();
  const status = content.slice(activityNameEnd, activityNameEnd + 3).trim();
  const conclusion = content.slice(activityNameEnd + 3).trim();

  let bgColor = "";
  let textColor = "";

  switch (status) {
    case "승인":
      bgColor = "bg-blue-500";
      textColor = "text-blue-500";
      break;
    case "거절":
      bgColor = "bg-red-500";
      textColor = "text-red-500";
      break;
    default:
      bgColor = "bg-green-500";
      textColor = "text-green-500";
      break;
  }

  return (
    <div className="relative mr-1 flex flex-col gap-1 rounded-lg bg-white p-3">
      <div className={`absolute left-3 my-2 ml-[2px] h-[5px] w-[5px] rounded-full ${bgColor}`} />
      <button
        className="absolute right-2 top-2 rounded-lg p-1 text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
        onClick={() => onClick(id)}
      >
        <FaXmark size={18} />
      </button>
      <div className="mt-6">
        <p className="text-md leading-5">
          {activityName} <span className={`${textColor} font-bold`}>{status}</span>
          {conclusion}
        </p>
        <p className="mt-2 text-xs text-gray-400">{formatTime(updatedAt)}</p>
      </div>
    </div>
  );
}
export default AlertItem;
