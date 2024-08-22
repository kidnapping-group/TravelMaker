"use client";

import { Children, useEffect, useState } from "react";

interface CarouselProps {
  interval?: number;
  children: React.ReactNode[];
}

function Carousel({ interval = 3000, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = children.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
    }, interval);

    return () => clearInterval(intervalId);
  }, [totalItems, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 캐러셀 동작 부분 */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Children.map(children, child => (
          <div className="relative h-full w-full flex-shrink-0">{child}</div>
        ))}
      </div>

      {/* 캐러셀 버튼 */}
      <div className="absolute left-1/2 top-6 z-[5] flex -translate-x-1/2 space-x-3">
        {Array.from({ length: children.length }).map((_, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
