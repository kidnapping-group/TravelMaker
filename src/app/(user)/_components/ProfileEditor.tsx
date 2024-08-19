import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  profileImage: string | null;
  register: UseFormRegisterReturn;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageReset: () => void;
}

function ProfileEditor({ register, profileImage, handleImageChange, handleImageReset }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = () => inputRef.current?.click();

  const handleResetAndClearInput = () => {
    handleImageReset();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[130px] w-[130px] rounded-full tablet:h-[200px] tablet:w-[200px] pc:h-[200px] pc:w-[200px]"
    >
      <Image
        src={profileImage || "/images/defaultProfile.png"}
        alt={profileImage ? "업로드 이미지" : "기본 이미지"}
        width={200}
        height={200}
        priority
        className="h-[120px] w-[120px] rounded-full tablet:h-[200px] tablet:w-[200px] pc:h-[200px] pc:w-[200px]"
      />
      <div className="absolute bottom-0 right-0">
        <button
          type="button"
          className="rounded-full bg-primary-600 p-4 hover:bg-primary-800"
          onClick={toggleButtons}
        >
          <Image
            src="/icons/icon-setting-white.svg"
            alt="프로필 수정 더보기 아이콘"
            width={30}
            height={30}
          />
        </button>

        <button
          type="button"
          className={`absolute left-[65px] top-[-20px] h-[50px] w-[50px] rounded-full bg-primary-500 p-4 transition-all duration-300 ease-in-out hover:bg-primary-700 ${
            isOpen
              ? "translate-x-[10px] translate-y-[-40px] scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
          onClick={handleInputClick}
        >
          <Image src="/icons/icon-pen.svg" alt="프로필 수정 아이콘" width={30} height={30} />
          <input
            type="file"
            accept="image/*"
            {...register}
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </button>

        <button
          type="button"
          className={`absolute left-[65px] top-[40px] h-[50px] w-[50px] rounded-full bg-primary-500 p-4 transition-all duration-300 ease-in-out hover:bg-primary-700 ${
            isOpen
              ? "translate-x-[10px] translate-y-[-30px] scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
          onClick={handleResetAndClearInput}
        >
          <Image src="/icons/icon-back.svg" alt="프로필 되돌리기 아이콘" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}

export default ProfileEditor;
