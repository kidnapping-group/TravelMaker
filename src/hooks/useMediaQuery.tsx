"use client";

import { useEffect, useState } from "react";

const useMediaQuery = () => {
  // 초기 상태를 설정합니다.
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    const updateMediaQuery = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1200);
      setIsPc(width >= 1200);
    };
    updateMediaQuery();
    window.addEventListener("resize", updateMediaQuery);
    return () => {
      window.removeEventListener("resize", updateMediaQuery);
    };
  }, []);

  return { isMobile, isTablet, isPc };
};

export default useMediaQuery;
