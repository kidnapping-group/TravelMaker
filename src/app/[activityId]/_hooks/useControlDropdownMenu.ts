import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import useDeleteActivityMutation from "@/app/[activityId]/_hooks/useDeleteActivityMutation";
import { getActivitySchedules } from "@/app/[activityId]/_utils/getActivityData";
import isMyActivity from "@/app/[activityId]/_utils/isMyActivity";
import isReservationAvailable from "@/app/[activityId]/_utils/isReservationAvailable";
import { activityIdOptions, myActivitiesOptions } from "@/app/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const useControlDropdownMenu = () => {
  const { activityId } = useActivityId();
  const { data: activityIdData } = useSuspenseQuery(activityIdOptions(activityId));
  const schedules = getActivitySchedules(activityIdData);
  const { data: myActivitiesData } = useSuspenseQuery(myActivitiesOptions());
  const isMyActivityId = isMyActivity(myActivitiesData.activities, activityId);
  const { deleteActivityMutation } = useDeleteActivityMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isReservation = isReservationAvailable(schedules);
  const handleDelete = (id: string) => {
    deleteActivityMutation.mutate(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    toggleDropdown,
    handleDelete,
    isReservation,
    isMyActivityId,
  };
};

export default useControlDropdownMenu;
