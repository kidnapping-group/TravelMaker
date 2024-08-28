"use client";

import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({
  currentRating,
  onRatingChange,
}: {
  currentRating: number;
  onRatingChange: (newRating: number) => void;
}) {
  const [rating, setRating] = useState(currentRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const totalStars = 5;

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange(index);
  };

  const getStarIcon = (isFull: boolean, isHalf: boolean) => {
    if (isFull) {
      return <FaStar size={48} color="gold" />;
    }
    if (isHalf) {
      return <FaStarHalfAlt size={48} color="gold" />;
    }
    return <FaStar size={48} color="gray" />;
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillValue = hoverRating || rating;
    const isHalf = fillValue === index + 0.5;
    const isFull = fillValue >= starValue;

    return (
      <div key={index} className="relative h-[50px] w-[50px]">
        {getStarIcon(isFull, isHalf)}
        <div className="absolute inset-0 flex">
          <button
            type="button"
            className="h-full w-1/2 cursor-pointer opacity-0"
            onMouseEnter={() => handleMouseEnter(starValue - 0.5)}
            onClick={() => handleClick(starValue - 0.5)}
            onKeyDown={e => e.key === "Enter" && handleClick(starValue - 0.5)}
            aria-label={`${starValue - 0.5} 점`}
          />
          <button
            type="button"
            className="h-full w-1/2 cursor-pointer opacity-0"
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
            onKeyDown={e => e.key === "Enter" && handleClick(starValue)}
            aria-label={`${starValue} 점`}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex h-[100px] w-full items-center justify-center gap-1"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
    </div>
  );
}
