"use client";

import Notification from "@/app/_components/Notification/page";
import { useState } from "react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  const mockData = {
    totalCount: 3,
    notifications: [
      {
        id: 1843,
        teamId: "4-15",
        userId: 732,
        content: "함께 배우면 즐거운 스트릿댄스(2024-08-01 11:00~13:00) 예약이 승인되었습니다.",
        createdAt: "2024-07-31T14:48:57.339Z",
        updatedAt: "2024-07-31T14:48:57.338Z",
        deletedAt: null,
      },
      {
        id: 1842,
        teamId: "4-15",
        userId: 732,
        content: "함께 배우면 즐거운 스트릿댄스(2024-08-01 11:00~13:00) 예약이 거절되었습니다.",
        createdAt: "2024-07-31T14:27:57.339Z",
        updatedAt: "2024-07-31T14:27:57.338Z",
        deletedAt: null,
      },
      {
        id: 1841,
        teamId: "4-15",
        userId: 732,
        content: "함께 배우면 즐거운 스트릿댄스(2024-08-01 12:00~13:00) 예약이 새로 들어왔어요.",
        createdAt: "2024-07-31T13:59:43.793Z",
        updatedAt: "2024-07-31T13:59:43.793Z",
        deletedAt: null,
      },
      {
        id: 1841,
        teamId: "4-15",
        userId: 732,
        content: "함께 배우면 즐거운 스트릿댄스(2024-08-01 12:00~13:00) 예약이 도착 했습니다..",
        createdAt: "2024-07-31T13:59:43.793Z",
        updatedAt: "2024-07-31T13:59:43.793Z",
        deletedAt: null,
      },
    ],
    cursorId: null,
  };
  return (
    <div className="z-30">
      <Notification data={mockData} onClose={handleClickNotification} />
    </div>
  );
}
export default Home;
