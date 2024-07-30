"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type PopupType = "email" | "password" | "reservation";

interface PopupConfig {
  text: string;
  leftButton?: string;
  rightButton?: string;
  button?: string;
}

const popupConfig: Record<PopupType, PopupConfig> = {
  reservation: { text: "예약을 취소하시겠어요?", leftButton: "아니요", rightButton: "취소하기" },
  email: { text: "이미 사용중인 이메일입니다.", button: "확인" },
  password: { text: "비밀번호가 일치하지 않습니다.", button: "확인" },
};

let popupToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;

function Popup({ type }: { type: PopupType }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  popupToggle = setIsOpen;

  if (!isOpen) return null;

  const config = popupConfig[type];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div className="flex flex-col items-center justify-center">
        <p>{config.text}</p>
        <div className="flex items-center justify-center gap-5">
          {config.leftButton && (
            <button type="button" onClick={() => setIsOpen(false)} className="bg-blue p-4">
              {config.leftButton}
            </button>
          )}
          <Link
            href={`${pathname}?confirm=1`}
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-pink-400 p-4"
          >
            {config.rightButton || config.button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const openPopup = () => popupToggle?.(true);
export default Popup;
