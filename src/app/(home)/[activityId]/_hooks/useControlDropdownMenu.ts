import useDeleteActivityMutation from "@/app/(home)/[activityId]/_hooks/useDeleteActivityMutation";
import { useEffect, useRef, useState } from "react";

const useControlDropdownMenu = () => {
  const { deleteActivityMutation } = useDeleteActivityMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  };
};

export default useControlDropdownMenu;
