"use client";

import { APIError, getErrorStatusMessage } from "@/apis/ApiError";
import Image from "next/image";
import { useRouter } from "next/navigation";

import notFound from "../../public/images/404.png";

interface ErrorProps {
  error: Error | APIError;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();
  const isAPIError = error instanceof APIError;
  const statusCode = isAPIError ? (error as APIError).status : 404;

  return (
    <div className="inset-0 flex h-[100vh] flex-col items-center justify-center gap-4 px-10 tablet:flex-row">
      <Image
        src={notFound}
        alt="Error"
        width={240}
        height={240}
        className="animate-[spin_1s_linear_infinite]"
      />
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold tablet:text-[60px]">
          {statusCode} {statusCode && getErrorStatusMessage(statusCode)}
        </h1>
        <h1 className="text-2xl font-medium">
          <span>{error.message}</span>
        </h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-left text-xl text-primary-500"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
