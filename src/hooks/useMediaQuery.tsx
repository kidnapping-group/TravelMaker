"use client";

import { useEffect, useState } from "react";

const useMediaQuery = () => {
  // 초기 상태를 설정합니다.
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");
    const pcQuery = window.matchMedia("(min-width: 1200px)");

    const updateMatches = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
      setIsPc(pcQuery.matches);
    };

    // 초기 상태 설정
    updateMatches();

    // change 이벤트 리스너 추가
    mobileQuery.addEventListener("change", updateMatches);
    tabletQuery.addEventListener("change", updateMatches);
    pcQuery.addEventListener("change", updateMatches);

    return () => {
      mobileQuery.removeEventListener("change", updateMatches);
      tabletQuery.removeEventListener("change", updateMatches);
      pcQuery.removeEventListener("change", updateMatches);
    };
  }, []);

  return { isMobile, isTablet, isPc };
};

export default useMediaQuery;
