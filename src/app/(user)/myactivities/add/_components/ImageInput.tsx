import Image from "next/image";
import { ChangeEvent } from "react";

import activitiesAPI from "@/apis/activitiesAPI";

import DeleteButton from "./DeleteButton";

interface ImageInputProps {
  bannerImageUrl: string;
  setBannerImageUrl: (bannerImageUrl: string) => void;
}

function ImageInput({ bannerImageUrl, setBannerImageUrl }: ImageInputProps) {
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = await activitiesAPI.postImage(file);
      setBannerImageUrl(imageUrl.activityImageUrl);
    }
  };

  const handleDelete = () => {
    setBannerImageUrl("");
  };

  return (
    <div className="mb-8 flex gap-2">
      <label
        htmlFor="image-upload"
        className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-[4px] bg-gray-100 font-medium hover:bg-gray-500 hover:text-white"
      >
        파일 업로드하기
      </label>
      <input
        className="hidden"
        name="image-upload"
        id="image-upload"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        required
      />

      {bannerImageUrl && (
        <div className="relative h-40 w-40 rounded-[4px] border border-gray-500">
          <Image className="rounded-[4px]" fill src={bannerImageUrl} alt="배너이미지" />
          <DeleteButton onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default ImageInput;
