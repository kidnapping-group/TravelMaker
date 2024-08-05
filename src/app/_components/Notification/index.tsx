import { getNotificationsRes } from "@/apis/API.type";
import AlertItem from "@/app/_components/Notification/AlertItem";
import Image from "next/image";

interface NotificationProps {
  data: getNotificationsRes;
  onClose: () => void;
}

function Notification({ data, onClose }: NotificationProps) {
  const notifications = data?.notifications || [];

  return (
    <div className="fixed inset-0 z-50 flex tablet:relative pc:relative">
      <div className="overflow tablet:top-12px relative h-full w-full bg-gray-400 px-[14px] py-6 tablet:absolute tablet:h-[494px] tablet:w-[368px] tablet:rounded-[10px] pc:absolute">
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-20px font-bold">알림 {data.totalCount}개</p>
            <Image
              className="cursor-pointer"
              src="/icons/icon-close-black.svg"
              width={24}
              height={24}
              alt="닫기"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {notifications.map(notification => (
              <AlertItem
                key={notification.id}
                id={notification.id}
                content={notification.content}
                updatedAt={notification.updatedAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
