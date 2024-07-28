"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  size?: "small" | "normal" | "large";
  bg?: string;
}

const sizeConfig = {
  small: { width: "tablet:w-[368px]", padding: "tablet:px-5", imgSize: 24, fontSize: "text-xl" },
  normal: { width: "tablet:w-[430px]", padding: "tablet:px-6", imgSize: 40, fontSize: "text-28px" },
  large: { width: "tablet:w-[490px]", padding: "tablet:px-6", imgSize: 40, fontSize: "text-28px" },
};
let modalToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;

function Modal({ children, title, size = "normal", bg = "white" }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  modalToggle = setIsOpen;

  if (!isOpen) return null;
  const { width, padding, imgSize, fontSize } = sizeConfig[size];

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
      <div className={`h-full w-full bg-${bg} shadow-lg tablet:h-auto ${width} tablet:rounded-lg`}>
        <div className={`flex items-center justify-between px-4 pt-4 ${padding} tablet:pt-6`}>
          <h1 className={`${fontSize} font-bold`}>{title}</h1>
          <button type="button" onClick={() => setIsOpen(false)}>
            <Image
              width={imgSize}
              height={imgSize}
              alt="창 닫기"
              src="/icons/icon-close-black.svg"
            />
          </button>
        </div>
        {children}
        <div className="h-160px w-full" />
      </div>
    </div>
  );
}

export const openModal = () => modalToggle?.(true);
export default Modal;
