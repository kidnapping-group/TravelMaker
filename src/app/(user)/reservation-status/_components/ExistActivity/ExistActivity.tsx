"use client";

import { Activities } from "@/apis/API.type";
import Calendar from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar";
import SelectedActivity from "@/app/(user)/reservation-status/_components/ExistActivity/SelectedActivity";
import { useState } from "react";

function ExistActivity({ activities }: { activities: Activities[] }) {
  const [selectedId, setSelectedId] = useState(activities[0].id);

  return (
    <div>
      <SelectedActivity activities={activities} setSelectedId={setSelectedId} />
      <Calendar selectedId={selectedId} />
    </div>
  );
}

export default ExistActivity;
