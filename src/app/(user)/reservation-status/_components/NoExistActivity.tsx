import Image from "next/image";

function NoExistActivity() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-5">
      <Image src="/images/empty.png" alt="예약 현황 없음" width={240} height={240} />
      <p className="text-center text-2xl font-medium">아직 등록한 체험이 없어요.</p>
    </div>
  );
}

export default NoExistActivity;
