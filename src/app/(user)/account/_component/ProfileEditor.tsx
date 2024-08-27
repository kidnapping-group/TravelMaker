import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaGear, FaPen } from "react-icons/fa6";
import { RiArrowGoBackLine } from "react-icons/ri";

interface ProfileEditorProps {
  profileImage: string | null;
  register: UseFormRegisterReturn;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageReset: () => void;
}

function ProfileEditor({
  register,
  profileImage,
  onChangeImage,
  onImageReset,
}: ProfileEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = () => inputRef.current?.click();

  const handleResetAndClearInput = () => {
    onImageReset();
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
      <div className="absolute bottom-2 right-2">
        <button
          type="button"
          className="rounded-full bg-primary-500 p-3 transition-colors hover:bg-primary-600"
          onClick={toggleButtons}
        >
          <FaGear size={20} color="white" />
        </button>

        <button
          type="button"
          className={`absolute left-[65px] top-[-20px] rounded-full bg-primary-500 p-3 transition-all duration-300 ease-in-out hover:bg-primary-600 ${
            isOpen
              ? "translate-x-[10px] translate-y-[-40px] scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
          onClick={handleInputClick}
        >
          <FaPen size={20} color="white" />
          <input
            type="file"
            accept="image/*"
            {...register}
            ref={inputRef}
            onChange={onChangeImage}
            className="hidden"
          />
        </button>

        <button
          type="button"
          className={`absolute left-[65px] top-[40px] rounded-full bg-primary-500 p-3 transition-all duration-300 ease-in-out hover:bg-primary-600 ${
            isOpen
              ? "translate-x-[10px] translate-y-[-30px] scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
          onClick={handleResetAndClearInput}
        >
          <RiArrowGoBackLine size={20} color="white" />
        </button>
      </div>
    </div>
  );
}

export default ProfileEditor;
