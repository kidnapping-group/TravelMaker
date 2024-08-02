import AlertItem from "@/app/_components/Notification/AlertItem";
import Image from "next/image";

export type NotificationListResponseData = {
  totalCount: number;
  notifications: Array<Notifications>;
  cursorId: null;
};
export type Notifications = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

interface NotificationModalProps {
  data: NotificationListResponseData;
  onClose: () => void; // onClose 함수
}

function Notification({ data, onClose }: NotificationModalProps) {
  const notifications = data?.notifications || [];

  return (
    <div className="fixed inset-0 z-50 flex tablet:relative pc:relative">
      <div className="bg-red10 relative h-full w-full overflow-y-auto rounded-10px border tablet:absolute tablet:right-30 tablet:top-12px tablet:h-400px tablet:w-350px pc:absolute pc:right-0 pc:top-12px pc:h-400px pc:w-350px">
        <div className="flex h-full w-full flex-col gap-12px px-20px py-24px">
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
          <div
            className="flex flex-col gap-12px"
          >
            {notifications.map(notification => (
              <AlertItem key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;

