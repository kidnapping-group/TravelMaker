import { Activities } from "@/apis/API.type";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/Dropdown";
import { Dispatch, SetStateAction, useMemo } from "react";

interface MyActivitiesDropdownProps {
  activities: Activities[];
  setSelectedId: Dispatch<SetStateAction<number>>;
}

function MyActivitiesDropdown({ activities, setSelectedId }: MyActivitiesDropdownProps) {
  const myActivities = useMemo(
    () =>
      activities.map(activity => ({
        title: activity.title,
        id: activity.id,
      })),
    [activities],
  );

  const handleClickActivity = (value: string) => {
    setSelectedId(Number(value));
  };

  return (
    <div className="mt-2 flex flex-col gap-1">
      <p className="text-md font-normal">체험명</p>
      <Dropdown onSelect={handleClickActivity} wide>
        <DropdownTrigger />
        <DropdownContent>
          {myActivities.map(({ title, id }) => (
            <DropdownItem key={id} value={String(id)}>
              {title}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

export default MyActivitiesDropdown;
