"use client";

import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps extends React.PropsWithChildren {
  title: string;
}

let modalToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;

function Modal({ children, title }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  modalToggle = setIsOpen;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
      <div className="h-full w-full bg-white shadow-lg tablet:h-auto tablet:w-[460px] tablet:rounded-lg">
        <div className="flex items-center justify-between p-4 tablet:p-6">
          <h1 className="text-[28px] font-bold">{title}</h1>
          <button
            className="rounded-lg p-1 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <FaXmark size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export const openModal = () => modalToggle?.(true);
export const closeModal = () => modalToggle?.(false);

export default Modal;
