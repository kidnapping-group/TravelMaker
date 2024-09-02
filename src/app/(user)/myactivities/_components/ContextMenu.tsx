"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { openPopup } from "@/components/Popup";

function ContextMenu({
  activityId,
  onCloseContext,
}: {
  activityId: number;
  onCloseContext: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClickEdit = () => {
    router.push(`/myactivities/edit/${activityId}`);
  };

  const handleClickDelete = async () => {
    openPopup("cancel");

    onCloseContext();
    queryClient.invalidateQueries({ queryKey: ["myActivities"] });
  };

  return (
    <div className="absolute -bottom-[110px] right-5 z-30 h-[120px] w-[160px] rounded-md border bg-white">
      <button
        type="button"
        className="font-middle flex h-[60px] w-[160px] items-center justify-center rounded-t-md border text-2lg"
        onClick={handleClickEdit}
      >
        수정하기
      </button>
      <button
        type="button"
        className="font-middle flex h-[60px] w-[160px] items-center justify-center rounded-b-md border text-2lg"
        onClick={handleClickDelete}
      >
        삭제하기
      </button>
    </div>
  );
}

export default ContextMenu;
