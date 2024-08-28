"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useSwiper } from "./Context";

function PreviousButton() {
  const { scrollPrev, canScrollPrev } = useSwiper();

  return (
    <button
      className="absolute -left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 ring-offset-white transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:hidden"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      type="button"
    >
      <FaChevronLeft />
    </button>
  );
}

function NextButton() {
  const { scrollNext, canScrollNext } = useSwiper();

  return (
    <button
      className="absolute -right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 ring-offset-white transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:hidden"
      disabled={!canScrollNext}
      onClick={scrollNext}
      type="button"
    >
      <FaChevronRight />
    </button>
  );
}

export { PreviousButton, NextButton };
