import useDeleteActivityMutation from "@/app/[activityId]/_hooks/useDeleteActivityMutation";
import errorHandlers, { PopupProps } from "@/app/[activityId]/_utils/errorHandler";
import { openPopup } from "@/components/Popup";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useActivityErrorPopup() {
  const { isError, error } = useDeleteActivityMutation();
  const [popupProps, setPopupProps] = useState<PopupProps | null>(null);

  useEffect(() => {
    if (isError && axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const handler = errorHandlers[statusCode as keyof typeof errorHandlers];

      if (handler) {
        setPopupProps(handler());
        openPopup();
      }
    }
  }, [isError, error]);

  return { popupProps };
}
