import { useCallback, useState } from "react";

interface ImageErrorHandler {
  src: string | null;
  onError: () => void;
}

const useImageError = (fallbackSrc: string[]): ImageErrorHandler[] => {
  const [src, setSrc] = useState<(string | null)[]>(fallbackSrc.map(() => null));

  const createErrorHandler = (index: number) =>
    useCallback(() => {
      setSrc(prevSrc => {
        const newSrc = [...prevSrc];
        newSrc[index] = fallbackSrc[index];
        return newSrc;
      });
    }, [index]);

  return fallbackSrc.map((_, index) => ({
    src: src[index],
    onError: createErrorHandler(index),
  }));
};

export default useImageError;
