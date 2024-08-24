"use client";

import { getNotificationsRes } from "@/apis/API.type";
import myNotificationsAPI from "@/apis/myNotificationsAPI";
import AlertItem from "@/app/_components/Notification/AlertItem";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<getNotificationsRes>({
    totalCount: 0,
    notifications: [],
    cursorId: null,
  });
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NotificationData = async () => {
      const response = await myNotificationsAPI.get();
      setData(response);

      const currentNotification = response.totalCount.toString();
      const prevNotification = localStorage.getItem("prevNotification");
      setHasNewNotifications(currentNotification !== prevNotification);
    };

    NotificationData();
  }, [refresh]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        localStorage.setItem("prevNotification", data.totalCount.toString());
        setHasNewNotifications(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, data.totalCount]);

  const toggleNotification = () => {
    setIsOpen(prev => !prev);
  };

  const handleDelete = async (notificationId: number) => {
    await myNotificationsAPI.delete(notificationId);
    setRefresh(prev => !prev);
  };

  return (
    <div className="relative flex">
      <button
        className="rounded-lg p-1 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
        onClick={toggleNotification}
      >
        <Image
          src="/icons/Icon-notification.svg"
          width={24}
          height={24}
          alt="알람"
          draggable={false}
        />
        {hasNewNotifications && (
          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 flex h-[400px] w-[350px] flex-col rounded-lg bg-gray-100 p-5"
          ref={notificationRef}
        >
          <p className="text-md font-normal">알림 {data.totalCount}개</p>

          <div className="mt-3 flex h-full flex-col gap-3 overflow-y-auto">
            {data.notifications.length > 0 ? (
              data.notifications.map(({ id, content, updatedAt }) => (
                <AlertItem
                  key={id}
                  id={id}
                  content={content}
                  updatedAt={updatedAt}
                  onClick={handleDelete}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-5">
                <Image
                  src="/icons/icon-exist-notification.svg"
                  width={40}
                  height={40}
                  alt="꺼진 알람 아이콘"
                />
                <p className="text-lg font-medium text-gray-400">알림이 존재하지 않습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
