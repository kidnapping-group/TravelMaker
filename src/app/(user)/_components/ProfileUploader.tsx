import userAPI from "@/apis/usersAPI";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  profileImageUrl: string | null;
  register: UseFormRegisterReturn;
}

function ProfileUploader({ profileImageUrl, register }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(profileImageUrl);

  const handleInputClick = () => inputRef.current?.click();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await userAPI.postUsersImage(formData);

        const imageUrl = response.profileImageUrl;
        setImage(imageUrl);

        // eslint-disable-next-line no-console
        console.log("업로드된 이미지 URL:", imageUrl);
        register.onChange(e);
      } catch (error) {
        // cosole.error("이미지 업로드 실패:", error);
      }
    }
  };

  const handleImageReset = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative h-[130px] w-[130px] rounded-full tablet:h-[200px] tablet:w-[200px] pc:h-[200px] pc:w-[200px]">
      <Image
        src={image || "/icons/icon-profile.svg"}
        alt={image ? "업로드 이미지" : "기본 이미지"}
        width={200}
        height={200}
        priority
        className="h-[100px] w-[100px] rounded-full tablet:h-[200px] tablet:w-[200px] pc:h-[200px] pc:w-[200px]"
      />
      <div className="absolute bottom-0 right-0">
        <button type="button" className="rounded-full bg-primary-600 p-4">
          <Image
            src="/icons/icon-setting-white.svg"
            alt="프로필 수정 더보기 아이콘"
            width={30}
            height={30}
            priority
          />
        </button>

        <button
          type="button"
          className="absolute left-[80px] top-[-60px] h-[50px] w-[50px] rounded-full bg-primary-500 p-4"
          onClick={handleInputClick}
        >
          <Image
            src="/icons/icon-pen.svg"
            alt="프로필 수정 아이콘"
            width={30}
            height={30}
            priority
          />
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
          className="absolute left-[80px] top-[10px] h-[50px] w-[50px] rounded-full bg-primary-500 p-4"
          onClick={handleImageReset}
        >
          <Image
            src="/icons/icon-back.svg"
            alt="프로필 되돌리기 아이콘"
            width={30}
            height={30}
            priority
          />
        </button>
      </div>
    </div>
  );
}

export default ProfileUploader;
