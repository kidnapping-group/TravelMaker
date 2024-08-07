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
  }, [isOpen]);

  const toggleNotification = () => {
    setIsOpen(prev => !prev);
  };

  const handleDelete = async (notificationId: number) => {
    await myNotificationsAPI.delete(notificationId);
    setRefresh(prev => !prev);
  };

  return (
    <div className="relative inline-block">
      <Image
        className="cursor-pointer tablet:z-30"
        src="/icons/icon-notification.svg"
        width={24}
        height={24}
        alt="알람"
        onClick={toggleNotification}
      />
      {hasNewNotifications && (
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
      )}

      {isOpen && (
        <div className="fixed inset-0 mx-auto flex max-w-[1224px] tablet:absolute tablet:left-[-340px] tablet:top-[35px]">
          <div
            ref={notificationRef}
            className="overflow relative h-full w-full bg-gray-400 px-[14px] py-6 tablet:absolute tablet:h-[494px] tablet:w-[368px] tablet:rounded-[10px] pc:absolute"
          >
            <div className="flex h-full w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-20px font-bold">알림 {data.totalCount}개</p>
                <Image
                  className="cursor-pointer"
                  src="/icons/icon-close-black.svg"
                  width={24}
                  height={24}
                  alt="닫기"
                  onClick={toggleNotification}
                />
              </div>
              <div className="flex h-full flex-col gap-2 overflow-y-auto">
                {data.notifications.length > 0 ? (
                  data.notifications.map(notification => (
                    <AlertItem
                      key={notification.id}
                      id={notification.id}
                      content={notification.content}
                      updatedAt={notification.updatedAt}
                      onClick={handleDelete}
                    />
                  ))
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-5 rounded-[12px] bg-gray-400 tablet:h-[416px] tablet:w-[334px]">
                    <Image
                      src="/icons/icon-exist-notification.svg"
                      width={150}
                      height={150}
                      alt="알람이 없을 때"
                    />
                    <p className="text-[20px] font-bold text-gray-500">알림이 존재하지 않습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
