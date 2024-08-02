"use client";

import Notification from "@/app/_components/Notification/page";
import { useState } from "react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  const mockData = {
    totalCount: 0,
    notifications: [],
    cursorId: null,
  };
  return (
    <div className="z-30">
      <Notification data={mockData} onClose={handleClickNotification} />
    </div>
  );
}
export default Home;
