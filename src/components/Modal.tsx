"use client";

import Image from "next/image";
import { useState } from "react";

interface ModalProps extends React.PropsWithChildren {
  title: string;
}

let modalToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;

function Modal({ children, title }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  modalToggle = setIsOpen;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
      <div className="h-full w-full bg-white shadow-lg tablet:h-auto tablet:w-[430px] tablet:rounded-lg">
        <div className="flex items-center justify-between px-4 pt-4 tablet:px-6 tablet:pt-6">
          <h1 className="text-28px font-bold">{title}</h1>
          <button type="button" onClick={() => setIsOpen(false)}>
            <Image width={40} height={40} alt="창 닫기" src="/icons/icon-close-black.svg" />
          </button>
        </div>
        {children}
        <div className="h-160px tablet:hidden" />
      </div>
    </div>
  );
}

export const openModal = () => modalToggle?.(true);
export default Modal;
