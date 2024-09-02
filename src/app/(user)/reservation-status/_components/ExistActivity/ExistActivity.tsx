"use client";

import { Activities } from "@/apis/API.type";
import Calendar from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar";
import MyActivitiesDropdown from "@/app/(user)/reservation-status/_components/ExistActivity/MyActivitiesDropdown";
import { useState } from "react";

function ExistActivity({ activities }: { activities: Activities[] }) {
  const [selectedId, setSelectedId] = useState(activities[0].id);

  return (
    <>
      <MyActivitiesDropdown activities={activities} setSelectedId={setSelectedId} />
      <Calendar selectedId={selectedId} />
    </>
  );
}

export default ExistActivity;
