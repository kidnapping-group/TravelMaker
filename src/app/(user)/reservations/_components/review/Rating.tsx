"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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
    <div className="flex h-[100px] w-full items-center justify-center gap-2">
      {Array.from({ length: totalStars }, (_, index) => (
        <Image
          key={index}
          src={index < rating ? "/icons/Icon_star_on.svg" : "/icons/Icon_star_off.svg"}
          width={50}
          height={50}
          alt={index < rating ? "준 평점" : "안 준 평점"}
          onClick={() => handleClick(index + 1)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
