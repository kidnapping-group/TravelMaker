"use client";

import Image from "next/image";

import { useSwiper } from "./Context";

function PreviousButton() {
  const { scrollPrev, canScrollPrev } = useSwiper();

  return (
    <button
      className="absolute -left-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white ring-offset-white transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:hidden pc:flex"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      type="button"
    >
      <Image src="icons/icon-arrow-prev-pagination.svg" width={16} height={16} alt="이전 버튼" />
    </button>
  );
}

function NextButton() {
  const { scrollNext, canScrollNext } = useSwiper();

  return (
    <button
      className="absolute -right-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white ring-offset-white transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:hidden pc:flex"
      disabled={!canScrollNext}
      onClick={scrollNext}
      type="button"
    >
      <Image src="icons/icon-arrow-next-pagination.svg" width={16} height={16} alt="다음 버튼" />
    </button>
  );
}

export { PreviousButton, NextButton };
