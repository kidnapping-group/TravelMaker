import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const modalControls: { [key: string]: (isOpen: boolean) => void } = {};

function Modal({ id, title, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef((open: boolean) => setIsOpen(open));

  useEffect(() => {
    modalControls[id] = controlRef.current;
    return () => {
      delete modalControls[id];
    };
  }, [id]);

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

  return createPortal(
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
    </div>,
    document.body,
  );
}

export const openModal = (id: string) => {
  modalControls[id]?.(true);
};

export const closeModal = (id: string) => {
  modalControls[id]?.(false);
};

export default Modal;
