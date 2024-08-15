import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import useDeleteActivityMutation from "@/app/[activityId]/_hooks/useDeleteActivityMutation";
import { getActivitySchedules, getActivityUserId } from "@/app/[activityId]/_utils/getActivityData";
import getCookiesUserID from "@/app/[activityId]/_utils/getCookiesUserId";
import isReservationAvailable from "@/app/[activityId]/_utils/isReservationAvailable";
import { activityIdOptions } from "@/app/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const useControlDropdownMenu = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const schedules = getActivitySchedules(data);
  const { deleteActivityMutation } = useDeleteActivityMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isReservation = isReservationAvailable(schedules);
  const activityUserId = getActivityUserId(data);
  const userId = getCookiesUserID();

  const isUser = activityUserId === userId;

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
    isUser,
    userId,
  };
};

export default useControlDropdownMenu;
