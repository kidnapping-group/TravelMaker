"use client";

import { useState } from "react";

import { Activities } from "@/apis/API.type";

import Calendar from "./Calendar";
import MyActivitiesDropdown from "./MyActivitiesDropdown";

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
