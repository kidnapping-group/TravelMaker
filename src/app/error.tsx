"use client";

import Image from "next/image";

import notFound from "../../public/images/404.png";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <Image
        src={notFound}
        alt="Error"
        width={200}
        height={200}
        className="animate-[spin_1s_linear_infinite]"
      />
      <h1>{error.message.slice(0, 3)}</h1>
      <p>{error.message.slice(3)}</p>
      <button type="button" onClick={reset} className="bg-primary-400 p-4">
        한 번만 더!
      </button>
    </div>
  );
}
