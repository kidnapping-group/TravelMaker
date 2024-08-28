"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function Rating({
  currentRating,
  onRatingChange,
}: {
  currentRating: number;
  onRatingChange: (newRating: number) => void;
}) {
  const [rating, setRating] = useState(currentRating);

  const totalStars = 5;

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange(index);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      {Array.from({ length: totalStars }, (_, index) => (
        <button key={index} type="button" onClick={() => handleClick(index + 1)}>
          <FaStar
            className="transition-colors"
            size={48}
            color={index < rating ? "gold" : "gray"}
          />
        </button>
      ))}
    </div>
  );
}
