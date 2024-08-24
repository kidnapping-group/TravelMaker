"use client";

import { getNotificationsRes } from "@/apis/API.type";
import myNotificationsAPI from "@/apis/myNotificationsAPI";
import AlertItem from "@/app/_components/Notification/AlertItem";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Notification() {
  const { isMobile } = useMediaQuery();

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

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

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
        className="rounded-lg p-1 transition hover:opacity-60 tablet:hover:bg-gray-100 tablet:hover:opacity-100 tablet:active:bg-gray-200"
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
          className="fixed inset-0 z-30 flex flex-col rounded-lg bg-gray-100 p-5 tablet:absolute tablet:inset-auto tablet:right-0 tablet:top-full tablet:mt-1 tablet:h-[400px] tablet:w-[350px]"
          ref={notificationRef}
        >
          <div className="relative flex items-center justify-center tablet:justify-start">
            <button
              className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-lg text-lg hover:bg-gray-200 active:bg-gray-300 tablet:hidden"
              type="button"
              onClick={toggleNotification}
            >
              {"<"}
            </button>
            <p className="text-lg font-normal tablet:text-md">알림 {data.totalCount}개</p>
          </div>

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
