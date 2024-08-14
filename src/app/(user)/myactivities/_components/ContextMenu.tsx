'use client'

import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { openPopup } from "@/components/Popup";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function ContextMenu({
  activityId,
  onCloseContext,
}: {
  activityId: number;
  onCloseContext: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const confirm = searchParams.get("confirm");

  useEffect(() => {
    if (confirm) {
      myActivitiesAPI.delete(activityId);
    }
  }, [confirm]);

  const handleClickEdit = () => {
    router.push(`/myactivity/edit/${activityId}`);
  };

  const handleClickDelete = async () => {
    openPopup();

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