import { openPopup } from "@/components/Popup";
import { useCallback, useEffect, useState } from "react";

const useErrorPopupConfig = (error: Error | null) => {
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  useEffect(() => {
    if (errorMessage) {
      openPopup(errorMessage);
    }
  }, [errorMessage]);

  const handleErrorPopup = useCallback(() => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("알 수 없는 오류가 발생했습니다.");
    }
  }, [error]);

  return { errorMessage, setErrorMessage, handleErrorPopup };
};

export default useErrorPopupConfig;
