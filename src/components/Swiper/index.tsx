"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { NextButton, PreviousButton } from "./Button";
import Content from "./Content";
import { SwiperContext } from "./context";

type SwiperApi = UseEmblaCarouselType[1];

function Swiper({ children }: { children: React.ReactNode }) {
  const [swiperRef, api] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((swiperApi: SwiperApi) => {
    if (!swiperApi) {
      return;
    }

    setCanScrollPrev(swiperApi.canScrollPrev());
    setCanScrollNext(swiperApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) {
      return undefined;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  const context = useMemo(
    () => ({
      swiperRef,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [swiperRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  );

  return (
    <SwiperContext.Provider value={context}>
      <div className="relative">{children}</div>
    </SwiperContext.Provider>
  );
}

export {
  Swiper,
  Content as SwiperContent,
  PreviousButton as SwiperPrevious,
  NextButton as SwiperNext,
};
