"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import notFound from "../../public/images/404.png";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center tablet:flex-row">
      <Image
        src={notFound}
        alt="Error"
        width={240}
        height={240}
        className="animate-[spin_1s_linear_infinite]"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">
          {error.message.slice(0, 3)} Error: <span>{error.message.slice(3)}</span>
        </h1>
        {error.message.slice(0, 3) === "404" && <p>페이지를 찾을 수가 없습니다.</p>}
        <button type="button" onClick={() => router.back()} className="text-primary-500 text-left">
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
