import { Activities } from "@/apis/API.type";
import Dropdown from "@/components/Dropdown";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";

interface SelectedActivityProps {
  activities: Activities[];
  setSelectedId: Dispatch<SetStateAction<number>>;
}

function SelectedActivity({ activities, setSelectedId }: SelectedActivityProps) {
  const activitiesMap = useRef(new Map(activities.map(activity => [activity.title, activity])));

  const menuItems = useMemo(() => activities.map(activity => activity.title), [activities]);

  const handleDropdownChange = (selectedTitle: string) => {
    const selectedActivity = activitiesMap.current.get(selectedTitle);
    if (selectedActivity) {
      setSelectedId(selectedActivity.id);
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-1">
      <p className="text-md font-normal">체험명</p>
      <Dropdown menuItems={menuItems} wide onChangeDropdown={handleDropdownChange} />
    </div>
  );
}

export default SelectedActivity;
