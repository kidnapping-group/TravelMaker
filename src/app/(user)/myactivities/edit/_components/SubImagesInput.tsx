import activitiesAPI from "@/apis/activitiesAPI";
import DeleteButton from "@/app/(user)/myactivities/edit/_components/DeleteButton";
import Image from "next/image";
import { ChangeEvent } from "react";

interface ImageItem {
  id: number | null; // 기존 이미지면 ID, 새 이미지면 null
  imageUrl: string;
}

interface SubImagesInputProps {
  subImageUrls: ImageItem[];
  setSubImageUrls: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  setSubImageIdsToRemove: React.Dispatch<React.SetStateAction<number[]>>;
}
function SubImagesInput({
  subImageUrls,
  setSubImageUrls,
  setSubImageIdsToRemove,
}: SubImagesInputProps) {
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map(async file => {
          const imageUrl = await activitiesAPI.postImage(file);
          return { id: null, imageUrl: imageUrl.activityImageUrl };
        }),
      );

      setSubImageUrls(prev => [...prev, ...newImages]);
    }
  };

  const handleDelete = (id: number | null, index: number) => {
    if (id !== null) {
      setSubImageIdsToRemove(prev => [...prev, id]);
    }

    setSubImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-8">
      <label htmlFor="images-upload">
        <div className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-[4px] bg-gray-100 font-medium hover:bg-gray-500 hover:text-white">
          파일 업로드하기
        </div>
      </label>
      <input
        name="images-upload"
        id="images-upload"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        multiple
        disabled={subImageUrls.length >= 4}
        className="hidden"
      />

      {subImageUrls.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {subImageUrls.map(({ id, imageUrl }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="relative h-40 w-40 rounded-[4px] border border-gray-500">
              <Image
                className="rounded-[4px]"
                fill
                src={imageUrl}
                alt={`소개 이미지 ${index + 1}`}
              />
              <DeleteButton onClick={() => handleDelete(id, index)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubImagesInput;
