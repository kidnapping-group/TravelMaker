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
  const handleDeleteNotification = () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <Image src="/icons/icon-ellipse-blue.svg" width={5} height={5} alt="" />
        <Image
          src="/icons/icon-close-gary-bold.svg"
          width={24}
          height={24}
          alt="알람삭제"
          onClick={handleDeleteNotification}
        />
      </div>
      <p>{notification.content}</p>
      <p>1분전</p>
    </div>
  )
}

export default AlertItem;
