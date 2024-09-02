"use client";

import { Children } from "react";

import { useSwiper } from "./context";

interface ContentProps extends React.PropsWithChildren {
  isPcFixed?: boolean;
}

function Content({ isPcFixed = false, children }: ContentProps) {
  const { swiperRef } = useSwiper();

  return (
    <div ref={swiperRef} className="overflow-hidden">
      <div className={`-ml-3 flex ${isPcFixed ? "pc:-ml-4" : ""}`}>
        {Children.map(children, child => (
          <div
            className={`min-w-0 shrink-0 grow-0 pl-3 ${isPcFixed ? "pc:basis-1/4 pc:pl-4" : ""}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
