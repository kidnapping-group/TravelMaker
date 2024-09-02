"use client";

import useEmblaCarousel from "embla-carousel-react";
import { createContext, useContext } from "react";

type SwiperContextProps = {
  swiperRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const SwiperContext = createContext<SwiperContextProps | null>(null);

function useSwiper() {
  const context = useContext(SwiperContext);

  if (!context) {
    throw new Error("useSwiper 훅은 Swiper 컴포넌트 내부에 존재해야 합니다.");
  }

  return context;
}

export { SwiperContext, useSwiper };
