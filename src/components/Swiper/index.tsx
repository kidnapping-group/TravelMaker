"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { Children, useCallback, useEffect, useMemo, useState } from "react";

import { NextButton, PreviousButton } from "./Button";
import { SwiperContext } from "./Context";

type SwiperApi = UseEmblaCarouselType[1];

function Swiper({ children }: React.PropsWithChildren) {
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
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  );

  return (
    <SwiperContext.Provider value={context}>
      <div className="relative">
        <div ref={swiperRef} className="overflow-hidden">
          <div className="-ml-2 flex">
            {Children.map(children, child => (
              <div className="min-w-0 shrink-0 grow-0 pl-2 pc:basis-1/4">{child}</div>
            ))}
          </div>
        </div>
        <div className="hidden pc:block">
          <PreviousButton />
          <NextButton />
        </div>
      </div>
    </SwiperContext.Provider>
  );
}

export default Swiper;
