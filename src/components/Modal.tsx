"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
}

function Modal({ children, title }: ModalProps) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-11/12 rounded-lg bg-white shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex flex-row items-center justify-between border-b p-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button type="button" onClick={() => router.back()}>
            <Image width={40} height={40} alt="창 닫기" src="/icons/icon-close-black.svg" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
